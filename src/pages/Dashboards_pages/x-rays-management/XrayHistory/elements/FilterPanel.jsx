"use client"

const FilterPanel = ({ filters, setFilters }) => {
  const bodyParts = ["all", "Chest", "Leg", "Spine", "Hand", "Pelvis"]
  const dateRanges = [
    { value: "all", label: "All Time" },
    { value: "week", label: "Last 7 Days" },
    { value: "month", label: "Last 30 Days" },
  ]
  const statuses = ["all", "Completed", "Pending Review"]

  return (
    <div className="mt-4 pt-4 border-t border-slate-200 flex flex-col sm:flex-row gap-4">
      {/* Body Part Filter */}
      <div className="flex-1 min-w-0">
        <label className="block text-sm font-medium text-slate-700 mb-2">Body Part</label>
        <select
          value={filters.bodyPart}
          onChange={(e) => setFilters({ ...filters, bodyPart: e.target.value })}
          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {bodyParts.map((part) => (
            <option key={part} value={part}>
              {part === "all" ? "All Body Parts" : part}
            </option>
          ))}
        </select>
      </div>

      {/* Date Range Filter */}
      <div className="flex-1 min-w-0">
        <label className="block text-sm font-medium text-slate-700 mb-2">Date Range</label>
        <select
          value={filters.dateRange}
          onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {dateRanges.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      {/* Status Filter */}
      <div className="flex-1 min-w-0">
        <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status === "all" ? "All Statuses" : status}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default FilterPanel