"use client"

import { useMemo } from "react"
import { MdPeople, MdMedicalInformation, MdLocalPharmacy, MdAssessment } from "react-icons/md"

// Yeh component overview cards display karta hai - dashboard ke important stats
const OverviewCards = ({ users, diseases, medicines }) => {
  // Yeh useMemo stats array calculate karta hai based on props
  const stats = useMemo(() => {
    return [
      {
        label: "Total Users",
        value: users.length.toLocaleString(), // Users count ko formatted string mein convert karta hai
        delta: "↑ 12% from last month", // Growth/decline percentage dikhata hai
        icon: <MdPeople className="text-xl" />, // Icon component render karta hai
        accent: "ring-blue-500", // Border ring color define karta hai
      },
      {
        label: "Disease Categories",
        value: diseases.length.toLocaleString(), // Diseases count ko formatted string mein convert karta hai
        delta: "↑ 5% from last month",
        icon: <MdMedicalInformation className="text-xl" />,
        accent: "ring-emerald-500",
      },
      {
        label: "Medicines",
        value: medicines.length.toLocaleString(), // Medicines count ko formatted string mein convert karta hai
        delta: "↓ 3% from last month",
        icon: <MdLocalPharmacy className="text-xl" />,
        accent: "ring-cyan-500",
      },
      {
        label: "System Uptime",
        value: "98.7%", // Fixed value system uptime ke liye
        delta: "↑ 0.3% from last month",
        icon: <MdAssessment className="text-xl" />,
        accent: "ring-amber-500",
      },
    ]
  }, [users, diseases, medicines]) // Jab users, diseases ya medicines change ho tab re-calculate karta hai

  return (
    // Main container jo cards ko horizontal flex mein arrange karta hai
    <div className="flex flex-wrap gap-4">
      {/* Har stat card ke liye loop chalta hai */}
      {stats.map((s, idx) => (
        // Individual card container
        <div 
          key={idx} 
          className={`flex-1 min-w-[200px] bg-card border border-gray-300 rounded-lg p-5 shadow-sm ring-1 ${s.accent}/30`}
        >
          {/* Card content jo icon aur text dikhata hai */}
          <div className="flex items-center justify-between">
            {/* Left side - value aur label */}
            <div>
              {/* Main value jo bada font mein dikhata hai */}
              <div className="text-2xl font-bold">{s.value}</div>
              {/* Label jo chhota text mein dikhata hai */}
              <p className="text-muted-foreground">{s.label}</p>
            </div>
            {/* Right side - icon */}
            <div className="text-primary">{s.icon}</div>
          </div>
          {/* Delta value jo growth/decline dikhata hai */}
          <div className={`mt-2 text-xs ${s.delta.startsWith("↓") ? "text-red-600" : "text-emerald-600"}`}>
            {s.delta}
          </div>
        </div>
      ))}
    </div>
  )
}

export default OverviewCards