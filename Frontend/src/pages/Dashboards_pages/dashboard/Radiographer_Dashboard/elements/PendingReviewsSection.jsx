"use client"

import { useState } from "react"
import { FaClock, FaFilter } from "react-icons/fa"
import PendingReviewCard from "./PendingReviewCard"

// Yeh component pending doctor reviews section display karta hai
const PendingReviewsSection = ({ reviews }) => {
  // Yeh state filter urgency ko track karta hai
  const [filterUrgency, setFilterUrgency] = useState("all")

  // Yeh filtered reviews calculate karta hai based on urgency filter
  const filteredReviews =
    filterUrgency === "all" 
      ? reviews // Agar "all" selected hai toh sabhi reviews
      : reviews.filter((review) => review.urgency === filterUrgency) // Sirf matching urgency wale reviews

  // Yeh function view details button par click handle karta hai
  const handleViewDetails = (review) => {
    // console.log(`Viewing details for ${review.patientName}'s ${review.scanType}`)
  }

  // Yeh function remind doctor button par click handle karta hai
  const handleRemindDoctor = (review) => {
    console.log(`Reminder sent to ${review.doctor} for ${review.patientName}'s scan`) 
  }

  return (
    // Main container jo white background aur shadow provide karta hai
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Header section jo title, count aur filter dikhata hai */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        {/* Left side - title aur count */}
        <div className="flex items-center">
          <div className="bg-orange-100 p-3 rounded-lg mr-3">
            <FaClock className="text-orange-600 text-xl" /> {/* Clock icon with orange styling */}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Pending Doctor Reviews</h2> {/* Section title */}
            <p className="text-sm text-gray-600">{filteredReviews.length} scans awaiting review</p> {/* Dynamic count */}
          </div>
        </div>

        {/* Right side - filter dropdown */}
        <div className="flex items-center gap-2">
          <FaFilter className="text-gray-400" /> {/* Filter icon */}
          <select
            value={filterUrgency}
            onChange={(e) => setFilterUrgency(e.target.value)} // Filter change handler
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 bg-white"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
      </div>

      {/* Reviews grid jo responsive flex layout use karta hai */}
      <div className="flex flex-wrap gap-5">
        {/* Har filtered review ke liye loop chalta hai */}
        {filteredReviews.map((review) => (
          // Responsive width container
          <div key={review.id} className="flex-1 min-w-[calc(100%-10px)] md:min-w-[calc(50%-10px)] lg:min-w-[calc(33.333%-14px)]">
            {/* Individual pending review card */}
            <PendingReviewCard
              review={review} // Review data pass karta hai
              onViewDetails={handleViewDetails} // View details function pass karta hai
              onRemindDoctor={handleRemindDoctor} // Remind doctor function pass karta hai
            />
          </div>
        ))}
      </div>

      {/* Empty state message agar koi review nahi hai */}
      {filteredReviews.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <FaClock className="text-5xl mx-auto mb-4 text-gray-300" /> {/* Large clock icon */}
          <p className="text-lg font-medium">No pending reviews found</p> {/* Main message */}
          <p className="text-sm">Try adjusting your filter settings</p> {/* Helper text */}
        </div>
      )}
    </div>
  )
}

export default PendingReviewsSection