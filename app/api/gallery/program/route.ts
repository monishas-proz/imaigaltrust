import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const programs = await prisma.galleryProgram.findMany({
      where: { NOT: { status: -1 } },
      orderBy: { created_at: "desc" },
    });
    return NextResponse.json({ programs });
  } catch (error) {
    console.error("Error fetching gallery programs:", error);
    return NextResponse.json(
      { error: "Failed to fetch programs" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { programs, status } = body;

    if (!programs) {
      return NextResponse.json(
        { error: "Program name is required" },
        { status: 400 }
      );
    }

    const newProgram = await prisma.galleryProgram.create({
      data: {
        programs,
        status: status !== undefined ? parseInt(status) : 1,
      },
    });

    return NextResponse.json(newProgram, { status: 201 });
  } catch (error) {
    console.error("Error creating gallery program:", error);
    return NextResponse.json(
      { error: "Failed to create program", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
