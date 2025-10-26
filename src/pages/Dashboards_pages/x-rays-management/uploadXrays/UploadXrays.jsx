"use client"

import { useState } from "react"
import FileUpload from "./elements/FileUpload"
import MetadataForm from "./elements/MetadataForm"
import ProcessingIndicator from "./elements/ProcessingIndicator"
import SuccessMessage from "./elements/SuccessMessage"

export default function UploadXrays() {
  const [uploadedFile, setUploadedFile] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    patientName: "",
    patientId: "",
    xrayType: "chest",
    scanDate: new Date().toISOString().split("T")[0],
    notes: "",
  })

  const handleFileUpload = (file) => {
    setUploadedFile(file)
  }

  const handleFormChange = (data) => {
    setFormData(data)
  }

  const handleSubmit = async () => {
    if (!uploadedFile) {
      alert("Please upload a file first")
      return
    }

    setIsProcessing(true)

    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)

      // Reset after 3 seconds
      setTimeout(() => {
        setUploadedFile(null)
        setFormData({
          patientName: "",
          patientId: "",
          xrayType: "chest",
          scanDate: new Date().toISOString().split("T")[0],
          notes: "",
        })
        setIsSuccess(false)
      }, 3000)
    }, 2000)
  }

  if (isSuccess) {
    return <SuccessMessage />
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">X-Ray Upload Portal</h1>
          <p className="text-gray-600">Upload and manage medical X-ray images with ease</p>
        </div>

        {/* Main Container - Yahan grid ko flex mein change kiya hai */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-8 p-8">
            {/* Left Column - File Upload */}
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Step 1: Upload X-Ray</h2>
              <FileUpload onFileUpload={handleFileUpload} uploadedFile={uploadedFile} />
            </div>

            {/* Right Column - Metadata Form */}
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Step 2: Patient Information</h2>
              <MetadataForm formData={formData} onFormChange={handleFormChange} uploadedFile={uploadedFile} />
            </div>
          </div>

          {/* Processing Indicator */}
          {isProcessing && <ProcessingIndicator />}

          {/* Submit Button */}
          {!isProcessing && (
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={!uploadedFile}
                className={`px-8 py-3 rounded-lg font-semibold text-gray-700 transition-all duration-300 ${
                  uploadedFile
                    ? "bg-white text-blue-600 hover:shadow-lg hover:scale-105"
                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                }`}
              >
                Submit & Process
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}