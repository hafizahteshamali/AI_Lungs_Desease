"use client"

import { useState, useMemo } from "react"
import { FiSearch, FiFilter, FiGrid, FiList } from "react-icons/fi"
import SearchBar from "./elements/SearchBar"
import FilterPanel from "./elements/FilterPanel"
import TableView from "./elements/TableView"
import ListView from "./elements/ListView"
import { mockXrays } from "../../../../assets/Constant"

const XrayHistory = () => {
  const [viewMode, setViewMode] = useState("table")
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    bodyPart: "all",
    dateRange: "all",
    status: "all",
  })
  const [showFilters, setShowFilters] = useState(false)

  // Filter and search logic
  const filteredXrays = useMemo(() => {
    return mockXrays.filter((xray) => {
      const matchesSearch =
        xray.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        xray.bodyPart.toLowerCase().includes(searchTerm.toLowerCase()) ||
        xray.doctor.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesBodyPart = filters.bodyPart === "all" || xray.bodyPart === filters.bodyPart
      const matchesStatus = filters.status === "all" || xray.status === filters.status

      let matchesDateRange = true
      if (filters.dateRange !== "all") {
        const xrayDate = new Date(xray.date)
        const today = new Date()
        const daysDiff = Math.floor((today - xrayDate) / (1000 * 60 * 60 * 24))

        if (filters.dateRange === "week" && daysDiff > 7) matchesDateRange = false
        if (filters.dateRange === "month" && daysDiff > 30) matchesDateRange = false
      }

      return matchesSearch && matchesBodyPart && matchesStatus && matchesDateRange
    })
  }, [searchTerm, filters])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">X-ray History</h1>
          <p className="text-slate-600">Manage and review all X-ray records</p>
        </div>

        {/* Controls Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 w-full">
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>

            {/* View Toggle & Filter Button */}
            <div className="flex gap-2 items-center">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
              >
                <FiFilter size={18} />
                <span className="hidden sm:inline">Filter</span>
              </button>

              <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-2 rounded transition-colors ${
                    viewMode === "table" ? "bg-blue-500 text-white" : "text-slate-600 hover:text-slate-900"
                  }`}
                  title="Table View"
                >
                  <FiGrid size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded transition-colors ${
                    viewMode === "list" ? "bg-blue-500 text-white" : "text-slate-600 hover:text-slate-900"
                  }`}
                  title="List View"
                >
                  <FiList size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && <FilterPanel filters={filters} setFilters={setFilters} />}
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-slate-600">
          Showing <span className="font-semibold text-slate-900">{filteredXrays.length}</span> of{" "}
          <span className="font-semibold text-slate-900">{mockXrays.length}</span> X-rays
        </div>

        {/* Content Area */}
        {filteredXrays.length > 0 ? (
          viewMode === "table" ? (
            <TableView xrays={filteredXrays} />
          ) : (
            <ListView xrays={filteredXrays} />
          )
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <FiSearch size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No X-rays found</h3>
            <p className="text-slate-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default XrayHistory
