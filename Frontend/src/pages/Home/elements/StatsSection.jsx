import { useState, useEffect, useRef } from "react"
import { FaCheckCircle, FaBolt, FaDatabase, FaUsers, FaHospital, FaAward } from "react-icons/fa"

export default function StatsSection() {
  const [counters, setCounters] = useState({})
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  const stats = [
    {
      number: 98,
      suffix: "%",
      label: "Accuracy Rate",
      icon: <FaCheckCircle />,
      color: "#5056e6",
      description: "Clinically validated",
    },
    {
      number: 2,
      suffix: "min",
      label: "Analysis Time",
      icon: <FaBolt />,
      color: "#008059",
      description: "Average processing",
    },
    {
      number: 500,
      suffix: "K+",
      label: "Images Trained",
      icon: <FaDatabase />,
      color: "#007a9b",
      description: "Medical dataset",
    },
    {
      number: 1000,
      suffix: "+",
      label: "Active Users",
      icon: <FaUsers />,
      color: "#5056e6",
      description: "Healthcare professionals",
    },
    {
      number: 50,
      suffix: "+",
      label: "Hospitals",
      icon: <FaHospital />,
      color: "#008059",
      description: "Trust our platform",
    },
    {
      number: 15,
      suffix: "+",
      label: "Awards",
      icon: <FaAward />,
      color: "#007a9b",
      description: "Industry recognition",
    },
  ]

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
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  const animateCounters = () => {
    stats.forEach((stat, index) => {
      const duration = 2000
      const steps = 60
      const increment = stat.number / steps
      let current = 0

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
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f9f9f9]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4">
            Why Choose MediScan AI?
          </h2>
          <p className="text-lg text-[#979999] max-w-2xl mx-auto">
            Trusted by healthcare professionals worldwide for accurate and fast medical diagnostics
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const count = counters[index] || 0
            return (
              <div
                key={index}
                className="group relative bg-white border border-gray-300 rounded-xl p-8 text-center hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-2 ring-1"
              >
                {/* Icon */}
                <div
                  className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center text-2xl text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{ backgroundColor: stat.color }}
                >
                  {stat.icon}
                </div>

                {/* Number */}
                <div className="mb-2">
                  <span
                    className="text-5xl lg:text-6xl font-bold transition-all duration-300"
                    style={{ color: stat.color }}
                  >
                    {count}
                    {stat.suffix}
                  </span>
                </div>

                {/* Label */}
                <h3 className="text-lg font-semibold text-black mb-1">{stat.label}</h3>
                <p className="text-sm text-[#979999]">{stat.description}</p>

                {/* Animated Background on Hover */}
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

