"use client"

import { useState } from "react"
import { FaFileMedical, FaSearch, FaCalendarAlt, FaClock, FaEye } from "react-icons/fa"
import { FiUser } from "react-icons/fi"

// Yeh component recent uploads table display karta hai
const RecentUploadsTable = ({ uploads }) => {
  // Yeh state search term ko track karta hai
  const [searchTerm, setSearchTerm] = useState("")

  // Yeh filtered uploads calculate karta hai based on search term
  const filteredUploads = uploads.filter(
    (upload) =>
      upload.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || // Patient name mein search
      upload.scanType.toLowerCase().includes(searchTerm.toLowerCase()) || // Scan type mein search
      upload.doctor.toLowerCase().includes(searchTerm.toLowerCase()), // Doctor name mein search
  )

  return (
    // Main container jo white background aur border provide karta hai
    <div className="bg-white rounded-lg border border-gray-300 p-4">
      {/* Header Section jo title aur search input dikhata hai */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        {/* Left side - title aur icon */}
        <div className="flex items-center gap-3">
          <div className="bg-[#5056e6] p-2 rounded-lg">
            <FaFileMedical className="text-white text-lg" /> {/* Medical file icon */}
          </div>
          <h2 className="text-xl font-bold text-[#000000]">Recent Uploads</h2> {/* Section title */}
        </div>

        {/* Right side - search input */}
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search uploads..." // Placeholder text
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Search term update handler
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-[#000000] placeholder-[#979999] focus:outline-none focus:ring-2 focus:ring-[#5056e6] focus:border-transparent"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#979999]" /> {/* Search icon */}
        </div>
      </div>

      {/* Desktop Table View - sirf desktop par visible */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[800px]"> {/* Minimum width ensure karta hai proper layout */}
          <thead>
            <tr className="border-b-2 border-gray-300 bg-gray-50"> {/* Table header row */}
              <th className="text-left py-3 px-4 text-sm font-semibold text-[#000000] min-w-[120px]">Patient</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-[#000000] min-w-[100px]">Scan Type</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-[#000000] min-w-[140px]">Date & Time</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-[#000000] min-w-[120px]">Doctor</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-[#000000] min-w-[100px]">Status</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-[#000000] min-w-[80px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Har filtered upload ke liye table row render karta hai */}
            {filteredUploads.map((upload) => (
              <tr key={upload.id} className="border-b border-gray-200 hover:bg-gray-50"> {/* Table data row */}
                {/* Patient name cell */}
                <td className="py-3 px-4">
                  <div className="font-medium text-[#000000] text-sm">{upload.patientName}</div>
                </td>
                {/* Scan type cell with badge styling */}
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-[#5056e6]">
                    {upload.scanType}
                  </span>
                </td>
                {/* Date and time cell with icons */}
                <td className="py-3 px-4">
                  <div className="flex items-center text-[#000000] text-sm mb-1">
                    <FaCalendarAlt className="mr-2 text-[#979999] text-xs" /> {/* Calendar icon */}
                    <span>{upload.date}</span>
                  </div>
                  <div className="flex items-center text-[#979999] text-xs">
                    <FaClock className="mr-2 text-[#979999]" /> {/* Clock icon */}
                    <span>{upload.time}</span>
                  </div>
                </td>
                {/* Doctor cell with icon */}
                <td className="py-3 px-4">
                  <div className="flex items-center text-[#000000] text-sm">
                    <FiUser className="mr-2 text-[#5056e6]" /> {/* User icon */}
                    <span>{upload.doctor}</span>
                  </div>
                </td>
                {/* Status cell with completed badge */}
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    ✓ Completed
                  </span>
                </td>
                {/* Action cell with view button */}
                <td className="py-3 px-4">
                  <button className="text-[#5056e6] hover:text-[#000000] flex items-center text-sm font-medium">
                    <FaEye className="mr-1" /> {/* Eye icon */}
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View - sirf mobile par visible */}
      <div className="md:hidden space-y-4">
        {/* Har filtered upload ke liye card render karta hai */}
        {filteredUploads.map((upload) => (
          <div key={upload.id} className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
            <div className="flex flex-col gap-3">
              {/* Patient and Status Row */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <FiUser className="text-[#5056e6]" /> {/* User icon */}
                  <h3 className="font-semibold text-[#000000] text-sm">{upload.patientName}</h3>
                </div>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  ✓ Completed
                </span>
              </div>

              {/* Scan Type section */}
              <div className="flex items-center gap-2">
                <span className="text-[#979999] text-xs">Scan Type:</span> {/* Label */}
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-[#5056e6]">
                  {upload.scanType}
                </span>
              </div>

              {/* Date and Time section */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-[#979999] text-xs" /> {/* Calendar icon */}
                  <span className="text-[#000000] text-sm">{upload.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-[#979999] text-xs" /> {/* Clock icon */}
                  <span className="text-[#979999] text-xs">{upload.time}</span>
                </div>
              </div>

              {/* Doctor section */}
              <div className="flex items-center gap-2">
                <span className="text-[#979999] text-xs">Doctor:</span> {/* Label */}
                <span className="text-[#000000] text-sm">{upload.doctor}</span>
              </div>

              {/* Action Button */}
              <div className="flex justify-end pt-2 border-t border-gray-200">
                <button className="text-[#5056e6] hover:text-[#000000] flex items-center text-sm font-medium">
                  <FaEye className="mr-1" /> {/* Eye icon */}
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State - agar koi upload match nahi karta search se */}
      {filteredUploads.length === 0 && (
        <div className="text-center py-8 text-[#979999]">
          No uploads found matching your search.
        </div>
      )}
    </div>
  )
}

export default RecentUploadsTable