"use client"

import { FaClock, FaCheck, FaTimes } from "react-icons/fa"

const TimeSlotCard = ({ time, isAvailable, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`p-4 rounded-lg border-2 transition-all font-semibold flex flex-col items-center gap-2 ${
        isAvailable ? "bg-green-50 border-green-500 text-green-700" : "bg-gray-50 border-gray-300 text-gray-500"
      }`}
    >
      <FaClock className="w-5 h-5" />
      <span>{time}</span>
      {isAvailable ? <FaCheck className="w-4 h-4 text-green-600" /> : <FaTimes className="w-4 h-4 text-gray-400" />}
    </button>
  )
}

export default TimeSlotCard
