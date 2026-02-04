import { useState, useEffect, useRef } from "react"
import { FaRocket, FaLightbulb, FaHandshake, FaAward } from "react-icons/fa"

export default function StorySection() {
  const [visibleItems, setVisibleItems] = useState([])  // State to track visible timeline items
  const sectionRef = useRef(null)  // Reference for the timeline section

  // REAL PROJECT TIMELINE from your FYP context
  const timeline = [
    {
      year: "2023",
      title: "Problem Identification",
      description: "Identified critical need for early detection of lung diseases and breast cancer in low-resource areas like Pakistan with limited radiologists.",
      icon: <FaRocket />,
      color: "#5056e6",
    },
    {
      year: "2024",
      title: "Research & Literature Review",
      description: "Analyzed existing AI models for medical imaging, identified gaps, and planned dual-disease detection system with explainable AI (Grad-CAM).",
      icon: <FaLightbulb />,
      color: "#008059",
    },
    {
      year: "2025",
      title: "System Development",
      description: "Developing Custom CNN model, collecting datasets (NIH, CBIS-DDSM, MIAS), and building web/mobile platform for clinical decision support.",
      icon: <FaHandshake />,
      color: "#007a9b",
    },
    {
      year: "Future",
      title: "Deployment & Impact",
      description: "Planned clinical validation in Pakistani hospitals, expansion to more diseases, and contributing to SDG 3 for improved healthcare outcomes.",
      icon: <FaAward />,
      color: "#5056e6",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index)  // Get item index
            setTimeout(() => {
              setVisibleItems((prev) => [...prev, index])  // Add to visible items with delay
            }, index * 200)  // Staggered delay based on index
          }
        })
      },
      { threshold: 0.1 }  // Trigger when 10% of item is visible
    )

    if (sectionRef.current) {
      const items = sectionRef.current.querySelectorAll('[data-index]')  // Get all timeline items
      items.forEach((item) => observer.observe(item))  // Observe each item
    }

    return () => observer.disconnect()  // Clean up observer on unmount
  }, [])

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 xs:px-5 sm:px-6 lg:px-8 bg-[#f9f9f9]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header - Updated */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 px-4">
          <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-[#5056e6]/10 rounded-full mb-3 sm:mb-4">
            <span className="text-xs sm:text-sm font-semibold text-[#5056e6]">PROJECT JOURNEY</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-3 sm:mb-4 leading-tight">
            CareVision Development Timeline
          </h2>
          <p className="text-sm xs:text-base sm:text-lg text-[#979999] max-w-xl sm:max-w-2xl mx-auto leading-relaxed">
            From problem identification to planned deployment of our FYP project
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
              const isVisible = visibleItems.includes(index)  // Check if item is visible
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

        {/* Project Methodology Summary - Added */}
        <div className="mt-12 sm:mt-16 md:mt-20 p-4 xs:p-5 sm:p-6 bg-white border border-gray-300 rounded-lg sm:rounded-xl">
          <h3 className="text-base xs:text-lg sm:text-xl font-bold text-black mb-4 text-center">FYP Development Methodology</h3>
          {/* Converted from grid to flex */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
            {/* First methodology step */}
            <div className="flex-1 min-w-[200px] max-w-[300px] text-center p-4">
              <div className="text-2xl font-bold text-[#5056e6] mb-2">1</div>
              <p className="text-sm text-gray-600">Data Collection (NIH, CBIS-DDSM, MIAS, Local datasets)</p>
            </div>
            {/* Second methodology step */}
            <div className="flex-1 min-w-[200px] max-w-[300px] text-center p-4">
              <div className="text-2xl font-bold text-[#008059] mb-2">2</div>
              <p className="text-sm text-gray-600">Model Training (Custom CNN with Grad-CAM for explainability)</p>
            </div>
            {/* Third methodology step */}
            <div className="flex-1 min-w-[200px] max-w-[300px] text-center p-4">
              <div className="text-2xl font-bold text-[#007a9b] mb-2">3</div>
              <p className="text-sm text-gray-600">Deployment (Cloud-based system for web/mobile access)</p>
            </div>
          </div>
        </div>

        {/* Optional Bottom Text - Updated */}
        <div className="mt-8 sm:mt-12 md:mt-16 text-center">
          <p className="text-xs sm:text-sm text-[#979999] italic">
            FEST BSSE Final Year Project focused on Sustainable Development Goal 3: Good Health and Well-being
          </p>
        </div>
      </div>
    </section>
  )
}