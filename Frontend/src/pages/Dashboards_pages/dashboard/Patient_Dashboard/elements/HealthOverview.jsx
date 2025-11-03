"use client"

import { useState } from "react"
import { Card } from "../../../../../components/Cards"
import Button from "../../../../../components/Button"
import { HEALTH_METRICS } from "../../../../../assets/Constant"

export default function HealthOverview() {
  const [selectedTab, setSelectedTab] = useState("Heart")
  const filteredMetrics = selectedTab === "All" ? Object.values(HEALTH_METRICS).flat() : HEALTH_METRICS[selectedTab]

  return (
    <Card className="mb-6 p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">Health Overview</h2>
        <div className="flex flex-wrap gap-2">
          {["Heart", "Lungs", "Stomach", "Body", "Eye", "All"].map((tab) => (
            <Button
              key={tab}
              variant={selectedTab === tab ? "default" : "ghost"}
              size="sm"
              className={selectedTab === tab ? "bg-blue-500 hover:bg-blue-600" : ""}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </Button>
          ))}
        </div>
      </div>

      {/* Yahan grid ko flex mein change kiya hai */}
      <div className="flex flex-wrap gap-6">
        {filteredMetrics.map((metric, index) => (
          <div key={index} className="text-center flex-1 min-w-[calc(50%-12px)] md:min-w-[calc(25%-18px)]">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-3">
              <span className={metric.color}>{metric.icon}</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">{metric.label}</h3>
            <p className="text-sm text-gray-500 mb-2">{metric.status}</p>
            <p className="text-lg md:text-2xl font-bold text-gray-800">{metric.value}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}