import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    // Force dynamic execution by accessing headers
    await headers();

    if (process.env.NEXT_PHASE === "phase-production-build") {
        return NextResponse.json({ message: "Build phase" });
    }

    try {
        const { id: idParam } = await params;
        const id = parseInt(idParam);
        const body = await req.json();
        const { category, status } = body;

        const updated = await prisma.galleryCategory.update({
            where: { id },
            data: {
                category,
                status: typeof status === 'string' ? parseInt(status) : status,
            },
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error("Error updating category:", error);
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
    // Force dynamic execution by accessing headers
    await headers();

    if (process.env.NEXT_PHASE === "phase-production-build") {
        return NextResponse.json({ message: "Build phase" });
    }

    try {
        const { id: idParam } = await params;
        const id = parseInt(idParam);
        await prisma.galleryCategory.update({
            where: { id },
            data: { status: -1 }
        });
        return NextResponse.json({ message: "Deleted successfully" });
    } catch (error) {
        console.error("Error deleting category:", error);
        return NextResponse.json(
            { error: "Failed to delete", details: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}
