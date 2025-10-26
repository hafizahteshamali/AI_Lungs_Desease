"use client"

import { FiUser, FiCalendar, FiFileText } from "react-icons/fi"

export default function MetadataForm({ formData, onFormChange, uploadedFile }) {
  const handleChange = (e) => {
    const { name, value } = e.target
    onFormChange({
      ...formData,
      [name]: value,
    })
  }

  return (
    <div className="space-y-4">
      {/* Patient Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          <div className="flex items-center gap-2">
            <FiUser className="text-blue-600" />
            Patient Name
          </div>
        </label>
        <input
          type="text"
          name="patientName"
          value={formData.patientName}
          onChange={handleChange}
          placeholder="Enter patient name"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Patient ID */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          <div className="flex items-center gap-2">
            <FiFileText className="text-blue-600" />
            Patient ID
          </div>
        </label>
        <input
          type="text"
          name="patientId"
          value={formData.patientId}
          onChange={handleChange}
          placeholder="Enter patient ID"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      {/* X-Ray Type */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">X-Ray Type</label>
        <select
          name="xrayType"
          value={formData.xrayType}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
        >
          <option value="chest">Chest X-Ray</option>
          <option value="hand">Hand X-Ray</option>
          <option value="foot">Foot X-Ray</option>
          <option value="spine">Spine X-Ray</option>
          <option value="pelvis">Pelvis X-Ray</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Scan Date */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          <div className="flex items-center gap-2">
            <FiCalendar className="text-blue-600" />
            Scan Date
          </div>
        </label>
        <input
          type="date"
          name="scanDate"
          value={formData.scanDate}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">Additional Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Add any additional notes or observations..."
          rows="4"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
        />
      </div>

      {/* Form Status */}
      <div
        className={`p-4 rounded-lg ${uploadedFile ? "bg-green-50 border border-green-200" : "bg-yellow-50 border border-yellow-200"}`}
      >
        <p className={`text-sm font-semibold ${uploadedFile ? "text-green-700" : "text-yellow-700"}`}>
          {uploadedFile ? "✓ Ready to submit" : "⚠ Please upload a file first"}
        </p>
      </div>
    </div>
  )
}
