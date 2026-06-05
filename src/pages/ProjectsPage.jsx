import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "../App.css";

export default function ProjectsPage() {
  const projects = [
    {
      title: "Yugobooth: Automated Photobooth System",
      category: "Full-Stack + Hardware Automation",
      year: "2025 – Present",
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
        "WebSockets",
        "FFmpeg",
        "XAMPP",
        "Ngrok",
      ],
      location: {
        address: "4HGW+XQ Angeles, Pampanga",
        mapOpenUrl:
          "https://www.google.com/maps/search/?api=1&query=4HGW%2BXQ%20Angeles%2C%20Pampanga",
      },
      liveDemo: "",
      github: "",
    },
    {
      title: "MyJobTracker: Job Application Tracker System",
      category: "Full-Stack Web Application",
      year: "2026",
      summary:
        "A full-stack job application tracker that helps users organize applications, monitor progress, and manage statuses.",
      description:
        "MyJobTracker helps job seekers manage job applications, statuses, job details, notes, and progress in one clean dashboard.",
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
        "REST API",
      ],
      liveDemo: "https://job-application-tracker-gray-iota.vercel.app/",
      github: "",
    },
    {
      title: "GaBayan AI: Legal Guidance Assistant",
      category: "AI Web Application",
      year: "2026",
      summary:
        "An AI-powered legal guidance assistant that helps users prepare better questions before consulting a legal professional.",
      description:
        "GaBayan AI provides a responsive chat interface with AI-powered guidance, legal safety disclaimers, and quick prompts for public attorney preparation.",
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
        "Google Gemini AI",
        "Vercel",
        "Render",
      ],
      liveDemo: "https://gabayan-ai.vercel.app/",
      github: "",
    },
    {
      title: "BBridge: Barangay Management & Public Service System",
      category: "Government Service Platform",
      year: "2025",
      summary:
        "A web-based system that helps digitize barangay operations, document requests, scheduling, payments, and reports.",
      description:
        "BBridge helps manage barangay services such as document requests, scheduling, public service tracking, notifications, receipt verification, and geolocation features.",
      highlights: [
        "Developed modules for document requests, scheduling, public service requests, reports, and payment tracking.",
        "Implemented role-based access control for secure multi-user access.",
        "Integrated Tesseract OCR to automate receipt validation.",
        "Added geolocation and mapping features using OpenStreetMap API.",
      ],
      tech: [
        "PHP",
        "JavaScript",
        "MySQL",
        "Tailwind CSS",
        "Tesseract OCR",
        "OpenStreetMap API",
      ],
      liveDemo: "",
      github: "",
    },
    {
      title: "HydroTech: Smart IoT Water Dispenser",
      category: "IoT + Web Dashboard",
      year: "2024 – 2025",
      summary:
        "An IoT-based automated water dispensing system with QR authentication, dispensing logic, and dashboard monitoring.",
      description:
        "HydroTech is a smart water dispenser capstone project that combines hardware control, QR authentication, automated dispensing, and web dashboard monitoring.",
      highlights: [
        "Led the development team and designed the system's hardware architecture.",
        "Built hardware control logic using Arduino and ESP8266.",
        "Implemented QR authentication and automated dispensing logic.",
        "Integrated the hardware system with a web dashboard.",
        "Performed safety-focused testing and system optimization.",
      ],
      tech: ["PHP", "JavaScript", "MySQL", "Arduino", "ESP8266"],
      liveDemo: "",
      github: "",
    },
  ];

  return (
    <div className="projects-page">
      <div className="container">
        <header className="projects-page-header">
          <Link to="/" className="back-link" aria-label="Go back to homepage">
            <FaArrowLeft />
            <span>Back</span>
          </Link>

          <div className="projects-page-title">
            <span>Portfolio</span>
            <h1>All Projects</h1>
            <p>
              A collection of full-stack, automation, AI, database, and IoT
              projects built for real-world workflows and practical problem
              solving.
            </p>
          </div>
        </header>

        <main className="all-projects-grid">
          {projects.map((project, index) => (
            <article className="all-project-card" key={project.title}>
              <div className="project-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="all-project-content">
                <div className="all-project-meta">
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </div>

                <h2>{project.title}</h2>

                <p className="all-project-summary">{project.summary}</p>

                <p className="all-project-description">
                  {project.description}
                </p>

                <div className="all-project-highlights">
                  <h3>Key Highlights</h3>

                  <ul>
                    {project.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>

                {project.location && (
                  <div className="all-project-location">
                    <strong>Location:</strong>
                    <a
                      href={project.location.mapOpenUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {project.location.address} ↗
                    </a>
                  </div>
                )}

                <div className="tech-list all-project-tech">
                  {project.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>

                <div className="all-project-actions">
                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Live Demo ↗
                    </a>
                  )}

                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer">
                      GitHub ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </main>
      </div>
    </div>
  );
}