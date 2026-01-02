"use client"

import { useState } from "react"
import FileUpload from "./elements/FileUpload"
import ProcessingIndicator from "./elements/ProcessingIndicator"
import SuccessMessage from "./elements/SuccessMessage"
import { toast } from "react-toastify"
import { postReq } from "../../../../api/axios"

export default function UploadXrays() {
  const [uploadedFile, setUploadedFile] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleFileUpload = (file) => {
    setUploadedFile(file)
  }

  const handleSubmit = async () => {
    if (!uploadedFile) {
      toast.error("Please upload a file first")
      return
    }
  
    setIsProcessing(true)
  
    try {
      const formData = new FormData()
  
      // ✅ Backend EXACTLY this expects
      formData.append("image", uploadedFile)
  
      const response = await postReq(
        "/api/Prediction/GetPrediction",
        formData
      )
  
      console.log("API Response:", response.data)
  
      setIsSuccess(true)
  
      setTimeout(() => {
        setUploadedFile(null)
        setIsSuccess(false)
      }, 3000)
  
    } catch (error) {
      console.error("API call failed:", error)
      toast.error(
        error?.response?.data?.message ||
        "File upload failed. Please try again."
      )
    } finally {
      setIsProcessing(false)
    }
  }
  

  if (isSuccess) {
    return <SuccessMessage />
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="w-full mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            X-Ray Upload Portal
          </h1>
          <p className="text-gray-600">
            Upload medical X-ray images with ease
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Upload X-Ray Image
              </h2>
              <FileUpload
                onFileUpload={handleFileUpload}
                uploadedFile={uploadedFile}
              />
            </div>
          </div>

          {isProcessing && <ProcessingIndicator />}

          {!isProcessing && (
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 flex justify-center">
              <button
                onClick={handleSubmit}
                disabled={!uploadedFile}
                className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  uploadedFile
                    ? "bg-white text-blue-600 hover:shadow-lg hover:scale-105"
                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                }`}
              >
                Process X-Ray
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
