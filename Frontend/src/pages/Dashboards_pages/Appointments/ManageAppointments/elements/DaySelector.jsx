"use client"

const DaySelector = ({ selectedDay, onDayChange, availableDays }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Day</h2>
      <div className="flex flex-wrap gap-2">
        {availableDays.map((day) => (
          <button
            key={day}
            onClick={() => onDayChange(day)}
            className={`px-5 py-2.5 rounded-lg font-semibold transition-all ${
              selectedDay === day ? "bg-blue-600 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  )
}

export default DaySelector
