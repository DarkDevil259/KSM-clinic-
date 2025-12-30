const nodemailer = require("nodemailer");

// Helper function to escape HTML
function escapeHtml(text) {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Helper function to add timeout to promises
function withTimeout(promise, timeoutMs = 30000) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`Operation timed out after ${timeoutMs}ms`)), timeoutMs)
    ),
  ]);
}

function makeTransport() {
  const host = process.env.SMTP_HOST;
  if (!host) {
    throw new Error("Missing SMTP_HOST. Configure SMTP_* env vars.");
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || "false") === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

module.exports = async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const { fullName, email, phone, message } = req.body;

    // Basic validation
    if (!fullName || fullName.length < 2 || fullName.length > 80) {
      return res.status(400).json({ ok: false, error: "Invalid full name." });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ ok: false, error: "Invalid email address." });
    }
    if (!phone || phone.length < 7 || phone.length > 25) {
      return res.status(400).json({ ok: false, error: "Invalid phone number." });
    }
    if (!message || message.length < 5 || message.length > 1500) {
      return res.status(400).json({ ok: false, error: "Invalid message." });
    }

    const ownerEmail = process.env.OWNER_EMAIL;
    if (!ownerEmail) {
      return res.status(500).json({ ok: false, error: "Server configuration error." });
    }

    const subject = `New Contact Message — ${fullName}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e3a8a;">💬 New Contact Message</h2>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>👤 Name:</strong> ${escapeHtml(fullName)}</p>
          <p><strong>📧 Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
          <p><strong>📞 Phone:</strong> <a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></p>
        </div>
        <div style="background: #ffffff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
          <h3 style="margin-top: 0; color: #1e3a8a;">💬 Message:</h3>
          <p style="white-space: pre-wrap; line-height: 1.6;">${escapeHtml(message)}</p>
        </div>
        <p style="color: #64748b; font-size: 12px;">Submitted: ${escapeHtml(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }))}</p>
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
          <p style="color: #64748b; font-size: 12px;">
            You can reply directly to this email to respond to ${escapeHtml(fullName)}.
          </p>
        </div>
      </div>
    `;

    // Clean FROM_EMAIL (remove quotes if present)
    const fromEmail = (process.env.FROM_EMAIL || process.env.SMTP_USER || "").replace(/^["']|["']$/g, "");

    const transporter = makeTransport();

    // Verify SMTP connection first (with timeout)
    await withTimeout(transporter.verify(), 10000);

    // Send email (with timeout)
    await withTimeout(
      transporter.sendMail({
        from: fromEmail,
        to: ownerEmail,
        replyTo: email,
        subject,
        html,
      }),
      20000
    );

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Contact email error:", err);
    return res.status(500).json({
      ok: false,
      error: `Failed to send email: ${err.message || "Unknown error"}. Please try again or contact us directly.`,
    });
  }
}

