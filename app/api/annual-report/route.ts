import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

// GET all reports
export async function GET() {
  try {
    const reports = await prisma.annualReport.findMany({
      orderBy: { created_at: "desc" },
    });
    return NextResponse.json({ reports }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Failed to fetch reports" }, { status: 500 });
  }
}

// POST new report
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const type = formData.get("type") as string;
    const year = formData.get("year") as string;
    const language = formData.get("language") as string;
    const file = formData.get("file") as File;

    if (!file) return NextResponse.json({ message: "No file uploaded" }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadsDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

    const filename = `${Date.now()}-${file.name.replaceAll(" ", "_")}`;
    const filePath = path.join(uploadsDir, filename);
    await fs.promises.writeFile(filePath, buffer);

    const annualReport = await prisma.annualReport.create({
      data: { type, year, language, file_path: filename },
    });

    return NextResponse.json(
      { message: "Report uploaded successfully", data: annualReport },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ message: "Failed to upload report" }, { status: 500 });
  }
}