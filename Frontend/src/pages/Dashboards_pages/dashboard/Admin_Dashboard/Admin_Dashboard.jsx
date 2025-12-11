"use client"

import { useEffect, useMemo, useState } from "react"
import { MdPeople, MdMedicalInformation, MdLocalPharmacy, MdHistory, MdAssessment } from "react-icons/md"
import OverviewCards from "./elements/OverviewCards.jsx"
import UsersManagement from "./elements/UsersManagement.jsx"
import DiseasesManagement from "./elements/DiseasesManagement.jsx"
import MedicinesManagement from "./elements/MedicinesManagement.jsx"
import SystemLogs from "./elements/SystemLogs.jsx"

const Admin_Dashboard = () => {
  // Yeh state active tab ko track karta hai - overview, users, diseases, medicines, ya logs
  const [activeTab, setActiveTab] = useState("overview")

  // Yeh state users ke data ko store karta hai - doctors, radiographers, patients
  const [users, setUsers] = useState([])
  // Yeh state diseases ke data ko store karta hai - bimariyon ki list
  const [diseases, setDiseases] = useState([])
  // Yeh state medicines ke data ko store karta hai - dawaon ki list
  const [medicines, setMedicines] = useState([])
  // Yeh state system logs ko store karta hai - system activities ki history
  const [logs, setLogs] = useState([])

  // Yeh useEffect component load hone par initial data set karta hai
  useEffect(() => {
    // Initial users data set karega - 5 fake users create karta hai
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

    // Initial diseases data set karega - 5 common diseases create karta hai
    setDiseases([
      { id: 1, name: "Coronary Artery Disease", category: "Cardiology", severity: "High", cases: 125 },
      { id: 2, name: "Diabetes Mellitus", category: "Endocrinology", severity: "Medium", cases: 89 },
      { id: 3, name: "Chronic Kidney Disease", category: "Nephrology", severity: "High", cases: 67 },
      { id: 4, name: "Pneumonia", category: "Pulmonology", severity: "Medium", cases: 156 },
      { id: 5, name: "Osteoarthritis", category: "Orthopedics", severity: "Low", cases: 203 },
    ])

    // Initial medicines data set karega - 5 common medicines create karta hai
    setMedicines([
      { id: 1, name: "Paracetamol", dosage: "500mg", type: "Tablet", stock: 4500, price: 2.5 },
      { id: 2, name: "Amoxicillin", dosage: "250mg", type: "Capsule", stock: 1200, price: 5.75 },
      { id: 3, name: "Metformin", dosage: "500mg", type: "Tablet", stock: 890, price: 3.2 },
      { id: 4, name: "Atorvastatin", dosage: "20mg", type: "Tablet", stock: 670, price: 8.9 },
      { id: 5, name: "Losartan", dosage: "50mg", type: "Tablet", stock: 340, price: 6.45 },
    ])

    // Initial system logs data set karega - 4 system activities create karta hai
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
      { id: 4, action: "System Backup", user: "System", timestamp: "2024-12-26 03:00:00", ip: "127.0.0.1" },
    ])
  }, []) // Empty array means yeh sirf ek baar chalega component load hone par

  // Yeh function naya user add karta hai - users array mein naya user insert karega
  const addUser = (payload) => {
    setUsers((prev) => {
      // Naya ID generate karta hai - existing maximum ID + 1
      const id = prev.length ? Math.max(...prev.map((u) => u.id)) + 1 : 1
      // Existing users ke end mein naya user add karta hai
      return [...prev, { id, ...payload }]
    })
  }
  
  // Yeh function existing user ko update karta hai - user ki information change karega
  const updateUser = (id, payload) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...payload } : u)))
    // Map se har user check karta hai, matching ID wale user ko update karta hai
  }
  
  // Yeh function user ko delete karta hai - users array se user remove karega
  const deleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id))
    // Filter se sirf woh users retain hote hain jinki ID match nahi karti
  }

  // Yeh function naya disease add karta hai - diseases array mein naya disease insert karega
  const addDisease = (payload) => {
    setDiseases((prev) => {
      // Naya ID generate karta hai - existing maximum ID + 1
      const id = prev.length ? Math.max(...prev.map((d) => d.id)) + 1 : 1
      // Existing diseases ke end mein naya disease add karta hai
      return [...prev, { id, ...payload }]
    })
  }
  
  // Yeh function existing disease ko update karta hai - disease ki information change karega
  const updateDisease = (id, payload) => {
    setDiseases((prev) => prev.map((d) => (d.id === id ? { ...d, ...payload } : d)))
    // Map se har disease check karta hai, matching ID wale disease ko update karta hai
  }
  
  // Yeh function disease ko delete karta hai - diseases array se disease remove karega
  const deleteDisease = (id) => {
    setDiseases((prev) => prev.filter((d) => d.id !== id))
    // Filter se sirf woh diseases retain hoti hain jinki ID match nahi karti
  }

  // Yeh function naya medicine add karta hai - medicines array mein naya medicine insert karega
  const addMedicine = (payload) => {
    setMedicines((prev) => {
      // Naya ID generate karta hai - existing maximum ID + 1
      const id = prev.length ? Math.max(...prev.map((m) => m.id)) + 1 : 1
      // Existing medicines ke end mein naya medicine add karta hai
      return [...prev, { id, ...payload }]
    })
  }
  
  // Yeh function existing medicine ko update karta hai - medicine ki information change karega
  const updateMedicine = (id, payload) => {
    setMedicines((prev) => prev.map((m) => (m.id === id ? { ...m, ...payload } : m)))
    // Map se har medicine check karta hai, matching ID wale medicine ko update karta hai
  }
  
  // Yeh function medicine ko delete karta hai - medicines array se medicine remove karega
  const deleteMedicine = (id) => {
    setMedicines((prev) => prev.filter((m) => m.id !== id))
    // Filter se sirf woh medicines retain hoti hain jinki ID match nahi karti
  }

  // Yeh function system logs refresh karta hai - current time ka naya log entry add karega
  const refreshLogs = () => {
    // Current date aur time generate karta hai
    const now = new Date()
    // Helper function jo single digit numbers ko 2 digit format mein convert karta hai (5 → "05")
    const pad = (n) => String(n).padStart(2, "0")
    // Format: YYYY-MM-DD HH:MM:SS
    const timestamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
    
    // Naya log entry existing logs ke start mein add karta hai
    setLogs((prev) => [
      // Naya log entry create karta hai
      { id: (prev[0]?.id || 0) + 1, action: "System Refresh", user: "System", timestamp, ip: "127.0.0.1" },
      // Existing logs retain karta hai
      ...prev,
    ])
  }

  // Yeh useMemo tab options ko define karta hai aur optimize karta hai
  const tabs = useMemo(
    () => [
      { key: "overview", label: "Overview", icon: <MdAssessment className="text-xl" /> },
      { key: "users", label: "Users", icon: <MdPeople className="text-xl" /> },
      { key: "diseases", label: "Diseases", icon: <MdMedicalInformation className="text-xl" /> },
      { key: "medicines", label: "Medicines", icon: <MdLocalPharmacy className="text-xl" /> },
      { key: "logs", label: "Logs", icon: <MdHistory className="text-xl" /> },
    ],
    [], // Empty dependency array means yeh sirf ek baar calculate hoga
  )

  return (
    // Main container jo puri screen cover karta hai
    <main className="min-h-screen w-full bg-background px-4 md:px-6 py-6">
      {/* Header section jo welcome message dikhata hai */}
      <header className="">
        <div className="w-[100%] mx-auto">
          <h1 className="text-3xl font-bold text-balance">Good Morning, Admin!</h1>
          <p className="text-muted-foreground mt-1">Welcome to your dashboard</p>
        </div>
      </header>

      {/* Tabs navigation section */}
      <div className="w-[100%] my-4">
        <div className="mx-auto w-full">
          {/* Tabs container with styling */}
          <nav className="bg-card shadow-sm rounded-lg p-1 flex flex-wrap lg:flex-row gap-1 border border-border">
            {/* Har tab button dynamically generate karta hai */}
            {tabs.map((t) => {
              // Check karta hai ke current tab active hai ya nahi
              const active = activeTab === t.key
              return (
                // Tab button jo tab switch karta hai
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)} // Tab click par active tab change karta hai
                  className={`flex-1 w-[45%] lg:min-w-[18%] text-black flex items-center justify-center gap-2 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                    // Active tab ko blue background dikhata hai, inactive ko default
                    active ? "bg-[#2b7fff] text-white text-primary-foreground" : "text-foreground hover:bg-accent"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {t.icon} {/* Tab icon display karta hai */}
                  <span>{t.label}</span> {/* Tab label display karta hai */}
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main content area jo tab ke hisaab se change hota hai */}
      <section className="w-[100%] mt-5 lg:mt-0">
        <div className="w-full mx-auto space-y-6">
          {/* Overview tab content - dashboard cards aur summary */}
          {activeTab === "overview" && (
            <>
              {/* OverviewCards component display karta hai */}
              <OverviewCards users={users} diseases={diseases} medicines={medicines} />
              
              {/* Flex container jo users aur logs ko side-by-side dikhata hai */}
              <div className="flex flex-wrap gap-6">
                {/* UsersManagement component - left side */}
                <div className="flex-1 basis-full lg:basis-1/2">
                  <UsersManagement users={users} onAdd={addUser} onUpdate={updateUser} onDelete={deleteUser} />
                </div>
                
                {/* SystemLogs component - right side */}
                <div className="flex-1 basis-full lg:basis-1/2 min-w-[320px]">
                  <SystemLogs logs={logs} onRefresh={refreshLogs} />
                </div>
              </div>
            </>
          )}

          {/* Users tab content - sirf users management */}
          {activeTab === "users" && (
            <UsersManagement users={users} onAdd={addUser} onUpdate={updateUser} onDelete={deleteUser} />
          )}

          {/* Diseases tab content - sirf diseases management */}
          {activeTab === "diseases" && (
            <DiseasesManagement
              diseases={diseases}
              onAdd={addDisease}
              onUpdate={updateDisease}
              onDelete={deleteDisease}
            />
          )}

          {/* Medicines tab content - sirf medicines management */}
          {activeTab === "medicines" && (
            <MedicinesManagement
              medicines={medicines}
              onAdd={addMedicine}
              onUpdate={updateMedicine}
              onDelete={deleteMedicine}
            />
          )}

          {/* Logs tab content - sirf system logs */}
          {activeTab === "logs" && <SystemLogs logs={logs} onRefresh={refreshLogs} />}
        </div>
      </section>
    </main>
  )
}

export default Admin_Dashboard