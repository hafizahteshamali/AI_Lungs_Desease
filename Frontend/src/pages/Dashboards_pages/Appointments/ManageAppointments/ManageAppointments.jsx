"use client"
import { useState } from "react"
import { FaCalendarAlt, FaClipboardList, FaSave } from "react-icons/fa"
import { useAppointments } from "../AppointmentContext.jsx"
import DaySelector from "./elements/DaySelector"
import TimeSlotCard from "./elements/TimeSlotCard"
import FilterButtons from "./elements/FilterButtons"
import AppointmentCard from "./elements/AppointmentCard"
import TabButton from "./elements/TabButton"

const ManageAppointments = () => {
  const [activeTab, setActiveTab] = useState("availability")
  const [selectedDay, setSelectedDay] = useState("Monday")
  const [appointmentFilter, setAppointmentFilter] = useState("all")

  const { appointments, updateAppointmentStatus } = useAppointments()

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"]

  const [availability, setAvailability] = useState({
    Monday: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM"],
    Tuesday: ["09:00 AM", "11:00 AM", "03:00 PM", "04:00 PM"],
    Wednesday: ["10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"],
    Thursday: ["09:00 AM", "10:00 AM", "02:00 PM", "05:00 PM"],
    Friday: ["09:00 AM", "11:00 AM", "12:00 PM", "02:00 PM"],
    Saturday: ["10:00 AM", "11:00 AM"],
    Sunday: [],
  })

  const filterOptions = [
    { label: "All", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Confirmed", value: "confirmed" },
    { label: "Cancelled", value: "cancelled" },
  ]

  const toggleTimeSlot = (time) => {
    setAvailability((prev) => {
      const daySlots = prev[selectedDay] || []
      if (daySlots.includes(time)) {
        return {
          ...prev,
          [selectedDay]: daySlots.filter((slot) => slot !== time),
        }
      } else {
        return {
          ...prev,
          [selectedDay]: [...daySlots, time],
        }
      }
    })
  }

  const handleStatusChange = (id, newStatus) => {
    updateAppointmentStatus(id, newStatus)
  }

  const filteredAppointments = appointments.filter((apt) => {
    if (appointmentFilter === "all") return true
    return apt.status === appointmentFilter
  })

  const handleSaveAvailability = () => {
    // console.log("[v0] Saved availability:", availability)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Manage Appointments</h1>
          <p className="text-gray-600 text-lg">Set your availability and manage patient bookings</p>
        </div>

        <div className="flex gap-3 mb-8">
          <TabButton
            active={activeTab === "availability"}
            icon={FaCalendarAlt}
            label="Set Availability"
            onClick={() => setActiveTab("availability")}
          />
          <TabButton
            active={activeTab === "bookings"}
            icon={FaClipboardList}
            label="View Bookings"
            onClick={() => setActiveTab("bookings")}
          />
        </div>

        {activeTab === "availability" && (
          <div className="flex flex-col gap-6">
            <DaySelector selectedDay={selectedDay} onDayChange={setSelectedDay} availableDays={daysOfWeek} />

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Available Time Slots for {selectedDay}</h2>
              <p className="text-sm text-gray-600 mb-6">Click on time slots to toggle availability</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {timeSlots.map((time) => (
                  <TimeSlotCard
                    key={time}
                    time={time}
                    isAvailable={availability[selectedDay]?.includes(time)}
                    onToggle={() => toggleTimeSlot(time)}
                  />
                ))}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleSaveAvailability}
                  className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <FaSave />
                  <span>Save Availability</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "bookings" && (
          <div className="flex flex-col gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter Appointments</h2>
              <FilterButtons
                activeFilter={appointmentFilter}
                onFilterChange={setAppointmentFilter}
                filters={filterOptions}
              />
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {appointmentFilter === "all"
                  ? "All Appointments"
                  : `${appointmentFilter.charAt(0).toUpperCase() + appointmentFilter.slice(1)} Appointments`}
                <span className="text-gray-600 text-lg ml-2 font-normal">({filteredAppointments.length})</span>
              </h2>

              {filteredAppointments.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-lg p-12 text-center shadow-sm">
                  <p className="text-gray-600 text-lg">No appointments found</p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                  {filteredAppointments.map((appointment) => (
                    <AppointmentCard
                      key={appointment.id}
                      appointment={appointment}
                      onStatusChange={handleStatusChange}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ManageAppointments
