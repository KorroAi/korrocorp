import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const resendKey = process.env.RESEND_API_KEY;

    if (resendKey) {
      const resend = new Resend(resendKey);

      await resend.emails.send({
        from: "Korrocorp <onboarding@resend.dev>",
        to: "contact.korro@gmail.com",
        subject: "New newsletter subscriber",
        text: `New subscriber: ${email}\n\nDate: ${new Date().toISOString()}\nPage: korrocorp.com`,
      });
    } else {
      console.log(`Newsletter subscriber: ${email}`);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Newsletter error:", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
