import { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaAward } from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { FaFileAlt, FaEnvelope, FaCalendarAlt } from "react-icons/fa";
import "./App.css";

const sessionId = localStorage.getItem("chatSession") || crypto.randomUUID();
localStorage.setItem("chatSession", sessionId);

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");
    return !savedTheme || savedTheme === "dark";
  });

  const [modalImage, setModalImage] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  const touchStartXRef = useRef(0);
  const chatEndRef = useRef(null);

  const [chatMessages, setChatMessages] = useState([
    {
      from: "bot",
      text: "Hi! I'm Ronald's AI assistant. How can I help you today?",
    },
  ]);

  const sliderImages = [
    "/assets/images/sliders/1.jpg",
    "/assets/images/sliders/2.jpg",
    "/assets/images/sliders/3.jpg",
    "/assets/images/sliders/4.jpg",
    "/assets/images/sliders/5.jpg",
    "/assets/images/sliders/6.jpg",
    "/assets/images/sliders/7.jpg",
    "/assets/images/sliders/8.jpg",
    "/assets/images/sliders/9.jpg",
    "/assets/images/sliders/10.jpg",
    "/assets/images/sliders/11.jpg",
    "/assets/images/sliders/12.jpg",
  ];

  const projects = [
    {
      title: "Yugobooth: Automated Photobooth System",
      category: "Full-Stack + Hardware Automation",
      summary:
        "A live production photobooth system that automates payment, photo capture, filtering, printing, and QR softcopy downloads.",
      description:
        "Yugobooth is a real-world automated photobooth system used in live business operations. It combines web development, backend logic, hardware integration, database management, payment automation, printing, and customer-facing workflows into one complete production system.",
      highlights: [
        "Integrated bill acceptor payment handling to reduce manual staff intervention.",
        "Automated the customer flow from payment to layout selection, photo capture, filtering, printing, and QR download delivery.",
        "Built an admin dashboard for revenue tracking, session monitoring, and real-time analytics.",
        "Configured temporary public access for QR softcopy downloads using Ngrok and Cloudflare Tunnel.",
        "Maintains and supports the live system through troubleshooting, testing, and user guidance.",
      ],
      tech: [
        "PHP",
        "JavaScript",
        "MySQL",
        "Python",
        "Arduino",
        "FFmpeg",
        "Ngrok",
        "Cloudflare Tunnel",
      ],
      impact:
        "This project demonstrates my ability to build and support a complete software-and-hardware system used in real business operations.",
      location: {
        label: "Yugobooth Location",
        address: "4HGW+XQ Angeles, Pampanga",
        mapEmbedUrl:
          "https://www.google.com/maps?q=4HGW%2BXQ%20Angeles%2C%20Pampanga&output=embed",
        mapOpenUrl:
          "https://www.google.com/maps/search/?api=1&query=4HGW%2BXQ%20Angeles%2C%20Pampanga",
      },
      liveDemo: "",
      github: "",
    },
    {
      title: "MyJobTracker: Job Application Tracker System",
      category: "Full-Stack Web Application",
      summary:
        "A full-stack job application tracker that helps users organize applications, monitor progress, and manage statuses.",
      description:
        "MyJobTracker is a modern web application designed to help job seekers organize job applications in one platform. Users can track company details, roles, statuses, notes, and progress from application to final result.",
      highlights: [
        "Built a dashboard for organizing job applications and monitoring progress.",
        "Added status management such as Applied, Accepted, Rejected, and Archived.",
        "Developed search and filtering features for faster application tracking.",
        "Created RESTful APIs using Node.js and Express.js.",
        "Used Prisma ORM and Neon PostgreSQL for structured database management.",
      ],
      tech: [
        "React",
        "Vite",
        "Node.js",
        "Express.js",
        "Prisma ORM",
        "Neon PostgreSQL",
        "JavaScript",
        "REST API",
        "Git",
        "GitHub",
      ],
      impact:
        "This project shows my ability to build a complete full-stack application with a modern frontend, backend API, and cloud database.",
      liveDemo: "https://job-application-tracker-gray-iota.vercel.app/",
      github: "",
    },
    {
      title: "GaBayan AI: Legal Guidance Assistant",
      category: "AI Web Application",
      summary:
        "An AI-powered legal guidance assistant that helps users prepare better questions before consulting a legal professional.",
      description:
        "GaBayan AI is an AI-powered assistant focused on helping users understand how to prepare legal questions and documents before consulting a public attorney or licensed legal professional.",
      highlights: [
        "Built a modern responsive chat interface with real-time AI interactions.",
        "Integrated Google Gemini AI with a Node.js and Express.js backend.",
        "Added legal safety guidelines and disclaimer-based response handling.",
        "Created quick prompt actions to help users ask better questions.",
        "Deployed the frontend on Vercel and backend service on Render.",
      ],
      tech: [
        "React",
        "Vite",
        "Node.js",
        "Express.js",
        "JavaScript",
        "CSS",
        "REST API",
        "Google Gemini AI",
        "Vercel",
        "Render",
      ],
      impact:
        "This project demonstrates my ability to integrate AI into useful, user-friendly web applications with responsible guidance and safety messaging.",
      liveDemo: "https://gabayan-ai.vercel.app/",
      github: "",
    },
    {
      title: "BBridge: Barangay Management & Public Service System",
      category: "Government Service Platform",
      summary:
        "A web-based system that helps digitize barangay operations, document requests, scheduling, payments, and reports.",
      description:
        "BBridge is a barangay management and public service platform designed to reduce manual work and improve the way residents request documents, schedule services, and track public service transactions.",
      highlights: [
        "Developed modules for document requests, scheduling, public service requests, reports, and payment tracking.",
        "Implemented role-based access control for secure multi-user access.",
        "Integrated Tesseract OCR to automate receipt validation.",
        "Added geolocation and mapping features using OpenStreetMap API.",
        "Improved workflow visibility through digital records and reporting.",
      ],
      tech: [
        "PHP",
        "JavaScript",
        "MySQL",
        "Tailwind CSS",
        "Tesseract OCR",
        "OpenStreetMap API",
      ],
      impact:
        "This project shows my ability to build practical systems for local government workflows and public service operations.",
      liveDemo: "",
      github: "",
    },
    {
      title: "HydroTech: Smart IoT Water Dispenser",
      category: "IoT + Web Dashboard",
      summary:
        "An IoT-based automated water dispensing system with QR authentication, dispensing logic, and dashboard monitoring.",
      description:
        "HydroTech is an IoT-based smart water dispenser created as a capstone project. It combines hardware control, QR-based authentication, automated dispensing, and a web dashboard for monitoring.",
      highlights: [
        "Led the development team and designed the system's hardware architecture.",
        "Built hardware control logic using Arduino and ESP8266.",
        "Implemented QR authentication and automated dispensing logic.",
        "Integrated the hardware system with a web dashboard.",
        "Performed safety-focused testing and system optimization.",
      ],
      tech: ["PHP", "JavaScript", "MySQL", "Arduino", "ESP8266"],
      impact:
        "This project demonstrates my foundation in IoT, hardware integration, web dashboards, and team-based development.",
      liveDemo: "",
      github: "",
    },
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
      localStorage.setItem("portfolio-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
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
        setSelectedProject(null);
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
    document.body.style.overflow = modalImage || selectedProject ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [modalImage, selectedProject]);

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

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;

    if (touchStartXRef.current - touchEndX > 50) {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }

    if (touchEndX - touchStartXRef.current > 50) {
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
            <h2 className="hero-role">Software Engineer / Full-Stack Developer</h2>

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
                <FaFileAlt style={{ marginRight: "8px" }} />
                View Resume
              </a>

              <a
                className="btn btn-secondary"
                href="mailto:ronaldsoriano2727@gmail.com"
              >
                <FaEnvelope style={{ marginRight: "8px" }} />
                Send Email
              </a>

              <a
                className="btn btn-secondary"
                href="https://calendly.com/ronaldsoriano2727/15-minute-meeting"
                target="_blank"
                rel="noreferrer"
              >
                <FaCalendarAlt style={{ marginRight: "8px" }} />
                Schedule a Call
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
                  I am a full-stack and automation developer focused on building
                  practical software solutions using JavaScript, PHP, Python,
                  React, Node.js, Express.js, and MySQL. I enjoy turning ideas
                  into complete systems, from responsive user interfaces and
                  backend APIs to database-driven platforms and automated
                  workflows.
                </p>

                <p>
                  My experience includes developing web applications, automation
                  workflows, IoT-based projects, and hardware-integrated
                  solutions. I have worked on real-world systems such as an
                  automated photobooth platform, a job application tracker
                  system, a barangay management system, and a smart IoT water
                  dispenser.
                </p>

                <p>
                  I work directly with clients and users to understand their
                  needs, translate requirements into technical features, and
                  improve systems based on actual feedback. I am comfortable
                  working independently, learning new tools quickly, and building
                  solutions that help streamline processes.
                </p>

                <p>
                  I am also experienced in technical support tasks such as remote
                  assistance, basic troubleshooting, system monitoring,
                  documentation, and user guidance using tools like AnyDesk,
                  TeamViewer, and Microsoft Office.
                </p>
              </div>
            </article>

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
                {projects.map((project) => (
                  <div className="project-preview-card" key={project.title}>
                    <div>
                      <span className="project-category">
                        {project.category}
                      </span>

                      <h4>{project.title}</h4>

                      <p>{project.summary}</p>
                    </div>

                    <div className="tech-list compact">
                      {project.tech.slice(0, 5).map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>

                    <div className="project-actions">
                      <button
                        className="project-action-btn primary-action"
                        type="button"
                        onClick={() => setSelectedProject(project)}
                      >
                        <span>View Details</span>
                        <span className="action-arrow">→</span>
                      </button>

                      {project.liveDemo && (
                        <a
                          className="project-action-btn secondary-action"
                          href={project.liveDemo}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span>Live Demo</span>
                          <span className="action-arrow">↗</span>
                        </a>
                      )}

                      {project.github && (
                        <a
                          className="project-action-btn secondary-action"
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span>GitHub</span>
                          <span className="action-arrow">↗</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="card">
              <h3>Technical Skills</h3>

              <div className="skills-group">
                <h4>Programming Languages</h4>
                <div className="chips">
                  <span>PHP</span>
                  <span>JavaScript (ES6+)</span>
                  <span>Python</span>
                  <span>C++</span>
                  <span>SQL</span>
                </div>
              </div>

              <div className="skills-group">
                <h4>Frontend Development</h4>
                <div className="chips">
                  <span>HTML5</span>
                  <span>CSS3</span>
                  <span>React</span>
                  <span>Vite</span>
                  <span>Tailwind CSS</span>
                  <span>Bootstrap</span>
                  <span>Responsive Design</span>
                  <span>UI/UX Implementation</span>
                </div>
              </div>

              <div className="skills-group">
                <h4>Backend Development & APIs</h4>
                <div className="chips">
                  <span>Node.js</span>
                  <span>Express.js</span>
                  <span>REST API Development</span>
                  <span>JSON</span>
                  <span>Webhooks</span>
                  <span>Authentication Logic</span>
                  <span>Server-Side Development</span>
                </div>
              </div>

              <div className="skills-group">
                <h4>Databases & ORM</h4>
                <div className="chips">
                  <span>MySQL</span>
                  <span>PostgreSQL</span>
                  <span>Neon PostgreSQL</span>
                  <span>MongoDB</span>
                  <span>Prisma ORM</span>
                  <span>Database Design</span>
                  <span>CRUD Operations</span>
                </div>
              </div>

              <div className="skills-group">
                <h4>Tools, Platforms & Deployment</h4>
                <div className="chips">
                  <span>Git</span>
                  <span>GitHub</span>
                  <span>VS Code</span>
                  <span>Postman</span>
                  <span>Vercel</span>
                  <span>Render</span>
                  <span>Ngrok</span>
                  <span>Cloudflare Tunnel</span>
                  <span>Hostinger</span>
                  <span>WordPress / Elementor</span>
                </div>
              </div>

              <div className="skills-group">
                <h4>Technical Support & Productivity Tools</h4>
                <div className="chips">
                  <span>Microsoft Office</span>
                  <span>Google Drive</span>
                  <span>AnyDesk</span>
                  <span>TeamViewer</span>
                  <span>Trello</span>
                  <span>Jira</span>
                  <span>Zoho</span>
                  <span>Documentation</span>
                  <span>Remote Support</span>
                </div>
              </div>

              <div className="skills-group">
                <h4>Hardware, IoT & Other Tools</h4>
                <div className="chips">
                  <span>Arduino</span>
                  <span>ESP8266</span>
                  <span>Hardware Integration</span>
                  <span>FFmpeg</span>
                  <span>Tesseract OCR</span>
                  <span>PayMongo</span>
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
                    <h4>Project-Based Full-Stack Developer</h4>
                    <p>Yugobooth: Automated Photobooth System</p>
                  </div>
                  <span>2025–Present</span>
                </div>

                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div>
                    <h4>Full-Stack Developer</h4>
                    <p>MyJobTracker: Job Application Tracker System</p>
                  </div>
                  <span>2026</span>
                </div>

                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div>
                    <h4>Full-Stack Developer</h4>
                    <p>GaBayan AI: Legal Guidance Assistant</p>
                  </div>
                  <span>2026</span>
                </div>

                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div>
                    <h4>Project-Based Full-Stack Developer</h4>
                    <p>BBridge: Barangay Management & Public Service System</p>
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
                <a
                  href="https://github.com/Nald27"
                  target="_blank"
                  rel="noreferrer"
                  className="social-link-item"
                >
                  <FaGithub size={20} />
                  <span className="social-link-text">GitHub</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/ronald-soriano-159b02347"
                  target="_blank"
                  rel="noreferrer"
                  className="social-link-item"
                >
                  <FaLinkedin size={20} />
                  <span className="social-link-text">LinkedIn</span>
                </a>

                <a
                  href="https://www.instagram.com/nald.dev/"
                  target="_blank"
                  rel="noreferrer"
                  className="social-link-item"
                >
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
                  <span>+63 962-386-3712</span>
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

              <div
                className="slider"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <button
                  className="slider-btn left"
                  type="button"
                  onClick={() =>
                    setCurrentSlide((prev) =>
                      prev === 0 ? sliderImages.length - 1 : prev - 1
                    )
                  }
                >
                  ‹
                </button>

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

                <button
                  className="slider-btn right"
                  type="button"
                  onClick={() =>
                    setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
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
          type="button"
          onClick={() => setChatOpen((prev) => !prev)}
        >
          <span className={!chatOpen ? "swing-icon" : ""}>
            <BsChatDots size={20} />
          </span>

          <span className="chat-text">Ask Ronald AI</span>
        </button>
      </div>

      {selectedProject && (
        <div
          className="project-modal active"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedProject.title} project details`}
          onClick={(event) => {
            if (event.target.classList.contains("project-modal")) {
              closeProjectModal();
            }
          }}
        >
          <div className="project-modal-content">
            <button
              className="project-modal-close"
              type="button"
              aria-label="Close project details"
              onClick={closeProjectModal}
            >
              ✕
            </button>

            <span className="project-category">
              {selectedProject.category}
            </span>

            <h3>{selectedProject.title}</h3>

            <p className="project-modal-summary">
              {selectedProject.description}
            </p>

            <div className="project-impact-box">
              <strong>Why this project matters</strong>
              <p>{selectedProject.impact}</p>
            </div>

            {selectedProject.location && (
              <div className="project-location-card">
                <div className="project-location-header">
                  <div>
                    <span className="project-location-label">
                      {selectedProject.location.label}
                    </span>
                    <h4>{selectedProject.location.address}</h4>
                  </div>

                  <a
                    className="project-map-link"
                    href={selectedProject.location.mapOpenUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open Map ↗
                  </a>
                </div>

                <div className="project-map-frame">
                  <iframe
                    title={`${selectedProject.title} map location`}
                    src={selectedProject.location.mapEmbedUrl}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            <h4>Key Highlights</h4>

            <ul className="project-modal-list">
              {selectedProject.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h4>Technologies Used</h4>

            <div className="tech-list">
              {selectedProject.tech.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>

            <div className="project-actions modal-actions">
              {selectedProject.liveDemo && (
                <a
                  className="btn btn-primary"
                  href={selectedProject.liveDemo}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open Live Demo
                </a>
              )}

              {selectedProject.github && (
                <a
                  className="btn btn-secondary"
                  href={selectedProject.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  View GitHub
                </a>
              )}

              <button
                className="btn btn-secondary"
                type="button"
                onClick={closeProjectModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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