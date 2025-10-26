"use client"

import { useState } from "react"
import { FaClock, FaFilter } from "react-icons/fa"
import PendingReviewCard from "./PendingReviewCard"

const PendingReviewsSection = ({ reviews }) => {
  const [filterUrgency, setFilterUrgency] = useState("all")

  const filteredReviews =
    filterUrgency === "all" ? reviews : reviews.filter((review) => review.urgency === filterUrgency)

  const handleViewDetails = (review) => {
    alert(`Viewing details for ${review.patientName}'s ${review.scanType}`)
  }

  const handleRemindDoctor = (review) => {
    alert(`Reminder sent to ${review.doctor} for ${review.patientName}'s scan`)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="flex items-center">
          <div className="bg-orange-100 p-3 rounded-lg mr-3">
            <FaClock className="text-orange-600 text-xl" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Pending Doctor Reviews</h2>
            <p className="text-sm text-gray-600">{filteredReviews.length} scans awaiting review</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <FaFilter className="text-gray-400" />
          <select
            value={filterUrgency}
            onChange={(e) => setFilterUrgency(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 bg-white"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
      </div>

      {/* Yahan grid ko flex mein change kiya hai */}
      <div className="flex flex-wrap gap-5">
        {filteredReviews.map((review) => (
          <div key={review.id} className="flex-1 min-w-[calc(100%-10px)] md:min-w-[calc(50%-10px)] lg:min-w-[calc(33.333%-14px)]">
            <PendingReviewCard
              review={review}
              onViewDetails={handleViewDetails}
              onRemindDoctor={handleRemindDoctor}
            />
          </div>
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <FaClock className="text-5xl mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium">No pending reviews found</p>
          <p className="text-sm">Try adjusting your filter settings</p>
        </div>
      )}
    </div>
  )
}

export default PendingReviewsSection