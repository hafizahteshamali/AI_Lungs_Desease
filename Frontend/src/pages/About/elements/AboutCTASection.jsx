import { useState } from "react"
import { FaArrowRight, FaHandshake, FaCheckCircle } from "react-icons/fa"

export default function AboutCTASection() {
  const [isHovered, setIsHovered] = useState(false)

  const benefits = [
    "Partner with us",
    "Join our mission",
    "Transform healthcare",
    "Save more lives",
  ]

  return (
    <section className="relative py-12 sm:py-16 md:py-20 px-4 xs:px-5 sm:px-6 lg:px-8 bg-white overflow-hidden">
      {/* Animated Background Elements - Responsive */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-[#5056e6] opacity-5 rounded-full blur-xl sm:blur-2xl md:blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-[#008059] opacity-5 rounded-full blur-xl sm:blur-2xl md:blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Badge - Responsive - Already using inline-flex */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-[#5056e6]/10 rounded-full mb-4 sm:mb-6 border border-[#5056e6]/20">
          <FaHandshake className="text-[#5056e6] text-sm sm:text-base" />
          <span className="text-xs sm:text-sm font-semibold text-[#5056e6]">Let's Work Together</span>
        </div>

        {/* Main Heading - Responsive */}
        <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4 sm:mb-6 leading-tight px-4">
          Ready to Transform
          <br className="hidden xs:block" />
          <span className="relative inline-block text-[#5056e6] mt-1 xs:mt-0">
            Healthcare Together?
            <span className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-0.5 sm:h-1 bg-[#5056e6]/30"></span>
          </span>
        </h2>

        {/* Description - Responsive */}
        <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-[#979999] mb-6 sm:mb-8 max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto px-4 leading-relaxed">
          Join hospitals, clinics, and healthcare professionals worldwide in revolutionizing medical diagnostics
        </p>

        {/* Benefits List - Responsive - Already using flex */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 md:mb-10 px-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-[#5056e6]/10 rounded-full border border-[#5056e6]/20"
            >
              <FaCheckCircle className="text-[#5056e6] text-xs sm:text-sm" />
              <span className="text-black text-xs sm:text-sm font-medium whitespace-nowrap">{benefit}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons - Responsive - Already using flex */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
          <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative px-6 py-3 sm:px-8 sm:py-3 md:px-10 md:py-4 bg-[#5056e6] text-white font-bold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg sm:hover:shadow-xl md:hover:shadow-2xl hover:shadow-[#5056e6]/30 hover:scale-[1.02] sm:hover:scale-[1.03] md:hover:scale-105"
          >
            <span className="relative z-10 flex items-center justify-center gap-2 text-sm sm:text-base md:text-lg">
              Get Started Today
              <FaArrowRight className={`transition-transform duration-300 ${isHovered ? 'translate-x-1 sm:translate-x-2' : ''}`} />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#5056e6] to-[#3d43d4] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          
          <button className="px-6 py-3 sm:px-8 sm:py-3 md:px-10 md:py-4 border border-gray-300 sm:border-2 text-black font-bold rounded-lg hover:border-[#5056e6] hover:text-[#5056e6] transition-all duration-300 hover:scale-[1.02] sm:hover:scale-[1.03] md:hover:scale-105 text-sm sm:text-base md:text-lg">
            Contact Us
          </button>
        </div>

        {/* Trust Indicators - Responsive - Already using flex */}
        <div className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-gray-200 px-4">
          <p className="text-[#979999] text-xs sm:text-sm mb-3 sm:mb-4">Trusted by leading healthcare institutions worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8">
            <div className="text-black font-semibold text-xs sm:text-sm md:text-base whitespace-nowrap">200+ Partners</div>
            <div className="hidden xs:block w-1 h-1 rounded-full bg-[#979999] flex-shrink-0"></div>
            <div className="text-black font-semibold text-xs sm:text-sm md:text-base whitespace-nowrap">50K+ Patients</div>
            <div className="hidden xs:block w-1 h-1 rounded-full bg-[#979999] flex-shrink-0"></div>
            <div className="text-black font-semibold text-xs sm:text-sm md:text-base whitespace-nowrap">25+ Countries</div>
          </div>
          
          {/* Mobile view dots */}
          <div className="xs:hidden flex justify-center gap-1 mt-2">
            <div className="w-1 h-1 rounded-full bg-[#979999]"></div>
            <div className="w-1 h-1 rounded-full bg-[#979999]"></div>
            <div className="w-1 h-1 rounded-full bg-[#979999]"></div>
            <div className="w-1 h-1 rounded-full bg-[#979999]"></div>
          </div>
        </div>
      </div>
    </section>
  )
}