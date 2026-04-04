import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  // Force dynamic execution by accessing headers
  await headers();

  if (process.env.NEXT_PHASE === "phase-production-build") {
    return NextResponse.json({ message: "Build phase" });
  }

  try {
    const { email, newPassword } = await req.json();

    if (!email || !newPassword) {
      return NextResponse.json({ message: "Missing email or password" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: "No user found with this email" }, { status: 404 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ message: "Password reset successfully!" });
  } catch (err) {
    console.error("Reset Password Error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}