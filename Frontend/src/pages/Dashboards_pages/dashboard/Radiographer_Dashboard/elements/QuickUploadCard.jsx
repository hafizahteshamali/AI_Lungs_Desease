"use client"
import { FaUpload, FaFileImage, FaFileMedical } from "react-icons/fa"
import { FiUploadCloud } from "react-icons/fi"

const QuickUploadCard = ({ onUpload }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 h-full">
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 p-3 rounded-lg mr-3">
          <FaUpload className="text-blue-600 text-xl" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Quick Upload</h2>
      </div>

      <button
        onClick={onUpload}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center space-x-3 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
      >
        <FiUploadCloud className="text-2xl" />
        <span>Upload New Scan</span>
      </button>

      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <p className="text-sm font-semibold text-gray-700 mb-3">Supported Formats:</p>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <FaFileMedical className="mr-2 text-blue-500" />
            <span>DICOM (.dcm, .dicom)</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FaFileImage className="mr-2 text-green-500" />
            <span>Images (.png, .jpg, .jpeg)</span>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-xs text-blue-800">
          <span className="font-semibold">Tip:</span> Ensure patient information is properly labeled before uploading.
        </p>
      </div>
    </div>
  )
}

export default QuickUploadCard
