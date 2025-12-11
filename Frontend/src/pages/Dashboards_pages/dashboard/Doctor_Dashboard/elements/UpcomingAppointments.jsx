"use client"

import { useMemo, useState } from "react"
import { MdSearch, MdFilterList } from "react-icons/md"
import AppointmentCard from "./AppointmentCard"
import { initialAppointments } from "../../../../../assets/Constant"

// Yeh component upcoming appointments display karta hai
const UpcomingAppointments = ({ onOpenDetail }) => {
  // Yeh state appointments data ko store karta hai
  const [appointments] = useState(initialAppointments)
  // Yeh state search query ko track karta hai
  const [q, setQ] = useState("")
  // Yeh state priority filter ko track karta hai
  const [priority, setPriority] = useState("all")

  // Yeh useMemo filtered appointments calculate karta hai based on search and filter
  const filtered = useMemo(() => {
    return appointments.filter((a) => {
      // Text search filter: patient name, type, ya reason mein search karta hai
      const matchText =
        a.patientName.toLowerCase().includes(q.toLowerCase()) || // Patient name mein search
        a.type.toLowerCase().includes(q.toLowerCase()) || // Appointment type mein search
        a.reason.toLowerCase().includes(q.toLowerCase()) // Reason mein search
      
      // Priority filter: "all" ya specific priority check karta hai
      const matchPriority = priority === "all" ? true : a.priority === priority
      
      // Dono filters match hone par hi appointment include hota hai
      return matchText && matchPriority
    })
  }, [appointments, q, priority]) // Jab appointments, search query ya priority change ho tab re-calculate karta hai

  return (
    // Main container section jo card style provide karta hai
    <section className="text-card-foreground rounded-lg shadow-sm py-4 px-2 border border-gray-300 w-[100%]">
      {/* Header with Search and Filters */}
      <div className="flex flex-col justify-between items-start gap-3 mb-4">
        <h3 className="text-lg font-semibold">Upcoming Appointments</h3> {/* Section title */}
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
          {/* Search Input jo patients, types aur reasons search karta hai */}
          <div className="flex items-center gap-2 w-full sm:w-64">
            <div className="relative flex-1">
              <MdSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" /> {/* Search icon */}
              <input
                aria-label="Search appointments" // Accessibility label
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md bg-background text-foreground placeholder:text-muted-foreground"
                placeholder="Search patient, type, reason"
                value={q}
                onChange={(e) => setQ(e.target.value)} // Search query update karta hai
              />
            </div>
          </div>

          {/* Filter Section jo priority ke hisaab se filter karta hai */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <MdFilterList className="text-muted-foreground shrink-0" /> {/* Filter icon */}
            <select
              aria-label="Filter by priority" // Accessibility label
              className="flex-1 sm:flex-none py-2 px-3 border border-gray-300 bg-background text-foreground rounded-md min-w-32"
              value={priority}
              onChange={(e) => setPriority(e.target.value)} // Priority filter update karta hai
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

      {/* Appointments Grid jo filtered appointments display karta hai */}
      <div className="flex flex-col gap-3">
        {/* Har filtered appointment ke liye loop chalta hai */}
        {filtered.map((appointment) => (
          <div key={appointment.id} className="flex-1 w-[100%]">
            {/* AppointmentCard component jo ek individual appointment dikhata hai */}
            <AppointmentCard appointment={appointment} onSelect={onOpenDetail} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default UpcomingAppointments