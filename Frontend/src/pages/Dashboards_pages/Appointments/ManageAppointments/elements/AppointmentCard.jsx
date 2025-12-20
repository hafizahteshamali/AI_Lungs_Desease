"use client"

import { FaUser, FaCalendarAlt, FaClock, FaPhone, FaEnvelope, FaInfoCircle } from "react-icons/fa"

const AppointmentCard = ({ appointment, onStatusChange }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-300"
      case "confirmed":
        return "bg-green-100 text-green-700 border-green-300"
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-300"
      default:
        return "bg-gray-100 text-gray-700 border-gray-300"
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
            <FaUser className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{appointment.patientName}</h3>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border mt-1 ${getStatusColor(
                appointment.status,
              )}`}
            >
              {appointment.status.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 mb-4">
        <div className="flex items-center gap-3 text-gray-700">
          <FaCalendarAlt className="w-4 h-4 text-blue-600" />
          <span className="font-medium">{appointment.date}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-700">
          <FaClock className="w-4 h-4 text-blue-600" />
          <span className="font-medium">{appointment.time}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-700">
          <FaPhone className="w-4 h-4 text-blue-600" />
          <span className="font-medium">{appointment.phone}</span>
        </div>
        {appointment.email && (
          <div className="flex items-center gap-3 text-gray-700">
            <FaEnvelope className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-sm">{appointment.email}</span>
          </div>
        )}
        {appointment.reason && (
          <div className="flex items-start gap-3 text-gray-700">
            <FaInfoCircle className="w-4 h-4 text-blue-600 mt-1" />
            <span className="font-medium text-sm">{appointment.reason}</span>
          </div>
        )}
      </div>

      <div className="flex gap-2 pt-4 border-t border-gray-200">
        <button
          onClick={() => onStatusChange(appointment.id, "confirmed")}
          disabled={appointment.status === "confirmed"}
          className="flex-1 px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          Confirm
        </button>
        <button
          onClick={() => onStatusChange(appointment.id, "cancelled")}
          disabled={appointment.status === "cancelled"}
          className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default AppointmentCard
