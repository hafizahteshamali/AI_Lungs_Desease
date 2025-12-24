import { useState, useEffect, useRef } from "react"
import { FaRocket, FaLightbulb, FaHandshake, FaAward } from "react-icons/fa"

export default function StorySection() {
  const [visibleItems, setVisibleItems] = useState([])
  const sectionRef = useRef(null)

  const timeline = [
    {
      year: "2020",
      title: "The Beginning",
      description: "Founded to make medical diagnostics accessible through AI innovation.",
      icon: <FaRocket />,
      color: "#5056e6",
    },
    {
      year: "2021",
      title: "First Breakthrough",
      description: "Achieved 95% accuracy in lung disease detection with clinical trials.",
      icon: <FaLightbulb />,
      color: "#008059",
    },
    {
      year: "2022",
      title: "Global Expansion",
      description: "Partnered with 50+ hospitals across 10 countries worldwide.",
      icon: <FaHandshake />,
      color: "#007a9b",
    },
    {
      year: "2023",
      title: "Industry Recognition",
      description: "Award-winning 98% accuracy AI diagnostics, trusted globally.",
      icon: <FaAward />,
      color: "#5056e6",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index)
            setTimeout(() => {
              setVisibleItems((prev) => [...prev, index])
            }, index * 200)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      const items = sectionRef.current.querySelectorAll('[data-index]')
      items.forEach((item) => observer.observe(item))
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 xs:px-5 sm:px-6 lg:px-8 bg-[#f9f9f9]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header - Responsive */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 px-4">
          <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-[#5056e6]/10 rounded-full mb-3 sm:mb-4">
            <span className="text-xs sm:text-sm font-semibold text-[#5056e6]">OUR JOURNEY</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-3 sm:mb-4 leading-tight">
            Our Story
          </h2>
          <p className="text-sm xs:text-base sm:text-lg text-[#979999] max-w-xl sm:max-w-2xl mx-auto leading-relaxed">
            From a bold idea to transforming healthcare worldwide
          </p>
        </div>

        {/* Timeline Container - Responsive */}
        <div ref={sectionRef} className="relative">
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-20 sm:top-24 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-[#5056e6] via-[#008059] to-[#007a9b] opacity-20"></div>

          {/* Mobile: Vertical Timeline Line */}
          <div className="lg:hidden absolute left-4 xs:left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#5056e6] via-[#008059] to-[#007a9b] opacity-20"></div>

          {/* Main Timeline Items - Already using flex */}
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-4 xl:gap-6">
            {timeline.map((item, index) => {
              const isVisible = visibleItems.includes(index)
              return (
                <div
                  key={index}
                  data-index={index}
                  className={`relative flex-1 w-full lg:w-auto ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 sm:translate-y-8'
                  } transition-all duration-700 ease-out flex flex-col`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  {/* Mobile Timeline Dot */}
                  <div className="lg:hidden absolute left-0 top-0 transform -translate-x-1/2 -translate-y-2">
                    <div
                      className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white shadow-md flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    ></div>
                  </div>

                  {/* Timeline Item Card - Responsive */}
                  <div className="group relative bg-white border border-gray-200 sm:border-gray-300 rounded-lg sm:rounded-xl p-4 xs:p-5 sm:p-6 md:p-8 hover:shadow-lg sm:hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 ease-out hover:-translate-y-1 sm:hover:-translate-y-2 min-h-[300px] ml-12 xs:ml-14 sm:ml-16 lg:ml-0 flex flex-col flex-1">
                    {/* Year Badge - Responsive */}
                    <div className="absolute -top-4 left-4 xs:left-5 sm:left-6 md:left-8 lg:-top-4 lg:left-6">
                      <div
                        className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white font-bold text-sm xs:text-base sm:text-lg shadow-md sm:shadow-lg flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                      >
                        {item.year}
                      </div>
                    </div>

                    {/* Icon - Responsive */}
                    <div className="mt-8 xs:mt-10 sm:mt-12 md:mt-8 mb-4 sm:mb-6 flex justify-center">
                      <div
                        className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl flex items-center justify-center text-lg xs:text-xl sm:text-2xl text-white transition-all duration-300 group-hover:scale-105 sm:group-hover:scale-110 group-hover:rotate-3 flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                      >
                        {item.icon}
                      </div>
                    </div>

                    {/* Content - Responsive */}
                    <div className="flex flex-col flex-1">
                      <h3 className="text-base xs:text-lg sm:text-xl lg:text-[18px] font-bold text-black mb-2 sm:mb-3 md:mb-4 text-center group-hover:text-[#5056e6] transition-colors duration-200">
                        {item.title}
                      </h3>
                      <p className="text-xs xs:text-sm text-[#979999] leading-relaxed sm:leading-relaxed text-center flex-1">
                        {item.description}
                      </p>
                    </div>

                    {/* Hover Effect */}
                    <div
                      className="absolute inset-0 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                      style={{ backgroundColor: item.color }}
                    ></div>
                  </div>

                  {/* Arrow Connector (Desktop Only, not last) */}
                  {index < timeline.length - 1 && (
                    <div className="hidden lg:block absolute top-20 sm:top-24 -right-2 z-10">
                      <div className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 rounded-full bg-white border border-gray-300 flex items-center justify-center shadow-sm">
                        <div
                          className="w-1.5 h-1.5 xs:w-2 xs:h-2 sm:w-2.5 sm:h-2.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: timeline[index + 1].color }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Optional Bottom Text */}
        <div className="mt-8 sm:mt-12 md:mt-16 text-center">
          <p className="text-xs sm:text-sm text-[#979999] italic">
            Continuing our journey to revolutionize healthcare diagnostics
          </p>
        </div>
      </div>
    </section>
  )
}