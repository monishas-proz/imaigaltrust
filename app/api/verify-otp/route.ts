import { NextResponse } from "next/server";

// import otpStore from forgot-password file in production
const otpStore = new Map<string, { otp: string; expires: number }>();

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();
    if (!email || !otp) return NextResponse.json({ message: "Email & OTP required" }, { status: 400 });

    const record = otpStore.get(email);
    if (!record) return NextResponse.json({ message: "No OTP found for this email" }, { status: 400 });
    if (Date.now() > record.expires) return NextResponse.json({ message: "OTP expired" }, { status: 400 });
    if (record.otp !== otp) return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });

    otpStore.delete(email); 
    return NextResponse.json({ message: "OTP verified! You can reset your password now." });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}