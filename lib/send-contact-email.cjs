const { Resend } = require("resend");

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function sendContactEmail(payload) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact-email] RESEND_API_KEY is not set");
    return {
      ok: false,
      status: 500,
      error: "Server configuration error",
      message:
        "Email service is not configured. Add RESEND_API_KEY to .env.local (local) or Netlify env vars (production).",
    };
  }

  const { name, email, message } = payload;
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return {
      ok: false,
      status: 400,
      error: "Missing required fields",
      message: "Please fill in all required fields (name, email, and message).",
    };
  }

  const to = process.env.CONTACT_TO_EMAIL?.trim() || "henry@aicallisto.com";
  const from =
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    "Paquin Law <onboarding@resend.dev>";

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

  const submissionDate = new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });

  const resend = new Resend(apiKey);

  console.log("[contact-email] Sending", { from, to, replyTo: email });

  const { data, error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: `[Paquin Law] Contact Form Submission from ${name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #0B5524;">New Contact Form Submission</h1>
        <p><strong>Submitted:</strong> ${submissionDate}</p>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
        <p><strong>Message:</strong></p>
        <div style="background: #fafafa; padding: 16px; border-radius: 4px;">${safeMessage}</div>
      </div>
    `,
    text: `New Contact Form Submission\n\nSubmitted: ${submissionDate}\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  });

  if (error) {
    console.error("[contact-email] Resend error:", JSON.stringify(error, null, 2));
    const isDev = process.env.NODE_ENV === "development";
    return {
      ok: false,
      status: 500,
      error: "Failed to send email",
      message:
        error.message ||
        "We could not send your message. Please try again later.",
      details: isDev ? JSON.stringify(error) : undefined,
    };
  }

  console.log("[contact-email] Sent successfully:", data?.id);
  return { ok: true, id: data?.id };
}

module.exports = { sendContactEmail };
