"use client"

import { useState } from "react"
import { FiSliders } from "react-icons/fi"

export default function HeatmapOverlay({ imageUrl }) {
  const [opacity, setOpacity] = useState(70)

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-700">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4">
        <h2 className="text-lg font-semibold text-white">Heatmap Overlay</h2>
        <p className="text-purple-100 text-sm mt-1">Areas of concern highlighted in red</p>
      </div>

      {/* Heatmap Container */}
      <div className="p-6">
        <div className="relative bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden aspect-square flex items-center justify-center">
          {/* Base Image */}
          <img src={imageUrl || "/placeholder.svg"} alt="Medical scan" className="w-full h-full object-cover" />

          {/* Heatmap Overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-red-500 via-yellow-400 to-green-500 mix-blend-multiply"
            style={{ opacity: opacity / 100 }}
          ></div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-slate-900/10"></div>
        </div>

        {/* Opacity Control */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
              <FiSliders size={16} />
              Heatmap Intensity
            </label>
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{opacity}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        {/* Legend - Yahan grid ko flex mein change kiya hai */}
        <div className="mt-6 flex flex-wrap gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-[calc(33.333%-12px)]">
            <div className="w-4 h-4 rounded bg-red-500"></div>
            <span className="text-sm text-slate-600 dark:text-slate-400">High Risk</span>
          </div>
          <div className="flex items-center gap-2 flex-1 min-w-[calc(33.333%-12px)]">
            <div className="w-4 h-4 rounded bg-yellow-400"></div>
            <span className="text-sm text-slate-600 dark:text-slate-400">Medium Risk</span>
          </div>
          <div className="flex items-center gap-2 flex-1 min-w-[calc(33.333%-12px)]">
            <div className="w-4 h-4 rounded bg-green-500"></div>
            <span className="text-sm text-slate-600 dark:text-slate-400">Low Risk</span>
          </div>
        </div>
      </div>
    </div>
  )
}