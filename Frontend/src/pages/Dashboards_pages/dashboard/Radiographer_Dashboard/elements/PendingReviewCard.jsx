"use client"
import { FaCalendarAlt, FaUserMd, FaExclamationCircle, FaBell } from "react-icons/fa"

const PendingReviewCard = ({ review, onViewDetails, onRemindDoctor }) => {
  const getUrgencyStyles = (urgency) => {
    switch (urgency) {
      case "high":
        return {
          badge: "bg-red-100 text-red-800 border-red-200",
          border: "border-red-300",
          icon: "text-red-500",
        }
      case "medium":
        return {
          badge: "bg-yellow-100 text-yellow-800 border-yellow-200",
          border: "border-yellow-300",
          icon: "text-yellow-500",
        }
      default:
        return {
          badge: "bg-blue-100 text-blue-800 border-blue-200",
          border: "border-blue-300",
          icon: "text-blue-500",
        }
    }
  }

  const styles = getUrgencyStyles(review.urgency)

  return (
    <div
      className={`bg-white border-2 ${styles.border} rounded-xl p-5 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-lg mb-1">{review.patientName}</h3>
          <p className="text-sm text-gray-600 font-medium">{review.scanType}</p>
        </div>
        <div className="flex items-center">
          <FaExclamationCircle className={`mr-2 ${styles.icon}`} />
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${styles.badge}`}>
            {review.urgency.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm text-gray-700 bg-gray-50 p-2 rounded-lg">
          <FaCalendarAlt className="mr-3 text-gray-400" />
          <span>
            {review.date} at {review.time}
          </span>
        </div>
        <div className="flex items-center text-sm text-gray-700 bg-gray-50 p-2 rounded-lg">
          <FaUserMd className="mr-3 text-gray-400" />
          <span>{review.doctor}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onViewDetails(review)}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold w-[45%] py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
        >
          View Details
        </button>
        <button
          onClick={() => onRemindDoctor(review)}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold w-[45%] py-2 rounded-lg transition-all duration-300 flex items-center justify-center"
        >
          <FaBell className="mr-1" />
          Remind
        </button>
      </div>
    </div>
  )
}

export default PendingReviewCard
