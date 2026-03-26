import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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

    const created = await prisma.galleryProgram.create({
  data: {
    programs,
    status: Number(status),
  },
});

    return NextResponse.json(created);
  } catch (error) {
    console.error("Error creating program:", error);
    return NextResponse.json(
      { error: "Failed to create program" },
      { status: 500 }
    );
  }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: idParam } = await params;
        const id = parseInt(idParam);
        const body = await req.json();
        const { programs, status } = body;

        if (!programs) {
            return NextResponse.json(
                { error: "Program name is required" },
                { status: 400 }
            );
        }

        const updated = await prisma.galleryProgram.update({
            where: { id },
            data: {
                programs,
                status: typeof status === 'string' ? parseInt(status) : status,
            },
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error("Error updating program:", error);
        return NextResponse.json(
            { error: "Failed to update", details: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: idParam } = await params;
        const id = parseInt(idParam);
        await prisma.galleryProgram.update({
            where: { id },
            data: { status: -1 }
        });
        return NextResponse.json({ message: "Deleted successfully" });
    } catch (error) {
        console.error("Error deleting program:", error);
        return NextResponse.json(
            { error: "Failed to delete", details: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}
