import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {

    // Platform Summary
    const totalMembers = await prisma.membership.count();
    const totalEvents = await prisma.event.count();

    const pendingApprovals = await prisma.membership.count({
      where: { status: 0 },
    });

    // Membership Revenue
    const memberships = await prisma.membership.findMany({
      select: { membership_fee: true },
    });

    const membershipRevenue = memberships.reduce(
      (sum, m) => sum + Number(m.membership_fee || 0),
      0
    );

    // Membership Breakdown
    const paidMembers = await prisma.membership.count({
      where: {
        membership_fee: {
          not: "0",
        },
      },
    });

    const freeVolunteers = await prisma.membership.count({
      where: {
        membership_type: "volunteer",
      },
    });

    const pendingMembers = await prisma.membership.count({
      where: { status: 0 },
    });

    const approvedMembers = await prisma.membership.count({
      where: { status: 1 }, // FIXED
    });

    const rejectedMembers = await prisma.membership.count({
      where: { status: 2 }, // FIXED
    });

    // Events
    const ongoingEvents = await prisma.event.count({
      where: { status: "ongoing" },
    });

    const upcomingEvents = await prisma.event.count({
      where: { status: "upcoming" },
    });

    const pastEvents = await prisma.event.count({
      where: { status: "past" },
    });

    const draftEvents = await prisma.event.count({
      where: { is_draft: true },
    });

    // Registrations
    const registerCount = await prisma.eventRegistration.count();

    // Annual Reports
    const annualReportCount = await prisma.annualReport.count();

    return NextResponse.json({
      totalMembers,
      paidMembers,
      freeVolunteers,
      pendingMembers,
      approvedMembers,
      rejectedMembers,
      totalEvents,
      pendingApprovals,
      membershipRevenue,
      ongoingEvents,
      upcomingEvents,
      pastEvents,
      draftEvents,
      registerCount,
      annualReportCount,
    });

  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard counts" },
      { status: 500 }
    );
  }
}