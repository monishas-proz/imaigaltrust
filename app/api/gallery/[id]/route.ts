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
        const id = parseInt(idParam);
        const formData = await req.formData();

        const programIdRaw = formData.get("programId");
        const categoryIdRaw = formData.get("categoryId");

        if (!programIdRaw || !categoryIdRaw) {
            return NextResponse.json(
                { message: "Please select a Program and Category" },
                { status: 400 }
            );
        }

        const program_id = parseInt(programIdRaw as string);
        const category_id = parseInt(categoryIdRaw as string);

        const year = formData.get("year") as string;
        const month = formData.get("month") as string || null;
        const title = formData.get("title") as string;
        const media_type = formData.get("mediaType") as string;
        const description = formData.get("description") as string || null;
        const video_url = formData.get("videoUrl") as string || null;
        const file = formData.get("file") as File | null;

        if (!title || !year) {
            return NextResponse.json(
                { message: "Title and Year are required" },
                { status: 400 }
            );
        }

        // Get existing record to handle file replacement
        const existing = await prisma.gallery.findUnique({ where: { id } });
        let file_path = existing?.file_path || null;

        if (media_type === "image" && file && file.size > 0) {
            // Delete old file if exists
            if (existing?.file_path) {
                try {
                    const oldPath = path.join(process.cwd(), "public", existing.file_path);
                    await unlink(oldPath);
                } catch { /* ignore if file not found */ }
            }

            // Save new file
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const galleryDir = path.join(process.cwd(), "public", "gallery");
            await mkdir(galleryDir, { recursive: true });
            const filename = `${Date.now()}-${file.name.replaceAll(" ", "_")}`;
            const fullPath = path.join(galleryDir, filename);
            file_path = `/gallery/${filename}`;
            await writeFile(fullPath, buffer);
        }

        // If switched to video, clear file_path
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
                video_url: media_type === "video" ? video_url : null,
            },
        });

        return NextResponse.json({ message: "Updated successfully", data: updated });
    } catch (error) {
        console.error("Error updating gallery item:", error);
        return NextResponse.json(
            { error: "Failed to update", details: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}

// DELETE - Soft delete (set status = 0)
export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: idParam } = await params;
        const id = parseInt(idParam);

        await prisma.gallery.update({
            where: { id },
            data: { status: -1 },
        });

        return NextResponse.json({ message: "Deleted successfully (soft delete)" });
    } catch (error) {
        console.error("Error soft-deleting gallery item:", error);
        return NextResponse.json(
            { error: "Failed to delete", details: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}
