"use client"

import { FiEye, FiEyeOff } from "react-icons/fi"

export default function ImageDisplay({ imageUrl, showHeatmap, onToggleHeatmap }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-700">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
        <h2 className="text-lg font-semibold text-white">Original Image</h2>
      </div>

      {/* Image Container */}
      <div className="p-6">
        <div className="relative bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden aspect-square flex items-center justify-center">
          <img src={imageUrl || "/placeholder.svg"} alt="Medical scan" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-slate-900/10"></div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={onToggleHeatmap}
          className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 dark:bg-slate-700 hover:bg-blue-100 dark:hover:bg-slate-600 text-blue-700 dark:text-blue-300 rounded-lg transition-colors font-medium"
        >
          {showHeatmap ? (
            <>
              <FiEyeOff size={18} />
              Hide Heatmap
            </>
          ) : (
            <>
              <FiEye size={18} />
              Show Heatmap
            </>
          )}
        </button>
      </div>

      {/* Image Info */}
      <div className="bg-slate-50 dark:bg-slate-700/50 px-6 py-3 border-t border-slate-200 dark:border-slate-700">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          <span className="font-semibold">Format:</span> DICOM / PNG
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          <span className="font-semibold">Resolution:</span> 512 × 512 px
        </p>
      </div>
    </div>
  )
}
