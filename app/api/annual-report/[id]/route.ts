import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    await prisma.annualReport.delete({
      where: { id: Number(resolvedParams.id) },
    });

    return NextResponse.json({ message: "Deleted" });
  } catch {
    return NextResponse.json(
      { message: "Delete failed" },
      { status: 500 }
    );
  }
}