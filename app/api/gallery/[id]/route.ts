import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";

// PUT - Update gallery item
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam, 10);

    if (isNaN(id)) {
      return NextResponse.json(
        { message: "Invalid ID" },
        { status: 400 }
      );
    }

    const formData = await req.formData();

    const program_id = parseInt(formData.get("programId") as string);
    const category_id = parseInt(formData.get("categoryId") as string);

    const year = formData.get("year") as string;
    const month = (formData.get("month") as string) || null;
    const title = formData.get("title") as string;
    const media_type = formData.get("mediaType") as string;
    const description = (formData.get("description") as string) || null;
    const video_url = (formData.get("videoUrl") as string) || null;
    const file = formData.get("file") as File | null;

    if (!title || !year) {
      return NextResponse.json(
        { message: "Title and Year required" },
        { status: 400 }
      );
    }

    // existing record
    const existing = await prisma.gallery.findUnique({
      where: { id }
    });

    if (!existing) {
      return NextResponse.json(
        { message: "Gallery item not found" },
        { status: 404 }
      );
    }

    let file_path = existing.file_path || null;

    // upload new image
    if (media_type === "image" && file && file.size > 0) {
      const galleryDir = path.join(process.cwd(), "gallery");

      await mkdir(galleryDir, { recursive: true });

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filename = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
      const fullPath = path.join(galleryDir, filename);

      await writeFile(fullPath, buffer);

      // delete old image
      if (existing.file_path) {
        const oldFile = path.join(galleryDir, existing.file_path);
        try {
          await unlink(oldFile);
        } catch {}
      }

      file_path = filename;
    }

    // if video selected
    if (media_type === "video") {
      file_path = null;
    }

    const updated = await prisma.gallery.update({
      where: { id },
      data: {
        program_id,
        category_id,
        year,
        month,
        title,
        media_type,
        description,
        file_path,
        video_url: media_type === "video" ? video_url : null
      }
    });

    return NextResponse.json({
      message: "Updated successfully",
      data: updated
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to update" },
      { status: 500 }
    );
  }
}


// DELETE - Soft delete (set status = -1)
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam, 10);

    if (isNaN(id)) {
      return NextResponse.json(
        { message: "Invalid ID" },
        { status: 400 }
      );
    }

    await prisma.gallery.update({
      where: { id },
      data: { status: -1 },
    });

    return NextResponse.json({
      message: "Deleted successfully (soft delete)"
    });

  } catch (error) {
    console.error("Error soft-deleting gallery item:", error);

    return NextResponse.json(
      {
        error: "Failed to delete",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}