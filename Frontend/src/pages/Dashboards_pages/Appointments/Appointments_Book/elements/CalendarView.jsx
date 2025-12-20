"use client"
import { useState } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

const CalendarView = ({ selectedDate, onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }

    return days
  }

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const isSelected = (date) => {
    if (!selectedDate || !date) return false
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    )
  }

  const isToday = (date) => {
    if (!date) return false
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const isPastDate = (date) => {
    if (!date) return false
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const days = getDaysInMonth(currentMonth)
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={goToPreviousMonth}
          className="p-2.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors shadow-sm"
          aria-label="Previous month"
        >
          <FaChevronLeft className="w-4 h-4" />
        </button>

        <h2 className="text-xl font-bold text-gray-900">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h2>

        <button
          onClick={goToNextMonth}
          className="p-2.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors shadow-sm"
          aria-label="Next month"
        >
          <FaChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex mb-3">
        {weekDays.map((day) => (
          <div key={day} className="flex-1 text-center text-sm font-bold text-gray-700 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap">
        {days.map((date, index) => {
          const isPast = isPastDate(date)
          const isSelectedDate = isSelected(date)
          const isTodayDate = isToday(date)

          return (
            <button
              key={index}
              onClick={() => date && !isPast && onDateSelect(date)}
              disabled={!date || isPast}
              style={{ width: "calc(100% / 7 - 8px)" }}
              className={`
                aspect-square p-2 rounded-lg text-base m-1 font-semibold transition-all
                flex items-center justify-center shadow-sm
                ${!date ? "invisible" : ""} 
                ${isPast ? "text-gray-400 cursor-not-allowed bg-gray-100" : ""} 
                ${isTodayDate && !isSelectedDate ? "border-2 border-blue-500 bg-blue-50 text-blue-700 font-bold" : ""} 
                ${isSelectedDate ? "bg-blue-600 text-white shadow-md scale-105 font-bold" : ""} 
                ${!isPast && date && !isSelectedDate && !isTodayDate ? "bg-white text-gray-900 hover:bg-blue-50 hover:text-blue-700 hover:scale-105 border border-gray-200" : ""}
              `}
            >
              {date?.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default CalendarView
