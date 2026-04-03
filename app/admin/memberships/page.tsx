"use client";

import React, { useState, useEffect } from "react";
import Pagination from "@/app/component/Pagination/Pagination";

interface Membership {
  id: number;
  name: string;
  email: string;
  mobile: string;
  city: string;
  state: string;
  membership_type: string;
  voluntaryDonation: number;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

interface RawMembership {
  id: number;
  name: string;
  email: string;
  mobile: string;
  city: string;
  state: string;
  membership_type: string;
  voluntaryDonation: string | number;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

export default function AdminMembershipsPage() {
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(25);


  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
const [rejectPopup, setRejectPopup] = useState(false);
const [rejectReason, setRejectReason] = useState("");

//use effect to fetch data
  useEffect(() => {
    async function fetchMemberships() {
      try {
        const response = await fetch("/api/membership");
        const data = await response.json();

       const enrichedData: Membership[] = (data.memberships || []).map((m: RawMembership) => ({
  ...m,
  voluntaryDonation: Number(m.voluntaryDonation) || 0,
status: m.status || "pending",}));

        setMemberships(enrichedData);
      } catch (error) {
        console.error("Failed to fetch memberships:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMemberships();
  }, []);

  const totalItems = memberships.length;
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentData = memberships.slice(startIndex, endIndex);

//approeve
 const handleApprove = async () => {

  await fetch("/api/membership/update-status", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ids: selectedMembers,
      status: "approved",
    }),
  });

  setMemberships(prev =>
    prev.map(member =>
      selectedMembers.includes(member.id)
        ? { ...member, status: "approved" }
        : member
    )
  );

  setSelectedMembers([]);
};

//reject 
const handleReject = async () => {

  if (!rejectReason.trim()) {
    alert("Reject reason mandatory");
    return;
  }

  await fetch("/api/membership/update-status", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ids: selectedMembers,
      status: "rejected",
      reason: rejectReason,
    }),
  });

  setMemberships(prev =>
    prev.map(member =>
      selectedMembers.includes(member.id)
        ? { ...member, status: "rejected" }
        : member
    )
  );

  setRejectPopup(false);
  setRejectReason("");
  setSelectedMembers([]);
};
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Membership Data</h1>
          <p className="text-sm text-gray-500">
            View and manage organization members
          </p>
        </div>
        <div className="flex gap-3">

<button
  onClick={() => handleApprove()}
  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-semibold"
>
Approve
</button>

<button
  onClick={() => setRejectPopup(true)}
  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-semibold"
>
Reject
</button>

</div>
        
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a4d2e]"></div>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-2xl shadow overflow-hidden border border-gray-100">
            <div className="w-full overflow-x-auto">
              <table className="min-w-[900px] w-full text-left border-collapse">
                <thead className="bg-[#1a4d2e] text-white">
                  <tr>
                    <th className="px-4 py-3 sm:px-6 sm:py-4 text-xs">S.No</th>
                    <th className="px-4 py-3 sm:px-6 sm:py-4 text-xs">Name</th>
                    <th className="px-4 py-3 sm:px-6 sm:py-4 text-xs">Contact</th>
                    <th className="px-4 py-3 sm:px-6 sm:py-4 text-xs">Location</th>
                    <th className="px-4 py-3 sm:px-6 sm:py-4 text-xs">Membership Type</th>
                    <th className="px-4 py-3 sm:px-6 sm:py-4 text-xs">Voluntary Donation</th>
<th className="px-4 py-3 sm:px-6 sm:py-4 text-xs">Select</th>
<th className="px-4 py-3 sm:px-6 sm:py-4 text-xs">Status</th>
                    <th className="px-4 py-3 sm:px-6 sm:py-4 text-xs">Applied Date</th>
                  </tr>
                </thead>

                <tbody>
  {currentData.length > 0 ? (
    currentData.map((member, index) => (
      <tr
        key={member.id}
        className="border-b hover:bg-gray-50 transition"
      >
        <td className="px-6 py-4 text-xs sm:text-sm">
          {startIndex + index + 1}
        </td>

        <td className="px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm">
          {member.name}
        </td>

        <td className="px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm">
          <div>{member.email}</div>
          <div className="text-xs text-gray-400">
            {member.mobile}
          </div>
        </td>

        <td className="px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm">
          {member.city}, {member.state}
        </td>

        <td className="px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm">
          <span className="px-2 py-1 text-xs rounded-full text-green-800">
            {member.membership_type}
          </span>
        </td>

        <td className="px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm">
          {member.voluntaryDonation > 0 ? (
            <span className="text-green-600 font-semibold">
              Paid ₹{member.voluntaryDonation}
            </span>
          ) : (
            <span className="text-gray-500">Free</span>
          )}
        </td>

        {/* Select Checkbox */}
        <td className="px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm">
          <input
            type="checkbox"
            checked={selectedMembers.includes(member.id)}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedMembers([...selectedMembers, member.id]);
              } else {
                setSelectedMembers(
                  selectedMembers.filter((id) => id !== member.id)
                );
              }
            }}
            className="w-5 h-5 cursor-pointer"
          />
        </td>

        {/* Status */}
        <td className="px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm">
          {member.status === "approved" && (
            <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
              Approved
            </span>
          )}

          {member.status === "pending" && (
            <span className="px-2 py-1 text-xs font-semibold text-yellow-700 bg-yellow-100 rounded-full">
              Pending
            </span>
          )}

          {member.status === "rejected" && (
            <span className="px-2 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full">
              Rejected
            </span>
          )}
        </td>

        <td className="px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm">
          {new Date(member.created_at).toLocaleDateString()}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td
        colSpan={9}
        className="text-center py-10 text-gray-500"
      >
        No memberships found.
      </td>
    </tr>
  )}
</tbody>
              </table>
            </div>
          </div>
{rejectPopup && (
<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

  <div className="bg-white p-6 rounded-xl w-[400px]">

    <h2 className="text-lg font-bold mb-3">Reject Reason</h2>

   <textarea
  value={rejectReason}
  onChange={(e) => setRejectReason(e.target.value)}
  placeholder="Enter rejection reason..."
  className="w-full border p-2 rounded-lg mb-4"
  required
/>

    <div className="flex justify-end gap-2">

      <button
        onClick={() => setRejectPopup(false)}
        className="px-4 py-2 bg-gray-200 rounded-lg"
      >
Cancel
      </button>

      <button
  onClick={handleReject}
  disabled={!rejectReason.trim()}
  className={`px-4 py-2 text-white rounded-lg ${
    rejectReason.trim()
      ? "bg-red-600 hover:bg-red-700"
      : "bg-red-300 cursor-not-allowed"
  }`}
>
Reject
</button>

    </div>

  </div>

</div>
)}
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            defaultPerPage={perPage}
            onPageChange={(page) => setCurrentPage(page)}
            onPerPageChange={(value) => setPerPage(value)}
          />
        </>
      )}
    </div>
  );
}