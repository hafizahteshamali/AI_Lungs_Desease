import { useState, useEffect, useRef } from "react"
import { FaBullseye, FaEye } from "react-icons/fa"

export default function MissionSection() {
  // State for controlling section visibility animations
  const [isVisible, setIsVisible] = useState(false)
  // Ref for observing section intersection
  const sectionRef = useRef(null)

  // Intersection Observer for triggering animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 } // Trigger when 10% of section is visible
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    // Main section container with white background
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* MISSION SECTION - Using flex for two-column layout */}
        <div 
          className={`flex flex-col ${isVisible ? 'lg:flex-row' : 'flex-col'} gap-8 sm:gap-10 md:gap-12 lg:gap-12 items-center mb-12 sm:mb-16 md:mb-20 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } transition-all duration-700 ease-out`}
        >
          
          {/* Left Column - Mission Text Content */}
          <div className="flex-1 w-full order-2 lg:order-1">
            {/* Mission Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-[#5056e6]/10 rounded-full mb-4 sm:mb-6">
              <FaBullseye className="text-[#5056e6] text-sm sm:text-base" />
              <span className="text-xs sm:text-sm font-semibold text-[#5056e6]">PROJECT MISSION</span>
            </div>
            
            {/* Mission Heading */}
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4 sm:mb-6 leading-tight">
              Bridging Healthcare Gaps with AI
            </h2>
            
            {/* Mission Description */}
            <div className="space-y-3 sm:space-y-4">
              <p className="text-sm xs:text-base sm:text-lg text-[#979999] leading-relaxed">
                Our mission is to develop an AI-powered diagnostic system for early detection of lung diseases and breast cancer that addresses the critical shortage of radiologists in low-resource areas like Pakistan.
              </p>
              <p className="text-sm xs:text-base sm:text-lg text-[#979999] leading-relaxed">
                By creating a dual-disease detection system with explainable AI (Grad-CAM), we aim to support timely clinical decision-making and reduce mortality rates from preventable diseases through early intervention.
              </p>
            </div>
          </div>

          {/* Right Column - Mission Image */}
          {/* On mobile: image first (order-1), On desktop: image second (lg:order-2) */}
          <div className="flex-1 w-full order-1 lg:order-2 relative">
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl lg:shadow-2xl group">
              {/* Mission image with hover effect */}
              <img
                src="/assets/images/home/mission.jpg"
                alt="CareVision Mission - AI Diagnostic System"
                className="w-full h-[250px] xs:h-[300px] sm:h-[350px] md:h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  // Fallback image if original fails to load
                  e.target.src = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop"
                }}
                loading="lazy" // Lazy loading for performance
              />
              {/* Gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#5056e6]/20 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* VISION SECTION - Using flex with reverse order on desktop */}
        <div 
          className={`flex flex-col ${isVisible ? 'lg:flex-row-reverse' : 'flex-col'} gap-8 sm:gap-10 md:gap-12 lg:gap-12 items-center ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } transition-all duration-700 ease-out`} 
          style={{ transitionDelay: '0.2s' }} // Staggered animation delay
        >
          
          {/* Left Column - Vision Text Content */}
          {/* On desktop: text on left, image on right (reverse of mission) */}
          <div className="flex-1 w-full order-2 lg:order-1">
            {/* Vision Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-[#008059]/10 rounded-full mb-4 sm:mb-6">
              <FaEye className="text-[#008059] text-sm sm:text-base" />
              <span className="text-xs sm:text-sm font-semibold text-[#008059]">FUTURE VISION</span>
            </div>
            
            {/* Vision Heading */}
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4 sm:mb-6 leading-tight">
              Scalable AI for Global Healthcare
            </h2>
            
            {/* Vision Description */}
            <div className="space-y-3 sm:space-y-4">
              <p className="text-sm xs:text-base sm:text-lg text-[#979999] leading-relaxed">
                We envision CareVision as a scalable solution that can be deployed in hospitals across Pakistan and similar developing regions, supporting Sustainable Development Goal 3 (Good Health and Well-being).
              </p>
              <p className="text-sm xs:text-base sm:text-lg text-[#979999] leading-relaxed">
                Future expansion includes integrating more imaging modalities (CT, MRI), covering additional diseases, and creating mobile applications for rural healthcare workers to improve accessibility in remote areas.
              </p>
            </div>
          </div>

          {/* Right Column - Vision Image */}
          <div className="flex-1 w-full order-1 lg:order-2 relative">
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl lg:shadow-2xl group">
              {/* Vision image with hover effect */}
              <img
                src="/assets/images/home/mission.jpg"
                alt="CareVision Future Vision - Healthcare Innovation"
                className="w-full h-[250px] xs:h-[300px] sm:h-[350px] md:h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  // Fallback image if original fails to load
                  e.target.src = "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop"
                }}
                loading="lazy" // Lazy loading for performance
              />
              {/* Gradient overlay with different color */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#008059]/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}