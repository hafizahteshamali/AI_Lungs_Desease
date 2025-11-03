"use client"

import { MdCalendarToday, MdAccessTime, MdCheckCircle, MdPending, MdPlayArrow } from "react-icons/md"
import { formatDate, formatTime, priorityClasses, statusIconColor } from "./utils.jsx"

const AppointmentCard = ({ appointment, onSelect }) => {
  const statusIcon = appointment.status === "confirmed" ? <MdCheckCircle /> : <MdPending />

  return (
    <div className="bg-card text-card-foreground border border-border rounded-lg p-3 hover:shadow-md transition-shadow">
      {/* Header Section - Patient Info and Priority */}
      <div className="flex justify-between items-start gap-2 mb-2">
        <div className="flex flex-col min-w-0 flex-1">
          <h4 className="font-semibold text-sm truncate">{appointment.patientName}</h4>
          <p className="text-xs text-muted-foreground">
            {"Age: "}
            {appointment.patientAge}
            {" • "}
            {appointment.type}
          </p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs ${priorityClasses(appointment.priority)}`}>
          {appointment.priority}
        </span>
      </div>

      {/* Date and Time Section */}
      <div className="flex flex-wrap gap-3 text-xs mb-2 text-muted-foreground">
        <span className="flex items-center gap-1">
          <MdCalendarToday className="text-primary" />
          {formatDate(appointment.appointmentTime)}
        </span>
        <span className="flex items-center gap-1">
          <MdAccessTime className="text-primary" />
          {formatTime(appointment.appointmentTime)}
        </span>
      </div>

      {/* Status and Action Section */}
      <div className="flex justify-between items-center">
        <span className={`flex items-center gap-1 text-xs ${statusIconColor(appointment.status)}`}>
          {statusIcon}
          {appointment.status}
        </span>
        <button
          onClick={() => onSelect?.(appointment)}
          className="text-primary hover:opacity-80 p-1"
          aria-label="Open appointment"
        >
          <MdPlayArrow className="text-base" />
        </button>
      </div>

      {/* Reason Section */}
      <p className="text-xs text-muted-foreground mt-2 truncate">
        {"Reason: "}
        {appointment.reason}
      </p>
    </div>
  )
}

export default AppointmentCard