"use client"

import { useState } from "react"
import ImageDisplay from "./elements/ImageDisplay"
import HeatmapOverlay from "./elements/HeatmapOverlay"
import DiseaseProbabilities from "./elements/DiseaseProbabilities"
import DoctorNotes from "./elements/DoctorNotes"
import ReportDownload from "./elements/ReportDownload"
import { FiRefreshCw } from "react-icons/fi"

export default function PredictionView() {
  const [activeTab, setActiveTab] = useState("heatmap")
  const [showHeatmap, setShowHeatmap] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  // Mock prediction data - replace with actual API call
  const predictionData = {
    imageUrl: "/medical-scan-xray.jpg",
    diseases: [
      { name: "Pneumonia", probability: 87, severity: "high", color: "bg-red-500" },
      { name: "Bronchitis", probability: 45, severity: "medium", color: "bg-yellow-500" },
      { name: "Tuberculosis", probability: 12, severity: "low", color: "bg-green-500" },
      { name: "Asthma", probability: 8, severity: "low", color: "bg-blue-500" },
    ],
    doctorNotes:
      "Patient shows significant signs of pneumonia with infiltration in the lower left lobe. Recommend immediate antibiotic treatment and follow-up imaging in 7 days.",
    confidence: 92,
    timestamp: new Date().toLocaleString(),
  }

  const handleRefresh = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
  }

  return (
    <div className="w-full mx-auto p-5">
      {/* Header */}
      <div className="mb-8 w-full">
        <div className="flex flex-col w-full lg:flex-row lg:items-center gap-5 lg:gap-0 items-start justify-between mb-2">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">Medical Prediction Analysis</h1>
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white rounded-lg transition-colors"
          >
            <FiRefreshCw className={isLoading ? "animate-spin" : ""} size={18} />
            {isLoading ? "Analyzing..." : "Re-analyze"}
          </button>
        </div>
        <p className="text-slate-600 dark:text-slate-400">
          AI-powered diagnostic analysis with confidence score:{" "}
          <span className="font-semibold text-blue-600">{predictionData.confidence}%</span>
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
          Analysis completed: {predictionData.timestamp}
        </p>
      </div>

      {/* Main Content - Yahan grid ko flex mein change kiya hai */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        {/* Left Column - Image Display */}
        <div className="flex-1 min-w-0">
          <ImageDisplay
            imageUrl={predictionData.imageUrl}
            showHeatmap={showHeatmap}
            onToggleHeatmap={() => setShowHeatmap(!showHeatmap)}
          />
        </div>

        {/* Middle Column - Heatmap and Probabilities */}
        <div className="flex-2 min-w-0 space-y-6">
          {showHeatmap && <HeatmapOverlay imageUrl={predictionData.imageUrl} />}
          <DiseaseProbabilities diseases={predictionData.diseases} />
        </div>
      </div>

      {/* Bottom Section - Yahan grid ko flex mein change kiya hai */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 min-w-0">
          <DoctorNotes notes={predictionData.doctorNotes} />
        </div>
        <div className="flex-1 min-w-0">
          <ReportDownload data={predictionData} onDownload={() => console.log("Downloading report...")} />
        </div>
      </div>
    </div>
  )
}