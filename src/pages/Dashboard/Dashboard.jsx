import { FaHeart, FaEye, FaRobot, FaChevronDown } from "react-icons/fa"
import {FaDroplet } from "react-icons/fa6"
import { Card } from "../../assets/components/Card"
import Button from "../../assets/components/Button"


const Dashboard = () => {
  const healthMetrics = [
    {
      icon: <FaHeart className="w-5 h-5" />,
      label: "Heart Rate",
      value: "120 bpm",
      status: "Normal",
      color: "text-red-500",
    },
    {
      icon: <FaDroplet className="w-5 h-5" />,
      label: "Blood Count",
      value: "80-90",
      status: "Good",
      color: "text-blue-500",
    },
    {
      icon: <FaDroplet className="w-5 h-5" />,
      label: "Glucose",
      value: "230 ml",
      status: "Normal",
      color: "text-green-500",
    },
    {
      icon: <FaEye className="w-5 h-5" />,
      label: "Hemoglobin",
      value: "56 ml",
      status: "Low",
      color: "text-orange-500",
    },
  ]

  const diagnoses = [
    {
      title: "Heart Problem",
      description:
        "Coronary artery disease is a common heart condition that affects the major blood vessels that supply the heart muscle.",
      doctor: "Dr Ronald Richards",
      image: "/assets/images/dashboard/0725LifeExpectancy_SC.jpg",
    },
    {
      title: "Kidney Problem",
      description:
      "Coronary artery disease is a common heart condition that affects the major blood vessels that supply the heart muscle.",
      doctor: "Dr Leslie Alexander",
      image: "/assets/images/dashboard/istockphoto-1334724346-640x640-1.jpg",
    },
    {
      title: "Knee Problem",
      description:
        "Coronary artery disease is a common heart condition that affects the major blood vessels that supply the heart muscle.",
      doctor: "Dr Robert Fox",
      image: "/assets/images/dashboard/knee pain hero.jpg",
    },
  ]

  const prescriptions = [
    {
      name: "Paracetamol - 500mg",
      dosage: "1 tablet every day for 4 weeks",
      remaining: "4 Remaining",
      color: "bg-purple-100",
    },
    {
      name: "Liquifying - 450ml",
      dosage: "1 teaspoon every day for 2 weeks",
      remaining: "8 Remaining",
      color: "bg-blue-100",
    },
  ]

  const appointments = [
    {
      date: "10",
      day: "Tue",
      title: "MRI-Right thing",
      doctor: "Dr. Damian Lewis",
      specialty: "Cardiologist",
      time: "10:00 AM",
      imgUrl: "/assets/images/dashboard/mri.png"
    },
    {
      title: "Surgery preparation",
      doctor: "Dr. Dianne Russell",
      specialty: "Cardiologist",
      time: "2:00 PM",
      imgUrl: "/assets/images/dashboard/operation-preparation.jpg"
    },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">Good Morning! 👋</h1>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search here"
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* History of Diagnosis */}
        <Card className="mb-8 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">History of Diagnosis</h2>
            <Button variant="ghost" className="text-gray-500">
              Today <FaChevronDown className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="flex gap-8">
            {/* Human Body Diagram */}
            <div className="flex-shrink-0">
              <img
                src="/assets/images/dashboard/human-muscles620-removebg-preview.png"
                alt="Human anatomy diagram"
                className="w-50 h-full object-[100%]"
              />
            </div>

            {/* Diagnosis List */}
            <div className="flex-1 space-y-4">
              {diagnoses.map((diagnosis, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-100">
                  <img
                    src={diagnosis.image || "/placeholder.svg"}
                    alt={diagnosis.title}
                    className="w-16 h-16 rounded-lg object-cover"
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
        <Card className="mb-8 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Health Overview</h2>
            <div className="flex gap-2">
              <Button variant="default" size="sm" className="bg-blue-500 hover:bg-blue-600">
                Heart
              </Button>
              <Button variant="ghost" size="sm">
                Lungs
              </Button>
              <Button variant="ghost" size="sm">
                Stomach
              </Button>
              <Button variant="ghost" size="sm">
                Body
              </Button>
              <Button variant="ghost" size="sm">
                Eye
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {healthMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-3 ${metric.color}`}
                >
                  {metric.icon}
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{metric.label}</h3>
                <p className="text-sm text-gray-500 mb-2">{metric.status}</p>
                <p className="text-2xl font-bold text-gray-800">{metric.value}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Prescriptions */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Your Prescriptions</h2>
            <Button variant="ghost" className="text-gray-500">
              Today <FaChevronDown className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
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
      <div className="w-80 p-6 bg-white border-l border-gray-200">
        {/* Upcoming Appointments */}
        <Card className="mb-6 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Upcoming Appointments</h3>
            <Button variant="ghost" size="sm">
              <FaChevronDown className="w-4 h-4" />
            </Button>
          </div>

          {/* Calendar */}
          <div className="grid grid-cols-7 gap-1 mb-4 text-center text-sm">
            <div className="text-gray-500">Sun</div>
            <div className="text-gray-500">Mon</div>
            <div className="text-gray-500">Tue</div>
            <div className="text-gray-500">Wed</div>
            <div className="text-gray-500">Thu</div>
            <div className="text-gray-500">Fri</div>
            <div className="text-gray-500">Sat</div>

            {[8, 9, 10, 11, 12, 13, 14].map((day) => (
              <div key={day} className={`p-2 rounded ${day === 10 ? "bg-blue-500 text-white" : "text-gray-700"}`}>
                {day}
              </div>
            ))}
          </div>

          {/* Appointment List */}
          <div className="space-y-3">
            {appointments.map((appointment, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <img src={appointment.imgUrl} alt="Doctor" className="w-8 h-8 rounded-full" />
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
                  Brain problems can manifest in various ways. Symptoms may include headaches, memory issues, or
                  behavioral changes.
                </p>
                <img
                  src="/assets/images/dashboard/istock-587mribrain.jpg"
                  alt="Brain scan"
                  className="w-full h-24 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
