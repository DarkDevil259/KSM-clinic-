require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const nodemailer = require("nodemailer");
const { z } = require("zod");

const app = express();

const PORT = Number(process.env.PORT || 5000);
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

app.use(helmet());
app.use(
  cors({
    origin: [CLIENT_ORIGIN],
    methods: ["GET", "POST", "OPTIONS"],
  })
);
app.use(express.json({ limit: "100kb" }));

app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    limit: 30,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

function requiredEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

function makeTransport() {
  const host = process.env.SMTP_HOST;
  if (!host) {
    throw new Error(
      "Missing SMTP_HOST. Configure SMTP_* env vars (see .env.example)."
    );
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || "false") === "true",
    auth: {
      user: requiredEnv("SMTP_USER"),
      pass: requiredEnv("SMTP_PASS"),
    },
  });
}

function buildWhatsAppUrl({ ownerWhatsApp, message }) {
  const digitsOnly = String(ownerWhatsApp || "").replace(/[^\d]/g, "");
  if (!digitsOnly) return null;
  return `https://wa.me/${digitsOnly}?text=${encodeURIComponent(message)}`;
}

const appointmentSchema = z.object({
  fullName: z.string().min(2).max(80),
  phone: z.string().min(7).max(25),
  email: z.string().email().optional().or(z.literal("")),
  service: z.string().min(2).max(80),
  preferredDate: z.string().min(4).max(20),
  preferredTime: z.string().min(1).max(20),
  message: z.string().max(800).optional().or(z.literal("")),
});

const contactSchema = z.object({
  fullName: z.string().min(2).max(80),
  email: z.string().email(),
  phone: z.string().min(7).max(25).optional().or(z.literal("")),
  message: z.string().min(5).max(1500),
});

app.post("/api/appointment", async (req, res) => {
  const parsed = appointmentSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      ok: false,
      error: "Invalid form data.",
      details: parsed.error.flatten(),
    });
  }

  const ownerEmail = requiredEnv("OWNER_EMAIL");
  const ownerWhatsApp = process.env.OWNER_WHATSAPP || "";

  const data = parsed.data;
  const subject = `New Appointment Booking — ${data.fullName} (${data.service})`;
  const text = [
    "New appointment booking request:",
    "",
    `Name: ${data.fullName}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email || "-"}`,
    `Service: ${data.service}`,
    `Preferred Date: ${data.preferredDate}`,
    `Preferred Time: ${data.preferredTime}`,
    `Message: ${data.message || "-"}`,
    "",
    `Submitted: ${new Date().toISOString()}`,
  ].join("\n");

  try {
    const transporter = makeTransport();
    await transporter.sendMail({
      from: process.env.FROM_EMAIL || process.env.SMTP_USER,
      to: ownerEmail,
      replyTo: data.email || undefined,
      subject,
      text,
    });

    const whatsappUrl = buildWhatsAppUrl({
      ownerWhatsApp,
      message: text,
    });

    return res.json({ ok: true, whatsappUrl });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: "Could not send booking. Please try again in a moment.",
    });
  }
});

app.post("/api/contact", async (req, res) => {
  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      ok: false,
      error: "Invalid form data.",
      details: parsed.error.flatten(),
    });
  }

  const ownerEmail = requiredEnv("OWNER_EMAIL");
  const data = parsed.data;

  const subject = `New Contact Message — ${data.fullName}`;
  const text = [
    "New contact message:",
    "",
    `Name: ${data.fullName}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "-"}`,
    "",
    "Message:",
    data.message,
    "",
    `Submitted: ${new Date().toISOString()}`,
  ].join("\n");

  try {
    const transporter = makeTransport();
    await transporter.sendMail({
      from: process.env.FROM_EMAIL || process.env.SMTP_USER,
      to: ownerEmail,
      replyTo: data.email,
      subject,
      text,
    });

    return res.json({ ok: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: "Could not send message. Please try again in a moment.",
    });
  }
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${PORT}`);
});


