import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/send-contact-email.cjs";

export async function POST(request: Request) {
  console.log("[api/contact] POST received");

  let body: { name?: string; email?: string; message?: string };
  try {
    body = await request.json();
  } catch (error) {
    console.error("[api/contact] Invalid JSON body:", error);
    return NextResponse.json(
      { error: "Invalid request format", message: "Invalid request body." },
      { status: 400 }
    );
  }

  const result = await sendContactEmail({
    name: body.name ?? "",
    email: body.email ?? "",
    message: body.message ?? "",
  });

  if (!result.ok) {
    return NextResponse.json(
      {
        error: result.error,
        message: result.message,
        ...(result.details ? { details: result.details } : {}),
      },
      { status: result.status }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Email sent successfully",
    id: result.id,
  });
}
