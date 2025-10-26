"use client"

import { FiEdit2, FiSave, FiX } from "react-icons/fi"
import { useState } from "react"

export default function DoctorNotes({ notes: initialNotes }) {
  const [isEditing, setIsEditing] = useState(false)
  const [notes, setNotes] = useState(initialNotes)
  const [tempNotes, setTempNotes] = useState(initialNotes)

  const handleSave = () => {
    setNotes(tempNotes)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTempNotes(notes)
    setIsEditing(false)
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-700">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Doctor Notes</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-3 py-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors text-sm"
          >
            <FiEdit2 size={16} />
            Edit
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {isEditing ? (
          <div className="space-y-4">
            <textarea
              value={tempNotes}
              onChange={(e) => setTempNotes(e.target.value)}
              className="w-full h-40 p-4 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              placeholder="Add your clinical observations..."
            />
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
              >
                <FiSave size={16} />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500 text-slate-900 dark:text-white rounded-lg transition-colors font-medium"
              >
                <FiX size={16} />
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{notes}</p>
            <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
              <p className="text-sm text-indigo-700 dark:text-indigo-300">
                <span className="font-semibold">Note:</span> These observations should be reviewed by a qualified
                medical professional before making any clinical decisions.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
