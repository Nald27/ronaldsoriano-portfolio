import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [modalImage, setModalImage] = useState("");

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme === "dark") {
      setIsDark(true);
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
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setModalImage("");
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

  const openImageModal = (imageSrc) => {
    setModalImage(imageSrc);
  };

  const closeImageModal = () => {
    setModalImage("");
  };

  return (
    <>
      <button
        className="theme-toggle"
        aria-label="Toggle theme"
        title="Toggle theme"
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
            <div className="hero-topline">
              <div className="hero-heading">
                <h1>
                  Ronald M. Soriano
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
            </div>

            <p className="hero-location">Guagua, Pampanga, Philippines</p>
            <h2 className="hero-role">Full-Stack Developer</h2>
            <p className="hero-tagline">
              Building practical web, automation, and IoT systems for real-world
              workflows.
            </p>

            <div className="hero-actions">
              <a
                className="btn btn-primary"
                href="/assets/files/SORIANO_RONALD_RESUME.pdf"
                target="_blank"
                rel="noreferrer"
              >
                View Resume
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
                  I am a full-stack developer focused on building systems that
                  solve real operational problems. I specialize in building
                  software from scratch—turning ideas into complete, functional
                  systems through a combination of web development, backend
                  engineering, and hardware integration.
                </p>

                <p>
                  I have experience developing full-stack platforms, automation
                  systems, and IoT-based applications, including
                  payment-integrated systems, management platforms, and
                  real-time monitoring tools.
                </p>

                <p>
                  I work directly with non-technical clients to understand their
                  requirements, translate their ideas into technical features,
                  and design system workflows based on their goals. I ensure
                  alignment by proposing solutions, getting approval, and
                  continuously improving the system based on feedback.
                </p>

                <p>
                  I also provide ongoing updates, add new features when needed,
                  and offer technical support to ensure systems run reliably
                  after deployment. I am currently open to junior roles,
                  internships, freelance projects, and entry-level opportunities.
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
                      <h4>Automated Photobooth System (Yugobooth)</h4>
                      <button
                        className="project-link project-link-button"
                        type="button"
                        onClick={() =>
                          openImageModal("/assets/images/yugobooth.jpg")
                        }
                      >
                        View Photo &gt;
                      </button>
                    </div>

                    <p>
                      A fully automated photobooth system integrating hardware,
                      software, and payment systems to deliver a complete user
                      experience.
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
                      improving efficiency in records, services, and reporting.
                    </p>
                    <ul>
                      <li>
                        Built documents, scheduling, reporting, and payment
                        modules
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
                    <h4>Hydrotech Smart IoT Water Dispenser</h4>
                    <p>
                      An IoT-based water dispensing system with real-time
                      monitoring and control.
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
                  <span>Tailwind CSS</span>
                  <span>Bootstrap</span>
                  <span>WordPress</span>
                </div>
              </div>

              <div className="skills-group">
                <h4>Backend &amp; Database</h4>
                <div className="chips">
                  <span>PHP</span>
                  <span>Python</span>
                  <span>C++</span>
                  <span>MySQL</span>
                  <span>REST API Development</span>
                </div>
              </div>

              <div className="skills-group">
                <h4>IoT &amp; Hardware</h4>
                <div className="chips">
                  <span>Arduino</span>
                  <span>ESP8266</span>
                  <span>IoT Sensors</span>
                  <span>QR Systems</span>
                </div>
              </div>

              <div className="skills-group">
                <h4>Tools &amp; Technologies</h4>
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
                    <p>Automated Photobooth System (Yugobooth)</p>
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
                    <p>Department of Education – SDO Pampanga</p>
                  </div>
                  <span>2025</span>
                </div>

                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div>
                    <h4>Capstone Project Lead / Developer</h4>
                    <p>Hydrotech Smart IoT Water Dispenser</p>
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
                <li>Helped with reports, documentation, and troubleshooting</li>
              </ul>
            </article>

            <article className="card">
              <h3>Certification</h3>

              <div className="mini-box certification-box">
                <span className="cert-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm8 1.5V8h4.5L14 3.5zM8 12h8v1.5H8V12zm0 3h8v1.5H8V15z" />
                    <path d="M10 18l2-1.2 2 1.2v-3h-4v3z" />
                  </svg>
                </span>

                <div className="cert-content">
                  <strong>Civil Service Exam Passer</strong>
                  <span>August 2025</span>
                </div>
              </div>
            </article>

            <article className="card">
              <h3>Social Links</h3>

              <div className="social-links-list">
                <a
                  className="social-link-item"
                  href="https://www.linkedin.com/in/ronald-soriano-159b02347"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <span className="social-link-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M4.98 3.5A2.48 2.48 0 1 0 5 8.46 2.48 2.48 0 0 0 4.98 3.5zM3 9h4v12H3zM9 9h3.83v1.64h.05c.53-1.01 1.84-2.08 3.79-2.08 4.05 0 4.8 2.66 4.8 6.11V21h-4v-5.43c0-1.3-.02-2.98-1.82-2.98-1.83 0-2.11 1.42-2.11 2.88V21H9z" />
                    </svg>
                  </span>
                  <span className="social-link-text">LinkedIn</span>
                </a>

                <a
                  className="social-link-item"
                  href="https://github.com/Nald27"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  title="GitHub"
                >
                  <span className="social-link-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.11.79-.25.79-.56v-2.18c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.24 3.32.95.1-.74.4-1.24.72-1.52-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.18-1.49 3.14-1.18 3.14-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.03.77 2.08v3.08c0 .31.21.68.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
                    </svg>
                  </span>
                  <span className="social-link-text">GitHub</span>
                </a>

                <a
                  className="social-link-item"
                  href="https://www.instagram.com/nald.dev/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <span className="social-link-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2.2A2.8 2.8 0 0 0 4.2 7v10A2.8 2.8 0 0 0 7 19.8h10a2.8 2.8 0 0 0 2.8-2.8V7A2.8 2.8 0 0 0 17 4.2zm10.5 1.4a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2.2A2.8 2.8 0 1 0 12 14.8 2.8 2.8 0 0 0 12 9.2z" />
                    </svg>
                  </span>
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
                  <span className="contact-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M2 5.5A2.5 2.5 0 0 1 4.5 3h15A2.5 2.5 0 0 1 22 5.5v13A2.5 2.5 0 0 1 19.5 21h-15A2.5 2.5 0 0 1 2 18.5v-13zm2.4-.5L12 11l7.6-6H4.4zM4 18.5h16v-10l-8 6-8-6v10z" />
                    </svg>
                  </span>
                  <span>ronaldsoriano2727@gmail.com</span>
                </a>

                <a href="tel:+639623863712" className="contact-item">
                  <span className="contact-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.36 2.3.55 3.6.55a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.85 21 3 13.15 3 4a1 1 0 0 1 1-1h3.3a1 1 0 0 1 1 1c0 1.3.2 2.5.55 3.6a1 1 0 0 1-.25 1l-2 2.2z" />
                    </svg>
                  </span>
                  <span>0962-386-3712</span>
                </a>
              </div>
              <p className="contact-note">
                Available for entry-level roles, junior developer roles, and
                freelance opportunities.
              </p>
            </article>
          </aside>
        </main>

        <footer className="container footer">
          <p>© 2026 Ronald M. Soriano. All rights reserved.</p>
        </footer>
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
            <img src={modalImage} alt="Expanded project image" />
          </div>
        </div>
      )}
    </>
  );
}