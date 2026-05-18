const { sendContactEmail } = require("../../lib/send-contact-email.cjs");

exports.handler = async (event) => {
  console.log("[sendmail] Function invoked", { method: event.httpMethod });

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  let body;
  try {
    body = event.body ? JSON.parse(event.body) : {};
  } catch (error) {
    console.error("[sendmail] Failed to parse body:", error);
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Invalid request format" }),
    };
  }

  const result = await sendContactEmail({
    name: body.name ?? "",
    email: body.email ?? "",
    message: body.message ?? "",
  });

  if (!result.ok) {
    return {
      statusCode: result.status,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: result.error,
        message: result.message,
        ...(result.details ? { details: result.details } : {}),
      }),
    };
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      success: true,
      message: "Email sent successfully",
      id: result.id,
    }),
  };
};
