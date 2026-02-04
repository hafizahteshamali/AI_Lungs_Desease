import { useState } from "react"
import { FaArrowRight, FaRocket, FaCheckCircle } from "react-icons/fa"

export default function CTASection() {
  // State for tracking button hover effect
  const [isHovered, setIsHovered] = useState(false)

  // REAL PROJECT BENEFITS from your PDF - Key features of CareVision
  const benefits = [
    "Dual Disease Detection",
    "Explainable AI (Grad-CAM)",
    "Clinical Decision Support",
    "Low-Resource Optimized",
  ]

  // Function for smooth scrolling to XrayDemoSection
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
    // Main CTA section with gradient background
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#5056e6] via-[#3d43d4] to-[#007a9b] overflow-hidden">
      {/* Animated Background Elements - Decorative circles */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top right animated circle */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl animate-pulse"></div>
        {/* Bottom left animated circle with delay */}
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        {/* Center animated circle with longer delay */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white opacity-3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main content container */}
      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Project Badge - FYP identification */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6 border border-white/30">
          <FaRocket className="text-white animate-bounce" />
          <span className="text-sm font-semibold text-white">FYP Project - FEST BSSE</span>
        </div>

        {/* Main Heading - Project mission statement */}
        <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
          Transform Healthcare in
          <br />
          <span className="relative inline-block">
            Low-Resource Areas
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-white/30"></span>
          </span>
        </h2>

        {/* Project Description */}
        <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
          CareVision: AI-powered early detection of lung diseases and breast cancer for hospitals and clinics in Pakistan and similar regions
        </p>

        {/* Benefits List - Using flex for horizontal layout */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
            >
              <FaCheckCircle className="text-white text-sm" />
              <span className="text-white text-sm font-medium">{benefit}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons Container - Flex for responsive layout */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Primary CTA Button - View Live Demo */}
          <button
            onClick={handleDemoClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative px-10 py-4 bg-white text-[#5056e6] font-bold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-white/30 hover:scale-105"
          >
            <span className="relative z-10 flex items-center justify-center gap-2 text-lg">
              View Live Demo
              <FaArrowRight className={`transition-transform duration-300 ${isHovered ? 'translate-x-2' : ''}`} />
            </span>
            {/* Hover gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
          
          {/* Secondary CTA Button - See Project Details */}
          <button 
            onClick={handleDemoClick} 
            className="px-10 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-[#5056e6] transition-all duration-300 hover:scale-105 text-lg"
          >
            See Project Details
          </button>
        </div>

        {/* Trust Indicators Section - Project statistics */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-white/80 text-sm mb-4">Designed for healthcare improvement in Pakistan</p>
          
          {/* Statistics List - Using flex for horizontal layout */}
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {/* Lung disease deaths statistic */}
            <div className="text-white font-semibold">4M+ Deaths/year</div>
            <div className="w-1 h-1 rounded-full bg-white flex-shrink-0"></div>
            
            {/* Disease focus */}
            <div className="text-white font-semibold">Lung Diseases</div>
            <div className="w-1 h-1 rounded-full bg-white flex-shrink-0"></div>
            
            {/* Breast cancer statistic */}
            <div className="text-white font-semibold">2.3M Breast Cancer</div>
            <div className="w-1 h-1 rounded-full bg-white flex-shrink-0"></div>
            
            {/* Geographical focus */}
            <div className="text-white font-semibold">Pakistan Focus</div>
          </div>
        </div>
      </div>
    </section>
  )
}