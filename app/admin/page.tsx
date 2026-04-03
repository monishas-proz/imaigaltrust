"use client";

import React, { useEffect, useState } from "react";
import { Calendar, Clock, Users, FileText, Layers, DollarSign, UserPlus } from "lucide-react";

type Counts = {
  totalMembers: number;
  paidMembers: number;
  freeVolunteers: number;
  pendingMembers: number;
  approvedMembers: number;
  rejectedMembers: number;

  totalEvents: number;
  pendingApprovals: number;
  membershipRevenue: number;
  ongoingEvents: number;
  upcomingEvents: number;
  pastEvents: number;
  draftEvents: number;
  registerCount: number;
  annualReportCount: number;
};

type CardProps = {
  icon: React.ReactNode;
  title: string;
  count: number | string;
  color: "green" | "blue" | "yellow" | "purple" | "red" | "indigo";
};

function Card({ icon, title, count, color }: CardProps) {
  const bgColors: Record<CardProps["color"], string> = {
    green: "from-green-50 to-green-100",
    blue: "from-blue-50 to-blue-100",
    yellow: "from-yellow-50 to-yellow-100",
    purple: "from-purple-50 to-purple-100",
    red: "from-red-50 to-red-100",
    indigo: "from-indigo-50 to-indigo-100",
  };
  const borderColors: Record<CardProps["color"], string> = {
    green: "border-green-100",
    blue: "border-blue-100",
    yellow: "border-yellow-100",
    purple: "border-purple-100",
    red: "border-red-100",
    indigo: "border-indigo-100",
  };
  const textColors: Record<CardProps["color"], string> = {
    green: "text-green-700",
    blue: "text-blue-700",
    yellow: "text-yellow-700",
    purple: "text-purple-700",
    red: "text-red-700",
    indigo: "text-indigo-700",
  };

  return (
    <div
      className={`group bg-gradient-to-br ${bgColors[color]} p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 ${borderColors[color]}`}
    >
      <div className="flex items-center justify-between mb-4">{icon}</div>
      <h3 className="text-sm text-gray-500 font-medium">{title}</h3>
      <p className={`text-3xl font-bold ${textColors[color]} mt-1`}>{count}</p>
    </div>
  );
}

export default function DashboardPage() {
  const [counts, setCounts] = useState<Counts>({
    totalMembers: 0,
    paidMembers: 0,
    freeVolunteers: 0,
    pendingMembers: 0,
    approvedMembers: 0,
    rejectedMembers: 0,
    totalEvents: 0,
    pendingApprovals: 0,
    membershipRevenue: 0,
    ongoingEvents: 0,
    upcomingEvents: 0,
    pastEvents: 0,
    draftEvents: 0,
    registerCount: 0,
    annualReportCount: 0,
  });

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((data) => setCounts(data))
      .catch((err) => console.error("Dashboard fetch error:", err));
  }, []);

  return (
    <div className="space-y-8 p-6">
      {/* Platform Summary */}
      <h2 className="text-xl font-bold text-gray-700">Platform Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card icon={<Users className="text-blue-600" />} title="Total Members" count={counts.totalMembers} color="blue" />
        <Card icon={<Layers className="text-purple-600" />} title="Total Events" count={counts.totalEvents} color="purple" />
        <Card icon={<UserPlus className="text-yellow-600" />} title="Pending Approvals" count={counts.pendingApprovals} color="yellow" />
        <Card icon={<DollarSign className="text-green-600" />} title="Membership Revenue" count={`$${counts.membershipRevenue}`} color="green" />
      </div>

      {/* Event Summary */}
      <h2 className="text-xl font-bold text-gray-700">Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card icon={<Clock className="text-green-600" />} title="Ongoing Events" count={counts.ongoingEvents} color="green" />
        <Card icon={<Calendar className="text-blue-600" />} title="Upcoming Events" count={counts.upcomingEvents} color="blue" />
        <Card icon={<FileText className="text-red-600" />} title="Past Events" count={counts.pastEvents} color="red" />
        <Card icon={<Layers className="text-purple-600" />} title="Draft Events" count={counts.draftEvents} color="purple" />
      </div>

      {/* Registrations */}
      <h2 className="text-xl font-bold text-gray-700">Registrations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <Card icon={<Users className="text-yellow-600" />} title="Total Registrations" count={counts.registerCount} color="yellow" />
      </div>

     

      {/* Membership Breakdown */}
      <h2 className="text-xl font-bold text-gray-700">Membership Breakdown</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card icon={<Users className="text-blue-600" />} title="Total Members" count={counts.totalMembers} color="blue" />
        <Card icon={<DollarSign className="text-green-600" />} title="Paid Members" count={counts.paidMembers} color="green" />
        <Card icon={<UserPlus className="text-yellow-600" />} title="Free Volunteers" count={counts.freeVolunteers} color="yellow" />
        <Card icon={<Users className="text-purple-600" />} title="Pending Members" count={counts.pendingMembers} color="purple" />
        <Card icon={<Users className="text-indigo-600" />} title="Approved Members" count={counts.approvedMembers} color="indigo" />
        <Card icon={<Users className="text-red-600" />} title="Rejected Members" count={counts.rejectedMembers} color="red" />
      </div>

       {/* Annual Reports */}
      <h2 className="text-xl font-bold text-gray-700">Annual Reports</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">

      <Card icon={<FileText className="text-indigo-600" />} title="Annual Reports" count={counts.annualReportCount} color="indigo" />
      </div>
    </div>
  );
}