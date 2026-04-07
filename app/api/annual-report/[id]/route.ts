import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

// GET a single report by ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id, 10);

  if (isNaN(id)) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  try {
    const report = await prisma.annualReport.findUnique({ where: { id } });

    if (!report) {
      return NextResponse.json({ message: "Report not found" }, { status: 404 });
    }

    return NextResponse.json({ report }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Failed to fetch report" }, { status: 500 });
  }
}

// DELETE a report by ID
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id, 10);

  if (isNaN(id)) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  try {
    const report = await prisma.annualReport.findUnique({ where: { id } });

    if (!report) {
      return NextResponse.json({ message: "Report not found" }, { status: 404 });
    }

    // Delete the associated file
    const filePath = path.join(process.cwd(), "uploads", report.file_path);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete DB record
    await prisma.annualReport.delete({ where: { id } });

    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  }
}