"use client"

import { FiTrendingUp, FiAlertCircle } from "react-icons/fi"

export default function DiseaseProbabilities({ diseases }) {
  const getSeverityBadge = (severity) => {
    const badges = {
      high: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
      medium: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
      low: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
    }
    return badges[severity] || badges.low
  }

  const getSeverityLabel = (severity) => {
    return severity.charAt(0).toUpperCase() + severity.slice(1)
  }

  return (
    <div className="bg-white w-full lg:w-[49%] pb-4 dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-700">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-4">
        <div className="flex items-center gap-2">
          <FiTrendingUp className="text-emerald-100" size={20} />
          <h2 className="text-lg font-semibold text-white">Disease Probabilities</h2>
        </div>
        <p className="text-emerald-100 text-sm mt-1">AI-predicted likelihood of conditions</p>
      </div>

      {/* Disease List */}
      <div className="divide-y divide-slate-200 dark:divide-slate-700">
        {diseases.map((disease, index) => (
          <div key={index} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{disease.name}</h3>
                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${getSeverityBadge(disease.severity)}`}
                >
                  {getSeverityLabel(disease.severity)} Risk
                </span>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{disease.probability}%</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${disease.color}`}
                style={{ width: `${disease.probability}%` }}
              ></div>
            </div>

            {/* Confidence Indicator */}
            <div className="mt-3 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <FiAlertCircle size={14} />
              <span>Confidence: {Math.round(disease.probability * 0.95)}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Stats - Yahan grid ko flex mein change kiya hai */}
      <div className="bg-slate-50 dark:bg-slate-700/50 px-6 py-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[calc(33.333%-16px)]">
            <p className="text-xs text-slate-600 dark:text-slate-400 uppercase tracking-wide">Total Conditions</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{diseases.length}</p>
          </div>
          <div className="flex-1 min-w-[calc(33.333%-16px)]">
            <p className="text-xs text-slate-600 dark:text-slate-400 uppercase tracking-wide">Highest Risk</p>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
              {Math.max(...diseases.map((d) => d.probability))}%
            </p>
          </div>
          <div className="flex-1 min-w-[calc(33.333%-16px)]">
            <p className="text-xs text-slate-600 dark:text-slate-400 uppercase tracking-wide">Average Risk</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {Math.round(diseases.reduce((a, b) => a + b.probability, 0) / diseases.length)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}