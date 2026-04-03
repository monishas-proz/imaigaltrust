import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { ids, status, reason } = await req.json();

    if (!ids || ids.length === 0) {
      return NextResponse.json(
        { success: false, message: "No IDs provided" },
        { status: 400 }
      );
    }

    await db.query(
      `UPDATE memberships 
       SET status = ?, reject_reason = ? 
       WHERE id IN (?)`,
      [status, reason || null, ids]
    );

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}