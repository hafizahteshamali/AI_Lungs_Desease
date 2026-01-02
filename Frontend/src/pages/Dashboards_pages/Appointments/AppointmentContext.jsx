"use client"
import { createContext, useContext, useState } from "react"

const AppointmentContext = createContext()

export function AppointmentProvider({ children }) {
  const [appointments, setAppointments] = useState([])

  // Naya appointment add karne ka function
  const addAppointment = (appointmentData) => {
    const newAppointment = {
      id: Date.now(),
      patientName: appointmentData.name,
      date: appointmentData.date.toISOString().split("T")[0],
      time: appointmentData.time,
      phone: appointmentData.phone,
      email: appointmentData.email,
      reason: appointmentData.reason || "Not specified",
      status: "pending",
      bookedAt: new Date().toISOString(),
    }

    setAppointments((prev) => [...prev, newAppointment])
    return newAppointment
  }

  // Appointment ki status update karne ka function
  const updateAppointmentStatus = (id, newStatus) => {
    setAppointments((prev) => prev.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt)))
  }

  // Appointment delete karne ka function
  const deleteAppointment = (id) => {
    setAppointments((prev) => prev.filter((apt) => apt.id !== id))
  }

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        addAppointment,
        updateAppointmentStatus,
        deleteAppointment,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  )
}

export function useAppointments() {
  const context = useContext(AppointmentContext)
  if (!context) {
    throw new Error("useAppointments must be used within AppointmentProvider")
  }
  return context
}
