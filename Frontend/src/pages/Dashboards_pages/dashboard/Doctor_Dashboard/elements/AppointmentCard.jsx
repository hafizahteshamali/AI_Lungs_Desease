"use client"

import { MdCalendarToday, MdAccessTime, MdCheckCircle, MdPending, MdPlayArrow } from "react-icons/md"
import { formatDate, formatTime, priorityClasses, statusIconColor } from "./utils.jsx"

// Yeh component ek individual appointment card display karta hai
const AppointmentCard = ({ appointment, onSelect }) => {
  // Status ke hisaab se icon set karta hai
  const statusIcon = appointment.status === "confirmed" ? <MdCheckCircle /> : <MdPending />

  return (
    // Main card container jo hover effects aur styling provide karta hai
    <div className="bg-card text-card-foreground border border-border rounded-lg p-3 hover:shadow-md transition-shadow">
      {/* Header Section - Patient Info and Priority */}
      <div className="flex justify-between items-start gap-2 mb-2">
        {/* Patient information section */}
        <div className="flex flex-col min-w-0 flex-1">
          <h4 className="font-semibold text-sm truncate">{appointment.patientName}</h4> {/* Patient name jo truncate ho jata hai agar lamba hai */}
          <p className="text-xs text-muted-foreground">
            {"Age: "}
            {appointment.patientAge}
            {" • "}
            {appointment.type}
          </p> {/* Patient age aur appointment type */}
        </div>
        {/* Priority badge jo color-coded hai */}
        <span className={`px-2 py-1 rounded-full text-xs ${priorityClasses(appointment.priority)}`}>
          {appointment.priority} {/* Priority level display karta hai */}
        </span>
      </div>

      {/* Date and Time Section */}
      <div className="flex flex-wrap gap-3 text-xs mb-2 text-muted-foreground">
        {/* Date display with icon */}
        <span className="flex items-center gap-1">
          <MdCalendarToday className="text-primary" />
          {formatDate(appointment.appointmentTime)} {/* Formatted date display karta hai */}
        </span>
        {/* Time display with icon */}
        <span className="flex items-center gap-1">
          <MdAccessTime className="text-primary" />
          {formatTime(appointment.appointmentTime)} {/* Formatted time display karta hai */}
        </span>
      </div>

      {/* Status and Action Section */}
      <div className="flex justify-between items-center">
        {/* Status display with icon */}
        <span className={`flex items-center gap-1 text-xs ${statusIconColor(appointment.status)}`}>
          {statusIcon} {/* Status icon */}
          {appointment.status} {/* Status text */}
        </span>
        {/* Action button jo appointment details open karta hai */}
        <button
          onClick={() => onSelect?.(appointment)} // onSelect function call karta hai appointment data ke saath
          className="text-primary hover:opacity-80 p-1" // Hover effect aur styling
          aria-label="Open appointment" // Accessibility label
        >
          <MdPlayArrow className="text-base" /> {/* Play/Open icon */}
        </button>
      </div>

      {/* Reason Section */}
      <p className="text-xs text-muted-foreground mt-2 truncate">
        {"Reason: "}
        {appointment.reason} {/* Appointment reason jo truncate ho jata hai agar lamba hai */}
      </p>
    </div>
  )
}

export default AppointmentCard