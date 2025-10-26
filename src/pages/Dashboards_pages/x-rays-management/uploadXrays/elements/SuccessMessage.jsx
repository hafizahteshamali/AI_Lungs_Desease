"use client"

import { FiCheckCircle } from "react-icons/fi"

export default function SuccessMessage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
            <FiCheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3">Success!</h1>
        <p className="text-gray-600 mb-2">Your X-ray has been successfully uploaded and processed.</p>
        <p className="text-sm text-gray-500 mb-6">The file has been stored securely in our system.</p>

        {/* Success Details */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-left">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="font-semibold text-green-600">Completed</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Processing Time:</span>
              <span className="font-semibold text-gray-900">~2 seconds</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500">Redirecting to dashboard in a moment...</p>
      </div>
    </div>
  )
}
