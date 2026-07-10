import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaAward,
  FaCalendarAlt,
  FaEnvelope,
  FaFileAlt,
  FaGithub,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";
import { IoSend } from "react-icons/io5";

import {
  aboutParagraphs,
  certificateImage,
  experienceItems,
  galleryImages,
  internshipHighlights,
  quickQuestions,
  skillGroups,
  socialLinks,
} from "./data/portfolio";
import { featuredProjects } from "./data/projects";

import "./App.css";

/* -------------------------------------------------------------------------- */
/*                                Configuration                               */
/* -------------------------------------------------------------------------- */

const THEME_STORAGE_KEY = "portfolio-theme";
const CHAT_SESSION_STORAGE_KEY = "chatSession";

const CHAT_API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

const SOCIAL_ICON_COMPONENTS = {
  github: FaGithub,
  linkedin: FaLinkedin,
  instagram: FaInstagram,
};

/* -------------------------------------------------------------------------- */
/*                                  Utilities                                 */
/* -------------------------------------------------------------------------- */

function createUniqueId(prefix = "item") {
  if (
    typeof globalThis.crypto !== "undefined" &&
    typeof globalThis.crypto.randomUUID === "function"
  ) {
    return `${prefix}-${globalThis.crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function readLocalStorage(key) {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeLocalStorage(key, value) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(key, value);
  } catch {
    // The website should still work when browser storage is unavailable.
  }
}

function getOrCreateChatSessionId() {
  const existingSessionId = readLocalStorage(CHAT_SESSION_STORAGE_KEY);

  if (existingSessionId) {
    return existingSessionId;
  }

  const newSessionId = createUniqueId("chat-session");

  writeLocalStorage(CHAT_SESSION_STORAGE_KEY, newSessionId);

  return newSessionId;
}

function createChatMessage(from, text) {
  return {
    id: createUniqueId("message"),
    from,
    text,
  };
}

async function requestChatReply(message, sessionId, signal) {
  const response = await fetch(`${CHAT_API_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      sessionId,
    }),
    signal,
  });

  if (!response.ok) {
    throw new Error(`Chat request failed with status ${response.status}.`);
  }

  const data = await response.json();

  if (!data || typeof data.reply !== "string") {
    throw new Error("The chat server returned an invalid response.");
  }

  return data.reply;
}

/* -------------------------------------------------------------------------- */
/*                                Custom Hooks                                */
/* -------------------------------------------------------------------------- */

function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = readLocalStorage(THEME_STORAGE_KEY);

    return !savedTheme || savedTheme === "dark";
  });

  useEffect(() => {
    const themeName = isDark ? "dark" : "light";

    document.documentElement.classList.toggle("dark", isDark);
    document.body.classList.toggle("dark", isDark);

    writeLocalStorage(THEME_STORAGE_KEY, themeName);
  }, [isDark]);

  const toggleTheme = useCallback(() => {
    setIsDark((currentTheme) => !currentTheme);
  }, []);

  return {
    isDark,
    toggleTheme,
  };
}

function useEscapeKey(isActive, onEscape) {
  useEffect(() => {
    if (!isActive) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onEscape();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isActive, onEscape]);
}

function useBodyScrollLock(isLocked) {
  useEffect(() => {
    if (!isLocked) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isLocked]);
}

function useModalBehavior(isOpen, onClose) {
  useEscapeKey(isOpen, onClose);
  useBodyScrollLock(isOpen);
}

function useGallerySlider(images, intervalMilliseconds = 10000) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartXRef = useRef(null);

  const imageCount = images.length;

  const showNextSlide = useCallback(() => {
    if (imageCount === 0) {
      return;
    }

    setCurrentSlide((currentIndex) => {
      return (currentIndex + 1) % imageCount;
    });
  }, [imageCount]);

  const showPreviousSlide = useCallback(() => {
    if (imageCount === 0) {
      return;
    }

    setCurrentSlide((currentIndex) => {
      return currentIndex === 0 ? imageCount - 1 : currentIndex - 1;
    });
  }, [imageCount]);

  const handleTouchStart = useCallback((event) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
  }, []);

  const handleTouchEnd = useCallback(
    (event) => {
      if (touchStartXRef.current === null) {
        return;
      }

      const touchEndX = event.changedTouches[0]?.clientX;

      if (typeof touchEndX !== "number") {
        touchStartXRef.current = null;
        return;
      }

      const swipeDistance = touchStartXRef.current - touchEndX;
      const minimumSwipeDistance = 50;

      if (swipeDistance > minimumSwipeDistance) {
        showNextSlide();
      } else if (swipeDistance < -minimumSwipeDistance) {
        showPreviousSlide();
      }

      touchStartXRef.current = null;
    },
    [showNextSlide, showPreviousSlide],
  );

  useEffect(() => {
    if (imageCount <= 1) {
      return undefined;
    }

    const intervalId = window.setInterval(
      showNextSlide,
      intervalMilliseconds,
    );

    return () => {
      window.clearInterval(intervalId);
    };
  }, [imageCount, intervalMilliseconds, showNextSlide]);

  return {
    currentSlide,
    showNextSlide,
    showPreviousSlide,
    handleTouchStart,
    handleTouchEnd,
  };
}

function useChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  const [messages, setMessages] = useState(() => [
    createChatMessage(
      "bot",
      "Hi! I'm Ronald's AI assistant. How can I help you today?",
    ),
  ]);

  const [sessionId] = useState(() => getOrCreateChatSessionId());

  const chatEndRef = useRef(null);
  const requestControllerRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isSending]);

  useEffect(() => {
    return () => {
      requestControllerRef.current?.abort();
    };
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleChat = useCallback(() => {
    setIsOpen((currentState) => !currentState);
  }, []);

  useEscapeKey(isOpen, closeChat);

  const sendMessage = useCallback(
    async (rawMessage) => {
      const message = rawMessage.trim();

      if (!message || isSending) {
        return;
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        createChatMessage("user", message),
      ]);

      setIsSending(true);

      const requestController = new AbortController();

      requestControllerRef.current = requestController;

      try {
        const reply = await requestChatReply(
          message,
          sessionId,
          requestController.signal,
        );

        setMessages((currentMessages) => [
          ...currentMessages,
          createChatMessage("bot", reply),
        ]);
      } catch (error) {
        if (error?.name === "AbortError") {
          return;
        }

        console.error("Chat request failed:", error);

        setMessages((currentMessages) => [
          ...currentMessages,
          createChatMessage(
            "bot",
            "Cannot connect to the AI server right now. Please try again later.",
          ),
        ]);
      } finally {
        requestControllerRef.current = null;
        setIsSending(false);
      }
    },
    [isSending, sessionId],
  );

  const submitMessage = useCallback(
    async (event) => {
      event.preventDefault();

      const message = input.trim();

      if (!message || isSending) {
        return;
      }

      setInput("");

      await sendMessage(message);
    },
    [input, isSending, sendMessage],
  );

  return {
    isOpen,
    input,
    messages,
    isSending,
    chatEndRef,
    setInput,
    closeChat,
    toggleChat,
    sendMessage,
    submitMessage,
  };
}

/* -------------------------------------------------------------------------- */
/*                              General Components                            */
/* -------------------------------------------------------------------------- */

function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      onClick={onToggle}
    >
      <span aria-hidden="true">{isDark ? "☾" : "☀"}</span>
    </button>
  );
}

function HeroSection() {
  return (
    <header className="container hero card">
      <div className="hero-photo">
        <img
          src="/assets/images/profile-picture.jpg"
          alt="Ronald M. Soriano"
        />
      </div>

      <div className="hero-content">
        <div className="hero-heading">
          <h1>
            Ronald Soriano

            <span className="verified-badge" title="Verified">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.5l2.3 1.3 2.6-.1 1.3 2.3 2.2 1.2-.1 2.6 1.4 2.2-1.4 2.2.1 2.6-2.2 1.2-1.3 2.3-2.6-.1L12 21.5l-2.3-1.3-2.6.1-1.3-2.3-2.2-1.2.1-2.6L2.3 12l1.4-2.2-.1-2.6 2.2-1.2 1.3-2.3 2.6.1L12 2.5z" />

                <path
                  className="check-path"
                  d="M9.7 12.9l1.6 1.7 3.4-4"
                />
              </svg>
            </span>
          </h1>

          <span className="availability-badge">
            Available for Work
          </span>
        </div>

        <p className="hero-location">
          Guagua, Pampanga, Philippines
        </p>

        <h2 className="hero-role">
          Software Engineer / Full-Stack Developer
        </h2>

        <p className="hero-tagline">
          I build responsive web applications, backend APIs, automation
          systems, and database-driven solutions that solve real-world
          workflow problems.
        </p>

        <div className="hero-actions">
          <a
            className="btn btn-primary"
            href="/assets/files/RONALD_SORIANO_RESUME.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <FaFileAlt
              aria-hidden="true"
              style={{ marginRight: "8px" }}
            />
            View Resume
          </a>

          <a
            className="btn btn-secondary"
            href="mailto:ronaldsoriano2727@gmail.com"
          >
            <FaEnvelope
              aria-hidden="true"
              style={{ marginRight: "8px" }}
            />
            Send Email
          </a>

          <a
            className="btn btn-secondary"
            href="https://calendly.com/ronaldsoriano2727/15-minute-meeting"
            target="_blank"
            rel="noreferrer"
          >
            <FaCalendarAlt
              aria-hidden="true"
              style={{ marginRight: "8px" }}
            />
            Schedule a Call
          </a>
        </div>
      </div>
    </header>
  );
}

function AboutSection() {
  return (
    <article className="card">
      <h3>About</h3>

      <div className="content-text">
        {aboutParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}

function FeaturedProjectCard({ project, onViewDetails }) {
  return (
    <article className="project-preview-card">
      <div>
        <span className="project-category">{project.category}</span>

        <h4>{project.title}</h4>

        <p>{project.summary}</p>
      </div>

      <div className="tech-list compact">
        {project.tech.slice(0, 5).map((technology) => (
          <span key={technology}>{technology}</span>
        ))}
      </div>

      <div className="project-actions">
        <button
          className="project-action-btn primary-action"
          type="button"
          onClick={() => onViewDetails(project)}
        >
          <span>View Details</span>

          <span className="action-arrow" aria-hidden="true">
            →
          </span>
        </button>

        {project.liveDemo && (
          <a
            className="project-action-btn secondary-action"
            href={project.liveDemo}
            target="_blank"
            rel="noreferrer"
          >
            <span>Live Demo</span>

            <span className="action-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        )}
      </div>
    </article>
  );
}

function FeaturedProjectsSection({ onViewProject }) {
  return (
    <article className="card">
      <div className="section-head project-section-head">
        <div>
          <h3>Featured Projects</h3>

          <p className="section-subtitle">
            Selected work showing full-stack development, automation,
            AI integration, database systems, and real-world technical
            problem solving.
          </p>
        </div>
      </div>

      <div className="project-preview-grid">
        {featuredProjects.map((project) => (
          <FeaturedProjectCard
            key={project.id}
            project={project}
            onViewDetails={onViewProject}
          />
        ))}
      </div>

      <div className="see-more-projects">
        <Link to="/projects" className="see-more-link">
          See More Projects
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

function SkillGroup({ title, skills }) {
  return (
    <div className="skills-group">
      <h4>{title}</h4>

      <div className="chips">
        {skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>
    </div>
  );
}

function TechnicalSkillsSection() {
  return (
    <article className="card">
      <h3>Technical Skills</h3>

      {skillGroups.map((group) => (
        <SkillGroup
          key={group.id}
          title={group.title}
          skills={group.skills}
        />
      ))}
    </article>
  );
}

function ExperienceSection() {
  return (
    <article className="card">
      <h3>Experience</h3>

      <div className="timeline">
        {experienceItems.map((experience) => (
          <div
            key={experience.id}
            className={`timeline-item ${
              experience.isActive ? "active" : ""
            }`}
          >
            <div className="timeline-dot" aria-hidden="true" />

            <div>
              <h4>{experience.role}</h4>
              <p>{experience.organization}</p>
            </div>

            <span>{experience.period}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

function InternshipHighlightsSection() {
  return (
    <article className="card">
      <h3>Internship Highlights</h3>

      <ul className="highlight-list">
        {internshipHighlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
    </article>
  );
}

function CertificationSection({ onViewCertificate }) {
  return (
    <article className="card">
      <h3>Certification</h3>

      <button
        className="mini-box certification-box certification-button"
        type="button"
        onClick={() => onViewCertificate(certificateImage)}
        aria-label="View Civil Service Certificate"
      >
        <FaAward className="cert-icon" aria-hidden="true" />

        <div className="cert-content">
          <strong>Civil Service Exam Passer</strong>
          <span>Professional Level — August 2025</span>
          <small>Click to view certificate</small>
        </div>
      </button>
    </article>
  );
}

function SocialLinksSection() {
  return (
    <article className="card">
      <h3>Social Links</h3>

      <div className="social-links-list">
        {socialLinks.map((socialLink) => {
          const Icon = SOCIAL_ICON_COMPONENTS[socialLink.icon];

          return (
            <a
              key={socialLink.id}
              href={socialLink.url}
              target="_blank"
              rel="noreferrer"
              className="social-link-item"
            >
              {Icon && <Icon size={20} aria-hidden="true" />}

              <span className="social-link-text">
                {socialLink.label}
              </span>
            </a>
          );
        })}
      </div>
    </article>
  );
}

function ContactSection() {
  return (
    <article className="card">
      <h3>Contact</h3>

      <div className="contact-list">
        <a
          href="mailto:ronaldsoriano2727@gmail.com"
          className="contact-item"
        >
          <span>ronaldsoriano2727@gmail.com</span>
        </a>

        <a href="tel:+639623863712" className="contact-item">
          <span>+63 962-386-3712</span>
        </a>
      </div>

      <p className="contact-note">
        Available for entry-level roles, junior developer roles,
        internships, and freelance opportunities.
      </p>
    </article>
  );
}

function GallerySection() {
  const {
    currentSlide,
    showNextSlide,
    showPreviousSlide,
    handleTouchStart,
    handleTouchEnd,
  } = useGallerySlider(galleryImages);

  return (
    <article className="card gallery-card">
      <div className="section-head">
        <h3>Gallery</h3>

        <span className="gallery-count">
          {currentSlide + 1}/{galleryImages.length}
        </span>
      </div>

      <div
        className="slider"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          className="slider-btn left"
          type="button"
          onClick={showPreviousSlide}
          aria-label="View previous gallery image"
        >
          ‹
        </button>

        {galleryImages.map((image, index) => (
          <img
            key={image}
            src={image}
            className={`slider-image ${
              index === currentSlide ? "active" : ""
            }`}
            alt={`Portfolio gallery ${index + 1}`}
          />
        ))}

        <button
          className="slider-btn right"
          type="button"
          onClick={showNextSlide}
          aria-label="View next gallery image"
        >
          ›
        </button>
      </div>
    </article>
  );
}

function PortfolioFooter() {
  return (
    <footer className="container footer">
      <p>© 2026 Ronald M. Soriano. All rights reserved.</p>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Chatbot Components                            */
/* -------------------------------------------------------------------------- */

function TypingIndicator() {
  return (
    <div className="chat-message bot" aria-label="Assistant is typing">
      <span className="typing-dots" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
    </div>
  );
}

function Chatbot() {
  const {
    isOpen,
    input,
    messages,
    isSending,
    chatEndRef,
    setInput,
    closeChat,
    toggleChat,
    sendMessage,
    submitMessage,
  } = useChatbot();

  return (
    <div className={`chatbot ${isOpen ? "open" : ""}`}>
      {isOpen && (
        <div
          id="portfolio-chatbot-window"
          className="chatbot-window"
          role="dialog"
          aria-label="Portfolio Assistant"
        >
          <div className="chatbot-header">
            <strong>Portfolio Assistant</strong>

            <button
              type="button"
              onClick={closeChat}
              aria-label="Close portfolio assistant"
            >
              ×
            </button>
          </div>

          <div
            className="chatbot-messages"
            aria-live="polite"
            aria-busy={isSending}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chat-message ${message.from}`}
              >
                {message.text}
              </div>
            ))}

            {isSending && <TypingIndicator />}

            <div ref={chatEndRef} />
          </div>

          <div className="quick-buttons">
            <span className="quick-label">Quick questions:</span>

            <div className="quick-buttons-list">
              {quickQuestions.map((question) => (
                <button
                  key={question.id}
                  type="button"
                  onClick={() => sendMessage(question.prompt)}
                  disabled={isSending}
                >
                  {question.label}
                </button>
              ))}
            </div>
          </div>

          <form className="chatbot-form" onSubmit={submitMessage}>
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about Ronald..."
              aria-label="Ask Ronald's portfolio assistant"
            />

            <button
              type="submit"
              className="send-btn"
              disabled={isSending || !input.trim()}
              aria-label="Send message"
            >
              <IoSend size={18} aria-hidden="true" />
            </button>
          </form>
        </div>
      )}

      <button
        className="chatbot-toggle"
        type="button"
        onClick={toggleChat}
        aria-expanded={isOpen}
        aria-controls="portfolio-chatbot-window"
      >
        <span className={!isOpen ? "swing-icon" : ""}>
          <BsChatDots size={20} aria-hidden="true" />
        </span>

        <span className="chat-text">Ask Ronald AI</span>
      </button>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Modal Components                            */
/* -------------------------------------------------------------------------- */

function ProjectLocation({ project }) {
  const { location } = project;

  if (!location) {
    return null;
  }

  return (
    <div className="project-location-card">
      <div className="project-location-header">
        <div>
          <span className="project-location-label">
            {location.label || "Project Location"}
          </span>

          <h4>{location.address}</h4>
        </div>

        {location.mapOpenUrl && (
          <a
            className="project-map-link"
            href={location.mapOpenUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open Map ↗
          </a>
        )}
      </div>

      {location.mapEmbedUrl && (
        <div className="project-map-frame">
          <iframe
            title={`${project.title} map location`}
            src={location.mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  useModalBehavior(Boolean(project), onClose);

  if (!project) {
    return null;
  }

  function handleOverlayClick(event) {
    if (event.currentTarget === event.target) {
      onClose();
    }
  }

  return (
    <div
      className="project-modal active"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={handleOverlayClick}
    >
      <div className="project-modal-content">
        <button
          className="project-modal-close"
          type="button"
          aria-label="Close project details"
          onClick={onClose}
        >
          ✕
        </button>

        <span className="project-category">
          {project.category}
        </span>

        <h3 id="project-modal-title">{project.title}</h3>

        <p className="project-modal-summary">
          {project.description}
        </p>

        {project.impact && (
          <div className="project-impact-box">
            <strong>Why this project matters</strong>
            <p>{project.impact}</p>
          </div>
        )}

        <ProjectLocation project={project} />

        {project.highlights?.length > 0 && (
          <>
            <h4>Key Highlights</h4>

            <ul className="project-modal-list">
              {project.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </>
        )}

        {project.tech?.length > 0 && (
          <>
            <h4>Technologies Used</h4>

            <div className="tech-list">
              {project.tech.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
          </>
        )}

        <div className="project-actions modal-actions">
          {project.liveDemo && (
            <a
              className="btn btn-primary"
              href={project.liveDemo}
              target="_blank"
              rel="noreferrer"
            >
              Open Live Demo
            </a>
          )}

          {project.github && (
            <a
              className="btn btn-secondary"
              href={project.github}
              target="_blank"
              rel="noreferrer"
            >
              View GitHub
            </a>
          )}

          <button
            className="btn btn-secondary"
            type="button"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function ImageModal({ image, onClose }) {
  useModalBehavior(Boolean(image), onClose);

  if (!image) {
    return null;
  }

  function handleOverlayClick(event) {
    if (event.currentTarget === event.target) {
      onClose();
    }
  }

  return (
    <div
      className="image-modal active"
      role="dialog"
      aria-modal="true"
      aria-label="Certificate image viewer"
      onClick={handleOverlayClick}
    >
      <button
        className="image-modal-close"
        aria-label="Close image viewer"
        type="button"
        onClick={onClose}
      >
        ✕
      </button>

      <div className="image-modal-content">
        <img src={image.src} alt={image.alt} />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               Main Component                               */
/* -------------------------------------------------------------------------- */

export default function App() {
  const { isDark, toggleTheme } = useTheme();

  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const openProjectModal = useCallback((project) => {
    setSelectedImage(null);
    setSelectedProject(project);
  }, []);

  const closeProjectModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const openImageModal = useCallback((image) => {
    setSelectedProject(null);
    setSelectedImage(image);
  }, []);

  const closeImageModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  return (
    <>
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />

      <div className="page">
        <HeroSection />

        <main className="container layout">
          <section className="main-column">
            <AboutSection />

            <FeaturedProjectsSection
              onViewProject={openProjectModal}
            />

            <TechnicalSkillsSection />
          </section>

          <aside className="side-column">
            <ExperienceSection />

            <InternshipHighlightsSection />

            <CertificationSection
              onViewCertificate={openImageModal}
            />

            <SocialLinksSection />

            <ContactSection />

            <GallerySection />
          </aside>
        </main>

        <PortfolioFooter />
      </div>

      <Chatbot />

      <ProjectModal
        project={selectedProject}
        onClose={closeProjectModal}
      />

      <ImageModal
        image={selectedImage}
        onClose={closeImageModal}
      />
    </>
  );
}