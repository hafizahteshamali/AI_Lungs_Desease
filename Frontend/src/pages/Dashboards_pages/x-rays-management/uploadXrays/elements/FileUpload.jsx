"use client"

import { useState } from "react"
import { FiUploadCloud, FiX, FiCheck } from "react-icons/fi"
import { toast } from "react-toastify"

export default function FileUpload({ onFileUpload, uploadedFile }) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      processFile(files[0])
    }
  }

  const handleFileSelect = (e) => {
    const files = e.target.files
    if (files.length > 0) {
      processFile(files[0])
    }
  }

  const processFile = (file) => {
    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/dicom", "application/dicom"]
    if (!validTypes.some((type) => file.type.includes(type)) && !file.name.endsWith(".dcm")) {
      toast.error("Please upload a valid X-ray image (JPEG, PNG, or DICOM)")
      return
    }

    // Validate file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      toast.error("File size must be less than 50MB")
      return
    }

    onFileUpload(file)
  }

  const handleRemove = () => {
    onFileUpload(null)
  }

  return (
    <div className="space-y-4">
      {!uploadedFile ? (
        <>
          {/* Drag and Drop Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
              isDragging
                ? "border-blue-500 bg-blue-50 scale-105"
                : "border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50"
            }`}
          >
            <FiUploadCloud className="mx-auto text-4xl text-blue-500 mb-3" />
            <p className="text-lg font-semibold text-gray-900 mb-1">Drag & Drop X-Ray Here</p>
            <p className="text-sm text-gray-600">or click to browse</p>
          </div>

          {/* File Input */}
          <input
            type="file"
            onChange={handleFileSelect}
            accept=".jpg,.jpeg,.png,.dcm"
            className="hidden"
            id="file-input"
          />
          <label
            htmlFor="file-input"
            className="block w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 text-center cursor-pointer"
          >
            Select File
          </label>

          {/* File Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Supported formats:</span> JPEG, PNG, DICOM
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Max size:</span> 50MB
            </p>
          </div>
        </>
      ) : (
        // File Preview
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <FiCheck className="text-white text-xl" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">File Uploaded</p>
                <p className="text-sm text-gray-600">{uploadedFile.name}</p>
              </div>
            </div>
            <button onClick={handleRemove} className="text-gray-500 hover:text-red-500 transition-colors">
              <FiX className="text-2xl" />
            </button>
          </div>

          {/* File Details */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">File Size:</span>
              <span className="font-semibold text-gray-900">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">File Type:</span>
              <span className="font-semibold text-gray-900">{uploadedFile.type || "DICOM"}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full w-full"></div>
          </div>
        </div>
      )}
    </div>
  )
}
