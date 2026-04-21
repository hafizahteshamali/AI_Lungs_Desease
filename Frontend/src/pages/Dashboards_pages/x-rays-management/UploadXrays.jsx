"use client"

import { useState, useRef } from "react"
import { toast } from "react-toastify"
import { postReq } from "../../../api/axios"
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
  FiWind,
  FiHeart,
} from "react-icons/fi"
import { MdLocalPharmacy, MdMedicalServices } from "react-icons/md"
import { FaLungs, FaVenusMars } from "react-icons/fa"

export default function UploadXraysWithPrediction() {
  // State for disease type selection
  const [diseaseType, setDiseaseType] = useState(null) // 'lung' or 'breast'
  
  // File upload state
  const [uploadedFile, setUploadedFile] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showHeatmap, setShowHeatmap] = useState(true)
  const [activeTab, setActiveTab] = useState("prediction")

  // Prediction data states
  const [predictionData, setPredictionData] = useState(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null)
  const [gradcamImageUrl, setGradcamImageUrl] = useState(null)
  const [heatmapOpacity, setHeatmapOpacity] = useState(70)

  // File input reference
  const fileInputRef = useRef(null)

  // Mock data for suggested medicines (Lung Disease)
  const lungMedicines = {
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

  // Mock data for suggested medicines (Breast Cancer)
  const breastCancerMedicines = {
    malignant: [
      {
        name: "Tamoxifen",
        dosage: "20mg",
        frequency: "Once daily",
        duration: "5-10 years",
        type: "Hormone Therapy",
        description: "SERM for hormone receptor-positive breast cancer",
        precautions: "Monitor for blood clots, hot flashes",
        price: "₹500 - ₹1,000"
      },
      {
        name: "Letrozole",
        dosage: "2.5mg",
        frequency: "Once daily",
        duration: "5 years",
        type: "Aromatase Inhibitor",
        description: "For postmenopausal women with hormone-positive cancer",
        precautions: "Monitor bone density, joint pain",
        price: "₹800 - ₹1,500"
      },
      {
        name: "Trastuzumab",
        dosage: "4mg/kg",
        frequency: "Every 3 weeks",
        duration: "1 year",
        type: "Monoclonal Antibody",
        description: "For HER2-positive breast cancer",
        precautions: "Monitor heart function, IV administration",
        price: "₹30,000 - ₹50,000"
      }
    ],
    benign: [
      {
        name: "NSAIDs",
        dosage: "400-800mg",
        frequency: "As needed",
        duration: "7-10 days",
        type: "Anti-inflammatory",
        description: "For pain and inflammation relief",
        precautions: "Take with food, not for long term",
        price: "₹50 - ₹150"
      },
      {
        name: "Vitamin E",
        dosage: "400 IU",
        frequency: "Once daily",
        duration: "3-6 months",
        type: "Supplement",
        description: "May help with benign breast conditions",
        precautions: "Consult doctor before use",
        price: "₹200 - ₹400"
      }
    ],
    default: [
      {
        name: "Calcium Supplements",
        dosage: "500mg",
        frequency: "Twice daily",
        duration: "Ongoing",
        type: "Supplement",
        description: "For bone health during treatment",
        precautions: "Take with vitamin D",
        price: "₹300 - ₹600"
      },
      {
        name: "Pain Relievers",
        dosage: "As prescribed",
        frequency: "As needed",
        duration: "Short term",
        type: "Analgesic",
        description: "For pain management",
        precautions: "Follow doctor's prescription",
        price: "₹100 - ₹300"
      }
    ]
  }

  // File select handler
  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setUploadedFile(file)
      setPredictionData(null)
      setGradcamImageUrl(null)
      setUploadedImageUrl(URL.createObjectURL(file))
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current.click()
  }

  // Reset everything including disease type
  const handleResetAll = () => {
    setDiseaseType(null)
    setUploadedFile(null)
    setPredictionData(null)
    setGradcamImageUrl(null)
    setUploadedImageUrl(null)
    setActiveTab("prediction")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  // Process Lung Disease API Response
  const processLungDiseaseResponse = (response) => {
    console.log("[Lung Disease] API Response:", response.data)

    if (response.data?.predictions) {
      const predictions = response.data.predictions
      const diseases = []

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

      diseases.sort((a, b) => b.probability - a.probability)

      const totalScore = diseases.reduce((sum, d) => sum + d.probability, 0)
      const avgConfidence = diseases.length > 0 ? Math.round(totalScore / diseases.length) : 0

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
        diseaseType: "lung",
        diseases,
        confidence: avgConfidence,
        timestamp: new Date().toLocaleString(),
        gradcam: backendGradcamUrl,
        visualized_finding: response.data.visualized_finding || "None",
        status: response.data.status || "unknown",
        rawResponse: response.data,
      })
    }
  }

  // Process Breast Cancer API Response
  const processBreastCancerResponse = (response) => {
    console.log("[Breast Cancer] API Response:", response.data)

    // Handle different possible response structures
    let diseases = []
    let avgConfidence = 0

    // Check for prediction/classification
    const prediction = response.data?.prediction || response.data?.result || response.data?.classification
    const probability = response.data?.probability || response.data?.confidence || response.data?.score || 0
    const probabilityPercent = Math.round(probability * 100)

    // Check for BI-RADS score
    const birads = response.data?.birads || response.data?.BI_RADS || response.data?.bi_rads
    
    // Check for tumor characteristics
    const tumorCharacteristics = response.data?.characteristics || response.data?.features || {}
    
    // Determine severity based on probability and BI-RADS
    let severity = "low"
    let color = "bg-green-500"
    
    if (probabilityPercent >= 70 || (birads && birads >= 4)) {
      severity = "high"
      color = "bg-red-500"
    } else if (probabilityPercent >= 40 || (birads && birads >= 3)) {
      severity = "medium"
      color = "bg-yellow-500"
    }

    const isMalignant = prediction === "Malignant" || prediction === "Cancer" || prediction === "Positive" || probability > 0.5
    const detected = isMalignant

    // Create disease entry
    const diseaseName = isMalignant ? "Malignant Tumor" : "Benign Tumor"
    
    diseases.push({
      name: diseaseName,
      probability: probabilityPercent,
      severity,
      color,
      detected,
      score: probability,
      rawScore: probability,
      birads: birads,
      characteristics: tumorCharacteristics
    })

    avgConfidence = probabilityPercent

    // Process GradCAM image
    let backendGradcamUrl = null
    const possibleGradcamKeys = ['gradcam', 'heatmap', 'visualization', 'grad_cam', 'gradCam', 'attention_map', 'saliency_map']
    
    for (const key of possibleGradcamKeys) {
      if (response.data?.[key] && response.data[key].trim() !== "") {
        const gradcamValue = response.data[key]
        if (gradcamValue.startsWith("data:image")) {
          backendGradcamUrl = gradcamValue
        } else {
          backendGradcamUrl = `data:image/png;base64,${gradcamValue}`
        }
        break
      }
    }
    
    setGradcamImageUrl(backendGradcamUrl)

    setPredictionData({
      diseaseType: "breast",
      diseases,
      confidence: avgConfidence,
      timestamp: new Date().toLocaleString(),
      gradcam: backendGradcamUrl,
      visualized_finding: response.data.visualized_finding || response.data.finding || 
                         (isMalignant ? "Suspicious mass detected" : "No suspicious mass detected"),
      status: response.data.status || "unknown",
      birads: birads,
      tumorCharacteristics: tumorCharacteristics,
      rawResponse: response.data,
    })
  }

  // Form submit handler
  const handleSubmit = async () => {
    if (!uploadedFile) {
      toast.error("Please upload a file first")
      return
    }
    
    if (!diseaseType) {
      toast.error("Please select a disease type first")
      return
    }

    setIsProcessing(true)

    try {
      const formData = new FormData()
      formData.append("image", uploadedFile)

      let response
      
      // Call appropriate API based on disease type
      if (diseaseType === 'lung') {
        response = await postReq("/api/Prediction/GetPrediction", formData)
        processLungDiseaseResponse(response)
      } else if (diseaseType === 'breast') {
        // Update this URL with your actual breast cancer API endpoint
        response = await postReq("/api/BreastCancer/Predict", formData)
        processBreastCancerResponse(response)
      }

      setActiveTab("prediction")
      toast.success("Analysis completed successfully!")
    } catch (error) {
      console.error(`[${diseaseType}] API call failed:`, error)
      toast.error(error?.response?.data?.message || "Analysis failed. Please try again.")
      
      // Show demo data if API fails
      if (diseaseType === 'lung') {
        setPredictionData({
          diseaseType: "lung",
          diseases: [
            { name: "Pneumonia", probability: 85, severity: "high", color: "bg-red-500", detected: true, score: 0.85, rawScore: 0.85 },
            { name: "Tuberculosis", probability: 30, severity: "low", color: "bg-green-500", detected: false, score: 0.30, rawScore: 0.30 },
            { name: "COVID-19", probability: 15, severity: "low", color: "bg-green-500", detected: false, score: 0.15, rawScore: 0.15 }
          ],
          confidence: 85,
          timestamp: new Date().toLocaleString(),
          visualized_finding: "Consolidation in lower left lobe",
          status: "demo"
        })
      } else {
        setPredictionData({
          diseaseType: "breast",
          diseases: [
            { name: "Malignant Tumor", probability: 85, severity: "high", color: "bg-red-500", detected: true, score: 0.85, rawScore: 0.85, birads: 4 }
          ],
          confidence: 85,
          timestamp: new Date().toLocaleString(),
          visualized_finding: "Irregular mass with spiculated margins",
          status: "demo",
          birads: 4
        })
      }
    } finally {
      setIsProcessing(false)
    }
  }

  // Get suggested medicines based on disease type and detected conditions
  const getSuggestedMedicines = () => {
    if (!predictionData) return []
    
    let medicines = []
    
    if (predictionData.diseaseType === 'lung') {
      const detectedDiseases = predictionData.diseases
        .filter(d => d.detected || d.probability > 50)
        .map(d => d.name.toLowerCase())
      
      detectedDiseases.forEach(disease => {
        if (lungMedicines[disease]) {
          medicines = [...medicines, ...lungMedicines[disease]]
        }
      })
    } 
    else if (predictionData.diseaseType === 'breast') {
      const isMalignant = predictionData.diseases.some(d => 
        d.name === "Malignant Tumor" && (d.detected || d.probability > 50)
      )
      
      if (isMalignant) {
        medicines = [...breastCancerMedicines.malignant]
      } else {
        medicines = [...breastCancerMedicines.benign]
      }
    }
    
    // Remove duplicates by name
    medicines = medicines.filter((medicine, index, self) =>
      index === self.findIndex((m) => m.name === medicine.name)
    )
    
    if (medicines.length === 0) {
      medicines = predictionData.diseaseType === 'lung' ? lungMedicines.default : breastCancerMedicines.default
    }
    
    return medicines.slice(0, 6)
  }

  // Download report handler
  const downloadReport = () => {
    if (!predictionData) return

    const diseaseTypeText = predictionData.diseaseType === 'lung' ? 'Lung Disease' : 'Breast Cancer'
    
    let reportContent = `
MEDICAL PREDICTION ANALYSIS REPORT
=====================================
Disease Type: ${diseaseTypeText}
Generated: ${predictionData.timestamp}
Status: ${predictionData.status}
Confidence Score: ${predictionData.confidence}%
Visualized Finding: ${predictionData.visualized_finding}
`

    if (predictionData.birads) {
      reportContent += `BI-RADS Score: ${predictionData.birads}\n`
    }

    reportContent += `
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
    element.setAttribute("download", `${predictionData.diseaseType}-report-${Date.now()}.txt`)
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)

    toast.success("Report downloaded successfully!")
  }

  const handleRefresh = () => {
    if (uploadedFile && diseaseType) {
      handleSubmit()
    }
  }

  // Disease Type Selection Component
  if (!diseaseType) {
    return (
      <div className="min-h-screen w-full py-4">
        <div className="w-full mx-auto max-w-full">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 break-words">Medical Imaging Analysis Portal</h1>
            <p className="text-sm sm:text-base text-gray-600 break-words">Select the type of medical image you want to analyze</p>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden">
            <div className="p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">Choose Analysis Type</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {/* Lung Disease Card */}
                <button
                  onClick={() => setDiseaseType('lung')}
                  className="group p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all text-center"
                >
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/10 transition-colors">
                    <FaLungs className="text-4xl text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Lung Disease Analysis</h3>
                  <p className="text-sm text-gray-600">Detection of pneumonia, tuberculosis, COVID-19, and other lung conditions from chest X-rays</p>
                  <div className="mt-4 text-sm text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Select →
                  </div>
                </button>

                {/* Breast Cancer Card */}
                <button
                  onClick={() => setDiseaseType('breast')}
                  className="group p-6 border-2 border-gray-200 rounded-xl hover:border-pink-500 hover:shadow-lg transition-all text-center"
                >
                  <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-pink-500/10 transition-colors">
                    <FaVenusMars className="text-4xl text-pink-600" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Breast Cancer Analysis</h3>
                  <p className="text-sm text-gray-600">Mammogram analysis for tumor detection, classification, and BI-RADS scoring</p>
                  <div className="mt-4 text-sm text-pink-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Select →
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Main component with disease type selected
  return (
    <div className="min-h-screen w-full py-4">
      <div className="w-full max-w-full">
        {/* Header with disease type badge and reset button */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 break-words">
                {diseaseType === 'lung' ? 'Lung Disease' : 'Breast Cancer'} Analysis Portal
              </h1>
              <p className="text-sm sm:text-base text-gray-600 break-words">
                Upload a {diseaseType === 'lung' ? 'chest X-ray' : 'mammogram'} image for AI-powered medical analysis
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className={`px-3 py-1 text-center rounded-full text-sm font-medium ${
                diseaseType === 'lung' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'
              }`}>
                {diseaseType === 'lung' ? 'Lung Disease Mode' : 'Breast Cancer Mode'}
              </div>
              <button
                onClick={handleResetAll}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                Change Disease Type
              </button>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden mb-8">
          <div className="p-4 sm:p-6 md:p-8">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 break-words">
              Upload {diseaseType === 'lung' ? 'X-Ray' : 'Mammogram'} Image
            </h2>

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
                    {uploadedFile ? uploadedFile.name : `Click to select ${diseaseType === 'lung' ? 'X-ray' : 'mammogram'} image`}
                  </p>
                  <div className={`px-4 sm:px-6 py-2 ${
                    diseaseType === 'lung' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-pink-600 hover:bg-pink-700'
                  } text-white rounded-lg font-medium transition-colors inline-block text-sm sm:text-base`}>
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

          <div className={`py-4 sm:py-6 flex justify-center ${
            diseaseType === 'lung' ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-gradient-to-r from-pink-600 to-rose-600'
          }`}>
            <button
              onClick={handleSubmit}
              disabled={!uploadedFile || isProcessing}
              className={`px-4 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base ${
                uploadedFile && !isProcessing
                  ? "bg-white text-gray-900 hover:shadow-lg hover:scale-105"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
            >
              {isProcessing ? (
                <>
                  <FiRefreshCw className="animate-spin text-sm sm:text-base" />
                  <span className="break-words">Analyzing...</span>
                </>
              ) : (
                <span className="break-words">Analyze Image</span>
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        {predictionData && (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <div className="flex flex-col sm:flex-row">
                <button
                  onClick={() => setActiveTab("prediction")}
                  className={`flex-1 px-3 sm:px-6 py-3 sm:py-4 font-semibold text-base sm:text-lg transition-colors flex items-center justify-center gap-2 sm:gap-3 whitespace-nowrap overflow-hidden ${
                    activeTab === "prediction"
                      ? `${diseaseType === 'lung' ? 'text-blue-600 border-blue-600 bg-blue-50' : 'text-pink-600 border-pink-600 bg-pink-50'} border-b-2`
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <FiActivity className="text-lg sm:text-xl flex-shrink-0" />
                  <span className="truncate">Prediction Details</span>
                  {predictionData.diseases.length > 0 && (
                    <span className={`${diseaseType === 'lung' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'} text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0`}>
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

            {/* Tab Content */}
            <div className="p-4 sm:p-6">
              {/* PREDICTION DETAILS TAB */}
              {activeTab === "prediction" && (
                <div className="space-y-6 sm:space-y-8">
                  <div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 break-words">Analysis Results</h2>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                        <div className="flex flex-col items-start sm:items-end">
                          <span className="text-sm sm:text-base text-gray-700 break-words">
                            Confidence: <span className={`font-bold ${diseaseType === 'lung' ? 'text-blue-600' : 'text-pink-600'} break-words`}>{predictionData.confidence}%</span>
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
                          {predictionData.birads && (
                            <span className="text-xs sm:text-sm text-gray-500 break-words">
                              BI-RADS: <span className="font-medium">{predictionData.birads}</span>
                            </span>
                          )}
                        </div>
                        <button
                          onClick={handleRefresh}
                          disabled={isProcessing}
                          className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 ${
                            diseaseType === 'lung' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-pink-600 hover:bg-pink-700'
                          } text-white rounded-lg transition-colors text-sm sm:text-base`}
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

                  {/* Images Row */}
                  <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                    <div className="bg-gray-50 rounded-xl p-4 flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-3 sm:mb-4">
                        <FiImage className={`${diseaseType === 'lung' ? 'text-blue-600' : 'text-pink-600'} text-lg sm:text-xl flex-shrink-0`} />
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 break-words">
                          Original {diseaseType === 'lung' ? 'X-Ray' : 'Mammogram'}
                        </h3>
                      </div>
                      <div className="bg-white rounded-lg overflow-hidden shadow">
                        {uploadedImageUrl && (
                          <img
                            src={uploadedImageUrl || "/placeholder.svg"}
                            alt={`Uploaded ${diseaseType === 'lung' ? 'X-ray' : 'Mammogram'}`}
                            className="w-full h-48 sm:h-56 md:h-64 object-contain"
                          />
                        )}
                      </div>
                      <div className="mt-3 sm:mt-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-xs sm:text-sm text-blue-700 break-words">
                          <span className="font-medium">Uploaded Image</span> - Original patient {diseaseType === 'lung' ? 'X-ray' : 'mammogram'}
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-4 gap-2">
                        <div className="flex items-center gap-2">
                          <FiEye className={`${diseaseType === 'lung' ? 'text-purple-600' : 'text-orange-600'} text-lg sm:text-xl flex-shrink-0`} />
                          <h3 className="text-base sm:text-lg font-semibold text-gray-900 break-words">
                            {gradcamImageUrl ? "AI Heatmap Analysis" : "No Heatmap Available"}
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
                              <span className="font-medium">AI Heatmap</span> - Shows areas of interest detected by AI model
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
                                  alt="Base image"
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
                          <p className="text-sm text-gray-600 text-center break-words">No heatmap image available</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Disease Probabilities */}
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                      <div className="flex items-center gap-2">
                        <FiTrendingUp className={`${diseaseType === 'lung' ? 'text-emerald-600' : 'text-pink-600'} text-xl sm:text-2xl flex-shrink-0`} />
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 break-words">
                          {diseaseType === 'lung' ? 'Disease Probabilities' : 'Tumor Analysis'}
                        </h3>
                      </div>
                      <span className={`${diseaseType === 'lung' ? 'bg-emerald-100 text-emerald-800' : 'bg-pink-100 text-pink-800'} text-xs font-medium px-2.5 py-0.5 rounded-full break-words whitespace-nowrap`}>
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
                                  {disease.birads && (
                                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 break-words whitespace-nowrap">
                                      BI-RADS: {disease.birads}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="text-right sm:text-left sm:text-right">
                                <div className={`text-xl sm:text-2xl md:text-3xl font-bold ${diseaseType === 'lung' ? 'text-blue-600' : 'text-pink-600'} break-words`}>
                                  {disease.probability}%
                                </div>
                                <div className="text-xs sm:text-sm text-gray-500 break-words">Score: {disease.rawScore.toFixed(4)}</div>
                              </div>
                            </div>

                            <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 overflow-hidden mt-2 sm:mt-3">
                              <div
                                className={`h-full rounded-full ${disease.color} transition-all duration-500`}
                                style={{ width: `${disease.probability}%` }}
                              ></div>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-2 gap-1 sm:gap-0">
                              <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600">
                                <FiAlertCircle size={12} className="flex-shrink-0" />
                                <span className="break-words">Confidence: {Math.round(disease.probability * 0.95)}%</span>
                              </div>
                              <div className="text-xs text-gray-500 break-words">
                                {disease.probability >= 70
                                  ? "High Priority - Immediate attention recommended"
                                  : disease.probability >= 40
                                    ? "Medium Priority - Follow-up recommended"
                                    : "Low Priority - Routine monitoring"}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 sm:py-8 text-gray-500 break-words">No conditions detected in the analysis</div>
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
                          Based on detected {diseaseType === 'lung' ? 'lung conditions' : 'breast abnormalities'} from image analysis
                        </p>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="text-right">
                          <p className="text-xs sm:text-sm text-gray-600 break-words">Detected Conditions</p>
                          <p className={`text-base sm:text-lg font-bold ${diseaseType === 'lung' ? 'text-blue-600' : 'text-pink-600'} break-words`}>
                            {predictionData.diseases.filter(d => d.detected || d.probability > 50).length}
                          </p>
                        </div>
                      </div>
                    </div>

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

            {/* Footer Actions */}
            <div className={`bg-gradient-to-r ${
              diseaseType === 'lung' ? 'from-cyan-50 to-blue-50 border-blue-200' : 'from-pink-50 to-rose-50 border-pink-200'
            } border-t px-4 sm:px-6 py-3 sm:py-4`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 mb-0.5 sm:mb-1 text-sm sm:text-base break-words">Download Complete Report</h4>
                  <p className="text-xs sm:text-sm text-gray-600 break-words">Includes both prediction details and medication suggestions</p>
                </div>
                <button
                  onClick={downloadReport}
                  className={`w-full md:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 ${
                    diseaseType === 'lung' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-pink-600 hover:bg-pink-700'
                  } text-white rounded-lg font-medium transition-colors text-sm sm:text-base`}
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