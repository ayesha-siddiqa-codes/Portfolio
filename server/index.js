import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.set("trust proxy", 1); // needed on Render so each visitor gets their own rate limit
app.use(express.json({ limit: "10kb" }));
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "*" }));

// Optional: save messages in MongoDB when MONGODB_URI is set
let Message = null;
if (process.env.MONGODB_URI) {
  await mongoose.connect(process.env.MONGODB_URI);
  Message = mongoose.model(
    "Message",
    new mongoose.Schema({ name: String, email: String, message: String }, { timestamps: true })
  );
  console.log("MongoDB connected");
}

// Allow 5 messages per IP every 15 minutes
const hits = new Map();
function rateLimit(req, res, next) {
  const now = Date.now();
  const recent = (hits.get(req.ip) || []).filter((t) => now - t < 15 * 60 * 1000);
  if (recent.length >= 5) {
    return res.status(429).json({ error: "Too many messages. Please try again later." });
  }
  hits.set(req.ip, [...recent, now]);
  next();
}

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.post("/api/contact", rateLimit, async (req, res) => {
  const { name = "", email = "", message = "", website = "" } = req.body || {};

  if (website) return res.json({ ok: true }); // honeypot: bots filled the hidden field

  if (!name.trim() || !message.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: "Please enter a valid name, email and message." });
  }
  if (name.length > 80 || message.length > 2000) {
    return res.status(400).json({ error: "Your message is too long." });
  }

  try {
    if (Message) await Message.create({ name, email, message });

    // Email via Resend's HTTPS API (works on Render's free tier, unlike SMTP)
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Portfolio <onboarding@resend.dev>",
        to: [process.env.NOTIFY_TO],
        reply_to: email,
        subject: `New portfolio message from ${name}`,
        html: `<p><b>Name:</b> ${esc(name)}</p>
               <p><b>Email:</b> ${esc(email)}</p>
               <p>${esc(message).replace(/\n/g, "<br>")}</p>`
      })
    });
    if (!r.ok) throw new Error(`Resend error ${r.status}: ${await r.text()}`);

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not send the message right now. Please email me directly." });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("API running on port " + port));