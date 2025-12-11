"use client"
// React icons import karte hain card mein use ke liye
import { FaCalendarAlt, FaUserMd, FaExclamationCircle, FaBell } from "react-icons/fa"

// Yeh component ek individual pending review card display karta hai
const PendingReviewCard = ({ review, onViewDetails, onRemindDoctor }) => {
  // Yeh function urgency level ke hisaab se styling classes return karta hai
  const getUrgencyStyles = (urgency) => {
    switch (urgency) {
      case "high":
        return {
          badge: "bg-red-100 text-red-800 border-red-200", // Red styling for high urgency
          border: "border-red-300", // Red border
          icon: "text-red-500", // Red icon color
        }
      case "medium":
        return {
          badge: "bg-yellow-100 text-yellow-800 border-yellow-200", // Yellow styling for medium urgency
          border: "border-yellow-300", // Yellow border
          icon: "text-yellow-500", // Yellow icon color
        }
      default:
        return {
          badge: "bg-blue-100 text-blue-800 border-blue-200", // Blue styling for low/default urgency
          border: "border-blue-300", // Blue border
          icon: "text-blue-500", // Blue icon color
        }
    }
  }

  // Current review ke liye styling get karta hai
  const styles = getUrgencyStyles(review.urgency)

  return (
    // Main card container jo hover effects aur styling provide karta hai
    <div
      className={`bg-white border-2 ${styles.border} rounded-xl p-5 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
    >
      {/* Header section jo patient info aur urgency badge dikhata hai */}
      <div className="flex justify-between items-start mb-4">
        {/* Left side - patient information */}
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-lg mb-1">{review.patientName}</h3> {/* Patient name in bold */}
          <p className="text-sm text-gray-600 font-medium">{review.scanType}</p> {/* Scan type */}
        </div>
        {/* Right side - urgency indicator */}
        <div className="flex items-center">
          <FaExclamationCircle className={`mr-2 ${styles.icon}`} /> {/* Urgency icon with dynamic color */}
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${styles.badge}`}>
            {review.urgency.toUpperCase()} {/* Urgency level in uppercase */}
          </span>
        </div>
      </div>

      {/* Details section jo date, time aur doctor information dikhata hai */}
      <div className="space-y-3 mb-4">
        {/* Date and time information */}
        <div className="flex items-center text-sm text-gray-700 bg-gray-50 p-2 rounded-lg">
          <FaCalendarAlt className="mr-3 text-gray-400" /> {/* Calendar icon */}
          <span>
            {review.date} at {review.time} {/* Date aur time display */}
          </span>
        </div>
        {/* Doctor information */}
        <div className="flex items-center text-sm text-gray-700 bg-gray-50 p-2 rounded-lg">
          <FaUserMd className="mr-3 text-gray-400" /> {/* Doctor icon */}
          <span>{review.doctor}</span> {/* Doctor name */}
        </div>
      </div>

      {/* Action buttons section */}
      <div className="flex gap-2">
        {/* View Details button */}
        <button
          onClick={() => onViewDetails(review)} // onViewDetails function call karta hai review data ke saath
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold w-[45%] py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
        >
          View Details
        </button>
        {/* Remind Doctor button */}
        <button
          onClick={() => onRemindDoctor(review)} // onRemindDoctor function call karta hai review data ke saath
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold w-[45%] py-2 rounded-lg transition-all duration-300 flex items-center justify-center"
        >
          <FaBell className="mr-1" /> {/* Bell icon */}
          Remind {/* Button text */}
        </button>
      </div>
    </div>
  )
}

export default PendingReviewCard