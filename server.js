const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname)); // serve index.html from project root

// Telegram Bot Setup
const TELEGRAM_BOT_TOKEN = "8018945170:AAFvbGUapec297x4eplceYa3FPRtlFUe-9E"; 
const CHAT_ID = "6786921237"; // replace with your actual chat id

// Support Contact Route
app.post("/api/wallet/support/contact", async (req, res) => {
  try {
    const { name, whatsapp, email, message } = req.body;

    if (!name || !whatsapp || !email || !message) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Send message to Telegram
    const text = `
📩 New Support Request
👤 Name: ${name}
📱 WhatsApp: ${whatsapp}
✉️ Email: ${email}
💬 Message: ${message}
    `;

    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: text
    });

    res.json({ msg: "Message sent successfully ✅" });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ msg: "Server error ❌" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
