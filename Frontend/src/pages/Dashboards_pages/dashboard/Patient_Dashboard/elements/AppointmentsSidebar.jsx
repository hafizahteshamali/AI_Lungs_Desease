"use client"

import { useState } from "react"
import { FaChevronDown } from "react-icons/fa"
import { Card } from "../../../../../components/Cards"
import Button from "../../../../../components/Button"

export default function AppointmentsSidebar({ appointments }) {
  const [selectedDay, setSelectedDay] = useState(new Date().getDate())

  // generate calendar days for current month
  const today = new Date()
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  return (
    <Card className="mb-6 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm text-gray-800">Upcoming Appointments</h3>
        <Button variant="ghost" size="sm">
          <FaChevronDown className="w-4 h-4" />
        </Button>
      </div>

      {/* Calendar - Yahan grid ko flex mein change kiya hai */}
      <div className="flex flex-wrap gap-1 mb-4 text-center text-xs md:text-sm">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-gray-500 font-medium text-[12px] flex-1 min-w-[calc(14.28% - 4px)]">
            {day}
          </div>
        ))}

        {daysArray.map((day) => (
          <div
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`p-2 rounded cursor-pointer flex-1 min-w-[calc(14.28% - 4px)] ${
              day === selectedDay
                ? "bg-blue-500 text-white h-[30px] w-[30px] flex justify-center items-center mx-auto"
                : "text-gray-700 hover:bg-gray-100 flex justify-center items-center"
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Appointment List */}
      <div className="space-y-3">
        {appointments.map((appointment, index) => (
          <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <img src={appointment.imgUrl || "/placeholder.svg"} alt="Doctor" className="w-8 h-8 rounded-full" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-800 text-sm">{appointment.title}</h4>
              <p className="text-xs text-gray-600">{appointment.doctor}</p>
              <p className="text-xs text-gray-500">{appointment.specialty}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}