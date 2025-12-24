import { useState, useEffect, useRef } from "react"
import { FaUpload, FaBrain, FaFileMedical, FaCheckCircle } from "react-icons/fa"

export default function HowItWorksSection() {
  const [visibleSteps, setVisibleSteps] = useState([])
  const sectionRef = useRef(null)

  const steps = [
    {
      number: "01",
      icon: <FaUpload />,
      title: "Upload Medical Image",
      description: "Simply upload your X-ray, CT scan, or mammogram image through our secure platform.",
      color: "#5056e6",
    },
    {
      number: "02",
      icon: <FaBrain />,
      title: "AI Analysis",
      description: "Our advanced AI algorithms analyze the image using deep learning models trained on millions of medical images.",
      color: "#008059",
    },
    {
      number: "03",
      icon: <FaFileMedical />,
      title: "Get Detailed Report",
      description: "Receive a comprehensive diagnostic report with findings, confidence scores, and recommendations within minutes.",
      color: "#007a9b",
    },
    {
      number: "04",
      icon: <FaCheckCircle />,
      title: "Consult with Doctor",
      description: "Share your results with healthcare professionals for further consultation and treatment planning.",
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
              setVisibleSteps((prev) => [...prev, index])
            }, index * 150)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      const stepElements = sectionRef.current.querySelectorAll('[data-index]')
      stepElements.forEach((element) => observer.observe(element))
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-[#5056e6]/10 rounded-full mb-4">
            <span className="text-sm font-semibold text-[#5056e6]">HOW IT WORKS</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4">
            Simple. Fast. Accurate.
          </h2>
          <p className="text-lg text-[#979999] max-w-2xl mx-auto">
            Get your medical diagnosis in just four easy steps
          </p>
        </div>

        {/* Steps */}
        <div ref={sectionRef} className="relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-[#5056e6] via-[#008059] to-[#5056e6] opacity-20"></div>

          {/* Grid ki jagah flex use kiya */}
          <div className="flex flex-col md:flex-row flex-wrap gap-8 relative">
            {steps.map((step, index) => {
              const isVisible = visibleSteps.includes(index)
              const isLast = index === steps.length - 1

              return (
                <div
                  key={index}
                  data-index={index}
                  className={`relative group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-700 flex-1 min-w-[300px] md:min-w-[250px] lg:min-w-0 max-w-[400px] md:max-w-none mx-auto`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Step Card */}
                  <div className="relative bg-white border border-gray-300 rounded-xl p-6 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-2 ring-1 h-full flex flex-col">
                    {/* Step Number */}
                    <div className="absolute -top-4 left-6">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0"
                        style={{ backgroundColor: step.color }}
                      >
                        {step.number}
                      </div>
                    </div>

                    {/* Icon */}
                    <div className="mt-8 mb-6">
                      <div
                        className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 flex-shrink-0"
                        style={{ backgroundColor: step.color }}
                      >
                        {step.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1">
                      <h3 className="text-xl font-bold text-black mb-3 group-hover:text-[#5056e6] transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-[#979999] text-sm leading-relaxed flex-1">
                        {step.description}
                      </p>
                    </div>

                    {/* Hover Effect */}
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                      style={{ backgroundColor: step.color }}
                    ></div>
                  </div>

                  {/* Arrow (Desktop, not last) */}
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