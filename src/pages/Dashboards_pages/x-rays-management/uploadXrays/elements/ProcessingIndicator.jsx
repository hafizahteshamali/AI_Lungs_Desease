"use client"

import { FiLoader } from "react-icons/fi"

export default function ProcessingIndicator() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-8">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="relative w-16 h-16">
          <FiLoader className="w-full h-full text-white animate-spin" />
        </div>
        <div className="text-center">
          <p className="text-white font-semibold text-lg mb-2">Processing X-Ray</p>
          <p className="text-blue-100 text-sm">Please wait while we process your upload...</p>
        </div>

        {/* Progress Steps */}
        <div className="w-full max-w-xs mt-4 space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
              ✓
            </div>
            <span className="text-white text-sm">File uploaded</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold text-sm animate-pulse">
              2
            </div>
            <span className="text-blue-100 text-sm">Validating image</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
              3
            </div>
            <span className="text-blue-100 text-sm">Storing data</span>
          </div>
        </div>
      </div>
    </div>
  )
}
