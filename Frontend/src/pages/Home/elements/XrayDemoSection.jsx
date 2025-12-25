import { useState, useRef } from "react"
import { FaUpload, FaImage, FaFileMedical, FaCheckCircle, FaArrowRight } from "react-icons/fa"
import { IoMdClose } from "react-icons/io"
import { toast } from "react-toastify"

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
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file")
      return
    }

    setSelectedFile(file)
    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result)
    reader.readAsDataURL(file)
  }

  const handleUpload = () => {
    if (!selectedFile) return

    setIsUploading(true)

    setTimeout(() => {
      setIsUploading(false)
      setIsAnalyzing(true)

      setTimeout(() => {
        setIsAnalyzing(false)
        setAnalysisResult({
          disease: "No Significant Findings",
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
        })
      }, 3000)
    }, 2000)
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    setPreview(null)
    setAnalysisResult(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <section
      ref={sectionRef}
      id="xray-demo"
      className="py-12 sm:py-16 md:py-20 px-4 xs:px-5 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block px-4 py-2 bg-[#5056e6]/10 rounded-full mb-4">
            <span className="text-sm font-semibold text-[#5056e6]">TRY OUR DEMO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Experience AI-Powered Analysis
          </h2>
          <p className="text-[#979999] max-w-2xl mx-auto">
            Upload a sample X-ray image to see how our AI detects abnormalities in real-time
          </p>
        </div>

        {/* MAIN CONTAINER */}
        <div
          className={`flex flex-col gap-8 ${
            analysisResult ? "lg:flex-row lg:gap-12" : "items-center"
          }`}
        >
          {/* LEFT UPLOAD SECTION */}
          <div className={`${analysisResult ? "lg:w-1/2" : "w-full max-w-2xl"}`}>
            <div className="bg-gradient-to-br from-[#f9f9f9] to-white border border-gray-300 rounded-xl p-6 sm:p-8 shadow-lg">

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
                    <h3 className="text-xl font-bold mb-2">Upload X-ray Image</h3>
                    <p className="text-[#979999] mb-4">Drag & drop or click to browse</p>
                    <button className="px-6 py-2.5 bg-[#5056e6] text-white rounded-lg">
                      Browse Files
                    </button>
                  </>
                ) : (
                  <div className="relative">
                    <button
                      onClick={handleRemoveFile}
                      className="absolute -top-2 -right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center"
                    >
                      <IoMdClose />
                    </button>
                    <FaImage className="text-green-500 text-3xl mx-auto mb-2" />
                    <p className="font-medium">{selectedFile.name}</p>
                    {preview && (
                      <img
                        src={preview}
                        alt="Preview"
                        className="mt-4 h-48 mx-auto object-contain"
                      />
                    )}
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

              {selectedFile && !analysisResult && (
                <button
                  onClick={handleUpload}
                  disabled={isUploading || isAnalyzing}
                  className="mt-6 w-full py-3.5 bg-gradient-to-r from-[#5056e6] to-[#3d43d4] text-white font-bold rounded-lg flex justify-center gap-2"
                >
                  {(isUploading || isAnalyzing) ? "Processing..." : "Analyze with AI"}
                  <FaArrowRight />
                </button>
              )}
            </div>
          </div>

          {/* RIGHT RESULT SECTION – HIDDEN BY DEFAULT */}
          {analysisResult && (
            <div className="lg:w-1/2">
              <div className="bg-gradient-to-br from-[#f9f9f9] to-white border border-gray-300 rounded-xl p-6 sm:p-8 shadow-lg space-y-6">

                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">Analysis Complete</h3>
                  <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                    ✓ AI Verified
                  </span>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <p className="text-3xl font-bold">{analysisResult.disease}</p>
                  <p className="text-green-600 mt-1">
                    Confidence: {analysisResult.confidence}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold mb-2">Key Findings</h4>
                  {analysisResult.findings.map((f, i) => (
                    <div key={i} className="flex gap-2 text-sm">
                      <FaCheckCircle className="text-green-500 mt-1" />
                      {f}
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="font-bold mb-2">Recommendations</h4>
                  {analysisResult.recommendations.map((r, i) => (
                    <p key={i} className="text-sm">{i + 1}. {r}</p>
                  ))}
                </div>

                <button
                  onClick={handleRemoveFile}
                  className="w-full py-3 border-2 border-[#5056e6] text-[#5056e6] font-bold rounded-lg hover:bg-[#5056e6] hover:text-white transition-all"
                >
                  Try Another X-ray
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
