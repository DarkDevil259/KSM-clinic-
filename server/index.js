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

// Test endpoint to check SMTP configuration
app.get("/api/test-email", async (_req, res) => {
  try {
    const transporter = makeTransport();
    const ownerEmail = requiredEnv("OWNER_EMAIL");
    const fromEmail = (process.env.FROM_EMAIL || process.env.SMTP_USER || "").replace(/^["']|["']$/g, "");
    
    await transporter.verify();
    
    await transporter.sendMail({
      from: fromEmail,
      to: ownerEmail,
      subject: "Test Email from KSM Dental Care",
      text: "This is a test email to verify SMTP configuration.",
      html: "<p>This is a test email to verify SMTP configuration.</p>",
    });
    
    return res.json({ ok: true, message: "Test email sent successfully!" });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Email test error:", err);
    return res.status(500).json({
      ok: false,
      error: err.message,
      code: err.code,
    });
  }
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

function escapeHtml(text) {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const appointmentSchema = z.object({
  fullName: z.string().min(2).max(80),
  phone: z.string().min(7).max(25),
  email: z.string().email(),
  service: z.string().min(2).max(80),
  preferredDate: z.string().min(4).max(20),
  preferredTime: z.string().max(20).optional().or(z.literal("")),
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

  const data = parsed.data;
  
  // Format date for display with error handling
  let formattedDate;
  try {
    const dateObj = new Date(data.preferredDate);
    if (isNaN(dateObj.getTime())) {
      // Invalid date, use the raw string
      formattedDate = data.preferredDate;
    } else {
      formattedDate = dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  } catch (err) {
    // Fallback to raw date string if formatting fails
    formattedDate = data.preferredDate;
  }

  // Admin notification message
  const adminSubject = `New Appointment Booking — ${data.fullName} (${data.service})`;
  const adminText = [
    "🦷 *New Appointment Booking Request*",
    "",
    `👤 *Name:* ${data.fullName}`,
    `📞 *Phone:* ${data.phone}`,
    `📧 *Email:* ${data.email}`,
    `🦷 *Service:* ${data.service}`,
    `📅 *Preferred Date:* ${formattedDate}`,
    `⏰ *Preferred Time:* ${data.preferredTime || "Not specified"}`,
    data.message ? `💬 *Message:* ${data.message}` : "",
    "",
    `📝 *Submitted:* ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}`,
  ].filter(Boolean).join("\n");

  const clinicName = process.env.CLINIC_NAME || "KSM Dental Care";
  const clinicPhone = process.env.CLINIC_PHONE || "+91 99999 99999";

  // User acknowledgement message
  const userSubject = `Appointment Confirmation — ${clinicName}`;
  const userText = [
    `Dear ${data.fullName},`,
    "",
    "Thank you for booking an appointment with us!",
    "",
    "📋 *Your Appointment Details:*",
    `🦷 *Service:* ${data.service}`,
    `📅 *Date:* ${formattedDate}`,
    `⏰ *Time:* ${data.preferredTime || "Not specified"}`,
    "",
    "We have received your booking request and will confirm your appointment shortly. Our team will contact you at your provided phone number or email to finalize the details.",
    "",
    "If you have any questions or need to reschedule, please don't hesitate to contact us.",
    "",
    "Looking forward to seeing you!",
    "",
    `Best regards,`,
    `${clinicName} Team`,
    "",
    `📞 Phone: ${clinicPhone}`,
    `📧 Email: ${ownerEmail}`,
  ].join("\n");

  // HTML versions for better email formatting
  const adminHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1e3a8a;">🦷 New Appointment Booking Request</h2>
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>👤 Name:</strong> ${escapeHtml(data.fullName)}</p>
        <p><strong>📞 Phone:</strong> <a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></p>
        <p><strong>📧 Email:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
        <p><strong>🦷 Service:</strong> ${escapeHtml(data.service)}</p>
        <p><strong>📅 Preferred Date:</strong> ${escapeHtml(formattedDate)}</p>
        <p><strong>⏰ Preferred Time:</strong> ${data.preferredTime ? escapeHtml(data.preferredTime) : "Not specified"}</p>
        ${data.message ? `<p><strong>💬 Message:</strong> ${escapeHtml(data.message)}</p>` : ""}
      </div>
      <p style="color: #64748b; font-size: 12px;">Submitted: ${escapeHtml(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }))}</p>
    </div>
  `;

  const userHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1e3a8a;">Thank You for Your Appointment Booking!</h2>
      <p>Dear ${escapeHtml(data.fullName)},</p>
      <p>Thank you for booking an appointment with us!</p>
      <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
        <h3 style="margin-top: 0;">📋 Your Appointment Details:</h3>
        <p><strong>🦷 Service:</strong> ${escapeHtml(data.service)}</p>
        <p><strong>📅 Date:</strong> ${escapeHtml(formattedDate)}</p>
        <p><strong>⏰ Time:</strong> ${data.preferredTime ? escapeHtml(data.preferredTime) : "Not specified"}</p>
      </div>
      <p>We have received your booking request and will confirm your appointment shortly. Our team will contact you at your provided phone number or email to finalize the details.</p>
      <p>If you have any questions or need to reschedule, please don't hesitate to contact us.</p>
      <p>Looking forward to seeing you!</p>
      <p>Best regards,<br><strong>${escapeHtml(clinicName)} Team</strong></p>
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px;">
        <p>📞 Phone: ${escapeHtml(clinicPhone)}</p>
        <p>📧 Email: ${escapeHtml(ownerEmail)}</p>
      </div>
    </div>
  `;

  try {
    // Clean FROM_EMAIL (remove quotes if present)
    const fromEmail = (process.env.FROM_EMAIL || process.env.SMTP_USER || "").replace(/^["']|["']$/g, "");
    
    let adminEmailSent = false;
    let userEmailSent = false;
    let emailError = null;

    try {
      const transporter = makeTransport();
      
      // Verify SMTP connection first
      await transporter.verify();
      
      // Send email to admin
      try {
        await transporter.sendMail({
          from: fromEmail,
          to: ownerEmail,
          replyTo: data.email || undefined,
          subject: adminSubject,
          text: adminText,
          html: adminHtml,
        });
        adminEmailSent = true;
      } catch (emailErr) {
        // eslint-disable-next-line no-console
        console.error("Failed to send admin email:", emailErr);
        emailError = emailErr.message;
      }

      // Send acknowledgement email to user
      try {
        await transporter.sendMail({
          from: fromEmail,
          to: data.email,
          subject: userSubject,
          text: userText,
          html: userHtml,
        });
        userEmailSent = true;
      } catch (emailErr) {
        // eslint-disable-next-line no-console
        console.error("Failed to send user email:", emailErr);
        // Don't fail the whole request if user email fails
      }
    } catch (transportErr) {
      // eslint-disable-next-line no-console
      console.error("SMTP transport error:", transportErr);
      emailError = transportErr.message;
    }

    // Return success with email status
    return res.json({
      ok: true,
      emailSent: adminEmailSent || userEmailSent,
      adminEmailSent,
      userEmailSent,
      emailError: emailError || undefined,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Appointment booking error:", err);
    // eslint-disable-next-line no-console
    console.error("Error details:", {
      message: err.message,
      stack: err.stack,
      code: err.code,
      responseCode: err.responseCode,
      command: err.command,
    });
    
    // Provide more helpful error messages
    let errorMessage = "Could not send booking. Please try again in a moment.";
    if (err.code === "EAUTH") {
      errorMessage = "Email authentication failed. Please check your SMTP credentials.";
    } else if (err.code === "ECONNECTION") {
      errorMessage = "Could not connect to email server. Please check your SMTP settings.";
    } else if (err.message) {
      errorMessage = err.message;
    }
    
    return res.status(500).json({
      ok: false,
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? {
        message: err.message,
        code: err.code,
      } : undefined,
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
    "💬 *New Contact Message*",
    "",
    `👤 *Name:* ${data.fullName}`,
    `📧 *Email:* ${data.email}`,
    `📞 *Phone:* ${data.phone || "Not provided"}`,
    "",
    "💬 *Message:*",
    data.message,
    "",
    `📝 *Submitted:* ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}`,
  ].join("\n");

  // HTML version for better email formatting
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1e3a8a;">💬 New Contact Message</h2>
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>👤 Name:</strong> ${escapeHtml(data.fullName)}</p>
        <p><strong>📧 Email:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
        <p><strong>📞 Phone:</strong> ${data.phone ? `<a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a>` : "Not provided"}</p>
      </div>
      <div style="background: #ffffff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
        <h3 style="margin-top: 0; color: #1e3a8a;">💬 Message:</h3>
        <p style="white-space: pre-wrap; line-height: 1.6;">${escapeHtml(data.message)}</p>
      </div>
      <p style="color: #64748b; font-size: 12px;">Submitted: ${escapeHtml(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }))}</p>
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
        <p style="color: #64748b; font-size: 12px;">
          You can reply directly to this email to respond to ${escapeHtml(data.fullName)}.
        </p>
      </div>
    </div>
  `;

  try {
    // Clean FROM_EMAIL (remove quotes if present)
    const fromEmail = (process.env.FROM_EMAIL || process.env.SMTP_USER || "").replace(/^["']|["']$/g, "");
    
    const transporter = makeTransport();
    
    // Verify SMTP connection first
    await transporter.verify();
    
    await transporter.sendMail({
      from: fromEmail,
      to: ownerEmail,
      replyTo: data.email,
      subject,
      text,
      html,
    });

    return res.json({ ok: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Contact form error:", err);
    // eslint-disable-next-line no-console
    console.error("Error details:", {
      message: err.message,
      stack: err.stack,
      code: err.code,
      responseCode: err.responseCode,
      command: err.command,
    });
    
    // Provide more helpful error messages
    let errorMessage = "Could not send message. Please try again in a moment.";
    if (err.code === "EAUTH") {
      errorMessage = "Email authentication failed. Please check your SMTP credentials.";
    } else if (err.code === "ECONNECTION") {
      errorMessage = "Could not connect to email server. Please check your SMTP settings.";
    } else if (err.message) {
      errorMessage = err.message;
    }
    
    return res.status(500).json({
      ok: false,
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? {
        message: err.message,
        code: err.code,
      } : undefined,
    });
  }
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${PORT}`);
});



