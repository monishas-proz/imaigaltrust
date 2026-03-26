"use client";

import { reportList } from "@/app/content/Annual-report";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ViewMode from "./ViewMode";
import Pagination from "../Pagination/Pagination";

interface DbReport {
  id: number;
  year: string;
  type: string;
  language: string;
  file_path: string;
  created_at: string;
}

export default function AnnualReport() {
  const [dbReports, setDbReports] = useState<DbReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState(false);
interface ReportLink {
  name: string;
  link: string;
  type: string;
}

interface ReportDocument {
  name: string;
  links: ReportLink[];
}

interface Report {
  id: string;
  title: string;
    document: ReportDocument[];
}

  const [selectedData, setSelectedData] = useState<Report | null>(null);

  // Filter dropdown
  const [selectedYear, setSelectedYear] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("/api/annual-report");
        const data = await response.json();
        if (data.reports) {
          setDbReports(data.reports);
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  // Map database reports to match the existing component's structure
  const mappedDbReports = dbReports.map((report) => ({
    id: `db-${report.id}`, // Unique ID for mixing with static reports
    title: `Annual Report ${report.year}`,
    document: [
      {
        id: report.id,
        name: "Annual Report Document",
        links: [
          {
            id: report.id,
            name: `${report.language} Version`,
            link: report.file_path,
            type: report.type,
          },
        ],
      },
    ],
  }));

  // Combine static data with database data
  const allReports = [...mappedDbReports, ...reportList];

  // Filter & Pagination using combined list
  const filteredReports = selectedYear
    ? allReports.filter((item) => item.title.includes(selectedYear))
    : allReports;

  const totalItems = filteredReports.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentReports = filteredReports.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <>
      {!viewMode && (
        <>
                    <div className="flex flex-wrap justify-end mx-auto px-4 pt-8 gap-4 max-w-[1600px]">
            <select
              className="border border-gray-300 rounded px-4 py-2 w-[250px] text-sm"
              value={selectedYear}
              onChange={(e) => {
                setSelectedYear(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">Select Year</option>
              <option value="2025-26">2025-26</option>
              <option value="2024-25">2024-25</option>
              <option value="2023-24">2023-24</option>
              <option value="2022-23">2022-23</option>
              <option value="2021-22">2021-22</option>
              <option value="2019-20">2019-20</option>
              <option value="2018-19">2018-19</option>
              <option value="2017-18">2017-18</option>
            </select>
          </div>

          {/* Report List */}
          <div className="max-w-[1600px] mx-auto my-8 p-2 min-h-[400px]">
            {loading && dbReports.length === 0 ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-800"></div>
              </div>
            ) : currentReports.length > 0 ? (
              currentReports.map((item) => (
                <div
                  key={item.id}
                  className="mb-4 bg-accent-800 rounded px-4 py-2 text-white"
                >
                  <div className="flex gap-5 flex-wrap items-center justify-between">
                    <h2 className="text-lg font-bold">{item.title}</h2>

                    <div className="flex items-center gap-2">
                      <button
                        className="bg-white text-gray-900 text-sm px-4 py-1 font-semibold rounded flex items-center gap-2 hover:bg-gray-300 transition duration-300"
                        onClick={() => {
        setViewMode(true);
setSelectedData(item as Report);
  }}
                      >
                        View
                        <Image
                          src="/assets/images/report/view.svg"
                          alt="arrow"
                          width={20}
                          height={20}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                No reports found for the selected year.
              </div>
            )}

            {/* Pagination */}
            {totalItems > 0 && (
              <Pagination
                currentPage={currentPage}
                totalItems={totalItems}
                defaultPerPage={itemsPerPage}
                onPageChange={(page) => setCurrentPage(page)}
                onPerPageChange={(perPage) => {
                  setItemsPerPage(perPage);
                  setCurrentPage(1);
                }}
              />
            )}
          </div>
        </>
      )}

      {/* View Mode */}
      {viewMode && selectedData && (
        <ViewMode
          data={[
              {
title: selectedData.title,
              document: selectedData.document.map((doc) => ({
                name: doc.name,
                links: doc.links.map((link) => ({
                  name: link.name,
                  link: link.link,
                  type: link.type,
})),
                })),
              },
            ]}
          clickEvent={() => setViewMode(false)}
        />
      )}
    </>
  );
}
