"use client"

import { useMemo } from "react"
import { MdPeople, MdMedicalInformation, MdLocalPharmacy, MdAssessment } from "react-icons/md"

const OverviewCards = ({ users, diseases, medicines }) => {
  const stats = useMemo(() => {
    return [
      {
        label: "Total Users",
        value: users.length.toLocaleString(),
        delta: "↑ 12% from last month",
        icon: <MdPeople className="text-xl" />,
        accent: "ring-blue-500",
      },
      {
        label: "Disease Categories",
        value: diseases.length.toLocaleString(),
        delta: "↑ 5% from last month",
        icon: <MdMedicalInformation className="text-xl" />,
        accent: "ring-emerald-500",
      },
      {
        label: "Medicines",
        value: medicines.length.toLocaleString(),
        delta: "↓ 3% from last month",
        icon: <MdLocalPharmacy className="text-xl" />,
        accent: "ring-cyan-500",
      },
      {
        label: "System Uptime",
        value: "98.7%",
        delta: "↑ 0.3% from last month",
        icon: <MdAssessment className="text-xl" />,
        accent: "ring-amber-500",
      },
    ]
  }, [users, diseases, medicines])

  return (
    <div className="flex flex-wrap gap-4">
      {stats.map((s, idx) => (
        <div 
          key={idx} 
          className={`flex-1 min-w-[200px] bg-card border border-gray-300 rounded-lg p-5 shadow-sm ring-1 ${s.accent}/30`}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{s.value}</div>
              <p className="text-muted-foreground">{s.label}</p>
            </div>
            <div className="text-primary">{s.icon}</div>
          </div>
          <div className={`mt-2 text-xs ${s.delta.startsWith("↓") ? "text-red-600" : "text-emerald-600"}`}>
            {s.delta}
          </div>
        </div>
      ))}
    </div>
  )
}

export default OverviewCards