"use client";
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  defaultPerPage?: number;
  onPageChange: (page: number) => void;
  onPerPageChange?: (perPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  defaultPerPage = 25,
  onPageChange,
  onPerPageChange,
}) => {
  const [perPage, setPerPage] = useState(defaultPerPage);

  const totalPages = perPage === totalItems ? 1 : Math.ceil(totalItems / perPage);

  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, totalItems);

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === "all" ? totalItems : parseInt(e.target.value);
    setPerPage(value);
    if (onPerPageChange) onPerPageChange(value);
    onPageChange(1); // reset to first page
  };

  if (totalItems <= 0) return null;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4 p-2 rounded">

      {/* Items per page */}
      <div className="flex items-center gap-2">
        <span className="text-sm">Items per page:</span>
        <select
          value={perPage === totalItems ? "all" : perPage}
          onChange={handlePerPageChange}
          className="border px-2 py-1 rounded text-sm"
        >
          {[25, 50, 75, 100].map((count) => (
            <option key={count} value={count}>
              {count}
            </option>
          ))}
          {/* <option value="all">All</option> */}
        </select>
      </div>

      {/* Previous / Next */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1 || totalPages <= 1} 
          className="px-3 py-1 rounded flex items-center gap-1"
        >
          <FaArrowLeft /> Prev
        </button>

        <span className="text-sm">
          {startItem}-{endItem} of {totalItems}
        </span>

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages || totalPages <= 1} 
          className="px-3 py-1 rounded flex items-center gap-1"
        >
          Next <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;