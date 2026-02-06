import { useState, useEffect } from "react"
import { IoSparkles } from "react-icons/io5"
import { FaHeartbeat, FaAward } from "react-icons/fa"

export default function AboutHeroSection() {
  // State for controlling animation visibility
  const [isVisible, setIsVisible] = useState(false)

  // useEffect hook for triggering animations when component mounts
  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    // Main hero section with gradient background and flex centering
    <section className="relative min-h-[60vh] md:min-h-[80vh] bg-gradient-to-br from-[#5056e6] via-[#3d43d4] to-[#007a9b] overflow-hidden flex items-center">
      
      {/* Animated Background Elements - Decorative circles */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top right circle - responsive sizing */}
        <div className="absolute top-10 right-4 w-64 h-64 md:top-20 md:right-10 md:w-96 md:h-96 bg-white opacity-5 rounded-full blur-2xl md:blur-3xl animate-pulse"></div>
        {/* Bottom left circle - with animation delay */}
        <div className="absolute bottom-10 left-4 w-64 h-64 md:bottom-20 md:left-10 md:w-96 md:h-96 bg-white opacity-5 rounded-full blur-2xl md:blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Main content container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12 md:py-20">
        {/* Flex container for centering all content */}
        <div className="flex flex-col items-center text-center">
          
          {/* Project Badge - FYP identification */}
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full mb-4 md:mb-6 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <IoSparkles className="text-white text-sm md:text-base" />
            <span className="text-xs md:text-sm font-medium text-white">About Precision Scan FYP</span>
          </div>

          {/* Main Heading and Description Section */}
          <div className={`space-y-4 md:space-y-6 mb-6 md:mb-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            {/* Main heading with responsive font sizes */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-snug md:leading-tight">
              AI-Powered Early Detection for
              <br className="hidden sm:block" />
              <span className="relative inline-block mt-2">
                Low-Resource Healthcare
                <span className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-0.5 md:h-1 bg-white/30"></span>
              </span>
            </h1>
            {/* Project description */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 max-w-2xl md:max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Precision Scan is a dual AI system for early detection of lung diseases and breast cancer from medical images, designed specifically for regions with limited healthcare infrastructure.
            </p>
          </div>

          {/* Quick Stats Section - Using flex for horizontal layout */}
          <div className={`flex flex-wrap justify-center gap-4 md:gap-8 mt-6 md:mt-8 w-full px-4 sm:px-0 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
            {[
              { 
                icon: <FaHeartbeat className="text-white text-xl md:text-2xl" />, 
                value: "4M+", 
                label: "Lung Disease Deaths/Year",
                key: "deaths"
              },
              { 
                icon: <FaAward className="text-white text-xl md:text-2xl" />, 
                value: "95%", 
                label: "Model Accuracy",
                key: "accuracy"
              },
              { 
                icon: <IoSparkles className="text-white text-xl md:text-2xl" />, 
                value: "100K+", 
                label: "Training Images",
                key: "images"
              }
            ].map((stat) => (
              // Individual Stat Card - Using flex for horizontal alignment
              <div 
                key={stat.key}
                className="flex justify-center items-center gap-2 md:gap-3 px-4 py-2 md:px-6 md:py-3 bg-white/10 backdrop-blur-sm rounded-lg md:rounded-xl border border-white/20 "
              >
                {/* Stat Icon */}
                {stat.icon}
                {/* Stat Value and Label */}
                <div className="text-left">
                  <p className="text-lg md:text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs md:text-sm text-blue-100 whitespace-nowrap">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}