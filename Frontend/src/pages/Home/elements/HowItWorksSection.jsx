import { useState, useEffect, useRef } from "react"
import { FaUpload, FaBrain, FaFileMedical, FaCheckCircle } from "react-icons/fa"

export default function HowItWorksSection() {
  // State for tracking which steps are visible for animation
  const [visibleSteps, setVisibleSteps] = useState([])
  // Ref for observing section intersection
  const sectionRef = useRef(null)

  // REAL PROJECT WORKFLOW from your PDF methodology - Four-step process
  const steps = [
    {
      number: "01",
      icon: <FaUpload />,
      title: "Upload Medical Image",
      description: "Upload chest X-ray or mammogram image through web/mobile interface. Supports DICOM & common image formats.",
      color: "#5056e6",
    },
    {
      number: "02",
      icon: <FaBrain />,
      title: "AI Model Processing",
      description: "Custom CNN processes image through preprocessing (resize, normalize, augment) and dual disease detection pipeline.",
      color: "#008059",
    },
    {
      number: "03",
      icon: <FaFileMedical />,
      title: "Explainable AI Report",
      description: "Receive diagnostic report with Grad-CAM heatmaps highlighting suspicious regions and disease classification.",
      color: "#007a9b",
    },
    {
      number: "04",
      icon: <FaCheckCircle />,
      title: "Clinical Support & Consultation",
      description: "Get treatment suggestions and book online appointments with radiologists/oncologists through integrated platform.",
      color: "#5056e6",
    },
  ]

  // Intersection Observer for step animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index)
            setTimeout(() => {
              setVisibleSteps((prev) => [...prev, index])
            }, index * 150) // Staggered delay for each step
          }
        })
      },
      { threshold: 0.2 } // Trigger when 20% of element is visible
    )

    if (sectionRef.current) {
      const stepElements = sectionRef.current.querySelectorAll('[data-index]')
      stepElements.forEach((element) => observer.observe(element))
    }

    return () => observer.disconnect()
  }, [])

  return (
    // Main section container with white background
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with project workflow title */}
        <div className="text-center mb-16">
          {/* Workflow badge */}
          <div className="inline-block px-4 py-2 bg-[#5056e6]/10 rounded-full mb-4">
            <span className="text-sm font-semibold text-[#5056e6]">PRECISION SCAN WORKFLOW</span>
          </div>
          {/* Main heading */}
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4">
            Four-Step Diagnostic Process
          </h2>
          {/* Section description */}
          <p className="text-lg text-[#979999] max-w-2xl mx-auto">
            From medical image upload to clinical decision support
          </p>
        </div>

        {/* Steps Container */}
        <div ref={sectionRef} className="relative">
          {/* Connection Line (Visible only on Desktop) */}
          {/* Horizontal gradient line connecting all steps */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-[#5056e6] via-[#008059] to-[#5056e6] opacity-20"></div>

          {/* Steps Container - Using flex instead of grid */}
          {/* flex-col for mobile, md:flex-row for tablets and up */}
          <div className="flex flex-col md:flex-row flex-wrap gap-8 relative">
            {steps.map((step, index) => {
              const isVisible = visibleSteps.includes(index) // Check if step should be animated
              const isLast = index === steps.length - 1 // Check if this is the last step

              return (
                // Individual Step Container
                <div
                  key={index}
                  data-index={index}
                  className={`relative group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-700 flex-1 min-w-[300px] md:min-w-[250px] lg:min-w-0 max-w-[400px] md:max-w-none mx-auto`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Step Card */}
                  <div className="relative bg-white border border-gray-300 rounded-xl p-6 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-2 ring-1 h-full flex flex-col">
                    
                    {/* Step Number Badge (Absolute positioned) */}
                    <div className="absolute -top-4 left-6">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0"
                        style={{ backgroundColor: step.color }}
                      >
                        {step.number}
                      </div>
                    </div>

                    {/* Step Icon Container */}
                    <div className="mt-8 mb-6">
                      <div
                        className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 flex-shrink-0"
                        style={{ backgroundColor: step.color }}
                      >
                        {step.icon}
                      </div>
                    </div>

                    {/* Step Content */}
                    <div className="flex flex-col flex-1">
                      {/* Step Title */}
                      <h3 className="text-xl font-bold text-black mb-3 group-hover:text-[#5056e6] transition-colors">
                        {step.title}
                      </h3>
                      {/* Step Description */}
                      <p className="text-[#979999] text-sm leading-relaxed flex-1">
                        {step.description}
                      </p>
                    </div>

                    {/* Hover Background Effect */}
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                      style={{ backgroundColor: step.color }}
                    ></div>
                  </div>

                  {/* Arrow Connector (Visible only on Desktop, not for last step) */}
                  {!isLast && (
                    <div className="hidden lg:block absolute top-24 -right-4 z-10">
                      <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center">
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: steps[index + 1].color }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}