import { useState, useEffect, useRef } from "react"
import { FaCheckCircle, FaBolt, FaDatabase, FaUsers, FaHospital, FaAward } from "react-icons/fa"

export default function StatsSection() {
  // State for storing animated counter values for each stat
  const [counters, setCounters] = useState({})
  // State for tracking section visibility for animation trigger
  const [isVisible, setIsVisible] = useState(false)
  // Ref for observing section intersection
  const sectionRef = useRef(null)

  // REAL PROJECT STATS from your PDF - Project-specific statistics
  const stats = [
    {
      number: 95,
      suffix: "%",
      label: "Model Accuracy",
      icon: <FaCheckCircle />,
      color: "#5056e6",
      description: "Multi-label CNN validation accuracy",
    },
    {
      number: 2,
      suffix: "min",
      label: "Per Image Analysis",
      icon: <FaBolt />,
      color: "#008059",
      description: "Average processing time per scan",
    },
    {
      number: 100,
      suffix: "K+",
      label: "Medical Images",
      icon: <FaDatabase />,
      color: "#007a9b",
      description: "NIH + CBIS-DDSM + MIAS datasets",
    },
    {
      number: 4,
      suffix: "M+",
      label: "Annual Deaths",
      icon: <FaUsers />,
      color: "#5056e6",
      description: "From lung diseases globally [1]",
    },
    {
      number: 20,
      suffix: "+",
      label: "Target Clinics",
      icon: <FaHospital />,
      color: "#008059",
      description: "Subscription model (Business Plan)",
    },
    {
      number: 5,
      suffix: "+",
      label: "Diseases Detected",
      icon: <FaAward />,
      color: "#007a9b",
      description: "COVID-19, pneumonia, opacity, breast cancer +",
    },
  ]

  // Intersection Observer for triggering animations when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true)
            animateCounters()
          }
        })
      },
      { threshold: 0.3 } // Trigger when 30% of section is visible
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  // Function to animate counter numbers from 0 to target value
  const animateCounters = () => {
    stats.forEach((stat, index) => {
      const duration = 2000 // 2 second animation duration
      const steps = 60 // Number of animation steps
      const increment = stat.number / steps // Value increment per step
      let current = 0 // Starting value

      // Set interval for smooth counter animation
      const timer = setInterval(() => {
        current += increment
        if (current >= stat.number) {
          current = stat.number
          clearInterval(timer)
        }
        setCounters((prev) => ({
          ...prev,
          [index]: Math.floor(current),
        }))
      }, duration / steps)
    })
  }

  return (
    // Main section with background color and padding
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f9f9f9]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with project title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4">
            Precision Scan Impact & Performance
          </h2>
          <p className="text-lg text-[#979999] max-w-2xl mx-auto">
            Dual disease detection system designed for low-resource healthcare settings in Pakistan
          </p>
        </div>

        {/* Stats Container - Using grid layout for cards */}
        {/* Responsive grid: 1 column on mobile, 2 on tablet, 3 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const count = counters[index] || 0 // Get animated counter value
            return (
              // Individual Stat Card
              <div
                key={index}
                className="group relative bg-white border border-gray-300 rounded-xl p-8 text-center hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-2 ring-1"
              >
                {/* Icon Container */}
                <div
                  className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center text-2xl text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{ backgroundColor: stat.color }}
                >
                  {stat.icon}
                </div>

                {/* Animated Number Display */}
                <div className="mb-2">
                  <span
                    className="text-5xl lg:text-6xl font-bold transition-all duration-300"
                    style={{ color: stat.color }}
                  >
                    {count}
                    {stat.suffix}
                  </span>
                </div>

                {/* Stat Label and Description */}
                <h3 className="text-lg font-semibold text-black mb-1">{stat.label}</h3>
                <p className="text-sm text-[#979999]">{stat.description}</p>

                {/* Hover Background Effect */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                  style={{ backgroundColor: stat.color }}
                ></div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}