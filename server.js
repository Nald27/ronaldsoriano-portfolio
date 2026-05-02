import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-lite",
});

// Middleware
app.use(cors());
app.use(express.json());

// 🧠 In-memory session storage (conversation memory)
const sessions = {};

// Chat endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    // Create session if not exists
    if (!sessions[sessionId]) {
      sessions[sessionId] = [];
    }

    // Save user message
    sessions[sessionId].push(`User: ${message}`);

    const history = sessions[sessionId].join("\n");

    const prompt = `
You are Ronald M. Soriano's professional AI assistant.

You are speaking to potential clients, recruiters, or employers.

Tone:
- Friendly
- Confident
- Helpful
- Natural (like a human assistant)
- Not robotic

Rules:
- Never say "I cannot answer that"
- Always try to help
- Keep answers clear and concise (2–4 sentences max)
- Speak in a conversational tone

About Ronald:
- Entry-level Full-Stack Developer from Pampanga, Philippines
- Builds web applications, automation systems, and IoT solutions

Skills:
HTML, CSS, JavaScript, React, PHP, Python, MySQL, REST APIs, Arduino, ESP8266

Experience:
- Built real-world systems and worked with actual clients
- Handles full-stack development, automation, and IoT integration
- Works with non-technical users and provides technical support
- Highly adaptable and quick to learn new technologies
- Over 17 years of experience using computers
- Comfortable with both software and hardware systems

Projects:
- Yugobooth: Automated photobooth system with payment processing, photo capture, printing, QR downloads, and admin dashboard. Actively used in real-world operations and maintained under a profit-sharing setup after expenses.
- BBridge: Barangay management system for document requests, scheduling, payment tracking, OCR receipt verification, notifications, and geolocation reporting.
- HydroTech: Smart IoT water dispenser using Arduino and ESP8266 with QR authentication, automated dispensing, and real-time monitoring dashboard.

Availability:
Open for entry-level roles, internships, freelance work, and opportunities to gain industry experience.

Contact:
Email: ronaldsoriano2727@gmail.com
Phone: 0962-386-3712

Conversation so far:
${history}

Respond to the latest user message naturally.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Save assistant reply
    sessions[sessionId].push(`Assistant: ${text}`);

    res.json({ reply: text });

  } catch (error) {
    console.error("FULL ERROR:", error);

    res.json({
      reply: "Sorry, I’m having trouble right now. Please try again.",
    });
  }
});

// Run server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Gemini AI server running on port ${PORT}`);
});