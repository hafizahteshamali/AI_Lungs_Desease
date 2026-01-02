"use client"

import { FiDownload, FiShare2, FiPrinter } from "react-icons/fi"
import { useState } from "react"

export default function ReportDownload({ data, onDownload }) {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleDownloadPDF = async () => {
    setIsGenerating(true)
    // Simulate PDF generation
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Create a simple text-based report
    const reportContent = `
MEDICAL PREDICTION ANALYSIS REPORT
=====================================
Generated: ${data.timestamp}
Confidence Score: ${data.confidence}%

DISEASE PROBABILITIES:
${data.diseases.map((d) => `- ${d.name}: ${d.probability}% (${d.severity} risk)`).join("\n")}

DOCTOR NOTES:
${data.notes || "No notes added"}

DISCLAIMER:
This analysis is AI-generated and should be reviewed by a qualified medical professional.
    `.trim()

    // Create and download file
    const element = document.createElement("a")
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(reportContent))
    element.setAttribute("download", `medical-report-${Date.now()}.txt`)
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)

    setIsGenerating(false)
    onDownload()
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Medical Prediction Report",
        text: `Medical analysis completed with ${data.confidence}% confidence`,
      })
    } else {
      // console.log("Share functionality not available on this device")
    }
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-700">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 px-6 py-4">
        <h2 className="text-lg font-semibold text-white">Report & Export</h2>
        <p className="text-cyan-100 text-sm mt-1">Download or share your analysis</p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Report Summary */}
        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-slate-600 dark:text-slate-400">Analysis Date:</span>
            <span className="font-semibold text-slate-900 dark:text-white">{data.timestamp}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-600 dark:text-slate-400">Confidence:</span>
            <span className="font-semibold text-blue-600 dark:text-blue-400">{data.confidence}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-600 dark:text-slate-400">Conditions Detected:</span>
            <span className="font-semibold text-slate-900 dark:text-white">{data.diseases.length}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white rounded-lg transition-colors font-medium"
          >
            <FiDownload size={18} />
            {isGenerating ? "Generating..." : "Download Report (TXT)"}
          </button>

          <button
            onClick={handlePrint}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg transition-colors font-medium"
          >
            <FiPrinter size={18} />
            Print Report
          </button>

          <button
            onClick={handleShare}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg transition-colors font-medium"
          >
            <FiShare2 size={18} />
            Share Analysis
          </button>
        </div>

        {/* Footer Info */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            <span className="font-semibold">⚠️ Important:</span> This report is for informational purposes only and
            should not be used as a substitute for professional medical advice.
          </p>
        </div>
      </div>
    </div>
  )
}
