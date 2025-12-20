"use client"
import { FaClock } from "react-icons/fa"

const TimeSlotSelection = ({ selectedDate, selectedTime, onTimeSelect }) => {
  const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"]

  const formatDate = (date) => {
    if (!date) return ""
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2 pb-3 border-b-2 border-blue-200">
        <FaClock className="w-6 h-6 text-blue-600" />
        Select Time
      </h2>

      {!selectedDate ? (
        <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500 text-lg font-medium">Please select a date first</p>
        </div>
      ) : (
        <>
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-600 font-medium mb-1">Selected Date</p>
            <p className="text-lg font-bold text-gray-900">{formatDate(selectedDate)}</p>
          </div>

          <div className="flex flex-col gap-3">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => onTimeSelect(time)}
                className={`
                  p-4 rounded-lg border-2 transition-all font-semibold text-base
                  flex items-center justify-between shadow-sm
                  ${
                    selectedTime === time
                      ? "bg-blue-600 text-white border-blue-600 shadow-md scale-105"
                      : "bg-white text-gray-900 border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                  }
                `}
              >
                <span className="flex items-center gap-3">
                  <FaClock className="w-5 h-5" />
                  {time}
                </span>
                {selectedTime === time && (
                  <span className="text-sm bg-white text-blue-600 px-3 py-1 rounded-full font-bold">Selected</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default TimeSlotSelection
