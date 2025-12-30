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
    const {
      fullName,
      phone,
      email,
      service,
      preferredDate,
      preferredTime = "",
      message = "",
    } = req.body;

    // Basic validation
    if (!fullName || fullName.length < 2 || fullName.length > 80) {
      return res.status(400).json({ ok: false, error: "Invalid full name." });
    }
    if (!phone || phone.length < 7 || phone.length > 25) {
      return res.status(400).json({ ok: false, error: "Invalid phone number." });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ ok: false, error: "Invalid email address." });
    }
    if (!service || service.length < 2 || service.length > 80) {
      return res.status(400).json({ ok: false, error: "Invalid service." });
    }
    if (!preferredDate || preferredDate.length < 4) {
      return res.status(400).json({ ok: false, error: "Invalid date." });
    }

    const ownerEmail = process.env.OWNER_EMAIL;
    if (!ownerEmail) {
      return res.status(500).json({ ok: false, error: "Server configuration error." });
    }

    // Format date for display
    let formattedDate;
    try {
      const dateObj = new Date(preferredDate);
      if (isNaN(dateObj.getTime())) {
        formattedDate = preferredDate;
      } else {
        formattedDate = dateObj.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      }
    } catch (err) {
      formattedDate = preferredDate;
    }

    const clinicName = process.env.CLINIC_NAME || "KSM Dental Care";
    const clinicPhone = process.env.CLINIC_PHONE || "+91 99999 99999";

    // Admin notification email
    const adminSubject = `New Appointment Booking — ${fullName} (${service})`;
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e3a8a;">🦷 New Appointment Booking Request</h2>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>👤 Name:</strong> ${escapeHtml(fullName)}</p>
          <p><strong>📞 Phone:</strong> <a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></p>
          <p><strong>📧 Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
          <p><strong>🦷 Service:</strong> ${escapeHtml(service)}</p>
          <p><strong>📅 Preferred Date:</strong> ${escapeHtml(formattedDate)}</p>
          <p><strong>⏰ Preferred Time:</strong> ${preferredTime ? escapeHtml(preferredTime) : "Not specified"}</p>
          ${message ? `<p><strong>💬 Message:</strong> ${escapeHtml(message)}</p>` : ""}
        </div>
        <p style="color: #64748b; font-size: 12px;">Submitted: ${escapeHtml(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }))}</p>
      </div>
    `;

    // User acknowledgement email
    const userSubject = `Appointment Confirmation — ${clinicName}`;
    const userHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e3a8a;">Thank You for Your Appointment Booking!</h2>
        <p>Dear ${escapeHtml(fullName)},</p>
        <p>Thank you for booking an appointment with us!</p>
        <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
          <h3 style="margin-top: 0;">📋 Your Appointment Details:</h3>
          <p><strong>🦷 Service:</strong> ${escapeHtml(service)}</p>
          <p><strong>📅 Date:</strong> ${escapeHtml(formattedDate)}</p>
          <p><strong>⏰ Time:</strong> ${preferredTime ? escapeHtml(preferredTime) : "Not specified"}</p>
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

    // Clean FROM_EMAIL (remove quotes if present)
    const fromEmail = (process.env.FROM_EMAIL || process.env.SMTP_USER || "").replace(/^["']|["']$/g, "");

    const transporter = makeTransport();

    // Verify SMTP connection first (with timeout)
    await withTimeout(transporter.verify(), 10000);

    // Send email to admin (with timeout)
    await withTimeout(
      transporter.sendMail({
        from: fromEmail,
        to: ownerEmail,
        replyTo: email,
        subject: adminSubject,
        html: adminHtml,
      }),
      20000
    );

    // Send acknowledgement email to user (with timeout)
    await withTimeout(
      transporter.sendMail({
        from: fromEmail,
        to: email,
        subject: userSubject,
        html: userHtml,
      }),
      20000
    );

    return res.status(200).json({
      ok: true,
      emailSent: true,
    });
  } catch (err) {
    console.error("Appointment email error:", err);
    return res.status(500).json({
      ok: false,
      error: `Failed to send email: ${err.message || "Unknown error"}. Please try again or contact us directly.`,
    });
  }
}

