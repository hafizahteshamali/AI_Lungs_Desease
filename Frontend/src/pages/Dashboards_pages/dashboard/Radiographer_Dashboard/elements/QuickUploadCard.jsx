"use client"
// React icons import karte hain card mein use ke liye
import { FaUpload, FaFileImage, FaFileMedical } from "react-icons/fa"
import { FiUploadCloud } from "react-icons/fi"

// Yeh component quick scan upload interface provide karta hai
const QuickUploadCard = ({ onUpload }) => {
  return (
    // Main card container jo white background aur shadow provide karta hai
    <div className="bg-white rounded-xl shadow-lg p-6 h-full">
      {/* Header section jo title aur icon dikhata hai */}
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 p-3 rounded-lg mr-3">
          <FaUpload className="text-blue-600 text-xl" /> {/* Upload icon with blue styling */}
        </div>
        <h2 className="text-xl font-bold text-gray-900">Quick Upload</h2> {/* Card title */}
      </div>

      {/* Main upload button jo scan upload trigger karta hai */}
      <button
        onClick={onUpload} // Parent component se pass kiya gaya upload function
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center space-x-3 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
      >
        <FiUploadCloud className="text-2xl" /> {/* Cloud upload icon */}
        <span>Upload New Scan</span> {/* Button text */}
      </button>

      {/* Supported formats section jo allowed file types dikhata hai */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <p className="text-sm font-semibold text-gray-700 mb-3">Supported Formats:</p> {/* Section title */}
        <div className="space-y-2">
          {/* DICOM format item */}
          <div className="flex items-center text-sm text-gray-600">
            <FaFileMedical className="mr-2 text-blue-500" /> {/* Medical file icon */}
            <span>DICOM (.dcm, .dicom)</span> {/* Format description */}
          </div>
          {/* Image formats item */}
          <div className="flex items-center text-sm text-gray-600">
            <FaFileImage className="mr-2 text-green-500" /> {/* Image file icon */}
            <span>Images (.png, .jpg, .jpeg)</span> {/* Format description */}
          </div>
        </div>
      </div>

      {/* Tip section jo helpful information provide karta hai */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-xs text-blue-800">
          <span className="font-semibold">Tip:</span> Ensure patient information is properly labeled before uploading.
        </p>
      </div>
    </div>
  )
}

export default QuickUploadCard