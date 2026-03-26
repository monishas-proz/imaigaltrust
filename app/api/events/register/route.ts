import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      event_id,
      first_name,
      last_name,
      age,
      gender,
      email,
      phone,
      source,
      motivation,
      special_requirements,
      consent,
    } = body;

    if (
      !event_id ||
      !first_name ||
      !last_name ||
      !age ||
      !email ||
      !phone ||
      !motivation ||
      consent === undefined
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    const registration = await prisma.eventRegistration.create({
      data: {
        event_id: parseInt(event_id.toString()),
        first_name: first_name,
        last_name: last_name,
        age: parseInt(age.toString()),
        gender: gender || null,
        email: email,
        phone: phone,
        source: source || null,
        motivation: motivation,
        special_requirements: special_requirements || null,
        consent: !!consent,
      },
    });

    return NextResponse.json({
      message: "Registration successful!",
      registration,
    });
  } catch (error) {
    console.error("Error creating registration:", error);
    return NextResponse.json(
      { message: "Failed to process registration", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('eventId');

    const whereClause = eventId ? { event_id: parseInt(eventId) } : {};

    const registrations = await prisma.eventRegistration.findMany({
      where: whereClause,
      include: {
        event: {
          select: {
            title: true,
            location: true,
            cover_image: true,
            start_date: true,
            start_time: true,
            end_date: true,
            end_time: true,
            registration_start_date: true,
            registration_end_date: true,
            program: {
              select: {
                programs: true,
              },
            },
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return NextResponse.json({ registrations });
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return NextResponse.json(
      { message: "Failed to fetch registrations" },
      { status: 500 }
    );
  }
}
