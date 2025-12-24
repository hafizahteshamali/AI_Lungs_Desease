import { useState, useEffect } from "react"
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"

export default function ContactHeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] bg-gradient-to-br from-[#5056e6] via-[#3d43d4] to-[#007a9b] overflow-hidden flex items-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-4 w-64 h-64 md:top-20 md:right-10 md:w-96 md:h-96 bg-white opacity-5 rounded-full blur-2xl md:blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-4 w-64 h-64 md:bottom-20 md:left-10 md:w-96 md:h-96 bg-white opacity-5 rounded-full blur-2xl md:blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12 md:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left: Main Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full mb-4 md:mb-6 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <span className="text-xs md:text-sm font-medium text-white">GET IN TOUCH</span>
            </div>

            <div className={`space-y-4 md:space-y-6 mb-6 md:mb-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Let's Connect
                <br />
                <span className="relative inline-block mt-2">
                  To Transform Healthcare
                  <span className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-0.5 md:h-1 bg-white/30"></span>
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Reach out to our team for partnership inquiries, technical support, 
                or to learn how our AI diagnostics can benefit your healthcare institution.
              </p>
            </div>
          </div>

          {/* Right: Quick Contact Cards */}
          <div className={`flex-1 w-full max-w-lg ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  icon: <FaPhone className="text-white text-xl md:text-2xl" />,
                  title: "Call Us",
                  info: "+1 (555) 123-4567",
                  color: "from-[#5056e6] to-[#3d43d4]",
                  hoverColor: "hover:from-[#3d43d4] hover:to-[#2e32b3]"
                },
                {
                  icon: <FaEnvelope className="text-white text-xl md:text-2xl" />,
                  title: "Email Us",
                  info: "contact@preciousscan.com",
                  color: "from-[#008059] to-[#006d4a]",
                  hoverColor: "hover:from-[#006d4a] hover:to-[#005a3b]"
                },
                {
                  icon: <FaMapMarkerAlt className="text-white text-xl md:text-2xl" />,
                  title: "Visit Us",
                  info: "San Francisco, CA",
                  color: "from-[#007a9b] to-[#006680]",
                  hoverColor: "hover:from-[#006680] hover:to-[#005266]"
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className={`group bg-gradient-to-br ${item.color} rounded-xl p-4 md:p-5 text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer ${item.hoverColor} flex flex-col items-center justify-between min-h-[160px] md:min-h-[180px]`}
                >
                  <div className="mb-3 flex justify-center">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 flex items-center justify-center">
                      {item.icon}
                    </div>
                  </div>
                  <div className="w-full">
                    <h3 className="text-white font-bold text-sm md:text-base mb-1">{item.title}</h3>
                    <p className="text-blue-100 text-xs md:text-sm break-words px-2">{item.info}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}