// app/api/gallery-image/[name]/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: Request,
  { params }: { params: Record<string, string> }
) {
  // Await params
  const { name } = await params;  // <-- Important fix

  try {
    const filePath = path.join(process.cwd(), "gallery", name);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    const ext = path.extname(filePath).substring(1).toLowerCase();
    const mimeType =
      ext === "jpg" || ext === "jpeg"
        ? "image/jpeg"
        : ext === "png"
        ? "image/png"
        : ext === "gif"
        ? "image/gif"
        : "image/*";

    return new Response(fileBuffer, { headers: { "Content-Type": mimeType } });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}