"use client"

import { useState, useMemo } from "react"
import { FiSearch, FiFilter, FiGrid, FiList, FiDownload, FiEye, FiTrash2, FiX } from "react-icons/fi"

// Mock data - aap isko apne according modify kar sakte hain
const mockXrays = [
  {
    id: 1,
    patientName: "Ali Ahmed",
    bodyPart: "Chest",
    date: "2024-01-15",
    time: "10:30 AM",
    doctor: "Dr. Fatima Khan",
    status: "Completed",
    notes: "Clear lungs, no abnormalities detected",
    thumbnail: "/placeholder.svg"
  },
  {
    id: 2,
    patientName: "Sara Khan",
    bodyPart: "Leg",
    date: "2024-01-14",
    time: "02:15 PM",
    doctor: "Dr. Ahmed Raza",
    status: "Pending Review",
    notes: "Fracture suspected in right tibia",
    thumbnail: "/placeholder.svg"
  },
  {
    id: 3,
    patientName: "Mohammad Hassan",
    bodyPart: "Spine",
    date: "2024-01-13",
    time: "09:00 AM",
    doctor: "Dr. Zainab Ali",
    status: "Completed",
    notes: "Mild scoliosis detected",
    thumbnail: "/placeholder.svg"
  },
  {
    id: 4,
    patientName: "Ayesha Malik",
    bodyPart: "Chest",
    date: "2024-01-12",
    time: "11:45 AM",
    doctor: "Dr. Fatima Khan",
    status: "Completed",
    notes: "Pneumonia detected in lower right lobe",
    thumbnail: "/placeholder.svg"
  },
  {
    id: 5,
    patientName: "Bilal Abbas",
    bodyPart: "Hand",
    date: "2024-01-10",
    time: "03:30 PM",
    doctor: "Dr. Ahmed Raza",
    status: "Pending Review",
    notes: "Possible hairline fracture in metacarpal",
    thumbnail: "/placeholder.svg"
  },
  {
    id: 6,
    patientName: "Zainab Shah",
    bodyPart: "Pelvis",
    date: "2024-01-08",
    time: "01:20 PM",
    doctor: "Dr. Zainab Ali",
    status: "Completed",
    notes: "Normal pelvis structure",
    thumbnail: "/placeholder.svg"
  },
]

// SearchBar Component
const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative w-full">
      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
      <input
        type="text"
        placeholder="Search by patient name, body part, or doctor..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-10 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      {searchTerm && (
        <button
          onClick={() => setSearchTerm("")}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
        >
          <FiX size={18} />
        </button>
      )}
    </div>
  )
}

// FilterPanel Component
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

// ListView Component
const ListView = ({ xrays }) => {
  return (
    <div className="flex flex-wrap gap-6">
      {xrays.map((xray) => (
        <div 
          key={xray.id} 
          className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex-1 min-w-[calc(100%-24px)] md:min-w-[calc(50%-24px)] lg:min-w-[calc(33.333%-24px)]"
        >
          {/* Thumbnail */}
          <div className="relative h-48 bg-slate-200 overflow-hidden">
            <img
              src={xray.thumbnail || "/placeholder.svg"}
              alt={`${xray.bodyPart} X-ray`}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  xray.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {xray.status}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-slate-900 mb-1">{xray.patientName}</h3>
            <p className="text-sm text-slate-600 mb-3">{xray.bodyPart} X-ray</p>

            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Date:</span>
                <span className="font-medium text-slate-900">{xray.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Time:</span>
                <span className="font-medium text-slate-900">{xray.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Doctor:</span>
                <span className="font-medium text-slate-900">{xray.doctor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Notes:</span>
                <span className="font-medium text-slate-900 text-right max-w-xs">{xray.notes}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4 border-t border-slate-200">
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors text-sm font-medium">
                <FiEye size={16} />
                View
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg transition-colors text-sm font-medium">
                <FiDownload size={16} />
                Download
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors text-sm font-medium">
                <FiTrash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// TableView Component
const TableView = ({ xrays }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Desktop Table View - Hidden on mobile */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Patient Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Body Part</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Date & Time</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Doctor</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Notes</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-slate-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {xrays.map((xray, index) => (
              <tr
                key={xray.id}
                className={`border-b border-slate-200 hover:bg-slate-50 transition-colors ${
                  index % 2 === 0 ? "bg-white" : "bg-slate-50"
                }`}
              >
                <td className="px-4 py-3 text-sm text-slate-900 font-medium">{xray.patientName}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{xray.bodyPart}</td>
                <td className="px-4 py-3 text-sm text-slate-600">
                  <div>{xray.date}</div>
                  <div className="text-xs text-slate-500">{xray.time}</div>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">{xray.doctor}</td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      xray.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {xray.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600 max-w-xs">{xray.notes}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                      <FiEye size={18} />
                    </button>
                    <button
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Download"
                    >
                      <FiDownload size={18} />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile & Tablet Card View */}
      <div className="lg:hidden">
        <div className="flex flex-wrap gap-4 p-4">
          {xrays.map((xray, index) => (
            <div
              key={xray.id}
              className="bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow flex-1 min-w-[calc(100%-16px)] md:min-w-[calc(50%-16px)]"
            >
              {/* Card Header */}
              <div className="p-4 border-b border-slate-100">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 truncate">{xray.patientName}</h3>
                    <p className="text-sm text-slate-600 mt-1">{xray.doctor}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ml-2 flex-shrink-0 ${
                      xray.status === "Completed" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {xray.status}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">Body Part:</span>
                  <span className="text-sm font-medium text-slate-900">{xray.bodyPart}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">Date:</span>
                  <span className="text-sm font-medium text-slate-900">{xray.date}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">Time:</span>
                  <span className="text-sm text-slate-600">{xray.time}</span>
                </div>

                {xray.notes && (
                  <div>
                    <span className="text-sm text-slate-500 block mb-1">Notes:</span>
                    <p className="text-sm text-slate-900 line-clamp-2">{xray.notes}</p>
                  </div>
                )}
              </div>

              {/* Card Footer - Actions */}
              <div className="p-4 border-t border-slate-100 bg-slate-50">
                <div className="flex justify-center gap-4">
                  <button 
                    className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors text-sm font-medium"
                    title="View"
                  >
                    <FiEye size={16} />
                    <span>View</span>
                  </button>
                  <button
                    className="flex items-center gap-2 px-3 py-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors text-sm font-medium"
                    title="Download"
                  >
                    <FiDownload size={16} />
                    <span>Download</span>
                  </button>
                  <button 
                    className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors text-sm font-medium"
                    title="Delete"
                  >
                    <FiTrash2 size={16} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Main XrayHistory Component
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