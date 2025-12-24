import { useState } from "react"
import { FaArrowRight, FaRocket, FaCheckCircle } from "react-icons/fa"

export default function CTASection() {
  const [isHovered, setIsHovered] = useState(false)

  const benefits = [
    "Free 30-day trial",
    "No credit card required",
    "Cancel anytime",
    "24/7 Support",
  ]

    // Add this function for scrolling to XrayDemoSection
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
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#5056e6] via-[#3d43d4] to-[#007a9b] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white opacity-3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Badge - Already using inline-flex */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6 border border-white/30">
          <FaRocket className="text-white animate-bounce" />
          <span className="text-sm font-semibold text-white">Start Your Journey Today</span>
        </div>

        {/* Main Heading */}
        <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
          Ready to Transform
          <br />
          <span className="relative inline-block">
            Diagnostic Accuracy?
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-white/30"></span>
          </span>
        </h2>

        {/* Description */}
        <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
          Join hospitals and clinics worldwide using AI-powered diagnostics to save lives and improve patient outcomes
        </p>

        {/* Benefits List - Already using flex flex-wrap */}
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

        {/* CTA Buttons - Already using flex flex-col sm:flex-row */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
          onClick={handleDemoClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative px-10 py-4 bg-white text-[#5056e6] font-bold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-white/30 hover:scale-105"
          >
            <span className="relative z-10 flex items-center justify-center gap-2 text-lg">
              Start Your Free Trial
              <FaArrowRight className={`transition-transform duration-300 ${isHovered ? 'translate-x-2' : ''}`} />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
          <button onClick={handleDemoClick} className="px-10 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-[#5056e6] transition-all duration-300 hover:scale-105 text-lg">
            Schedule Demo
          </button>
        </div>

        {/* Trust Indicators - Already using flex flex-wrap */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-white/80 text-sm mb-4">Trusted by leading healthcare institutions</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-white font-semibold">50+ Hospitals</div>
            <div className="w-1 h-1 rounded-full bg-white flex-shrink-0"></div>
            <div className="text-white font-semibold">1000+ Doctors</div>
            <div className="w-1 h-1 rounded-full bg-white flex-shrink-0"></div>
            <div className="text-white font-semibold">500K+ Scans</div>
          </div>
        </div>
      </div>
    </section>
  )
}