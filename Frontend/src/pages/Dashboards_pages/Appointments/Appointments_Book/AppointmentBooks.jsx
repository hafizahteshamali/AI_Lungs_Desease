"use client"
import React, { useState } from "react"
import { FaCalendarAlt, FaCheckCircle, FaArrowLeft } from "react-icons/fa"
import CalendarView from "./elements/CalendarView"
import TimeSlotSelection from "./elements/TimeSlotSelection"
import ConfirmationScreen from "./elements/ConfirmationScreen"
import SuccessMessage from "./elements/SuccessMessage"
import { useAppointments } from "../AppointmentContext.jsx"

const AppointmentBooks = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [appointmentData, setAppointmentData] = useState(null)

  const { addAppointment } = useAppointments()

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    setSelectedTime(null)
  }

  const handleTimeSelect = (time) => {
    setSelectedTime(time)
  }

  const handleNext = () => {
    if (currentStep === 1 && selectedDate && selectedTime) {
      setCurrentStep(2)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleEdit = () => {
    setCurrentStep(1)
  }

  const handleConfirm = (data) => {
    const fullAppointmentData = {
      ...data,
      date: selectedDate,
      time: selectedTime,
    }
    addAppointment(fullAppointmentData)
    setAppointmentData(fullAppointmentData)
    setCurrentStep(3)
  }

  const handleBookAnother = () => {
    setCurrentStep(1)
    setSelectedDate(null)
    setSelectedTime(null)
    setAppointmentData(null)
  }

  const StepIndicator = () => {
    const steps = [
      { number: 1, icon: FaCalendarAlt, label: "Select Date & Time" },
      { number: 2, icon: FaCheckCircle, label: "Confirm Details" },
    ]

    return (
      <div className="flex items-center justify-center mb-10">
        <div className="flex items-center gap-4">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`
                  w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-md
                  ${currentStep >= step.number ? "bg-blue-600 text-white scale-110" : "bg-gray-200 text-gray-500"}
                `}
                >
                  <step.icon className="w-6 h-6" />
                </div>
                <span
                  className={`text-sm font-bold text-center ${currentStep >= step.number ? "text-gray-900" : "text-gray-500"}`}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-20 h-2 rounded-full ${currentStep > step.number ? "bg-blue-600" : "bg-gray-200"}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {currentStep !== 3 && (
          <>
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Book Your Appointment</h1>
              <p className="text-gray-600 text-lg md:text-xl font-medium">Choose your preferred date and time slot</p>
            </div>
            <StepIndicator />
          </>
        )}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 md:p-10 shadow-lg">
          {currentStep === 1 && (
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2 pb-3 border-b-2 border-blue-200">
                  <FaCalendarAlt className="w-6 h-6 text-blue-600" />
                  Select Date
                </h2>
                <CalendarView selectedDate={selectedDate} onDateSelect={handleDateSelect} />
              </div>
              <div className="flex-1">
                <TimeSlotSelection
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  onTimeSelect={handleTimeSelect}
                />
              </div>
            </div>
          )}
          {currentStep === 2 && (
            <ConfirmationScreen
              appointmentData={{ date: selectedDate, time: selectedTime }}
              onEdit={handleEdit}
              onConfirm={handleConfirm}
            />
          )}
          {currentStep === 3 && <SuccessMessage appointmentData={appointmentData} onBookAnother={handleBookAnother} />}
        </div>
        {currentStep === 1 && (
          <div className="mt-8 flex justify-between items-center">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className="px-8 py-3 rounded-lg border-2 border-gray-300 bg-white hover:bg-gray-50 text-gray-700 transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm"
            >
              <FaArrowLeft className="w-4 h-4" />
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!selectedDate || !selectedTime}
              className="px-8 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              Continue to Confirmation
            </button>
          </div>
        )}
        {currentStep === 2 && (
          <div className="mt-8">
            <button
              onClick={handleBack}
              className="px-8 py-3 rounded-lg border-2 border-gray-300 bg-white hover:bg-gray-50 text-gray-700 transition-colors font-bold flex items-center gap-2 shadow-sm"
            >
              <FaArrowLeft className="w-4 h-4" />
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default AppointmentBooks
