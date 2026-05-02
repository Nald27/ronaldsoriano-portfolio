import { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaAward } from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import "./App.css";

const sessionId = localStorage.getItem("chatSession") || crypto.randomUUID();
localStorage.setItem("chatSession", sessionId);

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [modalImage, setModalImage] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  const [chatMessages, setChatMessages] = useState([
    {
      from: "bot",
      text: "Hi! I'm Ronald's AI assistant. How can I help you today?",
    },
  ]);

  const chatEndRef = useRef(null);

  const sliderImages = [
    "/assets/images/sliders/1.jpg",
    "/assets/images/sliders/2.jpg",
    "/assets/images/sliders/3.jpg",
    "/assets/images/sliders/4.jpg",
    "/assets/images/sliders/6.jpg",
    "/assets/images/sliders/7.jpg",
    "/assets/images/sliders/8.jpg",
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "dark") {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, []);

  useEffect(() => {
  if (isDark) {
    document.body.classList.add("dark");
    localStorage.setItem("portfolio-theme", "dark");
  } else {
    document.body.classList.remove("dark");
    localStorage.setItem("portfolio-theme", "light");
  }
}, [isDark]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [sliderImages.length]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setModalImage("");
        setChatOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalImage ? "hidden" : "";
  }, [modalImage]);

  const sendMessageToAI = async (text) => {
    if (!text.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      { from: "user", text },
      { from: "bot", text: "Typing..." },
    ]);

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          sessionId,
        }),
      });

      const data = await res.json();

      setChatMessages((prev) => [
        ...prev.slice(0, -1),
        { from: "bot", text: data.reply },
      ]);
    } catch (error) {
      setChatMessages((prev) => [
        ...prev.slice(0, -1),
        {
          from: "bot",
          text: "Cannot connect to AI server.",
        },
      ]);
    }
  };

  const handleQuick = (text) => {
    sendMessageToAI(text);
  };

  const sendChatMessage = async (event) => {
    event.preventDefault();

    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setChatInput("");

    await sendMessageToAI(userMessage);
  };

  const openImageModal = (imageSrc) => {
    setModalImage(imageSrc);
  };

  const closeImageModal = () => {
    setModalImage("");
  };

  let touchStartX = 0;

  const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;

    if (touchStartX - touchEndX > 50) {
      // swipe left
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }

    if (touchEndX - touchStartX > 50) {
      // swipe right
      setCurrentSlide((prev) =>
        prev === 0 ? sliderImages.length - 1 : prev - 1
      );
    }
  };

  return (
    <>
      <button
        className="theme-toggle"
        aria-label="Toggle theme"
        title="Black & White Mode"
        onClick={() => setIsDark((prev) => !prev)}
      >
        <span>{isDark ? "☾" : "☀"}</span>
      </button>

      <div className="page">
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

              <span className="availability-badge">Available for Work</span>
            </div>

            <p className="hero-location">Guagua, Pampanga, Philippines</p>
            <h2 className="hero-role">Entry-Level Full-Stack Developer</h2>

            <p className="hero-tagline">
              I build practical web applications, automation systems, and IoT
              solutions that solve real-world workflow problems.
            </p>

            <div className="hero-actions">
              <a
                className="btn btn-primary"
                href="/assets/files/SORIANO_RONALD_RESUME - MAIN RESUME.pdf"
                target="_blank"
                rel="noreferrer"
              >
                View Resume
              </a>

              <a
                className="btn btn-secondary"
                href="mailto:ronaldsoriano2727@gmail.com"
              >
                Contact Me
              </a>

              <a
                className="btn btn-secondary"
                href="https://github.com/Nald27"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
        </header>

        <main className="container layout">
          <section className="main-column">
            <article className="card">
              <h3>About</h3>

              <div className="content-text">
                <p>
                  I am an entry-level full-stack developer focused on building
                  systems that solve real operational problems. I specialize in
                  turning ideas into complete functional systems through web
                  development, backend engineering, automation, and hardware
                  integration.
                </p>

                <p>
                  I have experience developing full-stack platforms, automation
                  systems, and IoT-based applications, including
                  payment-integrated systems, management platforms, and
                  real-time monitoring tools.
                </p>

                <p>
                  I work directly with non-technical clients to understand their
                  requirements, translate ideas into technical features, and
                  improve systems based on real feedback.
                </p>

                <p>
                  I am currently open to junior developer roles, internships,
                  freelance projects, and entry-level opportunities.
                </p>
              </div>
            </article>

            <article className="card">
              <div className="section-head">
                <h3>Featured Projects</h3>
              </div>

              <div className="projects-grid">
                <div className="project-card featured-project">
                  <div className="project-body">
                    <div className="project-header">
                      <h4>Automated Photobooth System — Yugobooth</h4>

                        {false && (
                          <button
                            className="project-link project-link-button"
                            type="button"
                            onClick={() =>
                              openImageModal("/assets/images/yugobooth.jpg")
                            }
                          >
                            View Photo &gt;
                          </button>
                        )}
                    </div>

                    <p>
                      A fully automated photobooth system integrating hardware,
                      software, payment processing, photo capture, printing, QR
                      downloads, and admin analytics.
                    </p>

                    <ul>
                      <li>Integrated bill acceptor payment system</li>
                      <li>
                        Automated capture, filtering, printing, and QR downloads
                      </li>
                      <li>
                        Built admin dashboard for analytics and session tracking
                      </li>
                    </ul>

                    <div className="tech-list">
                      <span>HTML</span>
                      <span>CSS</span>
                      <span>JavaScript</span>
                      <span>PHP</span>
                      <span>MySQL</span>
                      <span>Python</span>
                      <span>Arduino</span>
                      <span>FFmpeg</span>
                    </div>

                    <div className="project-actions">
                      <a
                        className="project-link"
                        href="https://github.com/Nald27/yugobooth-photobooth-system"
                        target="_blank"
                        rel="noreferrer"
                      >
                        View Project &gt;
                      </a>
                    </div>
                  </div>
                </div>

                <div className="project-card">
                  <div className="project-body">
                    <h4>Barangay Management Information System</h4>

                    <p>
                      A full-stack system that digitizes barangay operations,
                      improving records, document requests, services, reports,
                      and payment tracking.
                    </p>

                    <ul>
                      <li>
                        Built document request, scheduling, reporting, and
                        payment modules
                      </li>
                      <li>Implemented role-based access control</li>
                      <li>
                        Integrated OCR for receipt validation and analytics
                      </li>
                    </ul>

                    <div className="tech-list">
                      <span>PHP</span>
                      <span>MySQL</span>
                      <span>JavaScript</span>
                      <span>Tailwind CSS</span>
                      <span>Tesseract OCR</span>
                      <span>GeoJSON</span>
                    </div>

                    <div className="project-actions">
                      <a
                        className="project-link"
                        href="https://github.com/Nald27/barangaybridge"
                        target="_blank"
                        rel="noreferrer"
                      >
                        View Project &gt;
                      </a>
                    </div>
                  </div>
                </div>

                <div className="project-card">
                  <div className="project-body">
                    <h4>HydroTech Smart IoT Water Dispenser</h4>

                    <p>
                      An IoT-based water dispensing system with QR
                      authentication, automated dispensing, and real-time web
                      monitoring.
                    </p>

                    <ul>
                      <li>
                        Led development team and designed hardware architecture
                      </li>
                      <li>
                        Built control systems for sensors, dispensing, and safety
                      </li>
                      <li>
                        Integrated QR authentication and web monitoring
                      </li>
                    </ul>

                    <div className="tech-list">
                      <span>Arduino</span>
                      <span>ESP8266</span>
                      <span>PHP</span>
                      <span>MySQL</span>
                      <span>JavaScript</span>
                    </div>

                    <div className="project-actions">
                      <a
                        className="project-link"
                        href="https://github.com/Nald27/hydrotech-smart-iot-water-dispenser"
                        target="_blank"
                        rel="noreferrer"
                      >
                        View Project &gt;
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            <article className="card">
              <h3>Technical Skills</h3>

              <div className="skills-group">
                <h4>Frontend</h4>
                <div className="chips">
                  <span>HTML5</span>
                  <span>CSS3</span>
                  <span>JavaScript</span>
                  <span>React</span>
                  <span>Tailwind CSS</span>
                  <span>Bootstrap</span>
                  <span>WordPress</span>
                </div>
              </div>

              <div className="skills-group">
                <h4>Backend & Database</h4>
                <div className="chips">
                  <span>PHP</span>
                  <span>Python</span>
                  <span>C++</span>
                  <span>MySQL</span>
                  <span>REST API Development</span>
                </div>
              </div>

              <div className="skills-group">
                <h4>IoT & Hardware</h4>
                <div className="chips">
                  <span>Arduino</span>
                  <span>ESP8266</span>
                  <span>IoT Sensors</span>
                  <span>QR Systems</span>
                  <span>Hardware Integration</span>
                </div>
              </div>

              <div className="skills-group">
                <h4>Tools & Technologies</h4>
                <div className="chips">
                  <span>Git</span>
                  <span>GitHub</span>
                  <span>VS Code</span>
                  <span>Arduino IDE</span>
                  <span>FFmpeg</span>
                  <span>Microsoft 365</span>
                  <span>Google Docs</span>
                  <span>Trello</span>
                  <span>Jira</span>
                  <span>Postman</span>
                  <span>Ngrok</span>
                  <span>Cloudflare Tunnel</span>
                </div>
              </div>

              <div className="skills-group">
                <h4>AI Tools</h4>
                <div className="chips">
                  <span>ChatGPT</span>
                  <span>Claude</span>
                  <span>Gemini</span>
                </div>
              </div>
            </article>
          </section>

          <aside className="side-column">
            <article className="card">
              <h3>Experience</h3>

              <div className="timeline">
                <div className="timeline-item active">
                  <div className="timeline-dot"></div>
                  <div>
                    <h4>Freelance Full-Stack Developer</h4>
                    <p>Automated Photobooth System — Yugobooth</p>
                  </div>
                  <span>2025</span>
                </div>

                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div>
                    <h4>Freelance Full-Stack Developer</h4>
                    <p>Barangay Management Information System</p>
                  </div>
                  <span>2025</span>
                </div>

                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div>
                    <h4>Information Technology Intern</h4>
                    <p>DepEd — Schools Division Office Pampanga</p>
                  </div>
                  <span>2025</span>
                </div>

                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div>
                    <h4>Capstone Project Lead / Developer</h4>
                    <p>HydroTech Smart IoT Water Dispenser</p>
                  </div>
                  <span>2024–2025</span>
                </div>

                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div>
                    <h4>BS Information Technology</h4>
                    <p>Pampanga State University</p>
                  </div>
                  <span>2021–2025</span>
                </div>
              </div>
            </article>

            <article className="card">
              <h3>Internship Highlights</h3>

              <ul className="highlight-list">
                <li>Managed and organized administrative data using Excel</li>
                <li>Assisted in ICT equipment inventory and maintenance</li>
                <li>Provided technical support to office staff</li>
                <li>
                  Developed Excel import/export automation to improve workflows
                </li>
                <li>Created reports, documentation, and user guides</li>
              </ul>
            </article>

            <article className="card">
              <h3>Certification</h3>

              <div className="mini-box certification-box">
                <FaAward className="cert-icon" />

                <div className="cert-content">
                  <strong>Civil Service Exam Passer</strong>
                  <span>Professional Level — August 2025</span>
                </div>
              </div>
            </article>

            <article className="card">
              <h3>Social Links</h3>

              <div className="social-links-list">
                <a href="https://github.com/Nald27" target="_blank" className="social-link-item">
                  <FaGithub size={20} />
                  <span className="social-link-text">GitHub</span>
                </a>

                <a href="https://www.linkedin.com/in/ronald-soriano-159b02347" target="_blank" className="social-link-item">
                  <FaLinkedin size={20} />
                  <span className="social-link-text">LinkedIn</span>
                </a>

                <a href="https://www.instagram.com/nald.dev/" target="_blank" className="social-link-item">
                  <FaInstagram size={20} />
                  <span className="social-link-text">Instagram</span>
                </a>
              </div>
            </article>

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
                  <span>0962-386-3712</span>
                </a>
              </div>

              <p className="contact-note">
                Available for entry-level roles, junior developer roles,
                internships, and freelance opportunities.
              </p>
            </article>

            <article className="card gallery-card">
              <div className="section-head">
                <h3>Gallery</h3>
                <span className="gallery-count">
                  {currentSlide + 1}/{sliderImages.length}
                </span>
              </div>

                <div className="slider" onTouchStart={handleTouchStart} 
                                        onTouchEnd={handleTouchEnd}
                >

                  {/* LEFT ARROW */}
                  <button
                    className="slider-btn left"
                    onClick={() =>
                      setCurrentSlide((prev) =>
                        prev === 0 ? sliderImages.length - 1 : prev - 1
                      )
                    }
                  >
                    ‹
                  </button>

                  {/* IMAGES */}
                  {sliderImages.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      className={`slider-image ${
                        index === currentSlide ? "active" : ""
                      }`}
                      alt={`Portfolio gallery ${index + 1}`}
                    />
                  ))}

                  {/* RIGHT ARROW */}
                  <button
                    className="slider-btn right"
                    onClick={() =>
                      setCurrentSlide((prev) =>
                        (prev + 1) % sliderImages.length
                      )
                    }
                  >
                    ›
                  </button>
                </div>
            </article>
          </aside>
        </main>

        <footer className="container footer">
          <p>© 2026 Ronald M. Soriano. All rights reserved.</p>
        </footer>
      </div>

      <div className={`chatbot ${chatOpen ? "open" : ""}`}>
        {chatOpen && (
          <div className="chatbot-window">
            <div className="chatbot-header">
              <strong>Portfolio Assistant</strong>
              <button type="button" onClick={() => setChatOpen(false)}>
                ×
              </button>
            </div>

            <div className="chatbot-messages">
              {chatMessages.map((message, index) => (
                <div key={index} className={`chat-message ${message.from}`}>
                  {message.text === "Typing..." ? (
                    <span className="typing-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </span>
                  ) : (
                    message.text
                  )}
                </div>
              ))}

              <div ref={chatEndRef}></div>
            </div>

            <div className="quick-buttons">
              <span className="quick-label">Quick questions:</span>

              <div className="quick-buttons-list">
                <button
                  type="button"
                  onClick={() => handleQuick("What are Ronald's skills?")}
                >
                  Skills
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleQuick("Tell me about Ronald's projects")
                  }
                >
                  Projects
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleQuick("Is Ronald available for work?")
                  }
                >
                  Availability
                </button>
              </div>
            </div>

            <form className="chatbot-form" onSubmit={sendChatMessage}>
              <input
                type="text"
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                placeholder="Ask about Ronald..."
              />

              <button type="submit" className="send-btn">
                <IoSend size={18} />
              </button>
              
            </form>
          </div>
        )}

      <button
        className="chatbot-toggle"
        onClick={() => setChatOpen((prev) => !prev)}
      >
        <span className={!chatOpen ? "swing-icon" : ""}>
          <BsChatDots size={20} />
        </span>

        <span className="chat-text">Ask Ronald AI</span>
      </button>

      </div>

      {modalImage && (
        <div
          className="image-modal active"
          aria-hidden="false"
          onClick={(event) => {
            if (event.target.classList.contains("image-modal")) {
              closeImageModal();
            }
          }}
        >
          <button
            className="image-modal-close"
            aria-label="Close image viewer"
            type="button"
            onClick={closeImageModal}
          >
            ✕
          </button>

          <div className="image-modal-content">
            <img src={modalImage} alt="Expanded project" />
          </div>
        </div>
      )}
    </>
  );
}