/**
 * Static homepage content.
 *
 * Keeping content separate from React components makes the website
 * easier to update without touching rendering or application logic.
 */

export const certificateImage = {
  src: "/assets/images/certificates/Certificate%20of%20Eligibility%20-%20Civil%20Service.jpg",
  alt: "Ronald Soriano Civil Service Professional Level Certificate",
};

export const galleryImages = [
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

export const aboutParagraphs = [
  "I am a full-stack and automation developer focused on building practical software solutions using JavaScript, PHP, Python, React, Node.js, Express.js, and MySQL. I enjoy turning ideas into complete systems, from responsive user interfaces and backend APIs to database-driven platforms and automated workflows.",

  "My experience includes developing web applications, automation workflows, IoT-based projects, and hardware-integrated solutions. I have worked on real-world systems such as an automated photobooth platform, a job application tracker system, a barangay management system, and a smart IoT water dispenser.",

  "I work directly with clients and users to understand their needs, translate requirements into technical features, and improve systems based on actual feedback. I am comfortable working independently, learning new tools quickly, and building solutions that help streamline processes.",

  "I am also experienced in technical support tasks such as remote assistance, basic troubleshooting, system monitoring, documentation, and user guidance using tools like AnyDesk, TeamViewer, and Microsoft Office.",
];

export const skillGroups = [
  {
    id: "programming-languages",
    title: "Programming Languages",
    skills: ["PHP", "JavaScript (ES6+)", "Python", "C++", "SQL"],
  },
  {
    id: "frontend-development",
    title: "Frontend Development",
    skills: [
      "HTML5",
      "CSS3",
      "React",
      "Vite",
      "Tailwind CSS",
      "Bootstrap",
      "Responsive Design",
      "UI/UX Implementation",
    ],
  },
  {
    id: "backend-development",
    title: "Backend Development & APIs",
    skills: [
      "Node.js",
      "Express.js",
      "REST API Development",
      "JSON",
      "Webhooks",
      "Authentication Logic",
      "Server-Side Development",
    ],
  },
  {
    id: "databases",
    title: "Databases & ORM",
    skills: [
      "MySQL",
      "PostgreSQL",
      "Neon PostgreSQL",
      "MongoDB",
      "Prisma ORM",
      "Database Design",
      "CRUD Operations",
    ],
  },
  {
    id: "tools-and-deployment",
    title: "Tools, Platforms & Deployment",
    skills: [
      "Git",
      "GitHub",
      "VS Code",
      "Postman",
      "Vercel",
      "Render",
      "Ngrok",
      "Cloudflare Tunnel",
      "Hostinger",
      "WordPress / Elementor",
    ],
  },
  {
    id: "technical-support",
    title: "Technical Support & Productivity Tools",
    skills: [
      "Microsoft Office",
      "Google Drive",
      "AnyDesk",
      "TeamViewer",
      "Trello",
      "Jira",
      "Zoho",
      "Documentation",
      "Remote Support",
    ],
  },
  {
    id: "hardware-and-iot",
    title: "Hardware, IoT & Other Tools",
    skills: [
      "Arduino",
      "ESP8266",
      "Hardware Integration",
      "FFmpeg",
      "Tesseract OCR",
      "PayMongo",
    ],
  },
];

export const experienceItems = [
  {
    id: "yugobooth-developer",
    role: "Project-Based Full-Stack Developer",
    organization: "Yugobooth: Automated Photobooth System",
    period: "2025–Present",
    isActive: true,
  },
  {
    id: "myjobtracker-developer",
    role: "Full-Stack Developer",
    organization: "MyJobTracker: Job Application Tracker System",
    period: "2026",
    isActive: false,
  },
  {
    id: "gabayan-developer",
    role: "Full-Stack Developer",
    organization: "GaBayan AI: Legal Guidance Assistant",
    period: "2026",
    isActive: false,
  },
  {
    id: "bbridge-developer",
    role: "Project-Based Full-Stack Developer",
    organization: "BBridge: Barangay Management & Public Service System",
    period: "2025",
    isActive: false,
  },
  {
    id: "deped-intern",
    role: "Information Technology Intern",
    organization: "DepEd — Schools Division Office Pampanga",
    period: "2025",
    isActive: false,
  },
  {
    id: "hydrotech-developer",
    role: "Capstone Project Lead / Developer",
    organization: "HydroTech Smart IoT Water Dispenser",
    period: "2024–2025",
    isActive: false,
  },
  {
    id: "college-education",
    role: "BS Information Technology",
    organization: "Pampanga State University",
    period: "2021–2025",
    isActive: false,
  },
];

export const internshipHighlights = [
  "Managed and organized administrative data using Excel",
  "Assisted in ICT equipment inventory and maintenance",
  "Provided technical support to office staff",
  "Developed Excel import/export automation to improve workflows",
  "Created reports, documentation, and user guides",
];

export const socialLinks = [
  {
    id: "github",
    label: "GitHub",
    url: "https://github.com/Nald27",
    icon: "github",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/ronald-soriano-dev/",
    icon: "linkedin",
  },
  {
    id: "instagram",
    label: "Instagram",
    url: "https://www.instagram.com/nald.dev/",
    icon: "instagram",
  },
];

export const quickQuestions = [
  {
    id: "skills",
    label: "Skills",
    prompt: "What are Ronald's skills?",
  },
  {
    id: "projects",
    label: "Projects",
    prompt: "Tell me about Ronald's projects",
  },
  {
    id: "availability",
    label: "Availability",
    prompt: "Is Ronald available for work?",
  },
];