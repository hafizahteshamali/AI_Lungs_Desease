import { useState, useEffect, useRef } from "react"
import { FaUsers, FaHospital, FaAward, FaGlobe } from "react-icons/fa"

export default function AboutStatsSection() {
  const [counters, setCounters] = useState({})  // State for counter animation values
  const [isVisible, setIsVisible] = useState(false)  // State to track section visibility
  const sectionRef = useRef(null)  // Reference for the section element

  // REAL PROJECT STATS from your PDF
  const stats = [
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
      number: 95,
      suffix: "%",
      label: "Model Accuracy",
      icon: <FaAward />,
      color: "#007a9b",
      description: "CNN validation accuracy",
    },
    {
      number: 100,
      suffix: "K+",
      label: "Training Images",
      icon: <FaGlobe />,
      color: "#5056e6",
      description: "NIH + CBIS-DDSM + MIAS datasets",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true)  // Set section as visible when in viewport
            animateCounters()   // Start counter animation
          }
        })
      },
      { threshold: 0.2 }  // Trigger when 20% of section is visible
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)  // Observe the section element
    }

    return () => observer.disconnect()  // Clean up observer on unmount
  }, [isVisible])

  const animateCounters = () => {
    stats.forEach((stat, index) => {
      const duration = 2000  // Animation duration in milliseconds
      const steps = 60       // Number of animation steps
      const increment = stat.number / steps  // Calculate increment per step
      let current = 0        // Current counter value

      const timer = setInterval(() => {
        current += increment  // Increment counter
        if (current >= stat.number) {
          current = stat.number  // Stop at target number
          clearInterval(timer)   // Clear interval when done
        }
        setCounters((prev) => ({
          ...prev,
          [index]: Math.floor(current),  // Update counter state
        }))
      }, duration / steps)  // Set interval timing
    })
  }

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 px-4 xs:px-5 sm:px-6 lg:px-8 bg-gradient-to-br from-[#5056e6] via-[#3d43d4] to-[#007a9b] relative overflow-hidden">
      {/* Animated Background Elements - Responsive */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-8 right-4 w-48 h-48 sm:top-12 sm:right-6 sm:w-64 sm:h-64 md:top-16 md:right-8 md:w-80 md:h-80 lg:top-20 lg:right-10 lg:w-96 lg:h-96 bg-white opacity-5 rounded-full blur-xl sm:blur-2xl md:blur-3xl animate-pulse"></div>
        <div className="absolute bottom-8 left-4 w-48 h-48 sm:bottom-12 sm:left-6 sm:w-64 sm:h-64 md:bottom-16 md:left-8 md:w-80 md:h-80 lg:bottom-20 lg:left-10 lg:w-96 lg:h-96 bg-white opacity-5 rounded-full blur-xl sm:blur-2xl md:blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header - Updated */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 px-4">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
            Precision Scan Project Impact
          </h2>
          <p className="text-sm xs:text-base sm:text-lg text-blue-100 max-w-xl sm:max-w-2xl mx-auto leading-relaxed">
            Addressing healthcare challenges through AI-powered early detection
          </p>
        </div>

        {/* Stats Container - Converted from grid to flex */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 lg:gap-8 justify-center">
          {stats.map((stat, index) => {
            const count = counters[index] || 0  // Get current counter value
            return (
              <div
                key={index}
                className="group relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg sm:rounded-xl p-4 xs:p-5 sm:p-6 md:p-8 text-center hover:bg-white/20 transition-all duration-300 ease-out hover:-translate-y-1 sm:hover:-translate-y-2 flex flex-col items-center flex-1 min-w-[250px] sm:min-w-[200px] lg:min-w-0 max-w-[400px] sm:max-w-none"
              >
                {/* Icon - Responsive */}
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-4 sm:mb-6 rounded-lg sm:rounded-xl flex items-center justify-center text-lg sm:text-xl md:text-2xl text-white transition-all duration-300 group-hover:scale-105 sm:group-hover:scale-110 group-hover:rotate-3 bg-white/20"
                  style={{ color: 'white' }}
                >
                  {stat.icon}  {/* Render icon component */}
                </div>

                {/* Number - Responsive */}
                <div className="mb-2 sm:mb-3">
                  <span className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-white transition-all duration-300">
                    {count}  {/* Display animated counter */}
                    <span className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl">{stat.suffix}</span>  {/* Display suffix */}
                  </span>
                </div>

                {/* Label - Responsive */}
                <h3 className="text-base xs:text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">{stat.label}</h3>
                <p className="text-xs xs:text-sm text-blue-100 opacity-90">{stat.description}</p>

                {/* Hover Effect */}
                <div
                  className="absolute inset-0 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-white"
                ></div>

                {/* Decorative Bottom Line */}
                <div
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 sm:w-20 sm:h-1 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                ></div>
              </div>
            )
          })}
        </div>

        {/* Additional Project Context - Updated */}
        <div className="mt-8 sm:mt-12 md:mt-16 p-4 xs:p-5 sm:p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg sm:rounded-xl">
          {/* Converted from grid to flex for inner content */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 justify-center">
            <div className="flex-1 min-w-[250px] max-w-[400px] text-center sm:text-left">
              <h4 className="text-base xs:text-lg sm:text-xl font-bold text-white mb-2">Problem Context</h4>
              <p className="text-xs xs:text-sm text-blue-100">
                • 82,800 lung disease deaths in Pakistan annually [2]<br/>
                • 1 in 9 women at risk of breast cancer in Pakistan [10]<br/>
                • Limited radiologists in low-resource areas
              </p>
            </div>
            <div className="flex-1 min-w-[250px] max-w-[400px] text-center sm:text-left">
              <h4 className="text-base xs:text-lg sm:text-xl font-bold text-white mb-2">Project Solution</h4>
              <p className="text-xs xs:text-sm text-blue-100">
                • Dual AI system for lung + breast cancer detection<br/>
                • Explainable AI with Grad-CAM visualizations<br/>
                • Cloud-based deployment for accessibility
              </p>
            </div>
          </div>
        </div>

        {/* Optional Bottom Text - Updated */}
        <div className="mt-8 sm:mt-12 md:mt-16 text-center">
          <p className="text-xs sm:text-sm text-blue-100 italic">
            FYP Project addressing SDG 3: Good Health and Well-being
          </p>
        </div>
      </div>
    </section>
  )
}