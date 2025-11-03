"use client"

import { useEffect, useMemo, useState } from "react"
import { MdPeople, MdMedicalInformation, MdLocalPharmacy, MdHistory, MdAssessment } from "react-icons/md"
import OverviewCards from "./elements/OverviewCards.jsx"
import UsersManagement from "./elements/UsersManagement.jsx"
import DiseasesManagement from "./elements/DiseasesManagement.jsx"
import MedicinesManagement from "./elements/MedicinesManagement.jsx"
import SystemLogs from "./elements/SystemLogs.jsx"

const Admin_Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview")

  const [users, setUsers] = useState([])
  const [diseases, setDiseases] = useState([])
  const [medicines, setMedicines] = useState([])
  const [logs, setLogs] = useState([])

  useEffect(() => {
    setUsers([
      {
        id: 1,
        name: "Dr. Ronald Richards",
        email: "ronald@hospital.com",
        role: "Doctor",
        status: "Active",
        joinDate: "2024-01-15",
      },
      {
        id: 2,
        name: "Dr. Leslie Alexander",
        email: "leslie@hospital.com",
        role: "Radiographer",
        status: "Active",
        joinDate: "2024-02-20",
      },
      {
        id: 3,
        name: "Robert Fox",
        email: "robert@hospital.com",
        role: "Patient",
        status: "Inactive",
        joinDate: "2024-03-10",
      },
      {
        id: 4,
        name: "Dr. Damion Lewis",
        email: "damion@hospital.com",
        role: "Doctor",
        status: "Active",
        joinDate: "2024-01-05",
      },
      {
        id: 5,
        name: "Dianne Russell",
        email: "dianne@hospital.com",
        role: "Patient",
        status: "Active",
        joinDate: "2024-04-01",
      },
    ])

    setDiseases([
      { id: 1, name: "Coronary Artery Disease", category: "Cardiology", severity: "High", cases: 125 },
      { id: 2, name: "Diabetes Mellitus", category: "Endocrinology", severity: "Medium", cases: 89 },
      { id: 3, name: "Chronic Kidney Disease", category: "Nephrology", severity: "High", cases: 67 },
      { id: 4, name: "Pneumonia", category: "Pulmonology", severity: "Medium", cases: 156 },
      { id: 5, name: "Osteoarthritis", category: "Orthopedics", severity: "Low", cases: 203 },
    ])

    setMedicines([
      { id: 1, name: "Paracetamol", dosage: "500mg", type: "Tablet", stock: 4500, price: 2.5 },
      { id: 2, name: "Amoxicillin", dosage: "250mg", type: "Capsule", stock: 1200, price: 5.75 },
      { id: 3, name: "Metformin", dosage: "500mg", type: "Tablet", stock: 890, price: 3.2 },
      { id: 4, name: "Atorvastatin", dosage: "20mg", type: "Tablet", stock: 670, price: 8.9 },
      { id: 5, name: "Losartan", dosage: "50mg", type: "Tablet", stock: 340, price: 6.45 },
    ])

    setLogs([
      {
        id: 1,
        action: "User Login",
        user: "Dr. Ronald Richards",
        timestamp: "2024-12-26 09:15:23",
        ip: "192.168.1.45",
      },
      {
        id: 2,
        action: "X-ray Upload",
        user: "Dr. Leslie Alexander",
        timestamp: "2024-12-26 10:30:45",
        ip: "192.168.1.67",
      },
      { id: 3, action: "Medicine Updated", user: "Admin", timestamp: "2024-12-26 11:45:12", ip: "192.168.1.10" },
      { id: 4, action: "Appointment Booked", user: "Robert Fox", timestamp: "2024-12-26 13:20:34", ip: "192.168.1.89" },
      { id: 5, action: "System Backup", user: "System", timestamp: "2024-12-26 03:00:00", ip: "127.0.0.1" },
    ])
  }, [])

  const addUser = (payload) => {
    setUsers((prev) => {
      const id = prev.length ? Math.max(...prev.map((u) => u.id)) + 1 : 1
      return [...prev, { id, ...payload }]
    })
  }
  const updateUser = (id, payload) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...payload } : u)))
  }
  const deleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id))
  }

  const addDisease = (payload) => {
    setDiseases((prev) => {
      const id = prev.length ? Math.max(...prev.map((d) => d.id)) + 1 : 1
      return [...prev, { id, ...payload }]
    })
  }
  const updateDisease = (id, payload) => {
    setDiseases((prev) => prev.map((d) => (d.id === id ? { ...d, ...payload } : d)))
  }
  const deleteDisease = (id) => {
    setDiseases((prev) => prev.filter((d) => d.id !== id))
  }

  const addMedicine = (payload) => {
    setMedicines((prev) => {
      const id = prev.length ? Math.max(...prev.map((m) => m.id)) + 1 : 1
      return [...prev, { id, ...payload }]
    })
  }
  const updateMedicine = (id, payload) => {
    setMedicines((prev) => prev.map((m) => (m.id === id ? { ...m, ...payload } : m)))
  }
  const deleteMedicine = (id) => {
    setMedicines((prev) => prev.filter((m) => m.id !== id))
  }

  const refreshLogs = () => {
    // simulate a refresh by adding a fresh log with current time
    const now = new Date()
    const pad = (n) => String(n).padStart(2, "0")
    const timestamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
    setLogs((prev) => [
      { id: (prev[0]?.id || 0) + 1, action: "System Refresh", user: "System", timestamp, ip: "127.0.0.1" },
      ...prev,
    ])
  }

  const tabs = useMemo(
    () => [
      { key: "overview", label: "Overview", icon: <MdAssessment className="text-xl" /> },
      { key: "users", label: "Users", icon: <MdPeople className="text-xl" /> },
      { key: "diseases", label: "Diseases", icon: <MdMedicalInformation className="text-xl" /> },
      { key: "medicines", label: "Medicines", icon: <MdLocalPharmacy className="text-xl" /> },
      { key: "logs", label: "Logs", icon: <MdHistory className="text-xl" /> },
    ],
    [],
  )

  return (
    <main className="min-h-screen w-full bg-background px-4 md:px-6 py-6">
      <header className="">
        <div className="w-[100%] mx-auto">
          <h1 className="text-3xl font-bold text-balance">Good Morning, Admin!</h1>
          <p className="text-muted-foreground mt-1">Welcome to your dashboard</p>
        </div>
      </header>

      {/* Tabs */}
      <div className="w-[100%] my-4">
        <div className="mx-auto w-full">
          <nav className="bg-card shadow-sm rounded-lg p-1 flex flex-wrap lg:flex-row gap-1 border border-border">
            {tabs.map((t) => {
              const active = activeTab === t.key
              return (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={`flex-1 w-[45%] lg:min-w-[18%] text-black flex items-center justify-center gap-2 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                    active ? "bg-[#2b7fff] text-white text-primary-foreground" : "text-foreground hover:bg-accent"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {t.icon}
                  <span>{t.label}</span>
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <section className="w-[100%] mt-5 lg:mt-0">
        <div className="w-full mx-auto space-y-6">
          {activeTab === "overview" && (
            <>
              <OverviewCards users={users} diseases={diseases} medicines={medicines} />
              <div className="flex flex-wrap gap-6">
                <div className="flex-1 basis-full lg:basis-1/2 w-[23%]">
                  <UsersManagement users={users} onAdd={addUser} onUpdate={updateUser} onDelete={deleteUser} />
                </div>
                <div className="flex-1 basis-full lg:basis-1/2 min-w-[320px]">
                  <SystemLogs logs={logs} onRefresh={refreshLogs} />
                </div>
              </div>
            </>
          )}

          {activeTab === "users" && (
            <UsersManagement users={users} onAdd={addUser} onUpdate={updateUser} onDelete={deleteUser} />
          )}

          {activeTab === "diseases" && (
            <DiseasesManagement
              diseases={diseases}
              onAdd={addDisease}
              onUpdate={updateDisease}
              onDelete={deleteDisease}
            />
          )}

          {activeTab === "medicines" && (
            <MedicinesManagement
              medicines={medicines}
              onAdd={addMedicine}
              onUpdate={updateMedicine}
              onDelete={deleteMedicine}
            />
          )}

          {activeTab === "logs" && <SystemLogs logs={logs} onRefresh={refreshLogs} />}
        </div>
      </section>
    </main>
  )
}

export default Admin_Dashboard
