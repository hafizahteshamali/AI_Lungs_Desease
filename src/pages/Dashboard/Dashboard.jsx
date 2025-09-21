import { FiSearch, FiChevronDown } from "react-icons/fi"
import { FaHeart, FaTint, FaLeaf, FaEye, FaEllipsisH } from "react-icons/fa"

const Dashboard = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-semibold text-gray-800">Good Morning! 👋</h1>
        <div className="relative w-full md:w-80">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search here"
            className="pl-10 pr-4 py-2 w-full bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* History of Diagnosis */}
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
              <h2 className="text-xl font-semibold text-gray-800">History of Diagnosis</h2>
              <div className="flex items-center text-gray-500 cursor-pointer self-start sm:self-auto">
                <span className="text-sm mr-1">Today</span>
                <FiChevronDown className="w-4 h-4" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              {/* Human Body Anatomy */}
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <img
                  src="/assets/images/dashboard/body-structure.png"
                  alt="Human Body Anatomy"
                  className="w-40 md:w-48 h-auto"
                />
              </div>

              {/* Medical Conditions */}
              <div className="flex-1 space-y-4 md:space-y-6">
                {/* Heart Problem */}
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <img src="/assets/images/dashboard/heart-problem.jpg" alt="Heart" className="w-full h-full object-cover rounded-lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 mb-1 md:mb-2">Heart Problem</h3>
                    <p className="text-sm text-gray-600 mb-1 md:mb-2 leading-relaxed">
                      Coronary artery disease is a common heart condition that affects the major blood vessels that
                      supply the heart muscle.
                    </p>
                    <p className="text-xs text-gray-400">Dr Ronald Richards</p>
                  </div>
                </div>

                {/* Kidney Problem */}
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <img src="/assets/images/dashboard/kidney-problem.jpeg" alt="Kidney" className="w-full h-full object-cover rounded-lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 mb-1 md:mb-2">Kidney Problem</h3>
                    <p className="text-sm text-gray-600 mb-1 md:mb-2 leading-relaxed">
                      Coronary artery disease is a common heart condition that affects the major blood vessels that
                      supply the heart muscle.
                    </p>
                    <p className="text-xs text-gray-400">Dr Leslie Alexander</p>
                  </div>
                </div>

                {/* Knee Problem */}
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <img src="/assets/images/dashboard/knee-problem.jpg" alt="Knee" className="w-full h-full object-cover rounded-lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 mb-1 md:mb-2">Knee Problem</h3>
                    <p className="text-sm text-gray-600 mb-1 md:mb-2 leading-relaxed">
                      Coronary artery disease is a common heart condition that affects the major blood vessels that
                      supply the heart muscle.
                    </p>
                    <p className="text-xs text-gray-400">Dr Robert Fox</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Health Overview */}
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Health Overview</h2>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
              <button className="px-3 py-2 md:px-4 md:py-2 bg-blue-500 text-white rounded-lg text-sm font-medium">Heart</button>
              <button className="px-3 py-2 md:px-4 md:py-2 text-gray-500 hover:text-gray-700 text-sm font-medium">Lungs</button>
              <button className="px-3 py-2 md:px-4 md:py-2 text-gray-500 hover:text-gray-700 text-sm font-medium">Stomach</button>
              <button className="px-3 py-2 md:px-4 md:py-2 text-gray-500 hover:text-gray-700 text-sm font-medium">Body</button>
              <button className="px-3 py-2 md:px-4 md:py-2 text-gray-500 hover:text-gray-700 text-sm font-medium">Eye</button>
            </div>

            {/* Health Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              <div className="text-center">
                <div className="flex justify-center mb-2 md:mb-3">
                  <FaHeart className="w-5 h-5 md:w-6 md:h-6 text-red-500" />
                </div>
                <p className="text-xs md:text-sm text-gray-500 mb-1">Heart Rate</p>
                <p className="text-xs md:text-sm text-gray-400 mb-1 md:mb-2">Normal</p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">120 bpm</h3>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-2 md:mb-3">
                  <FaTint className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
                </div>
                <p className="text-xs md:text-sm text-gray-500 mb-1">Blood Count</p>
                <p className="text-xs md:text-sm text-gray-400 mb-1 md:mb-2">Good</p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">80-90</h3>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-2 md:mb-3">
                  <FaLeaf className="w-5 h-5 md:w-6 md:h-6 text-green-500" />
                </div>
                <p className="text-xs md:text-sm text-gray-500 mb-1">Glucose</p>
                <p className="text-xs md:text-sm text-gray-400 mb-1 md:mb-2">Normal</p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">230 ml</h3>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-2 md:mb-3">
                  <FaEye className="w-5 h-5 md:w-6 md:h-6 text-orange-500" />
                </div>
                <p className="text-xs md:text-sm text-gray-500 mb-1">Hemoglobin</p>
                <p className="text-xs md:text-sm text-red-500 mb-1 md:mb-2">Low</p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">56 ml</h3>
              </div>
            </div>
          </div>

          {/* Your Prescriptions */}
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
              <h2 className="text-xl font-semibold text-gray-800">Your Prescriptions</h2>
              <div className="flex items-center text-gray-500 cursor-pointer self-start sm:self-auto">
                <span className="text-sm mr-1">Today</span>
                <FiChevronDown className="w-4 h-4" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div className="bg-purple-50 p-3 md:p-4 rounded-xl relative">
                <div className="absolute top-3 md:top-4 right-3 md:right-4">
                  <FaEllipsisH className="w-4 h-4 text-gray-400 cursor-pointer" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1 md:mb-2">Paracetamol - 500mg</h3>
                <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">1 tablet every day for 4 weeks</p>
                <p className="text-xs md:text-sm font-medium text-purple-600">4 Remaining</p>
              </div>

              <div className="bg-blue-50 p-3 md:p-4 rounded-xl relative">
                <div className="absolute top-3 md:top-4 right-3 md:right-4">
                  <FaEllipsisH className="w-4 h-4 text-gray-400 cursor-pointer" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1 md:mb-2">Liquifying - 450ml</h3>
                <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">1 teaspoon every day for 2 weeks</p>
                <p className="text-xs md:text-sm font-medium text-blue-600">8 Remaining</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - 1/3 width */}
        <div className="space-y-6">
          {/* Upcoming Appointments */}
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Upcoming Appointments</h2>
              <FiChevronDown className="w-4 h-4 text-gray-400 cursor-pointer" />
            </div>

            {/* Calendar */}
            <div className="mb-6">
              <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-2">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center">
                {[8, 9, 10, 11, 12, 13, 14].map((day, index) => (
                  <div
                    key={day}
                    className={`w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-xs md:text-sm rounded-lg ${
                      index === 2 ? "bg-blue-500 text-white font-medium" : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>

            {/* Appointments List */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 md:w-15 md:h-15 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <img src="/assets/images/dashboard/mri-image.jpg" alt="Doctor" className="w-full h-full object-cover rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-800 text-sm">MRI-Right thing</h3>
                  <p className="text-xs text-gray-500">Dr. Damion Lewis</p>
                  <p className="text-xs text-gray-400">Cardiologist</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 md:w-15 md:h-15 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <img src="/assets/images/dashboard/surgery-preparation.jpg" alt="Doctor" className="w-full h-full object-cover rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-800 text-sm">Surgery preparation</h3>
                  <p className="text-xs text-gray-500">Dr. Dianne Russell</p>
                  <p className="text-xs text-gray-400">Cardiologist</p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Care */}
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">AI</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-800">AI Care</h2>
            </div>

            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Brain problems can manifest in various ways. Symptoms may include headaches, memory issues, or behavioral
              changes.
            </p>

            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl">
              <img src="/assets/images/dashboard/brain.jpg" alt="Brain Scan" className="w-full h-auto object-cover rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard