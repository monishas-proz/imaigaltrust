import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  // Force dynamic execution by accessing headers
  await headers();

  if (process.env.NEXT_PHASE === "phase-production-build") {
    return NextResponse.json({ message: "Build phase" });
  }

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Missing credentials' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // In a real app, you would set a cookie or JWT here. 
    // For now, we'll return the user info and success message.
    return NextResponse.json({ 
      message: 'Login successful', 
      user: { id: user.id, name: user.name, email: user.email, role: user.role } 
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
