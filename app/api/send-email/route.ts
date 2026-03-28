import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    const plunkApiKey = process.env.PLUNK_API_KEY;

    if (!plunkApiKey) {
      console.error("PLUNK_API_KEY is not defined in .env");
      return NextResponse.json(
        { error: "Internal Server Error: Missing API Key" },
        { status: 500 }
      );
    }

    // Explicit check for Secret vs Public key to help with debugging
    if (plunkApiKey.startsWith('pk_')) {
      return NextResponse.json(
        { error: "Invalid API Key: You are using a Public Key (pk_*). Sending emails requires a Secret API Key (sk_*) from your Plunk dashboard." },
        { status: 401 }
      );
    }

    const response = await fetch("https://api.useplunk.com/v1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${plunkApiKey}`,
      },
      body: JSON.stringify({
        to: "asifalazad.fullstack@gmail.com",
        subject: `[Portfolio Contact] ${subject}`,
        body: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; line-height: 1.6;">
            <h2 style="color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">New Portfolio Message</h2>
            <div style="margin-bottom: 20px;">
              <p style="margin: 5px 0;"><strong>From:</strong> ${name}</p>
              <p style="margin: 5px 0;"><strong>Sender Email:</strong> ${email}</p>
              <p style="margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
            </div>
            <div style="background: #f4f4f5; padding: 20px; border-radius: 8px; border-left: 4px solid #6366f1;">
              <p style="white-space: pre-line; margin: 0;">${message}</p>
            </div>
            <p style="font-size: 0.8rem; color: #71717a; margin-top: 30px; border-top: 1px solid #e4e4e7; padding-top: 10px;">
              Generated via Plunk API from your portfolio contact form.
            </p>
          </div>
        `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // If Plunk returns an unauthorized error, provide specific guidance
      if (response.status === 401) {
        return NextResponse.json(
          { error: "Plunk Unauthorized: Please verify your Secret API Key (sk_*) in .env" },
          { status: 401 }
        );
      }

      console.error("Plunk API error:", data);
      return NextResponse.json(
        { error: data.error?.message || data.message || "Failed to send email" },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error in send-email route:", error);
    return NextResponse.json(
      { error: "Connect Timeout: The request took too long. Please check your internet connection or try again." },
      { status: 500 }
    );
  }
}
