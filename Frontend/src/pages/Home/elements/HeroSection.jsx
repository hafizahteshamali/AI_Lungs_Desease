import { useState, useEffect } from "react"
import { FaArrowRight, FaPlay } from "react-icons/fa"
import { IoSparkles } from "react-icons/io5"

export default function HeroSection() {
  // State for controlling animation visibility
  const [isVisible, setIsVisible] = useState(false)

  // useEffect hook for triggering animations when component mounts
  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Function for smooth scrolling to demo section
  const handleDemoClick = () => {
    const demoSection = document.getElementById('xray-demo')
    if (demoSection) {
      demoSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    // Main hero section container with responsive height and flex layout
    <section className="relative min-h-[90vh] overflow-hidden flex items-center mt-[50px]">
      {/* Centered content container with max width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Flex container for text and image - column on mobile, row on large screens */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Text Content Section - Left side */}
          <div className={`space-y-8 flex-1 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            
            {/* Project Badge/Header */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full shadow-sm ring-1">
              <IoSparkles className="text-[#5056e6] animate-spin-slow" />
              <span className="text-sm font-medium text-gray-700">
                FYP Project - FEST BSSE | CNN + Grad-CAM
              </span>
            </div>

            {/* Main Heading and Description */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-black leading-tight">
                <span className="block">Early Detection</span>
                <span className="block text-[#5056e6] relative">
                  Saves Lives
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#5056e6] to-transparent opacity-30"></span>
                </span>
              </h1>
              {/* Project description */}
              <p className="text-lg lg:text-xl text-[#979999] leading-relaxed max-w-xl">
                Precision Scan: A dual AI system for early detection of lung diseases (COVID-19, pneumonia, opacity) and breast cancer from X-rays & mammograms, designed for low-resource areas.
              </p>
            </div>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">              
              <button 
                onClick={handleDemoClick}
                className="group px-8 py-4 border-2 border-gray-300 text-black font-semibold rounded-lg hover:border-[#5056e6] hover:text-[#5056e6] transition-all duration-300 hover:shadow-md flex items-center justify-center gap-2 flex-1 sm:flex-none"
              >
                <FaPlay className="text-sm" />
                Watch Demo
              </button>
            </div>

            {/* Statistics Section - Using flex instead of grid */}
            <div className="flex flex-wrap gap-8 pt-4">
              
              {/* Accuracy Stat */}
              <div className="flex items-center gap-3 flex-1 min-w-[150px]">
                <div className="h-12 rounded-lg bg-[#5056e6]/10 flex items-center justify-center px-2 flex-shrink-0 w-[50%]">
                  <span className="text-2xl font-bold text-[#5056e6]">95%</span>
                </div>
                <div>
                  <p className="text-sm text-[#979999]">Accuracy</p>
                  <p className="text-xs text-[#979999]">(Validation)</p>
                </div>
              </div>
              
              {/* Analysis Time Stat */}
              <div className="flex items-center gap-3 flex-1 min-w-[150px]">
                <div className="h-12 rounded-lg bg-[#5056e6]/10 flex items-center justify-center px-2 flex-shrink-0 w-[50%]">
                  <span className="text-2xl font-bold text-[#5056e6]">&lt;2min</span>
                </div>
                <div>
                  <p className="text-sm text-[#979999]">Analysis</p>
                  <p className="text-xs text-[#979999]">Per Image</p>
                </div>
              </div>
              
              {/* Training Images Stat */}
              <div className="flex items-center gap-3 flex-1 min-w-[150px]">
                <div className="h-12 rounded-lg bg-[#5056e6]/10 flex items-center justify-center px-2 flex-shrink-0 w-[50%]">
                  <span className="text-2xl font-bold text-[#5056e6]">150K+</span>
                </div>
                <div>
                  <p className="text-sm text-[#979999]">Medical</p>
                  <p className="text-xs text-[#979999]">Images Trained</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image Section - Right side */}
          <div className={`relative flex-1 ${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
            <div className="relative h-[500px] lg:h-[600px] rounded-2xl group">
              {/* Project logo/visualization */}
              <img
                src="/assets/images/crop-logo-removebg-preview.png"
                alt="Precision Scan AI System"
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Floating Info Card 1 - Dual AI System */}
              <div className="absolute top-8 right-8 bg-white p-4 rounded-xl shadow-lg border border-gray-300 ring-1 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#5056e6]/10 flex items-center justify-center flex-shrink-0">
                    <IoSparkles className="text-[#5056e6]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-black">Dual AI System</p>
                    <p className="text-xs text-[#979999]">Lung + Breast</p>
                  </div>
                </div>
              </div>

              {/* Floating Info Card 2 - Explainable AI */}
              <div className="absolute bottom-8 left-8 bg-white p-4 rounded-xl shadow-lg border border-gray-300 ring-1 animate-float-delayed">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-500 text-xl">✓</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-black">Grad-CAM</p>
                    <p className="text-xs text-[#979999]">Explainable AI</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}