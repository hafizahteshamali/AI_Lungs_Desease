import { useState, useEffect, useRef } from "react"
import { FaLightbulb, FaUsers, FaAward, FaHandshake, FaHeart, FaRocket } from "react-icons/fa"

export default function ValuesSection() {
  // State for tracking which values are visible for animation
  const [visibleValues, setVisibleValues] = useState([])
  // Ref for observing section intersection
  const sectionRef = useRef(null)

  // REAL PROJECT VALUES from your PDF context - Core principles of Precision Scan
  const values = [
    {
      icon: <FaLightbulb />,
      title: "Technical Innovation",
      description: "Developing Custom CNN with Grad-CAM for explainable AI in medical diagnostics.",
      color: "#5056e6",
      gradient: "from-[#5056e6] to-[#3d43d4]",
    },
    {
      icon: <FaUsers />,
      title: "Clinical Collaboration",
      description: "Working with radiologists and oncologists for domain expertise and system validation.",
      color: "#008059",
      gradient: "from-[#008059] to-[#006d4a]",
    },
    {
      icon: <FaAward />,
      title: "Research Excellence",
      description: "Following rigorous methodology with validation using accuracy, precision, recall metrics.",
      color: "#007a9b",
      gradient: "from-[#007a9b] to-[#006680]",
    },
    {
      icon: <FaHandshake />,
      title: "Healthcare Integrity",
      description: "Ensuring AI decisions are transparent and trustworthy through explainable AI techniques.",
      color: "#5056e6",
      gradient: "from-[#5056e6] to-[#3d43d4]",
    },
    {
      icon: <FaHeart />,
      title: "Low-Resource Focus",
      description: "Designing specifically for regions with limited healthcare infrastructure like rural Pakistan.",
      color: "#008059",
      gradient: "from-[#008059] to-[#006d4a]",
    },
    {
      icon: <FaRocket />,
      title: "Sustainable Impact",
      description: "Aligning with SDG 3 for better health outcomes in underserved communities.",
      color: "#007a9b",
      gradient: "from-[#007a9b] to-[#006680]",
    },
  ]

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index)
            setTimeout(() => {
              setVisibleValues((prev) => [...prev, index])
            }, index * 100) // Staggered delay for each card
          }
        })
      },
      { threshold: 0.1 } // Trigger when 10% of element is visible
    )

    if (sectionRef.current) {
      const cards = sectionRef.current.querySelectorAll('[data-index]')
      cards.forEach((card) => observer.observe(card))
    }

    return () => observer.disconnect()
  }, [])

  return (
    // Main section with light gray background
    <section className="py-12 sm:py-16 md:py-20 px-4 xs:px-5 sm:px-6 lg:px-8 bg-[#f9f9f9]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header with project principles */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 px-4">
          {/* Principles badge */}
          <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-[#5056e6]/10 rounded-full mb-3 sm:mb-4">
            <span className="text-xs sm:text-sm font-semibold text-[#5056e6]">PROJECT PRINCIPLES</span>
          </div>
          
          {/* Main heading */}
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-3 sm:mb-4">
            Precision Scan Guiding Principles
          </h2>
          
          {/* Section description */}
          <p className="text-sm xs:text-base sm:text-lg text-[#979999] max-w-xl sm:max-w-2xl mx-auto leading-relaxed">
            Core values that shape our FYP project's development and implementation strategy
          </p>
        </div>

        {/* Values Container - Using grid for equal column layout */}
        {/* Grid is appropriate here for consistent card sizing */}
        <div ref={sectionRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {values.map((value, index) => {
            const isVisible = visibleValues.includes(index) // Check if card should be animated
            return (
              // Individual Value Card
              <div
                key={index}
                data-index={index}
                className={`group relative bg-white border border-gray-200 sm:border-gray-300 rounded-lg sm:rounded-xl p-4 xs:p-5 sm:p-6 md:p-8 flex flex-col transition-all duration-500 ease-out hover:shadow-lg sm:hover:shadow-xl hover:-translate-y-1 sm:hover:-translate-y-2 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 sm:translate-y-8'
                }`}
                style={{ 
                  transitionDelay: `${index * 100}ms`, // Staggered animation delay
                  minHeight: '240px' // Consistent card height
                }}
              >
                
                {/* Hover Gradient Background - appears on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-5 rounded-lg sm:rounded-xl transition-opacity duration-300"
                  style={{
                    // Dynamic gradient based on value color
                    background: `linear-gradient(to bottom right, ${value.color}15, ${value.color}05)`
                  }}
                ></div>

                {/* Icon Container - Responsive sizing */}
                <div className="relative z-10 mb-4 sm:mb-6 flex justify-center">
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-xl flex items-center justify-center text-lg sm:text-xl md:text-2xl text-white transition-all duration-300 group-hover:scale-105 sm:group-hover:scale-110 group-hover:rotate-3`}
                    style={{ backgroundColor: value.color }}
                  >
                    {value.icon}
                  </div>
                </div>

                {/* Content Container - Using flex for vertical layout */}
                <div className="relative z-10 flex flex-col flex-grow">
                  {/* Value Title */}
                  <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-black mb-2 sm:mb-3 md:mb-4 text-center group-hover:text-[#5056e6] transition-colors">
                    {value.title}
                  </h3>
                  
                  {/* Value Description */}
                  <p className="text-xs xs:text-sm sm:text-sm text-[#979999] leading-relaxed sm:leading-relaxed text-center flex-grow">
                    {value.description}
                  </p>
                </div>

                {/* Decorative Corner - appears on hover */}
                <div
                  className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  style={{
                    // Diagonal gradient corner
                    background: `linear-gradient(135deg, ${value.color} 0%, transparent 70%)`,
                  }}
                ></div>
              </div>
            )
          })}
        </div>

        {/* Bottom Text - SDG Alignment */}
        <div className="mt-12 sm:mt-16 md:mt-20 text-center">
          <p className="text-xs sm:text-sm text-[#979999] italic">
            These principles align with our FYP objectives and contribute to SDG 3: Good Health and Well-being
          </p>
        </div>
      </div>
    </section>
  )
}