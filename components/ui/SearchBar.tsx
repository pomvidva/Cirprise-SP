"use client";

import { Search, ChevronDown } from "lucide-react";

/**
 * SearchBar
 * The search + filter row for the projects list.
 *
 * Props:
 *  - searchValue        current text in the search box
 *  - onSearchChange     called with the new text when the user types
 *  - sortLabel          label shown on the sort dropdown (e.g. "Most recent")
 *  - onFilterClick      called when the Filter dropdown is clicked
 *  - onSortClick        called when the sort dropdown is clicked
 *  - eligibleOnly       whether the "Eligible only" toggle is on
 *  - onEligibleToggle   called when the toggle is switched
 */
type SearchBarProps = {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  sortLabel?: string;
  onFilterClick?: () => void;
  onSortClick?: () => void;
  eligibleOnly?: boolean;
  onEligibleToggle?: (value: boolean) => void;
};

export default function SearchBar({
  searchValue = "",
  onSearchChange,
  sortLabel = "Most recent",
  onFilterClick,
  onSortClick,
  eligibleOnly = false,
  onEligibleToggle,
}: SearchBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search input */}
      <div className="relative min-w-[240px] flex-1">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder="Search projects..."
          className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm text-gray-800 placeholder:text-gray-400 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-100"
        />
      </div>

      {/* Filter dropdown */}
      <button
        type="button"
        onClick={onFilterClick}
        className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 transition-colors hover:bg-gray-50"
      >
        <span>Filter</span>
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </button>

      {/* Sort dropdown */}
      <button
        type="button"
        onClick={onSortClick}
        className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-50"
      >
        <span>{sortLabel}</span>
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </button>

      {/* Eligible only toggle */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-800">Eligible only</span>
        <button
          type="button"
          role="switch"
          aria-checked={eligibleOnly}
          onClick={() => onEligibleToggle?.(!eligibleOnly)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full border-2 transition-colors ${
            eligibleOnly
              ? "border-blue-600 bg-blue-600"
              : "border-blue-600 bg-white"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full transition-transform ${
              eligibleOnly
                ? "translate-x-5 bg-white"
                : "translate-x-1 bg-gray-300"
            }`}
          />
        </button>
      </div>
    </div>
  );
}