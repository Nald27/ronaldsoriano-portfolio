import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "../App.css";

export default function ProjectsPage() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setSelectedVideo(null);
      }
    };

    if (selectedVideo) {
      document.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "";
    };
  }, [selectedVideo]);

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
      title: "WeatherWise AI: AI Weather Assistant",
      category: "AI-Powered Web Application",
      year: "2026",
      summary:
        "A vintage-style AI weather assistant that provides real-time forecasts and practical weather advice using AI.",
      description:
        "WeatherWise AI is an AI-powered weather assistant that allows users to search for any city, view current weather conditions, hourly forecasts, and a 7-day outlook. It integrates real-time weather data from Open-Meteo and uses Gemini AI to generate simple, practical recommendations for rain, heat, travel, and outdoor planning.",
      highlights: [
        "Built a responsive weather dashboard with a vintage-inspired user interface.",
        "Integrated Open-Meteo API to fetch real-time weather data, hourly forecasts, and 7-day outlooks.",
        "Added AI-powered weather advice using Gemini AI for user questions such as whether to bring an umbrella or plan outdoor activities.",
        "Created a Node.js and Express.js backend to securely handle AI API requests.",
        "Implemented city search, forecast display, rain probability, temperature, humidity, wind, and weather condition details.",
        "Designed the application with a minimalist vintage aesthetic and fully responsive layouts for mobile, tablet, and desktop.",
      ],
      tech: [
        "React",
        "Vite",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "Open-Meteo API",
        "Gemini AI",
        "REST API",
        "Render",
        "Vercel",
      ],
      liveDemo: "https://weatherwise-ai.vercel.app/",
      github: "https://github.com/Nald27/weatherwise.ai",
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
      title: "Shopify Dashboard UI Replica",
      category: "Frontend UI Recreation / Practice Project",
      year: "2026",
      summary:
        "A frontend practice project where I recreated a Shopify-style analytics dashboard to improve my skills in UI design replication, layout accuracy, component styling, and interactive dashboard development.",
      description:
        "The Shopify Dashboard UI Replica was created as a personal frontend practice project to improve my ability to recreate real-world dashboard interfaces. The project focuses on practicing frontend development fundamentals such as spacing, layout structure, typography, visual hierarchy, responsive design, and component-based UI development. It includes dashboard elements such as sidebar navigation, metric cards, promotional sections, interactive charts, date controls, and dynamic metric updates. This project helped me strengthen my React and Tailwind CSS skills while practicing how to build polished and modern dashboard interfaces.",
      highlights: [
        "Recreated a Shopify-style analytics dashboard UI as a frontend practice project.",
        "Focused on improving layout accuracy, spacing consistency, typography, and visual hierarchy.",
        "Built reusable dashboard components using React, Vite, and Tailwind CSS.",
        "Implemented sidebar navigation, metric cards, promotional cards, and dashboard controls.",
        "Added interactive metric switching for sessions, sales, orders, and conversion rate.",
        "Created a functional date range picker with preset filters and custom date selection.",
        "Practiced building a modern, responsive, and component-based dashboard interface.",
      ],
      tech: [
        "React",
        "Vite",
        "Tailwind CSS",
        "JavaScript",
        "Framer Motion",
        "Lucide React",
        "React Datepicker",
        "Recharts",
      ],
      liveDemo: "https://shopify-dashboard-replica.netlify.app/",
      github: "https://github.com/Nald27/shopify-dashboard-replica",
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
    {
      title: "Smart Parking Management System",
      category: "School Project / Arduino-Based Hardware Prototype",
      year: "2024",
      summary:
        "A school-based Arduino smart parking prototype that detects available parking slots, controls gate access, and displays real-time slot availability.",
      description:
        "Smart Parking Management System is an academic hardware prototype developed as a school project to demonstrate automated parking slot monitoring and gate control. The system uses infrared object sensors to detect whether each parking slot is occupied, an ultrasonic sensor to detect incoming vehicles at the entrance, a servo motor to control the gate, and a 16x2 LCD to display the number of available slots. If all parking slots are full and a new vehicle is detected at the gate, the buzzer alarm activates and the gate remains closed.",
      highlights: [
        "Developed a school-based Arduino smart parking prototype with automated slot detection and gate control.",
        "Used infrared object sensors to detect whether parking slots are occupied or available.",
        "Integrated an ultrasonic sensor to detect incoming vehicles at the entrance gate.",
        "Programmed the servo motor to open the gate only when there is an available parking slot.",
        "Prevented gate access when all parking slots are full.",
        "Displayed the real-time number of available parking slots using a 16x2 LCD.",
        "Added a piezo buzzer or active alarm module to alert when the parking area is full and a new vehicle is detected.",
        "Designed and assembled a physical school project prototype with sensors, toy cars, barriers, and a working gate mechanism.",
      ],
      tech: [
        "Arduino",
        "Infrared Object Sensor",
        "Ultrasonic Sensor",
        "16x2 LCD",
        "Servo Motor",
        "Piezo Buzzer",
        "Active Alarm Buzzer Module",
        "Embedded Systems",
        "Hardware Prototyping",
      ],
      video: "/assets/videos/parking-management-demo.mp4",
      liveDemo: "",
      github: "",
    },
    {
      title: "POS: Inventory Management System",
      category: "Web-Based Business Management System",
      year: "2023",
      summary:
        "A web-based inventory management system developed as part of a collaborative Point-of-Sale (POS) ecosystem project involving multiple business modules.",
      description:
        "The Inventory Management System was developed as a college project within a team of five developers, each responsible for different POS modules such as Inventory, Sales, Finance, and Purchase Orders. My role focused on building the Inventory module, which managed stock tracking, inventory updates, and item monitoring. The project also included efforts to integrate the individual modules into a unified POS platform.",
      highlights: [
        "Developed the Inventory Management module using PHP, JavaScript, and MySQL.",
        "Designed inventory tracking workflows and database structures for stock management.",
        "Collaborated with a team of five developers working on interconnected POS modules.",
        "Participated in integration efforts between the Inventory and Purchase Order (PO) systems.",
        "Applied software development and database management principles in a team-based project environment.",
      ],
      tech: ["PHP", "JavaScript", "MySQL"],
      liveDemo: "",
      github: "https://github.com/Nald27/inventory-management-system",
    },
    {
      title: "Apartment Management System",
      category: "Web-Based Property Management System",
      year: "2023",
      summary:
        "A web-based apartment management system developed as a 3rd-year college project to practice building database-driven web applications for property and tenant management.",
      description:
        "The Apartment Management System was developed as a school project during my 3rd year in college. The project was designed to help manage basic apartment rental operations such as tenant records, apartment units, payments, transactions, and account activity. It includes admin and tenant interfaces, allowing admins to monitor unit availability, view tenant information, manage payments, and review transaction history, while tenants can register, log in, view unit details, and update their profile. This project helped me strengthen my foundation in PHP, MySQL, CRUD operations, authentication, role-based workflows, and database-driven web development.",
      highlights: [
        "Developed a school-based apartment management system using PHP, MySQL, HTML, CSS, and JavaScript.",
        "Built admin features for managing tenants, apartment units, payment records, and transaction history.",
        "Created tenant-side features for registration, login, profile updates, and viewing unit-related information.",
        "Implemented basic authentication and role-based navigation for admin and tenant users.",
        "Designed database-driven workflows for unit availability, tenant records, and payment tracking.",
        "Added an audit trail feature to track system activities such as logins, profile updates, and rental actions.",
        "Applied foundational web development, database management, and CRUD operation concepts in a real-world-style school project.",
      ],
      tech: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
      liveDemo: "",
      github: "https://github.com/Nald27/apartment-management-system",
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
                  {project.video && (
                    <button
                      type="button"
                      className="project-video-button"
                      onClick={() => setSelectedVideo(project.video)}
                    >
                      Watch Demo Video ▶
                    </button>
                  )}

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

      {selectedVideo && (
        <div
          className="video-modal-overlay"
          onClick={() => setSelectedVideo(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Project demo video"
        >
          <div className="video-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="video-modal-close"
              onClick={() => setSelectedVideo(null)}
              aria-label="Close video"
            >
              ×
            </button>

            <video controls autoPlay playsInline>
              <source src={selectedVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
}

