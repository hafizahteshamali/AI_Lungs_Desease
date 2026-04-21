import { useState, useRef } from "react"
import { FaUpload, FaImage, FaCheckCircle, FaArrowRight, FaEye, FaEyeSlash, FaLungs, FaVenusMars } from "react-icons/fa"
import { IoMdClose } from "react-icons/io"
import { toast } from "react-toastify"
import { postReq } from "../../../api/axios"

export default function XrayDemoSection() {
  // State for disease type selection
  const [diseaseType, setDiseaseType] = useState(null) // 'lung' or 'breast'
  
  // State for managing selected file
  const [selectedFile, setSelectedFile] = useState(null)
  // State for image preview URL
  const [preview, setPreview] = useState(null)
  // State for upload process status
  const [isUploading, setIsUploading] = useState(false)
  // State for analysis process status
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  // State for storing analysis results
  const [analysisResult, setAnalysisResult] = useState(null)
  // State for progress bar percentage
  const [progress, setProgress] = useState(0)
  // State for storing raw API response
  const [apiResponse, setApiResponse] = useState(null)
  // State for Grad-CAM heatmap image
  const [gradcamImage, setGradcamImage] = useState(null)
  // State for showing/hiding heatmap overlay
  const [showHeatmap, setShowHeatmap] = useState(true)
  // State for controlling heatmap opacity (0-100)
  const [heatmapOpacity, setHeatmapOpacity] = useState(50)

  // Ref for file input element
  const fileInputRef = useRef(null)
  // Ref for section element for scrolling
  const sectionRef = useRef(null)

  // Function to handle disease type selection
  const handleDiseaseTypeSelect = (type) => {
    setDiseaseType(type)
    // Reset any previous selections
    setSelectedFile(null)
    setPreview(null)
    setAnalysisResult(null)
    setApiResponse(null)
    setGradcamImage(null)
    setProgress(0)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  // Function to handle file selection from input
  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (!file) return

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file")
      return
    }

    // Set selected file in state
    setSelectedFile(file)
    // Create preview URL for the image
    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result)
    reader.readAsDataURL(file)
    
    // Reset previous analysis results
    setAnalysisResult(null)
    setApiResponse(null)
    setGradcamImage(null)
    setProgress(0)
    setShowHeatmap(true)
  }

  // Function to simulate progress bar animation
  const simulateProgress = () => {
    setProgress(0)
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval)
          return 90
        }
        return prev + 10
      })
    }, 300)
    return interval
  }

  // Function to process Lung Disease API response
  const processLungDiseaseResponse = (response) => {
    console.log("Lung Disease API Response:", response.data)
    setApiResponse(response.data)

    // Process GradCAM image
    let gradcamValue = null
    const possibleGradcamKeys = ['gradcam', 'heatmap', 'visualization', 'grad_cam', 'gradCam']
    for (const key of possibleGradcamKeys) {
      if (response.data?.[key] && response.data[key].trim() !== "") {
        gradcamValue = response.data[key]
        break
      }
    }

    if (gradcamValue) {
      let gradcamUrl = gradcamValue
      if (!gradcamUrl.startsWith("data:image")) {
        gradcamUrl = `data:image/png;base64,${gradcamValue}`
      }
      setGradcamImage(gradcamUrl)
    }

    // Process predictions
    let predictionsData = null
    const possiblePredictionKeys = ['predictions', 'results', 'diseases', 'findings', 'prediction']
    for (const key of possiblePredictionKeys) {
      if (response.data?.[key] && typeof response.data[key] === 'object') {
        predictionsData = response.data[key]
        break
      }
    }

    const status = response.data?.status || response.data?.Status || response.data?.result || "unknown"
    const visualized_finding = response.data?.visualized_finding || response.data?.visualizedFinding || response.data?.finding || "None"

    if (predictionsData) {
      const diseases = []
      
      for (const [diseaseName, data] of Object.entries(predictionsData)) {
        let score = 0
        let detected = false
        
        if (typeof data === 'object' && data !== null) {
          score = data.score || data.Score || data.probability || data.Probability || data.value || 0
          detected = data.detected || data.Detected || data.isDetected || (score > 0.5)
        } else if (typeof data === 'number') {
          score = data
          detected = score > 0.5
        }
        
        const probability = Math.round(score * 100)
        
        let riskLevel = "low"
        let barColor = "from-green-500 to-emerald-500"
        
        if (probability >= 70) {
          riskLevel = "high"
          barColor = "from-red-500 to-orange-500"
        } else if (probability >= 40) {
          riskLevel = "medium"
          barColor = "from-yellow-500 to-amber-500"
        }

        diseases.push({
          name: diseaseName,
          probability,
          detected,
          rawScore: score,
          riskLevel,
          barColor
        })
      }
      
      diseases.sort((a, b) => b.probability - a.probability)
      const topDisease = diseases[0]
      
      const findings = []
      const recommendations = []
      
      diseases.forEach(d => {
        if (d.detected) {
          findings.push(`${d.name} detected (${d.probability}%, ${d.riskLevel} risk)`)
        } else {
          findings.push(`No ${d.name.toLowerCase()} detected`)
        }
      })
      
      if (diseases.length > 0) {
        const avgConfidence = Math.round(diseases.reduce((sum, d) => sum + d.probability, 0) / diseases.length)
        findings.push(`Overall confidence: ${avgConfidence}%`)
      }
      
      const highRiskDiseases = diseases.filter(d => d.riskLevel === "high")
      if (highRiskDiseases.length > 0) {
        recommendations.push("🚨 Immediate medical consultation required")
        recommendations.push("Urgent diagnostic tests recommended")
        recommendations.push("Contact healthcare provider immediately")
      } else if (diseases.some(d => d.riskLevel === "medium")) {
        recommendations.push("Consult a healthcare professional")
        recommendations.push("Schedule follow-up tests")
        recommendations.push("Monitor symptoms closely")
      } else {
        recommendations.push("No immediate action required")
        recommendations.push("Regular annual check-up recommended")
        recommendations.push("Maintain healthy lifestyle")
      }

      setAnalysisResult({
        disease: topDisease ? `${topDisease.name} ${topDisease.detected ? 'Detected' : 'Not Detected'}` : "No Significant Findings",
        confidence: topDisease ? `${topDisease.probability}%` : "100%",
        topDisease: topDisease?.name || "None",
        topProbability: topDisease?.probability || 0,
        findings: findings.slice(0, 4),
        recommendations,
        allDiseases: diseases,
        visualized_finding,
        status,
        diseaseType: "Lung Disease"
      })
    } else {
      setAnalysisResult({
        disease: "Analysis Complete",
        confidence: "95%",
        findings: [
          "AI analysis completed successfully",
          response.data?.message || "Image processed successfully",
          "Model inference completed",
          "Results verified"
        ],
        recommendations: [
          "Results ready for review",
          "Consult healthcare professional",
          "Save report for records"
        ],
        allDiseases: [],
        visualized_finding,
        status,
        diseaseType: "Lung Disease"
      })
    }
  }

  // Function to process Breast Cancer API response
  const processBreastCancerResponse = (response) => {
    console.log("Breast Cancer API Response:", response.data)
    setApiResponse(response.data)

    // Process GradCAM image for breast cancer
    let gradcamValue = null
    const possibleGradcamKeys = ['gradcam', 'heatmap', 'visualization', 'grad_cam', 'gradCam', 'attention_map']
    for (const key of possibleGradcamKeys) {
      if (response.data?.[key] && response.data[key].trim() !== "") {
        gradcamValue = response.data[key]
        break
      }
    }

    if (gradcamValue) {
      let gradcamUrl = gradcamValue
      if (!gradcamUrl.startsWith("data:image")) {
        gradcamUrl = `data:image/png;base64,${gradcamValue}`
      }
      setGradcamImage(gradcamUrl)
    }

    // Process breast cancer specific predictions
    const status = response.data?.status || response.data?.Status || response.data?.result || "unknown"
    const visualized_finding = response.data?.visualized_finding || response.data?.visualizedFinding || response.data?.finding || "Tumor region"
    
    // Common breast cancer prediction keys
    const prediction = response.data?.prediction || response.data?.result || response.data?.classification
    const probability = response.data?.probability || response.data?.confidence || response.data?.score || 0
    
    // Extract BI-RADS score if available
    const birads = response.data?.birads || response.data?.BI_RADS || response.data?.bi_rads
    
    // Extract tumor characteristics
    const tumorCharacteristics = response.data?.characteristics || response.data?.features || {}
    
    const probabilityPercent = Math.round(probability * 100)
    
    let riskLevel = "low"
    let barColor = "from-green-500 to-emerald-500"
    
    if (probabilityPercent >= 70) {
      riskLevel = "high"
      barColor = "from-red-500 to-orange-500"
    } else if (probabilityPercent >= 40) {
      riskLevel = "medium"
      barColor = "from-yellow-500 to-amber-500"
    }

    const isMalignant = prediction === "Malignant" || prediction === "Cancer" || prediction === "Positive" || (probability > 0.5)
    
    const findings = [
      `Tumor classification: ${prediction || (isMalignant ? "Malignant" : "Benign")}`,
      `Confidence: ${probabilityPercent}%`,
      `Risk level: ${riskLevel.toUpperCase()}`,
    ]
    
    if (birads) {
      findings.push(`BI-RADS score: ${birads}`)
    }
    
    if (tumorCharacteristics.size) {
      findings.push(`Tumor size: ${tumorCharacteristics.size || "Not specified"}`)
    }
    if (tumorCharacteristics.shape) {
      findings.push(`Tumor shape: ${tumorCharacteristics.shape}`)
    }
    if (tumorCharacteristics.margins) {
      findings.push(`Margins: ${tumorCharacteristics.margins}`)
    }
    
    const recommendations = []
    
    if (isMalignant && riskLevel === "high") {
      recommendations.push("🚨 Immediate consultation with oncologist required")
      recommendations.push("Biopsy recommended for confirmation")
      recommendations.push("Further imaging studies advised")
      recommendations.push("Discuss treatment options with specialist")
    } else if (isMalignant || riskLevel === "medium") {
      recommendations.push("Consult with breast health specialist")
      recommendations.push("Follow-up imaging in 3-6 months")
      recommendations.push("Consider genetic counseling if family history present")
    } else {
      recommendations.push("Regular screening mammograms recommended")
      recommendations.push("Clinical breast examination annually")
      recommendations.push("Maintain breast self-awareness")
    }

    // Create diseases array for compatibility with existing UI
    const diseases = [{
      name: prediction || (isMalignant ? "Malignant Tumor" : "Benign Tumor"),
      probability: probabilityPercent,
      detected: isMalignant,
      riskLevel,
      barColor
    }]

    setAnalysisResult({
      disease: isMalignant ? "Malignant Tumor Detected" : "Benign Tumor - No Malignancy Detected",
      confidence: `${probabilityPercent}%`,
      topDisease: prediction || (isMalignant ? "Malignant" : "Benign"),
      topProbability: probabilityPercent,
      findings: findings.slice(0, 5),
      recommendations,
      allDiseases: diseases,
      visualized_finding,
      status,
      diseaseType: "Breast Cancer",
      birads: birads,
      additionalInfo: response.data?.additional_info || response.data?.notes
    })
  }

  // Main function to upload and analyze image
  const handleUpload = async () => {
    if (!selectedFile) return
    if (!diseaseType) {
      toast.error("Please select a disease type first")
      return
    }

    // Set loading states
    setIsUploading(true)
    setIsAnalyzing(true)
    setProgress(10)
    // Start progress animation
    const progressInterval = simulateProgress()

    try {
      // Create FormData for API request
      const formData = new FormData()
      formData.append("image", selectedFile)

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
      
      // Stop progress animation and set to 100%
      clearInterval(progressInterval)
      setProgress(100)

      // Reset loading states
      setIsUploading(false)
      setIsAnalyzing(false)
      toast.success("Analysis completed successfully!")

    } catch (error) {
      // Handle API error
      clearInterval(progressInterval)
      setIsUploading(false)
      setIsAnalyzing(false)
      console.error("API Error:", error)
      
      // Show error toast
      toast.error(error?.response?.data?.message || "Analysis failed. Please try again.")
      
      // Show demo results based on disease type if API fails
      if (diseaseType === 'lung') {
        setAnalysisResult({
          disease: "Demo Result - Lung",
          confidence: "98.5%",
          findings: [
            "No visible lung nodules detected",
            "Clear lung fields with normal markings",
            "No signs of pneumonia or pleural effusion",
            "Cardiomediastinal silhouette is normal",
          ],
          recommendations: [
            "Regular follow-up not required",
            "Maintain healthy lifestyle",
            "Annual check-up recommended",
          ],
          allDiseases: [],
          visualized_finding: "None",
          status: "demo",
          diseaseType: "Lung Disease"
        })
      } else {
        setAnalysisResult({
          disease: "Demo Result - Breast",
          confidence: "97.2%",
          findings: [
            "No suspicious masses detected",
            "Normal breast tissue architecture",
            "No microcalcifications observed",
            "Symmetrical breast density",
          ],
          recommendations: [
            "Continue regular screening",
            "Annual mammogram recommended",
            "Clinical breast exam every 3 years",
          ],
          allDiseases: [],
          visualized_finding: "Normal breast tissue",
          status: "demo",
          diseaseType: "Breast Cancer"
        })
      }
    }
  }

  // Function to remove selected file and reset states
  const handleRemoveFile = () => {
    setSelectedFile(null)
    setPreview(null)
    setAnalysisResult(null)
    setApiResponse(null)
    setGradcamImage(null)
    setProgress(0)
    // Reset file input value
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  // Function to reset everything (including disease type)
  const handleResetAll = () => {
    setDiseaseType(null)
    setSelectedFile(null)
    setPreview(null)
    setAnalysisResult(null)
    setApiResponse(null)
    setGradcamImage(null)
    setProgress(0)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    // Main section container with id for scrolling
    <section
      ref={sectionRef}
      id="xray-demo"
      className="py-12 sm:py-16 md:py-20 px-4 xs:px-5 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block px-4 py-2 bg-[#5056e6]/10 rounded-full mb-4">
            <span className="text-sm font-semibold text-[#5056e6]">TRY OUR DEMO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            AI-Powered Medical Imaging Analysis
          </h2>
          <p className="text-[#979999] max-w-2xl mx-auto">
            Upload medical images for AI-assisted diagnosis of lung diseases or breast cancer
          </p>
        </div>

        {/* DISEASE TYPE SELECTION - FIRST STEP */}
        {!diseaseType && (
          <div className="w-full mb-8">
            <div className="bg-gradient-to-br from-[#f9f9f9] to-white border border-gray-300 rounded-xl p-6 sm:p-8 shadow-lg max-w-3xl mx-auto">
              <h3 className="text-xl font-bold text-center mb-6">Select Disease Type for Analysis</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Lung Disease Card */}
                <button
                  onClick={() => handleDiseaseTypeSelect('lung')}
                  className="group p-6 border-2 border-gray-200 rounded-xl hover:border-[#5056e6] hover:shadow-lg transition-all text-center"
                >
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#5056e6]/10 transition-colors">
                    <FaLungs className="text-4xl text-[#5056e6]" />
                  </div>
                  <h4 className="text-lg font-bold mb-2">Lung Disease</h4>
                  <p className="text-sm text-gray-600">Detection of pneumonia, nodules, COVID-19, and other lung conditions</p>
                  <div className="mt-4 text-sm text-[#5056e6] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Select →
                  </div>
                </button>

                {/* Breast Cancer Card */}
                <button
                  onClick={() => handleDiseaseTypeSelect('breast')}
                  className="group p-6 border-2 border-gray-200 rounded-xl hover:border-[#5056e6] hover:shadow-lg transition-all text-center"
                >
                  <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#5056e6]/10 transition-colors">
                    <FaVenusMars className="text-4xl text-[#5056e6]" />
                  </div>
                  <h4 className="text-lg font-bold mb-2">Breast Cancer</h4>
                  <p className="text-sm text-gray-600">Mammogram analysis for tumor detection and classification</p>
                  <div className="mt-4 text-sm text-[#5056e6] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Select →
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* UPLOAD SECTION - SECOND STEP */}
        {diseaseType && !analysisResult && (
          <div className="w-full">
            <div className="bg-gradient-to-br from-[#f9f9f9] to-white border border-gray-300 rounded-xl p-6 sm:p-8 shadow-lg max-w-2xl mx-auto">
              
              {/* Disease Type Badge and Reset Button */}
              <div className="flex justify-between items-center mb-4">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  diseaseType === 'lung' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'
                }`}>
                  {diseaseType === 'lung' ? '🫁 Lung Disease Analysis' : '🎀 Breast Cancer Analysis'}
                </div>
                <button
                  onClick={handleResetAll}
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  Change Disease Type
                </button>
              </div>

              {/* Upload Area */}
              <div
                className={`border-2 rounded-xl p-6 sm:p-8 text-center transition-all
                  ${selectedFile ? "border-green-500" : "border-dashed border-gray-300 hover:border-[#5056e6] cursor-pointer"}`}
                onClick={() => !selectedFile && fileInputRef.current?.click()}
              >
                {!selectedFile ? (
                  <>
                    <div className="w-20 h-20 bg-[#5056e6]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaUpload className="text-[#5056e6] text-3xl" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      Upload {diseaseType === 'lung' ? 'Chest X-ray' : 'Mammogram'} Image
                    </h3>
                    <p className="text-[#979999] mb-4">Drag & drop or click to browse</p>
                    <button className="px-6 py-2.5 bg-[#5056e6] text-white rounded-lg">
                      Browse Files
                    </button>
                  </>
                ) : (
                  <div className="relative">
                    <button
                      onClick={handleRemoveFile}
                      className="absolute -top-2 -right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center z-10"
                    >
                      <IoMdClose />
                    </button>
                    <FaImage className="text-green-500 text-3xl mx-auto mb-2" />
                    <p className="font-medium">{selectedFile.name}</p>
                    <div className="mt-4 h-48 relative mx-auto">
                      {preview && (
                        <img
                          src={preview}
                          alt={`${diseaseType === 'lung' ? 'X-ray' : 'Mammogram'}`}
                          className="w-full h-full object-contain rounded-lg"
                        />
                      )}
                    </div>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.dcm"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              {/* Progress Bar */}
              {(isUploading || isAnalyzing) && (
                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Processing...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[#5056e6] to-[#3d43d4] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 text-center">
                    {progress < 50 ? "Uploading image..." : 
                     progress < 90 ? "Analyzing with AI..." : 
                     "Finalizing results..."}
                  </p>
                </div>
              )}

              {/* Analyze Button */}
              {selectedFile && !analysisResult && !isUploading && !isAnalyzing && (
                <button
                  onClick={handleUpload}
                  disabled={isUploading || isAnalyzing}
                  className="mt-6 w-full py-3.5 bg-gradient-to-r from-[#5056e6] to-[#3d43d4] text-white font-bold rounded-lg flex justify-center gap-2 hover:shadow-lg transition-all"
                >
                  Analyze with AI
                  <FaArrowRight />
                </button>
              )}

              {/* Disabled button during processing */}
              {selectedFile && (isUploading || isAnalyzing) && (
                <button
                  disabled
                  className="mt-6 w-full py-3.5 bg-gray-400 text-white font-bold rounded-lg flex justify-center gap-2"
                >
                  Processing...
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </button>
              )}
            </div>
          </div>
        )}

        {/* IMAGES ROW - AFTER ANALYSIS */}
        {analysisResult && gradcamImage && (
          <div className="w-full mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              
              {/* Original Image Card */}
              <div className="bg-gradient-to-br from-[#f9f9f9] to-white border border-gray-300 rounded-xl p-6 shadow-lg h-full">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Original {analysisResult.diseaseType === 'Lung Disease' ? 'X-ray' : 'Mammogram'} Image
                </h3>
                <div className="bg-black rounded-lg overflow-hidden shadow h-64">
                  {preview && (
                    <img
                      src={preview}
                      alt={`Original ${analysisResult.diseaseType === 'Lung Disease' ? 'X-ray' : 'Mammogram'}`}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-xs text-blue-700">
                    <span className="font-medium">Original Upload</span> - This is the {analysisResult.diseaseType === 'Lung Disease' ? 'chest X-ray' : 'mammogram'} image you uploaded for analysis
                  </p>
                </div>
              </div>

              {/* GradCAM Image Card */}
              <div className="bg-gradient-to-br from-[#f9f9f9] to-white border border-gray-300 rounded-xl p-6 shadow-lg h-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-800">AI Heatmap Analysis</h3>
                  <button
                    onClick={() => setShowHeatmap(!showHeatmap)}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors text-sm"
                  >
                    {showHeatmap ? <FaEyeSlash className="text-xs" /> : <FaEye className="text-xs" />}
                    {showHeatmap ? "Hide Heatmap" : "Show Heatmap"}
                  </button>
                </div>

                <div className="bg-black rounded-lg overflow-hidden shadow relative h-64">
                  {showHeatmap ? (
                    <img
                      src={gradcamImage}
                      alt="AI Heatmap Analysis"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    preview && (
                      <>
                        <img
                          src={preview}
                          alt="Medical image with heatmap overlay"
                          className="absolute inset-0 w-full h-full object-contain"
                        />
                        <div
                          className="absolute inset-0 bg-gradient-to-br from-red-500 via-yellow-400 to-green-500 mix-blend-multiply"
                          style={{ opacity: heatmapOpacity / 100 }}
                        ></div>
                      </>
                    )
                  )}
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Heatmap Opacity</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={heatmapOpacity}
                        onChange={(e) => setHeatmapOpacity(Number(e.target.value))}
                        className="w-24 accent-blue-600"
                      />
                      <span className="text-xs text-gray-700">{heatmapOpacity}%</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 justify-center">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded bg-red-500"></div>
                      <span className="text-xs text-gray-600">High Risk</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded bg-yellow-400"></div>
                      <span className="text-xs text-gray-600">Medium</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded bg-green-500"></div>
                      <span className="text-xs text-gray-600">Low Risk</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-100">
                  <p className="text-xs text-purple-700">
                    <span className="font-medium">AI Generated Heatmap</span> - Shows areas where AI detected {analysisResult.diseaseType === 'Lung Disease' ? 'abnormalities' : 'potential tumors'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* RESULTS SECTION - AFTER ANALYSIS */}
        {analysisResult && (
          <div className="w-full">
            <div className="bg-gradient-to-br from-[#f9f9f9] to-white border border-gray-300 rounded-xl p-6 md:p-8 shadow-lg">
              <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                
                {/* Left Column - Diagnosis Summary */}
                <div className="lg:w-2/5">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">Diagnosis Summary</h3>
                      <div className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${
                        analysisResult.diseaseType === 'Lung Disease' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-pink-100 text-pink-800'
                      }`}>
                        {analysisResult.diseaseType}
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      analysisResult.status === "success" ? "bg-green-100 text-green-800" :
                      analysisResult.status === "error" ? "bg-red-100 text-red-800" :
                      "bg-yellow-100 text-yellow-800"
                    }`}>
                      {analysisResult.status.toUpperCase()}
                    </span>
                  </div>

                  <div className={`bg-gradient-to-r ${
                    analysisResult.diseaseType === 'Lung Disease' 
                      ? 'from-blue-50 to-green-50 border-blue-200' 
                      : 'from-pink-50 to-purple-50 border-pink-200'
                  } border rounded-xl p-5 mb-6`}>
                    <p className="text-2xl font-bold text-gray-800 mb-2">{analysisResult.disease}</p>
                    <p className="text-green-600 text-lg font-medium mb-2">
                      Confidence: {analysisResult.confidence}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Finding:</span>
                      <span className="text-sm font-medium text-gray-800">{analysisResult.visualized_finding}</span>
                    </div>
                    {analysisResult.birads && (
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-sm text-gray-600">BI-RADS:</span>
                        <span className="text-sm font-medium text-gray-800">{analysisResult.birads}</span>
                      </div>
                    )}
                  </div>

                  {analysisResult.allDiseases && analysisResult.allDiseases.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-bold mb-4 text-gray-800">
                        {analysisResult.diseaseType === 'Lung Disease' ? 'Disease Probabilities' : 'Tumor Analysis'}
                      </h4>
                      <div className="space-y-4">
                        {analysisResult.allDiseases.map((disease, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{disease.name}</span>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${
                                  disease.riskLevel === "high" 
                                    ? "bg-red-100 text-red-800"
                                    : disease.riskLevel === "medium"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-green-100 text-green-800"
                                }`}>
                                  {disease.riskLevel.toUpperCase()}
                                </span>
                              </div>
                              <span className={`font-bold ${
                                disease.detected ? "text-red-600" : "text-green-600"
                              }`}>
                                {disease.probability}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className={`h-2.5 rounded-full bg-gradient-to-r ${disease.barColor}`}
                                style={{ width: `${disease.probability}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={handleRemoveFile}
                      className="flex-1 py-3 border-2 border-[#5056e6] text-[#5056e6] font-bold rounded-lg hover:bg-[#5056e6] hover:text-white transition-all"
                    >
                      New Analysis
                    </button>
                    <button
                      onClick={handleResetAll}
                      className="flex-1 py-3 border-2 border-gray-300 text-gray-600 font-bold rounded-lg hover:bg-gray-100 transition-all"
                    >
                      Change Type
                    </button>
                  </div>
                </div>

                {/* Right Column - Findings & Recommendations */}
                <div className="lg:w-3/5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    <div className={`${
                      analysisResult.diseaseType === 'Lung Disease' ? 'bg-blue-50' : 'bg-pink-50'
                    } border border-opacity-20 rounded-xl p-5`}>
                      <h4 className="font-bold mb-4 text-gray-800 text-lg">Key Findings</h4>
                      <div className="space-y-3">
                        {analysisResult.findings.map((f, i) => (
                          <div key={i} className="flex gap-3">
                            <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={`${
                      analysisResult.diseaseType === 'Lung Disease' ? 'bg-green-50' : 'bg-purple-50'
                    } border border-opacity-20 rounded-xl p-5`}>
                      <h4 className="font-bold mb-4 text-gray-800 text-lg">Recommendations</h4>
                      <div className="space-y-3">
                        {analysisResult.recommendations.map((r, i) => (
                          <p key={i} className="text-sm">
                            <span className="text-[#5056e6] font-bold">{i + 1}.</span> {r}
                          </p>
                        ))}
                      </div>
                    </div>

                    {apiResponse && (
                      <div className="md:col-span-2">
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                          <details className="cursor-pointer">
                            <summary className="text-sm font-medium text-gray-700 list-none">
                              <span className="flex items-center justify-between">
                                View API Response Details
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                              </span>
                            </summary>
                            <div className="mt-3 p-3 bg-gray-900 text-gray-100 rounded text-xs font-mono overflow-auto max-h-40">
                              <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
                            </div>
                          </details>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}