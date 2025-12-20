"use client"
import { FaCheckCircle, FaCalendarAlt, FaClock, FaEnvelope, FaPhone, FaRedo, FaUser } from "react-icons/fa"

const SuccessMessage = ({ appointmentData, onBookAnother }) => {
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="w-full max-w-3xl mx-auto text-center py-8">
      <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-green-100 mb-6 shadow-md">
        <FaCheckCircle className="w-16 h-16 text-green-600" />
      </div>

      <h2 className="text-4xl font-bold text-gray-900 mb-3">Appointment Confirmed!</h2>
      <p className="text-gray-600 text-xl mb-10">Your appointment has been successfully booked</p>

      <div className="bg-white border-2 border-blue-200 rounded-xl p-8 mb-8 text-left shadow-md">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center gap-2">
          <FaCalendarAlt className="w-6 h-6 text-blue-600" />
          Appointment Summary
        </h3>

        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600">
              <FaUser className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-600 font-medium">Patient Name</div>
              <div className="font-bold text-gray-900 text-lg">{appointmentData.name}</div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600">
              <FaCalendarAlt className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-600 font-medium">Date</div>
              <div className="font-bold text-gray-900 text-lg">{formatDate(appointmentData.date)}</div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600">
              <FaClock className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-600 font-medium">Time</div>
              <div className="font-bold text-gray-900 text-lg">{appointmentData.time}</div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600">
              <FaEnvelope className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-600 font-medium">Email</div>
              <div className="font-bold text-gray-900 text-lg">{appointmentData.email}</div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600">
              <FaPhone className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-600 font-medium">Phone</div>
              <div className="font-bold text-gray-900 text-lg">{appointmentData.phone}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
        <button
          onClick={onBookAnother}
          className="px-8 py-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-bold text-base shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          <FaRedo className="w-5 h-5" />
          Book Another Appointment
        </button>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-gray-700 text-sm">
          A confirmation email has been sent to <span className="font-bold">{appointmentData.email}</span>
        </p>
      </div>
    </div>
  )
}

export default SuccessMessage
