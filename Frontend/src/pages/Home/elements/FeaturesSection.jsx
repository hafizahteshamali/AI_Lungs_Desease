import { useState, useEffect, useRef } from "react"
import { FaRobot, FaShieldAlt, FaHeartbeat, FaChartLine, FaArrowRight } from "react-icons/fa"

export default function FeaturesSection() {
  const [visibleFeatures, setVisibleFeatures] = useState([])
  const sectionRef = useRef(null)

  const features = [
    {
      icon: <FaRobot />,
      title: "AI-Powered Detection",
      description: "Advanced machine learning algorithms trained on thousands of medical images for precise diagnosis.",
      color: "#5056e6",
      gradient: "from-[#5056e6] to-[#3d43d4]",
    },
    {
      icon: <FaShieldAlt />,
      title: "Medical Grade Accuracy",
      description: "98% accuracy rate backed by clinical validation and medical professional reviews.",
      color: "#008059",
      gradient: "from-[#008059] to-[#006d4a]",
    },
    {
      icon: <FaHeartbeat />,
      title: "Patient-Centric Design",
      description: "Easy-to-use interface designed specifically for healthcare professionals and patients.",
      color: "#007a9b",
      gradient: "from-[#007a9b] to-[#006680]",
    },
    {
      icon: <FaChartLine />,
      title: "Real-Time Analytics",
      description: "Comprehensive dashboard with real-time insights and detailed reports for better decision making.",
      color: "#5056e6",
      gradient: "from-[#5056e6] to-[#3d43d4]",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index)
            setTimeout(() => {
              setVisibleFeatures((prev) => [...prev, index])
            }, index * 100)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      const cards = sectionRef.current.querySelectorAll('[data-index]')
      cards.forEach((card) => observer.observe(card))
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-[#5056e6]/10 rounded-full mb-4">
            <span className="text-sm font-semibold text-[#5056e6]">FEATURES</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4">
            Cutting-Edge Features
          </h2>
          <p className="text-lg text-[#979999] max-w-2xl mx-auto">
            Everything you need for accurate medical diagnosis powered by advanced AI technology
          </p>
        </div>

        {/* Features Grid - Grid ki jagah flex use kiya */}
        <div ref={sectionRef} className="flex flex-col md:flex-row flex-wrap gap-6 justify-center">
          {features.map((feature, index) => {
            const isVisible = visibleFeatures.includes(index)
            return (
              <div
                key={index}
                data-index={index}
                className={`group relative bg-white border border-gray-300 rounded-xl p-6 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } flex-1 min-w-[300px] md:min-w-[250px] lg:min-w-0 max-w-[400px] md:max-w-none`}
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  boxShadow: feature.color && `0 10px 40px ${feature.color}10`
                }}
              >
                {/* Hover Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300`}></div>

                {/* Icon */}
                <div className="relative z-10 mb-4">
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 flex-shrink-0`}
                    style={{ backgroundColor: feature.color }}
                  >
                    {feature.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-black mb-3 group-hover:text-[#5056e6] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-[#979999] text-sm leading-relaxed mb-4">
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Learn More Link */}
                  <div className="mt-auto">
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#5056e6] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      Learn More
                      <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>

                {/* Decorative Corner */}
                <div
                  className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${feature.color} 0%, transparent 70%)`,
                  }}
                ></div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}