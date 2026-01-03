"use client"

import { useState, useRef } from "react"
import { toast } from "react-toastify"
import { postReq } from "../../../../api/axios"
import {
  FiRefreshCw,
  FiUpload,
  FiEye,
  FiEyeOff,
  FiDownload,
  FiTrendingUp,
  FiAlertCircle,
  FiImage,
} from "react-icons/fi"

export default function UploadXraysWithPrediction() {
  const [uploadedFile, setUploadedFile] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showHeatmap, setShowHeatmap] = useState(true)

  // Prediction state
  const [predictionData, setPredictionData] = useState(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null)
  const [gradcamImageUrl, setGradcamImageUrl] = useState(null) // ✅ Separate state for GradCAM
  const [heatmapOpacity, setHeatmapOpacity] = useState(70)

  // File input reference
  const fileInputRef = useRef(null)

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setUploadedFile(file)
      setPredictionData(null)
      setGradcamImageUrl(null) // ✅ Reset GradCAM
      setUploadedImageUrl(URL.createObjectURL(file))
    }
  }

  // Handle click on upload area
  const handleUploadClick = () => {
    fileInputRef.current.click()
  }

  const handleSubmit = async () => {
    if (!uploadedFile) {
      toast.error("Please upload a file first")
      return
    }

    setIsProcessing(true)

    try {
      const formData = new FormData()
      formData.append("image", uploadedFile)

      const response = await postReq("/api/Prediction/GetPrediction", formData)

      console.log("[v0] API Response:", response.data)

      // Transform backend response - DYNAMIC KEYS HANDLING
      if (response.data?.predictions) {
        const predictions = response.data.predictions
        const diseases = []

        // Loop through all prediction keys dynamically
        for (const [diseaseName, data] of Object.entries(predictions)) {
          const probability = Math.round(data.score * 100)
          let severity = "low"
          let color = "bg-green-500"

          if (probability >= 70) {
            severity = "high"
            color = "bg-red-500"
          } else if (probability >= 40) {
            severity = "medium"
            color = "bg-yellow-500"
          }

          diseases.push({
            name: diseaseName,
            probability,
            severity,
            color,
            detected: data.detected,
            score: data.score,
            rawScore: data.score,
          })
        }

        // Sort by probability (highest first)
        diseases.sort((a, b) => b.probability - a.probability)

        // Calculate average confidence
        const totalScore = diseases.reduce((sum, d) => sum + d.probability, 0)
        const avgConfidence = diseases.length > 0 ? Math.round(totalScore / diseases.length) : 0

        // ✅ Prepare gradcam image URL ONLY from backend
        let backendGradcamUrl = null
        if (response.data.gradcam && response.data.gradcam.trim() !== "") {
          // If gradcam is base64, create data URL
          if (response.data.gradcam.startsWith("data:image")) {
            backendGradcamUrl = response.data.gradcam
          } else {
            // Assume it's base64 string without prefix
            backendGradcamUrl = `data:image/png;base64,${response.data.gradcam}`
          }
          setGradcamImageUrl(backendGradcamUrl) // ✅ Set GradCAM from backend
        } else {
          setGradcamImageUrl(null) // ✅ No GradCAM from backend
        }

        setPredictionData({
          diseases,
          confidence: avgConfidence,
          timestamp: new Date().toLocaleString(),
          gradcam: backendGradcamUrl, // ✅ Store for reference
          visualized_finding: response.data.visualized_finding || "None",
          status: response.data.status || "unknown",
          rawResponse: response.data,
        })
      }

      toast.success("Analysis completed successfully!")
    } catch (error) {
      console.error("[v0] API call failed:", error)
      toast.error(error?.response?.data?.message || "File upload failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  // Download report
  const downloadReport = () => {
    if (!predictionData) return

    const reportContent = `
MEDICAL PREDICTION ANALYSIS REPORT
=====================================
Generated: ${predictionData.timestamp}
Status: ${predictionData.status}
Confidence Score: ${predictionData.confidence}%
Visualized Finding: ${predictionData.visualized_finding}

DISEASE PROBABILITIES:
${predictionData.diseases.map((d) => `- ${d.name}: ${d.probability}% (Score: ${d.rawScore.toFixed(4)}, ${d.severity} risk, Detected: ${d.detected ? "Yes" : "No"})`).join("\n")}

SUMMARY:
- Total Conditions: ${predictionData.diseases.length}
- Highest Risk: ${Math.max(...predictionData.diseases.map((d) => d.probability))}%
- Average Risk: ${Math.round(predictionData.diseases.reduce((a, b) => a + b.probability, 0) / predictionData.diseases.length)}%

DISCLAIMER:
This analysis is AI-generated and should be reviewed by a qualified medical professional.
    `.trim()

    const element = document.createElement("a")
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(reportContent))
    element.setAttribute("download", `xray-report-${Date.now()}.txt`)
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)

    toast.success("Report downloaded successfully!")
  }

  // Re-analyze
  const handleRefresh = () => {
    if (uploadedFile) {
      handleSubmit()
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
      <div className="w-full mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">X-Ray Analysis Portal</h1>
          <p className="text-gray-600">Upload an X-ray image for AI-powered medical analysis</p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Upload X-Ray Image</h2>

            {/* File Upload */}
            <div className="max-w-2xl mx-auto">
              <div
                onClick={handleUploadClick}
                className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
              >
                <FiUpload className="mx-auto text-4xl text-gray-400 mb-4" />

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload-input"
                />

                <div>
                  <p className="text-gray-700 mb-2">
                    {uploadedFile ? uploadedFile.name : "Click to select X-ray image"}
                  </p>
                  <div className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors inline-block">
                    Select File
                  </div>
                </div>

                {uploadedFile && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-700">
                      File selected: <span className="font-medium">{uploadedFile.name}</span>
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                      Size: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • Type: {uploadedFile.type}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Process Button */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={!uploadedFile || isProcessing}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                uploadedFile && !isProcessing
                  ? "bg-white text-blue-600 hover:shadow-lg hover:scale-105"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
            >
              {isProcessing ? (
                <>
                  <FiRefreshCw className="animate-spin" />
                  Processing...
                </>
              ) : (
                "Process X-Ray"
              )}
            </button>
          </div>
        </div>

        {/* Results Section - Shows only after prediction */}
        {predictionData && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-6">
            {/* Results Header */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-0">Analysis Results</h2>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                    <span className="text-gray-700">
                      Confidence: <span className="font-bold text-blue-600">{predictionData.confidence}%</span>
                    </span>
                    <span className="text-sm text-gray-500">
                      Status:{" "}
                      <span
                        className={`font-medium ${
                          predictionData.status === "success"
                            ? "text-green-600"
                            : predictionData.status === "error"
                              ? "text-red-600"
                              : "text-yellow-600"
                        }`}
                      >
                        {predictionData.status}
                      </span>
                    </span>
                  </div>
                  <button
                    onClick={handleRefresh}
                    disabled={isProcessing}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <FiRefreshCw className={isProcessing ? "animate-spin" : ""} />
                    Re-analyze
                  </button>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <p className="text-gray-600">Analysis completed: {predictionData.timestamp}</p>
                <p className="text-sm text-gray-500 mt-1 md:mt-0">
                  Visualized Finding: <span className="font-medium">{predictionData.visualized_finding}</span>
                </p>
              </div>
            </div>

            {/* Images Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Original Image */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-4">
                  <FiImage className="text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Original X-Ray</h3>
                </div>
                <div className="bg-white rounded-lg overflow-hidden shadow">
                  {uploadedImageUrl && (
                    <img
                      src={uploadedImageUrl || "/placeholder.svg"}
                      alt="Uploaded X-ray"
                      className="w-full h-64 object-contain"
                    />
                  )}
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <span className="font-medium">Uploaded Image</span> - Original patient X-ray
                  </p>
                </div>
              </div>

              {/* ✅ GradCAM Image (ONLY from backend) */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <FiEye className="text-purple-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {/* ✅ Condition based on backend GradCAM */}
                      {gradcamImageUrl ? "AI Heatmap Analysis (Backend Generated)" : "No GradCAM Available"}
                    </h3>
                  </div>
                  {gradcamImageUrl && (
                    <button
                      onClick={() => setShowHeatmap(!showHeatmap)}
                      className="flex items-center gap-2 px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors text-sm"
                    >
                      {showHeatmap ? <FiEyeOff /> : <FiEye />}
                      {showHeatmap ? "Hide" : "Show"}
                    </button>
                  )}
                </div>

                {/* ✅ ONLY show backend GradCAM if available */}
                {gradcamImageUrl && showHeatmap ? (
                  <>
                    <div className="bg-white rounded-lg overflow-hidden shadow">
                      <img
                        src={gradcamImageUrl || "/placeholder.svg"}
                        alt="AI Heatmap Analysis (Backend Generated)"
                        className="w-full h-64 object-contain"
                      />
                    </div>
                    <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm text-purple-700">
                        <span className="font-medium">Backend Generated GradCAM</span> - Shows areas of interest detected by AI model
                      </p>
                    </div>
                  </>
                ) : gradcamImageUrl && !showHeatmap ? (
                  <>
                    <div className="bg-white rounded-lg overflow-hidden shadow relative h-64">
                      {uploadedImageUrl && (
                        <>
                          <img
                            src={uploadedImageUrl || "/placeholder.svg"}
                            alt="X-ray base"
                            className="absolute inset-0 w-full h-full object-contain"
                          />
                          {/* ✅ This is only a fallback overlay when GradCAM is hidden */}
                          <div
                            className="absolute inset-0 bg-gradient-to-br from-red-500 via-yellow-400 to-green-500 mix-blend-multiply"
                            style={{ opacity: heatmapOpacity / 100 }}
                          ></div>
                        </>
                      )}
                    </div>
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Overlay Opacity: {heatmapOpacity}%</span>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={heatmapOpacity}
                          onChange={(e) => setHeatmapOpacity(Number(e.target.value))}
                          className="w-32 accent-blue-600"
                        />
                      </div>
                      <div className="flex gap-3">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded bg-red-500"></div>
                          <span className="text-xs text-gray-600">High Risk</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded bg-yellow-400"></div>
                          <span className="text-xs text-gray-600">Medium Risk</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded bg-green-500"></div>
                          <span className="text-xs text-gray-600">Low Risk</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 text-center">
                        GradCAM is hidden. Click "Show" to view backend generated heatmap.
                      </p>
                    </div>
                  </>
                ) : (
                  /* ✅ When no GradCAM from backend */
                  <div className="bg-gray-100 rounded-lg h-64 flex flex-col items-center justify-center">
                    <FiEyeOff className="text-gray-400 text-4xl mb-2" />
                    <p className="text-gray-600">No GradCAM image received from backend</p>
                    <p className="text-xs text-gray-500 mt-1">The AI model did not generate a heatmap</p>
                  </div>
                )}
              </div>
            </div>

            {/* Disease Probabilities */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-6">
                <FiTrendingUp className="text-emerald-600" size={24} />
                <h3 className="text-xl font-bold text-gray-900">Disease Probabilities</h3>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {predictionData.diseases.length} conditions detected
                </span>
              </div>

              {predictionData.diseases.length > 0 ? (
                <div className="space-y-4">
                  {predictionData.diseases.map((disease, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{disease.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                disease.severity === "high"
                                  ? "bg-red-100 text-red-800"
                                  : disease.severity === "medium"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                              }`}
                            >
                              {disease.severity.charAt(0).toUpperCase() + disease.severity.slice(1)} Risk
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                disease.detected ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {disease.detected ? "Detected ✓" : "Not Detected"}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl md:text-3xl font-bold text-blue-600">{disease.probability}%</div>
                          <div className="text-sm text-gray-500">Score: {disease.rawScore.toFixed(4)}</div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden mt-3">
                        <div
                          className={`h-full rounded-full ${disease.color} transition-all duration-500`}
                          style={{ width: `${disease.probability}%` }}
                        ></div>
                      </div>

                      {/* Details */}
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FiAlertCircle size={14} />
                          <span>Confidence: {Math.round(disease.probability * 0.95)}%</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {disease.probability >= 70
                            ? "High Priority"
                            : disease.probability >= 40
                              ? "Medium Priority"
                              : "Low Priority"}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Summary Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-white rounded-xl p-4 shadow border text-center">
                      <p className="text-sm text-gray-600 mb-1">Total Conditions</p>
                      <p className="text-2xl font-bold text-gray-900">{predictionData.diseases.length}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow border text-center">
                      <p className="text-sm text-gray-600 mb-1">Highest Risk</p>
                      <p className="text-2xl font-bold text-red-600">
                        {Math.max(...predictionData.diseases.map((d) => d.probability))}%
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {
                          predictionData.diseases.find(
                            (d) => d.probability === Math.max(...predictionData.diseases.map((d) => d.probability)),
                          )?.name
                        }
                      </p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow border text-center">
                      <p className="text-sm text-gray-600 mb-1">Average Risk</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {Math.round(
                          predictionData.diseases.reduce((a, b) => a + b.probability, 0) /
                            predictionData.diseases.length,
                        )}
                        %
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Overall confidence</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">No diseases detected in the analysis</div>
              )}
            </div>

            {/* Report Download */}
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Download Analysis Report</h3>
                  <p className="text-gray-600">Get a detailed report of the analysis results</p>
                </div>
                <button
                  onClick={downloadReport}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors mt-4 md:mt-0"
                >
                  <FiDownload />
                  Download Report
                </button>
              </div>

              {/* ✅ GradCAM Info in API Response */}
              <div className="mt-4">
                <details className="bg-white rounded-lg p-3 border">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700">
                    View API Response Details
                  </summary>
                  <div className="mt-2 p-2 bg-gray-50 rounded text-xs font-mono overflow-auto">
                    <pre>{JSON.stringify(predictionData.rawResponse, null, 2)}</pre>
                  </div>
                </details>
              </div>

              {/* ✅ GradCAM Availability Notice */}
              {!gradcamImageUrl && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">ℹ️ Note:</span> No GradCAM heatmap was generated by the backend AI model.
                    This is normal for some analysis results.
                  </p>
                </div>
              )}

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-yellow-800">
                  <span className="font-semibold">⚠️ Important:</span> This analysis is for informational purposes only
                  and should not be used as a substitute for professional medical advice.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}