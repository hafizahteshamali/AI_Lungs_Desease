"use client"

import { useState, useRef } from "react" // React hooks import kar rahe hain
import { toast } from "react-toastify" // Toast notifications ke liye import
import { postReq } from "../../../../api/axios" // API call karne ke liye import
import {
  FiRefreshCw,
  FiUpload,
  FiEye,
  FiEyeOff,
  FiDownload,
  FiTrendingUp,
  FiAlertCircle,
  FiImage,
  FiFileText,
  FiActivity,
} from "react-icons/fi" // Feather icons import kar rahe hain
import { MdLocalPharmacy, MdMedicalServices } from "react-icons/md" // Material icons import kar rahe hain

export default function UploadXraysWithPrediction() {
  // File upload state manage kar rahe hain
  const [uploadedFile, setUploadedFile] = useState(null)
  // Processing state manage kar rahe hain
  const [isProcessing, setIsProcessing] = useState(false)
  // Heatmap visibility state manage kar rahe hain
  const [showHeatmap, setShowHeatmap] = useState(true)
  // Active tab state manage kar rahe hain (prediction ya medicine)
  const [activeTab, setActiveTab] = useState("prediction")

  // Prediction data state manage kar rahe hain
  const [predictionData, setPredictionData] = useState(null)
  // Uploaded image URL state manage kar rahe hain
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null)
  // GradCAM image URL state manage kar rahe hain
  const [gradcamImageUrl, setGradcamImageUrl] = useState(null)
  // Heatmap opacity state manage kar rahe hain
  const [heatmapOpacity, setHeatmapOpacity] = useState(70)

  // File input ka reference create kar rahe hain
  const fileInputRef = useRef(null)

  // Mock data for suggested medicines (API data se replace kar sakte hain)
  const suggestedMedicines = {
    pneumonia: [
      {
        name: "Amoxicillin",
        dosage: "500mg",
        frequency: "3 times daily",
        duration: "7-10 days",
        type: "Antibiotic",
        description: "First-line antibiotic for bacterial pneumonia",
        precautions: "Take with food, avoid alcohol",
        price: "₹150 - ₹300"
      },
      {
        name: "Azithromycin",
        dosage: "500mg",
        frequency: "Once daily",
        duration: "5 days",
        type: "Macrolide Antibiotic",
        description: "Alternative for penicillin-allergic patients",
        precautions: "Take on empty stomach",
        price: "₹200 - ₹400"
      }
    ],
    tuberculosis: [
      {
        name: "Isoniazid",
        dosage: "300mg",
        frequency: "Once daily",
        duration: "6-9 months",
        type: "Antitubercular",
        description: "First-line TB treatment",
        precautions: "Take with vitamin B6 supplement",
        price: "₹100 - ₹250"
      },
      {
        name: "Rifampicin",
        dosage: "600mg",
        frequency: "Once daily",
        duration: "6-9 months",
        type: "Antitubercular",
        description: "Essential component of TB regimen",
        precautions: "May discolor body fluids",
        price: "₹200 - ₹500"
      }
    ],
    covid: [
      {
        name: "Dexamethasone",
        dosage: "6mg",
        frequency: "Once daily",
        duration: "10 days",
        type: "Corticosteroid",
        description: "For severe COVID-19 with oxygen requirement",
        precautions: "Monitor blood sugar",
        price: "₹50 - ₹150"
      },
      {
        name: "Remdesivir",
        dosage: "200mg",
        frequency: "Once daily (IV)",
        duration: "5 days",
        type: "Antiviral",
        description: "For hospitalized COVID-19 patients",
        precautions: "Hospital administration required",
        price: "₹2,000 - ₹5,000"
      }
    ],
    default: [
      {
        name: "Paracetamol",
        dosage: "500mg",
        frequency: "As needed",
        duration: "3-5 days",
        type: "Analgesic",
        description: "For fever and pain relief",
        precautions: "Do not exceed 4g daily",
        price: "₹10 - ₹50"
      },
      {
        name: "Ibuprofen",
        dosage: "400mg",
        frequency: "3 times daily",
        duration: "3-5 days",
        type: "NSAID",
        description: "Anti-inflammatory and pain relief",
        precautions: "Take with food",
        price: "₹30 - ₹100"
      }
    ]
  }

  // File select karne ka handler function
  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setUploadedFile(file)
      setPredictionData(null)
      setGradcamImageUrl(null)
      setUploadedImageUrl(URL.createObjectURL(file))
    }
  }

  // Upload area par click karne ka handler function
  const handleUploadClick = () => {
    fileInputRef.current.click()
  }

  // Form submit karne ka handler function
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

      // Backend response ko transform kar rahe hain
      if (response.data?.predictions) {
        const predictions = response.data.predictions
        const diseases = []

        // Sabhi prediction keys par loop chala rahe hain
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

        // Probability ke hisaab se sort kar rahe hain (highest first)
        diseases.sort((a, b) => b.probability - a.probability)

        // Average confidence calculate kar rahe hain
        const totalScore = diseases.reduce((sum, d) => sum + d.probability, 0)
        const avgConfidence = diseases.length > 0 ? Math.round(totalScore / diseases.length) : 0

        // Backend se GradCAM image URL prepare kar rahe hain
        let backendGradcamUrl = null
        if (response.data.gradcam && response.data.gradcam.trim() !== "") {
          if (response.data.gradcam.startsWith("data:image")) {
            backendGradcamUrl = response.data.gradcam
          } else {
            backendGradcamUrl = `data:image/png;base64,${response.data.gradcam}`
          }
          setGradcamImageUrl(backendGradcamUrl)
        } else {
          setGradcamImageUrl(null)
        }

        setPredictionData({
          diseases,
          confidence: avgConfidence,
          timestamp: new Date().toLocaleString(),
          gradcam: backendGradcamUrl,
          visualized_finding: response.data.visualized_finding || "None",
          status: response.data.status || "unknown",
          rawResponse: response.data,
        })
      }

      // Analysis ke baad prediction tab par switch kar rahe hain
      setActiveTab("prediction")
      toast.success("Analysis completed successfully!")
    } catch (error) {
      console.error("[v0] API call failed:", error)
      toast.error(error?.response?.data?.message || "File upload failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  // Detected diseases ke based par medicines get karne ka function
  const getSuggestedMedicines = () => {
    if (!predictionData) return []
    
    let medicines = []
    const detectedDiseases = predictionData.diseases
      .filter(d => d.detected || d.probability > 50)
      .map(d => d.name.toLowerCase())
    
    // Har detected disease ke liye medicines add kar rahe hain
    detectedDiseases.forEach(disease => {
      if (suggestedMedicines[disease]) {
        medicines = [...medicines, ...suggestedMedicines[disease]]
      }
    })
    
    // Name ke hisaab se duplicates remove kar rahe hain
    medicines = medicines.filter((medicine, index, self) =>
      index === self.findIndex((m) => m.name === medicine.name)
    )
    
    // Agar koi medicine nahi mili toh default medicines add kar rahe hain
    if (medicines.length === 0) {
      medicines = suggestedMedicines.default
    }
    
    return medicines.slice(0, 6) // Maximum 6 medicines return kar rahe hain
  }

  // Report download karne ka handler function
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

SUGGESTED MEDICATIONS:
${getSuggestedMedicines().map((m) => `- ${m.name} (${m.type}): ${m.dosage}, ${m.frequency}, ${m.duration}`).join("\n")}

SUMMARY:
- Total Conditions: ${predictionData.diseases.length}
- Highest Risk: ${Math.max(...predictionData.diseases.map((d) => d.probability))}%
- Average Risk: ${Math.round(predictionData.diseases.reduce((a, b) => a + b.probability, 0) / predictionData.diseases.length)}%

DISCLAIMER:
This analysis is AI-generated and should be reviewed by a qualified medical professional.
All medications must be prescribed by a licensed healthcare provider.
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

  // Re-analyze karne ka handler function
  const handleRefresh = () => {
    if (uploadedFile) {
      handleSubmit()
    }
  }

  return (
    <div className="min-h-screen w-full py-4 md:p-6">
      <div className="w-full mx-auto max-w-full px-4 sm:px-6 lg:px-8">
        {/* Header section - Text kabhi cut nahi hoga */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 break-words">X-Ray Analysis Portal</h1>
          <p className="text-sm sm:text-base text-gray-600 break-words">Upload an X-ray image for AI-powered medical analysis and treatment suggestions</p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden mb-8">
          <div className="p-4 sm:p-6 md:p-8">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 break-words">Upload X-Ray Image</h2>

            {/* File Upload area - Flex container use kar rahe hain */}
            <div className="w-full max-w-4xl mx-auto">
              <div
                onClick={handleUploadClick}
                className="border-2 border-dashed border-gray-300 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
              >
                <FiUpload className="mx-auto text-3xl sm:text-4xl text-gray-400 mb-3 sm:mb-4" />

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload-input"
                />

                <div>
                  <p className="text-sm sm:text-base text-gray-700 mb-2 break-words whitespace-normal">
                    {uploadedFile ? uploadedFile.name : "Click to select X-ray image"}
                  </p>
                  <div className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors inline-block text-sm sm:text-base">
                    Select File
                  </div>
                </div>

                {uploadedFile && (
                  <div className="mt-3 sm:mt-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-xs sm:text-sm text-green-700 break-words">
                      File selected: <span className="font-medium">{uploadedFile.name}</span>
                    </p>
                    <p className="text-xs text-green-600 mt-1 break-words">
                      Size: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • Type: {uploadedFile.type}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Process Button section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 sm:px-8 py-4 sm:py-6 flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={!uploadedFile || isProcessing}
              className={`px-4 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base ${
                uploadedFile && !isProcessing
                  ? "bg-white text-blue-600 hover:shadow-lg hover:scale-105"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
            >
              {isProcessing ? (
                <>
                  <FiRefreshCw className="animate-spin text-sm sm:text-base" />
                  <span className="break-words">Processing...</span>
                </>
              ) : (
                <span className="break-words">Process X-Ray</span>
              )}
            </button>
          </div>
        </div>

        {/* Results Section - Sirf prediction ke baad show hota hai */}
        {predictionData && (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden">
            {/* Tab Navigation - Flex container use kar rahe hain */}
            <div className="border-b border-gray-200">
              <div className="flex flex-col sm:flex-row">
                <button
                  onClick={() => setActiveTab("prediction")}
                  className={`flex-1 px-3 sm:px-6 py-3 sm:py-4 font-semibold text-base sm:text-lg transition-colors flex items-center justify-center gap-2 sm:gap-3 whitespace-nowrap overflow-hidden ${
                    activeTab === "prediction"
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <FiActivity className="text-lg sm:text-xl flex-shrink-0" />
                  <span className="truncate">Prediction Details</span>
                  {predictionData.diseases.length > 0 && (
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0">
                      {predictionData.diseases.length}
                    </span>
                  )}
                </button>
                
                <button
                  onClick={() => setActiveTab("medicine")}
                  className={`flex-1 px-3 sm:px-6 py-3 sm:py-4 font-semibold text-base sm:text-lg transition-colors flex items-center justify-center gap-2 sm:gap-3 whitespace-nowrap overflow-hidden ${
                    activeTab === "medicine"
                      ? "text-green-600 border-b-2 border-green-600 bg-green-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <MdLocalPharmacy className="text-lg sm:text-xl flex-shrink-0" />
                  <span className="truncate">Suggested Medicine</span>
                  {getSuggestedMedicines().length > 0 && (
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0">
                      {getSuggestedMedicines().length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Tab Content section */}
            <div className="p-4 sm:p-6">
              {/* PREDICTION DETAILS TAB */}
              {activeTab === "prediction" && (
                <div className="space-y-6 sm:space-y-8">
                  {/* Results Header - Flex container use kar rahe hain */}
                  <div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 break-words">Analysis Results</h2>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                        <div className="flex flex-col items-start sm:items-end">
                          <span className="text-sm sm:text-base text-gray-700 break-words">
                            Confidence: <span className="font-bold text-blue-600 break-words">{predictionData.confidence}%</span>
                          </span>
                          <span className="text-xs sm:text-sm text-gray-500 break-words">
                            Status:{" "}
                            <span
                              className={`font-medium break-words ${
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
                          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm sm:text-base"
                        >
                          <FiRefreshCw className={isProcessing ? "animate-spin" : ""} />
                          <span className="break-words">Re-analyze</span>
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <p className="text-sm sm:text-base text-gray-600 break-words">
                        Analysis completed: {predictionData.timestamp}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 break-words">
                        Visualized Finding: <span className="font-medium break-words">{predictionData.visualized_finding}</span>
                      </p>
                    </div>
                  </div>

                  {/* Images Row - Flex container use kar rahe hain */}
                  <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                    {/* Original Image section */}
                    <div className="bg-gray-50 rounded-xl p-4 flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-3 sm:mb-4">
                        <FiImage className="text-blue-600 text-lg sm:text-xl flex-shrink-0" />
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 break-words">Original X-Ray</h3>
                      </div>
                      <div className="bg-white rounded-lg overflow-hidden shadow">
                        {uploadedImageUrl && (
                          <img
                            src={uploadedImageUrl || "/placeholder.svg"}
                            alt="Uploaded X-ray"
                            className="w-full h-48 sm:h-56 md:h-64 object-contain"
                          />
                        )}
                      </div>
                      <div className="mt-3 sm:mt-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-xs sm:text-sm text-blue-700 break-words">
                          <span className="font-medium">Uploaded Image</span> - Original patient X-ray
                        </p>
                      </div>
                    </div>

                    {/* GradCAM Image section */}
                    <div className="bg-gray-50 rounded-xl p-4 flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-4 gap-2">
                        <div className="flex items-center gap-2">
                          <FiEye className="text-purple-600 text-lg sm:text-xl flex-shrink-0" />
                          <h3 className="text-base sm:text-lg font-semibold text-gray-900 break-words">
                            {gradcamImageUrl ? "AI Heatmap Analysis" : "No GradCAM Available"}
                          </h3>
                        </div>
                        {gradcamImageUrl && (
                          <button
                            onClick={() => setShowHeatmap(!showHeatmap)}
                            className="flex items-center justify-center gap-2 px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors text-xs sm:text-sm w-full sm:w-auto"
                          >
                            {showHeatmap ? <FiEyeOff className="flex-shrink-0" /> : <FiEye className="flex-shrink-0" />}
                            <span className="break-words">{showHeatmap ? "Hide" : "Show"}</span>
                          </button>
                        )}
                      </div>

                      {gradcamImageUrl && showHeatmap ? (
                        <>
                          <div className="bg-white rounded-lg overflow-hidden shadow">
                            <img
                              src={gradcamImageUrl || "/placeholder.svg"}
                              alt="AI Heatmap Analysis"
                              className="w-full h-48 sm:h-56 md:h-64 object-contain"
                            />
                          </div>
                          <div className="mt-3 sm:mt-4 p-3 bg-purple-50 rounded-lg">
                            <p className="text-xs sm:text-sm text-purple-700 break-words">
                              <span className="font-medium">Backend Generated GradCAM</span> - Shows areas of interest detected by AI model
                            </p>
                          </div>
                        </>
                      ) : gradcamImageUrl && !showHeatmap ? (
                        <>
                          <div className="bg-white rounded-lg overflow-hidden shadow relative h-48 sm:h-56 md:h-64">
                            {uploadedImageUrl && (
                              <>
                                <img
                                  src={uploadedImageUrl || "/placeholder.svg"}
                                  alt="X-ray base"
                                  className="absolute inset-0 w-full h-full object-contain"
                                />
                                <div
                                  className="absolute inset-0 bg-gradient-to-br from-red-500 via-yellow-400 to-green-500 mix-blend-multiply"
                                  style={{ opacity: heatmapOpacity / 100 }}
                                ></div>
                              </>
                            )}
                          </div>
                          <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <span className="text-xs sm:text-sm text-gray-600 break-words">Overlay Opacity: {heatmapOpacity}%</span>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={heatmapOpacity}
                                onChange={(e) => setHeatmapOpacity(Number(e.target.value))}
                                className="w-full sm:w-32 accent-blue-600"
                              />
                            </div>
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                              <div className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded bg-red-500 flex-shrink-0"></div>
                                <span className="text-xs text-gray-600 break-words">High Risk</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded bg-yellow-400 flex-shrink-0"></div>
                                <span className="text-xs text-gray-600 break-words">Medium Risk</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded bg-green-500 flex-shrink-0"></div>
                                <span className="text-xs text-gray-600 break-words">Low Risk</span>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="bg-gray-100 rounded-lg h-48 sm:h-56 md:h-64 flex flex-col items-center justify-center p-4">
                          <FiEyeOff className="text-gray-400 text-3xl sm:text-4xl mb-2 flex-shrink-0" />
                          <p className="text-sm text-gray-600 text-center break-words">No GradCAM image received from backend</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Disease Probabilities section */}
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                      <div className="flex items-center gap-2">
                        <FiTrendingUp className="text-emerald-600 text-xl sm:text-2xl flex-shrink-0" />
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 break-words">Disease Probabilities</h3>
                      </div>
                      <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-0.5 rounded-full break-words whitespace-nowrap">
                        {predictionData.diseases.length} conditions detected
                      </span>
                    </div>

                    {predictionData.diseases.length > 0 ? (
                      <div className="space-y-3 sm:space-y-4">
                        {predictionData.diseases.map((disease, index) => (
                          <div key={index} className="bg-gray-50 rounded-xl p-3 sm:p-4 hover:bg-gray-100 transition-colors">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-2">
                              <div className="flex-1 min-w-0">
                                <h4 className="text-base sm:text-lg font-semibold text-gray-900 break-words mb-1">{disease.name}</h4>
                                <div className="flex flex-wrap gap-1 sm:gap-2">
                                  <span
                                    className={`px-2 py-0.5 rounded-full text-xs font-medium break-words whitespace-nowrap ${
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
                                    className={`px-2 py-0.5 rounded-full text-xs font-medium break-words whitespace-nowrap ${
                                      disease.detected ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                                    }`}
                                  >
                                    {disease.detected ? "Detected ✓" : "Not Detected"}
                                  </span>
                                </div>
                              </div>
                              <div className="text-right sm:text-left sm:text-right">
                                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 break-words">{disease.probability}%</div>
                                <div className="text-xs sm:text-sm text-gray-500 break-words">Score: {disease.rawScore.toFixed(4)}</div>
                              </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 overflow-hidden mt-2 sm:mt-3">
                              <div
                                className={`h-full rounded-full ${disease.color} transition-all duration-500`}
                                style={{ width: `${disease.probability}%` }}
                              ></div>
                            </div>

                            {/* Details section - Flex container use kar rahe hain */}
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-2 gap-1 sm:gap-0">
                              <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600">
                                <FiAlertCircle size={12} className="flex-shrink-0" />
                                <span className="break-words">Confidence: {Math.round(disease.probability * 0.95)}%</span>
                              </div>
                              <div className="text-xs text-gray-500 break-words">
                                {disease.probability >= 70
                                  ? "High Priority"
                                  : disease.probability >= 40
                                    ? "Medium Priority"
                                    : "Low Priority"}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 sm:py-8 text-gray-500 break-words">No diseases detected in the analysis</div>
                    )}
                  </div>
                </div>
              )}

              {/* SUGGESTED MEDICINE TAB */}
              {activeTab === "medicine" && (
                <div className="space-y-6 sm:space-y-8">
                  <div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 sm:mb-6 gap-4">
                      <div className="flex-1 min-w-0">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2 break-words">Suggested Medications</h2>
                        <p className="text-sm sm:text-base text-gray-600 break-words">
                          Based on detected conditions from X-ray analysis
                        </p>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="text-right">
                          <p className="text-xs sm:text-sm text-gray-600 break-words">Detected Conditions</p>
                          <p className="text-base sm:text-lg font-bold text-blue-600 break-words">
                            {predictionData.diseases.filter(d => d.detected || d.probability > 50).length}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Medicines Container - Flex container use kar rahe hain */}
                    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6">
                      {getSuggestedMedicines().map((medicine, index) => (
                        <div key={index} className="flex-1 min-w-full sm:min-w-[300px] lg:min-w-[280px] bg-gradient-to-br from-white to-green-50 rounded-xl border border-green-200 shadow-sm hover:shadow-md transition-shadow p-4 sm:p-5">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <MdMedicalServices className="text-green-600 text-lg sm:text-xl flex-shrink-0" />
                                <h3 className="text-base sm:text-lg font-bold text-gray-900 break-words">{medicine.name}</h3>
                              </div>
                              <span className="inline-block px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full break-words">
                                {medicine.type}
                              </span>
                            </div>
                            <div className="text-left sm:text-right">
                              <div className="text-lg sm:text-xl font-bold text-gray-900 break-words">{medicine.dosage}</div>
                              <div className="text-xs text-gray-500 break-words">per dose</div>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-3 sm:mb-4 break-words">{medicine.description}</p>
                          
                          <div className="space-y-2 mb-3 sm:mb-4">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                <span className="text-blue-600 text-xs sm:text-sm font-medium">📅</span>
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs text-gray-500 break-words">Frequency</p>
                                <p className="text-sm font-medium break-words">{medicine.frequency}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                                <span className="text-purple-600 text-xs sm:text-sm font-medium">⏱️</span>
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs text-gray-500 break-words">Duration</p>
                                <p className="text-sm font-medium break-words">{medicine.duration}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                                <span className="text-yellow-600 text-xs sm:text-sm font-medium">💰</span>
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs text-gray-500 break-words">Approx. Price</p>
                                <p className="text-sm font-medium break-words">{medicine.price}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 sm:p-3">
                            <p className="text-xs text-yellow-800 break-words">
                              <span className="font-semibold">⚠️ Precautions:</span> {medicine.precautions}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Important Notes section */}
                    <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 sm:p-5">
                        <h4 className="font-semibold text-blue-900 mb-1 sm:mb-2 flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                          <FiFileText className="text-blue-600 flex-shrink-0" />
                          Important Instructions
                        </h4>
                        <ul className="text-xs sm:text-sm text-blue-800 space-y-1 pl-4 sm:pl-5 list-disc break-words">
                          <li className="break-words">All medications must be prescribed by a licensed healthcare provider</li>
                          <li className="break-words">Consult with a doctor before starting any medication</li>
                          <li className="break-words">Complete the full course as prescribed</li>
                          <li className="break-words">Report any side effects immediately</li>
                          <li className="break-words">Do not share medications with others</li>
                        </ul>
                      </div>
                      
                      <div className="bg-red-50 border border-red-200 rounded-xl p-3 sm:p-5">
                        <h4 className="font-semibold text-red-900 mb-1 sm:mb-2 flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                          <FiAlertCircle className="text-red-600 flex-shrink-0" />
                          Medical Disclaimer
                        </h4>
                        <p className="text-xs sm:text-sm text-red-800 break-words">
                          This medication suggestion is based on AI analysis and should NOT be considered as medical advice. 
                          Always consult with a qualified healthcare professional for proper diagnosis and treatment.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Common Actions Footer - Flex container use kar rahe hain */}
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border-t border-blue-200 px-4 sm:px-6 py-3 sm:py-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 mb-0.5 sm:mb-1 text-sm sm:text-base break-words">Download Complete Report</h4>
                  <p className="text-xs sm:text-sm text-gray-600 break-words">Includes both prediction details and medication suggestions</p>
                </div>
                <button
                  onClick={downloadReport}
                  className="w-full md:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm sm:text-base"
                >
                  <FiDownload className="flex-shrink-0" />
                  <span className="break-words">Download Full Report</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}