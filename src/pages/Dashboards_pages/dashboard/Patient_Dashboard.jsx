import { useState } from "react"
import { FaHeart, FaEye, FaRobot, FaChevronDown } from "react-icons/fa"
import { FaDroplet } from "react-icons/fa6"
import { Card } from "../../../components/Cards"
import Button from "../../../components/Button"
import { appointments, diagnoses, healthMetrics, prescriptions } from "../../../assets/Constant"

const Patient_Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState("Heart")
  const [selectedDay, setSelectedDay] = useState(new Date().getDate())

  // filter healthMetrics based on tab
  const filteredMetrics =
  selectedTab === "All" ? healthMetrics : healthMetrics.filter((m) => m.category === selectedTab)

  // generate calendar days for current month
  const today = new Date()
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Good Morning! 👋</h1>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search here"
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
            />
          </div>
        </div>

        {/* History of Diagnosis */}
        <Card className="mb-6 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">History of Diagnosis</h2>
            <Button variant="ghost" className="text-gray-500">
              Today <FaChevronDown className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Human Body Diagram */}
            <div className="flex-shrink-0 flex justify-center">
              <img
                src="/assets/images/dashboard/human-muscles620-removebg-preview.png"
                alt="Human anatomy diagram"
                className="w-40 md:w-56 lg:w-64 h-auto object-contain"
              />
            </div>

            {/* Diagnosis List */}
            <div className="flex-1 space-y-4">
              {diagnoses.map((diagnosis, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-100"
                >
                  <img
                    src={diagnosis.image || "/placeholder.svg"}
                    alt={diagnosis.title}
                    className="w-14 h-14 md:w-16 md:h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">{diagnosis.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{diagnosis.description}</p>
                    <p className="text-sm text-gray-500">{diagnosis.doctor}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Health Overview */}
        <Card className="mb-6 p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">Health Overview</h2>
            <div className="flex flex-wrap gap-2">
              {["Heart", "Lungs", "Stomach", "Body", "Eye", "All"].map((tab) => (
                <Button
                  key={tab}
                  variant={selectedTab === tab ? "default" : "ghost"}
                  size="sm"
                  className={selectedTab === tab ? "bg-blue-500 hover:bg-blue-600" : ""}
                  onClick={() => setSelectedTab(tab)}
                >
                  {tab} 
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {filteredMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-3 ${metric.color}`}
                >
                  {metric.icon}
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{metric.label}</h3>
                <p className="text-sm text-gray-500 mb-2">{metric.status}</p>
                <p className="text-lg md:text-2xl font-bold text-gray-800">{metric.value}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Prescriptions */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">Your Prescriptions</h2>
            <Button variant="ghost" className="text-gray-500">
              Today <FaChevronDown className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prescriptions.map((prescription, index) => (
              <div key={index} className={`p-4 rounded-lg ${prescription.color}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">{prescription.name}</h3>
                    <p className="text-sm text-gray-600">{prescription.dosage}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    •••
                  </Button>
                </div>
                <p className="text-sm font-medium text-gray-700">{prescription.remaining}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Right Sidebar */}
      <div className="w-full lg:w-80 p-4 md:p-6 bg-white border-t lg:border-t-0 lg:border-l border-gray-200">
        {/* Upcoming Appointments */}
        <Card className="mb-6 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Upcoming Appointments</h3>
            <Button variant="ghost" size="sm">
              <FaChevronDown className="w-4 h-4" />
            </Button>
          </div>

          {/* Calendar */}
          <div className="grid grid-cols-7 gap-1 mb-4 text-center text-xs md:text-sm">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-gray-500 font-medium">
                {day}
              </div>
            ))}

            {daysArray.map((day) => (
              <div
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`p-2 rounded cursor-pointer ${
                  day === selectedDay ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Appointment List */}
          <div className="space-y-3">
            {appointments.map((appointment, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <img
                    src={appointment.imgUrl}
                    alt="Doctor"
                    className="w-8 h-8 rounded-full"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 text-sm">{appointment.title}</h4>
                  <p className="text-xs text-gray-600">{appointment.doctor}</p>
                  <p className="text-xs text-gray-500">{appointment.specialty}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* AI Care */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <FaRobot className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold text-gray-800">AI Care</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <FaRobot className="w-4 h-4 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700 mb-2">
                  Brain problems can manifest in various ways. Symptoms may include headaches, memory
                  issues, or behavioral changes.
                </p>
                <img
                  src="/assets/images/dashboard/istock-587mribrain.jpg"
                  alt="Brain scan"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
export default Patient_Dashboard
