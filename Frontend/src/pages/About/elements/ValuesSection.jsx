import { useState, useEffect, useRef } from "react"
import { FaLightbulb, FaUsers, FaAward, FaHandshake, FaHeart, FaRocket } from "react-icons/fa"

export default function ValuesSection() {
  const [visibleValues, setVisibleValues] = useState([])
  const sectionRef = useRef(null)

  const values = [
    {
      icon: <FaLightbulb />,
      title: "Innovation",
      description: "Continuously pushing boundaries to develop next-generation diagnostic solutions that revolutionize healthcare.",
      color: "#5056e6",
      gradient: "from-[#5056e6] to-[#3d43d4]",
    },
    {
      icon: <FaUsers />,
      title: "Collaboration",
      description: "Working closely with healthcare professionals to ensure our AI serves real medical needs and improves patient care.",
      color: "#008059",
      gradient: "from-[#008059] to-[#006d4a]",
    },
    {
      icon: <FaAward />,
      title: "Excellence",
      description: "Committed to achieving the highest standards in accuracy, reliability, and patient outcomes in everything we do.",
      color: "#007a9b",
      gradient: "from-[#007a9b] to-[#006680]",
    },
    {
      icon: <FaHandshake />,
      title: "Integrity",
      description: "Maintaining the highest ethical standards in healthcare AI, ensuring transparency and trust in our technology.",
      color: "#5056e6",
      gradient: "from-[#5056e6] to-[#3d43d4]",
    },
    {
      icon: <FaHeart />,
      title: "Compassion",
      description: "Putting patients first, ensuring our solutions are accessible, affordable, and designed with empathy.",
      color: "#008059",
      gradient: "from-[#008059] to-[#006d4a]",
    },
    {
      icon: <FaRocket />,
      title: "Impact",
      description: "Dedicated to making a meaningful difference in global healthcare, saving lives through early detection.",
      color: "#007a9b",
      gradient: "from-[#007a9b] to-[#006680]",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index)
            setTimeout(() => {
              setVisibleValues((prev) => [...prev, index])
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
    <section className="py-12 sm:py-16 md:py-20 px-4 xs:px-5 sm:px-6 lg:px-8 bg-[#f9f9f9]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header - Responsive */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 px-4">
          <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-[#5056e6]/10 rounded-full mb-3 sm:mb-4">
            <span className="text-xs sm:text-sm font-semibold text-[#5056e6]">OUR VALUES</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-3 sm:mb-4">
            Our Core Values
          </h2>
          <p className="text-sm xs:text-base sm:text-lg text-[#979999] max-w-xl sm:max-w-2xl mx-auto leading-relaxed">
            The principles that guide everything we do and shape our mission to transform healthcare
          </p>
        </div>

        {/* Values Container - Fully Responsive Grid */}
        <div ref={sectionRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {values.map((value, index) => {
            const isVisible = visibleValues.includes(index)
            return (
              <div
                key={index}
                data-index={index}
                className={`group relative bg-white border border-gray-200 sm:border-gray-300 rounded-lg sm:rounded-xl p-4 xs:p-5 sm:p-6 md:p-8 flex flex-col transition-all duration-500 ease-out hover:shadow-lg sm:hover:shadow-xl hover:-translate-y-1 sm:hover:-translate-y-2 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 sm:translate-y-8'
                }`}
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  minHeight: '240px'
                }}
              >
                {/* Hover Gradient Background */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-5 rounded-lg sm:rounded-xl transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(to bottom right, ${value.color}15, ${value.color}05)`
                  }}
                ></div>

                {/* Icon - Responsive */}
                <div className="relative z-10 mb-4 sm:mb-6 flex justify-center">
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-xl flex items-center justify-center text-lg sm:text-xl md:text-2xl text-white transition-all duration-300 group-hover:scale-105 sm:group-hover:scale-110 group-hover:rotate-3`}
                    style={{ backgroundColor: value.color }}
                  >
                    {value.icon}
                  </div>
                </div>

                {/* Content - Responsive */}
                <div className="relative z-10 flex flex-col flex-grow">
                  <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-black mb-2 sm:mb-3 md:mb-4 text-center group-hover:text-[#5056e6] transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-xs xs:text-sm sm:text-sm text-[#979999] leading-relaxed sm:leading-relaxed text-center flex-grow">
                    {value.description}
                  </p>
                </div>

                {/* Decorative Corner - Responsive */}
                <div
                  className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${value.color} 0%, transparent 70%)`,
                  }}
                ></div>
              </div>
            )
          })}
        </div>

        {/* Optional: Add responsive margin at bottom */}
        <div className="mt-12 sm:mt-16 md:mt-20 text-center">
          <p className="text-xs sm:text-sm text-[#979999] italic">
            These values guide our daily work and long-term vision
          </p>
        </div>
      </div>
    </section>
  )
}