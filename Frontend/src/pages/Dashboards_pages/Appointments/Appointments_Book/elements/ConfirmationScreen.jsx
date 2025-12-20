"use client"
import { useState } from "react"
import { FaCheckCircle, FaCalendarAlt, FaClock, FaUser, FaEnvelope, FaPhone, FaEdit } from "react-icons/fa"

const ConfirmationScreen = ({ appointmentData, onEdit, onConfirm }) => {
  const [patientInfo, setPatientInfo] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onConfirm(patientInfo)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setPatientInfo((prev) => ({ ...prev, [name]: value }))
  }

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-4 shadow-sm">
          <FaCheckCircle className="w-10 h-10 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Confirm Your Appointment</h2>
        <p className="text-gray-600 text-lg">Please review your appointment details and provide your information</p>
      </div>

      <div className="bg-white border-2 border-blue-200 rounded-xl p-6 mb-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
          <FaCalendarAlt className="w-5 h-5 text-blue-600" />
          Appointment Details
        </h3>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 shadow-sm">
              <FaCalendarAlt className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Date</p>
              <p className="font-bold text-gray-900 text-lg">{formatDate(appointmentData.date)}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 shadow-sm">
              <FaClock className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Time</p>
              <p className="font-bold text-gray-900 text-lg">{appointmentData.time}</p>
            </div>
          </div>
        </div>

        <button
          onClick={onEdit}
          className="mt-6 w-full py-3 px-4 rounded-lg border-2 border-blue-600 bg-white text-blue-600 hover:bg-blue-50 transition-colors text-sm font-bold flex items-center justify-center gap-2 shadow-sm"
        >
          <FaEdit className="w-4 h-4" />
          Edit Date or Time
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
          <FaUser className="w-5 h-5 text-blue-600" />
          Your Information
        </h3>

        <div className="flex flex-col gap-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
              <FaUser className="w-4 h-4 text-blue-600" />
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={patientInfo.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
              <FaEnvelope className="w-4 h-4 text-blue-600" />
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={patientInfo.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
              <FaPhone className="w-4 h-4 text-blue-600" />
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={patientInfo.phone}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-900 mb-2 block">Reason for Visit (Optional)</label>
            <textarea
              name="reason"
              value={patientInfo.reason}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none font-medium"
              placeholder="Brief description of your concern..."
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full py-4 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-bold text-base shadow-md hover:shadow-lg"
        >
          Confirm Appointment
        </button>

        <p className="mt-4 text-sm text-gray-600 text-center bg-blue-50 p-3 rounded-lg">
          You will receive a confirmation email shortly after booking
        </p>
      </form>
    </div>
  )
}

export default ConfirmationScreen
