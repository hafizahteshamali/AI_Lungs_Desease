import { FaRobot, FaShieldAlt, FaHeartbeat, FaChartLine } from "react-icons/fa"

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaRobot className="text-4xl" />,
      title: "AI-Powered Detection",
      description: "Advanced machine learning algorithms trained on thousands of medical images for precise diagnosis.",
    },
    {
      icon: <FaShieldAlt className="text-4xl" />,
      title: "Medical Grade Accuracy",
      description: "98% accuracy rate backed by clinical validation and medical professional reviews.",
    },
    {
      icon: <FaHeartbeat className="text-4xl" />,
      title: "Patient-Centric Design",
      description: "Easy-to-use interface designed specifically for healthcare professionals and patients.",
    },
    {
      icon: <FaChartLine className="text-4xl" />,
      title: "Real-Time Analytics",
      description: "Comprehensive dashboard with real-time insights and detailed reports for better decision making.",
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Cutting-Edge Features</h2>
          <p className="text-xl text-gray-600">Everything you need for accurate medical diagnosis</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition">
              <div className="text-[#4932e4] mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
