import { useState, useRef } from "react"
import { FaUpload, FaImage, FaFileMedical, FaCheckCircle, FaArrowRight } from "react-icons/fa"
import { IoMdClose } from "react-icons/io"

export default function XrayDemoSection() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)
  const fileInputRef = useRef(null)
  const sectionRef = useRef(null)

  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file')
        return
      }
      
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpload = () => {
    if (!selectedFile) return
    
    setIsUploading(true)
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false)
      setIsAnalyzing(true)
      
      // Simulate AI analysis
      setTimeout(() => {
        setIsAnalyzing(false)
        
        // Mock analysis result
        setAnalysisResult({
          disease: "No Significant Findings",
          confidence: "98.5%",
          findings: [
            "No visible lung nodules detected",
            "Clear lung fields with normal markings",
            "No signs of pneumonia or pleural effusion",
            "Cardiomediastinal silhouette is normal"
          ],
          recommendations: [
            "Regular follow-up not required",
            "Maintain healthy lifestyle",
            "Annual check-up recommended"
          ]
        })
      }, 3000)
    }, 2000)
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    setPreview(null)
    setAnalysisResult(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleDemoClick = () => {
    // Scroll to this section when demo button is clicked
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const handleTryAnother = () => {
    handleRemoveFile()
  }

  return (
    <section 
      ref={sectionRef} 
      id="xray-demo"
      className="py-12 sm:py-16 md:py-20 px-4 xs:px-5 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-[#5056e6]/10 rounded-full mb-3 sm:mb-4">
            <span className="text-xs sm:text-sm font-semibold text-[#5056e6]">TRY OUR DEMO</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-3 sm:mb-4">
            Experience AI-Powered Analysis
          </h2>
          <p className="text-sm xs:text-base sm:text-lg text-[#979999] max-w-xl sm:max-w-2xl mx-auto leading-relaxed">
            Upload a sample X-ray image to see how our AI detects abnormalities in real-time
          </p>
        </div>

        {/* Main Demo Container */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Left: Upload Section */}
          <div className="lg:w-1/2">
            <div className="bg-gradient-to-br from-[#f9f9f9] to-white border border-gray-200 sm:border-gray-300 rounded-xl p-6 sm:p-8 shadow-lg h-full">
              
              {/* Upload Area */}
              <div 
                className={`border-2 ${selectedFile ? 'border-green-500' : 'border-dashed border-gray-300'} 
                          rounded-xl p-6 sm:p-8 text-center transition-all duration-300
                          ${!selectedFile ? 'hover:border-[#5056e6] hover:bg-[#5056e6]/5 cursor-pointer' : ''}`}
                onClick={() => !selectedFile && fileInputRef.current?.click()}
              >
                {!selectedFile ? (
                  <div className="space-y-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#5056e6]/10 flex items-center justify-center mx-auto">
                      <FaUpload className="text-[#5056e6] text-2xl sm:text-3xl" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-black mb-2">
                        Upload X-ray Image
                      </h3>
                      <p className="text-sm text-[#979999] mb-4">
                        Drag & drop or click to browse
                      </p>
                      <p className="text-xs text-[#979999]">
                        Supported formats: JPG, PNG, DICOM
                      </p>
                    </div>
                    <button 
                      className="px-6 py-2.5 bg-[#5056e6] text-white font-medium rounded-lg hover:bg-[#3d43d4] transition-colors"
                      onClick={(e) => {
                        e.stopPropagation()
                        fileInputRef.current?.click()
                      }}
                    >
                      Browse Files
                    </button>
                  </div>
                ) : (
                  <div className="relative">
                    <button
                      onClick={handleRemoveFile}
                      className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors z-10"
                    >
                      <IoMdClose />
                    </button>
                    <div className="mb-4">
                      <FaImage className="text-green-500 text-3xl mx-auto mb-2" />
                      <p className="text-sm font-medium text-black truncate">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-[#979999]">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    {preview && (
                      <div className="relative h-48 sm:h-56 rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={preview}
                          alt="Preview"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                  </div>
                )}
                
                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.dcm"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              {/* Upload Button */}
              {selectedFile && !analysisResult && (
                <div className="mt-6">
                  <button
                    onClick={handleUpload}
                    disabled={isUploading || isAnalyzing}
                    className="w-full py-3.5 bg-gradient-to-r from-[#5056e6] to-[#3d43d4] text-white font-bold rounded-lg hover:from-[#3d43d4] hover:to-[#2e32b3] transition-all duration-300 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isUploading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Uploading...
                      </>
                    ) : isAnalyzing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Analyzing with AI...
                      </>
                    ) : (
                      <>
                        Analyze with AI
                        <FaArrowRight />
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Features List */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-bold text-black mb-4">How it works:</h4>
                <div className="space-y-3">
                  {[
                    { icon: <FaUpload className="text-[#5056e6]" />, text: "Upload X-ray image" },
                    { icon: <FaImage className="text-[#008059]" />, text: "AI analyzes the image" },
                    { icon: <FaFileMedical className="text-[#007a9b]" />, text: "Get instant results" },
                    { icon: <FaCheckCircle className="text-green-500" />, text: "Review detailed report" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <span className="text-sm text-gray-700">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Results Section */}
          <div className="lg:w-1/2">
            <div className="bg-gradient-to-br from-[#f9f9f9] to-white border border-gray-200 sm:border-gray-300 rounded-xl p-6 sm:p-8 shadow-lg h-full">
              
              {!analysisResult ? (
                // Placeholder before analysis
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                    <FaFileMedical className="text-gray-400 text-3xl" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-3">
                    AI Analysis Results
                  </h3>
                  <p className="text-[#979999] mb-6 max-w-sm">
                    Upload an X-ray image to see real-time AI analysis with detailed findings and recommendations.
                  </p>
                  <div className="space-y-4 w-full max-w-xs">
                    {[
                      { label: "Disease Detection", color: "bg-[#5056e6]/20", width: "w-3/4" },
                      { label: "Confidence Score", color: "bg-[#008059]/20", width: "w-4/5" },
                      { label: "Detailed Findings", color: "bg-[#007a9b]/20", width: "w-2/3" }
                    ].map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-700">{item.label}</span>
                          <span className="text-[#979999]">--</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className={`h-full ${item.color} ${item.width} animate-pulse`}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                // Analysis Results
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-black">Analysis Complete</h3>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                      ✓ AI Verified
                    </span>
                  </div>

                  {/* Main Result */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-black text-lg">Diagnosis</h4>
                      <span className="text-2xl font-bold text-green-600">{analysisResult.confidence}</span>
                    </div>
                    <p className="text-2xl md:text-3xl font-bold text-black mb-2">
                      {analysisResult.disease}
                    </p>
                    <p className="text-green-600 text-sm">
                      ✓ No immediate medical intervention required
                    </p>
                  </div>

                  {/* Key Findings */}
                  <div>
                    <h4 className="font-bold text-black mb-3">Key Findings</h4>
                    <div className="space-y-2">
                      {analysisResult.findings.map((finding, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <FaCheckCircle className="text-green-500 text-xs" />
                          </div>
                          <span className="text-sm text-gray-700">{finding}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h4 className="font-bold text-black mb-3">Recommendations</h4>
                    <div className="space-y-2">
                      {analysisResult.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-blue-500 text-xs font-bold">{index + 1}</span>
                          </div>
                          <span className="text-sm text-gray-700">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Try Another Button */}
                  <button
                    onClick={handleTryAnother}
                    className="w-full py-3 border-2 border-[#5056e6] text-[#5056e6] font-bold rounded-lg hover:bg-[#5056e6] hover:text-white transition-all duration-300"
                  >
                    Try Another X-ray
                  </button>

                  {/* Disclaimer */}
                  <p className="text-xs text-[#979999] text-center pt-4 border-t border-gray-200">
                    Note: This is a demonstration. For actual medical diagnosis, please consult with healthcare professionals.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Banner */}
        <div className="mt-12 bg-gradient-to-r from-[#5056e6] via-[#3d43d4] to-[#007a9b] rounded-xl p-6 sm:p-8 text-white">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12">
            {[
              { value: "98.5%", label: "Accuracy Rate" },
              { value: "<2 min", label: "Analysis Time" },
              { value: "500K+", label: "Images Analyzed" },
              { value: "50+", label: "Hospitals Trust" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm sm:text-base opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}