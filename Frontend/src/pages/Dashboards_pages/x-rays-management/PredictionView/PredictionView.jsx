"use client"

import { useState } from "react"
import ImageDisplay from "./elements/ImageDisplay"
import HeatmapOverlay from "./elements/HeatmapOverlay"
import DiseaseProbabilities from "./elements/DiseaseProbabilities"
import DoctorNotes from "./elements/DoctorNotes"
import ReportDownload from "./elements/ReportDownload"
import { FiRefreshCw } from "react-icons/fi"

// Yeh component medical prediction analysis view display karta hai
export default function PredictionView() {
  // Yeh state active tab ko track karta hai (currently unused)
  const [activeTab, setActiveTab] = useState("heatmap")
  // Yeh state heatmap visibility ko control karta hai
  const [showHeatmap, setShowHeatmap] = useState(true)
  // Yeh state loading status ko track karta hai
  const [isLoading, setIsLoading] = useState(false)

  // Mock prediction data - replace with actual API call
  // Yeh demo data hai, real app mein API se aayega
  const predictionData = {
    imageUrl: "/medical-scan-xray.jpg", // Medical scan image path
    diseases: [
      { name: "Pneumonia", probability: 87, severity: "high", color: "bg-red-500" },
      { name: "Bronchitis", probability: 45, severity: "medium", color: "bg-yellow-500" },
      { name: "Tuberculosis", probability: 12, severity: "low", color: "bg-green-500" },
      { name: "Asthma", probability: 8, severity: "low", color: "bg-blue-500" },
    ],
    doctorNotes:
      "Patient shows significant signs of pneumonia with infiltration in the lower left lobe. Recommend immediate antibiotic treatment and follow-up imaging in 7 days.",
    confidence: 92, // AI prediction confidence percentage
    timestamp: new Date().toLocaleString(), // Current timestamp
  }

  // Yeh function refresh/re-analyze button handle karta hai
  const handleRefresh = async () => {
    setIsLoading(true) // Loading state start karta hai
    // Simulate API call - real app mein API call hoga
    await new Promise((resolve) => setTimeout(resolve, 1500)) // 1.5 second delay for simulation
    setIsLoading(false) // Loading state end karta hai
  }

  return (
    // Main container jo full width aur padding provide karta hai
    <div className="w-full mx-auto p-5">
      {/* Header section jo title, refresh button aur confidence score dikhata hai */}
      <div className="mb-8 w-full">
        {/* Title aur refresh button row */}
        <div className="flex flex-col w-full lg:flex-row lg:items-center gap-5 lg:gap-0 items-start justify-between mb-2">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">Medical Prediction Analysis</h1>
          {/* Refresh/Re-analyze button */}
          <button
            onClick={handleRefresh} // Refresh function call karta hai
            disabled={isLoading} // Loading state mein button disabled
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white rounded-lg transition-colors"
          >
            <FiRefreshCw className={isLoading ? "animate-spin" : ""} size={18} /> {/* Spinning icon during loading */}
            {isLoading ? "Analyzing..." : "Re-analyze"} {/* Dynamic button text */}
          </button>
        </div>
        {/* Confidence score display */}
        <p className="text-slate-600 dark:text-slate-400">
          AI-powered diagnostic analysis with confidence score:{" "}
          <span className="font-semibold text-blue-600">{predictionData.confidence}%</span>
        </p>
        {/* Timestamp display */}
        <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
          Analysis completed: {predictionData.timestamp}
        </p>
      </div>

      {/* Main Content Section - flex layout for responsive design */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        {/* Left Column - Image Display (takes 1 part of space) */}
        <div className="flex-1 min-w-0">
          <ImageDisplay
            imageUrl={predictionData.imageUrl} // Image URL pass karta hai
            showHeatmap={showHeatmap} // Heatmap visibility state
            onToggleHeatmap={() => setShowHeatmap(!showHeatmap)} // Toggle function pass karta hai
          />
        </div>

        {/* Middle Column - Heatmap and Probabilities (takes 2 parts of space) */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* Conditional rendering - sirf tab heatmap dikhaye agar showHeatmap true hai */}
          {showHeatmap && <HeatmapOverlay imageUrl={predictionData.imageUrl} />}
          {/* Disease probabilities component */}
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-0 justify-between items-start">
      <DiseaseProbabilities diseases={predictionData.diseases} />

{/* Bottom Section - flex layout for responsive design */}
<div className="flex flex-col w-full lg:w-[49%] gap-4">
  {/* Left Column - Doctor Notes (takes 1 part of space) */}
  <div className="flex-1 min-w-0">
    <DoctorNotes notes={predictionData.doctorNotes} />
  </div>
  {/* Right Column - Report Download (takes 1 part of space) */}
  <div className="flex-1 min-w-0">
    <ReportDownload 
      data={predictionData} // Prediction data pass karta hai
      onDownload={() => console.log("Downloading report...")} // Download handler function
    />
  </div>
</div>
      </div>
    </div>
  )
}