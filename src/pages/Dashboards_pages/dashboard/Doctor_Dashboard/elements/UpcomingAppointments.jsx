"use client"

import { useMemo, useState } from "react"
import { MdSearch, MdFilterList } from "react-icons/md"
import AppointmentCard from "./AppointmentCard"
import { initialAppointments } from "../../../../../assets/Constant"

const UpcomingAppointments = ({ onOpenDetail }) => {
  const [appointments] = useState(initialAppointments)
  const [q, setQ] = useState("")
  const [priority, setPriority] = useState("all")

  const filtered = useMemo(() => {
    return appointments.filter((a) => {
      const matchText =
        a.patientName.toLowerCase().includes(q.toLowerCase()) ||
        a.type.toLowerCase().includes(q.toLowerCase()) ||
        a.reason.toLowerCase().includes(q.toLowerCase())
      const matchPriority = priority === "all" ? true : a.priority === priority
      return matchText && matchPriority
    })
  }, [appointments, q, priority])

  return (
    <section className="text-card-foreground rounded-lg shadow-sm py-4 px-2 border border-gray-300 w-[100%]">
      {/* Header with Search and Filters */}
      <div className="flex flex-col justify-between items-start gap-3 mb-4">
        <h3 className="text-lg font-semibold">Upcoming Appointments</h3>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
          {/* Search Input */}
          <div className="flex items-center gap-2 w-full sm:w-64">
            <div className="relative flex-1">
              <MdSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                aria-label="Search appointments"
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md bg-background text-foreground placeholder:text-muted-foreground"
                placeholder="Search patient, type, reason"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
          </div>

          {/* Filter Section */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <MdFilterList className="text-muted-foreground shrink-0" />
            <select
              aria-label="Filter by priority"
              className="flex-1 sm:flex-none py-2 px-3 border border-gray-300 bg-background text-foreground rounded-md min-w-32"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="all">All priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Appointments Grid */}
      <div className="flex flex-col gap-3">
        {filtered.map((appointment) => (
          <div key={appointment.id} className="flex-1 w-[100%]">
            <AppointmentCard appointment={appointment} onSelect={onOpenDetail} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default UpcomingAppointments