import { useState, useEffect, useRef } from "react"
import { FaBullseye, FaEye } from "react-icons/fa"

export default function MissionSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Mission Section - Already using flex */}
        <div 
          className={`flex flex-col ${isVisible ? 'lg:flex-row' : 'flex-col'} gap-8 sm:gap-10 md:gap-12 lg:gap-12 items-center mb-12 sm:mb-16 md:mb-20 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } transition-all duration-700 ease-out`}
        >
          {/* Text Content */}
          <div className="flex-1 w-full order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-[#5056e6]/10 rounded-full mb-4 sm:mb-6">
              <FaBullseye className="text-[#5056e6] text-sm sm:text-base" />
              <span className="text-xs sm:text-sm font-semibold text-[#5056e6]">OUR MISSION</span>
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4 sm:mb-6 leading-tight">
              Early Detection Saves Lives
            </h2>
            <div className="space-y-3 sm:space-y-4">
              <p className="text-sm xs:text-base sm:text-lg text-[#979999] leading-relaxed">
                We believe early detection saves lives. Our mission is to democratize access to world-class diagnostic 
                AI, making it affordable and accessible to healthcare providers globally.
              </p>
              <p className="text-sm xs:text-base sm:text-lg text-[#979999] leading-relaxed">
                By combining cutting-edge machine learning with medical expertise, we're creating a future where every 
                patient has access to accurate, timely diagnostics regardless of location or resources.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 w-full order-1 lg:order-2 relative">
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl lg:shadow-2xl group">
              <img
                src="/assets/images/home/mission.jpg"
                alt="Our Mission"
                className="w-full h-[250px] xs:h-[300px] sm:h-[350px] md:h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop"
                }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#5056e6]/20 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Vision Section - Already using flex */}
        <div 
          className={`flex flex-col ${isVisible ? 'lg:flex-row-reverse' : 'flex-col'} gap-8 sm:gap-10 md:gap-12 lg:gap-12 items-center ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } transition-all duration-700 ease-out`} 
          style={{ transitionDelay: '0.2s' }}
        >
          {/* Text Content */}
          <div className="flex-1 w-full order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-[#008059]/10 rounded-full mb-4 sm:mb-6">
              <FaEye className="text-[#008059] text-sm sm:text-base" />
              <span className="text-xs sm:text-sm font-semibold text-[#008059]">OUR VISION</span>
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4 sm:mb-6 leading-tight">
              A World Without Preventable Diseases
            </h2>
            <div className="space-y-3 sm:space-y-4">
              <p className="text-sm xs:text-base sm:text-lg text-[#979999] leading-relaxed">
                We envision a world where advanced medical diagnostics are not a luxury but a fundamental right. 
                Our vision extends beyond technology—it's about building a healthcare ecosystem that prioritizes 
                prevention over treatment.
              </p>
              <p className="text-sm xs:text-base sm:text-lg text-[#979999] leading-relaxed">
                Through continuous innovation and collaboration with medical professionals worldwide, we're working 
                towards a future where diseases are detected at their earliest stages, dramatically improving 
                patient outcomes and saving countless lives.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 w-full order-1 lg:order-2 relative">
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl lg:shadow-2xl group">
              <img
                src="/assets/images/home/mission.jpg"
                alt="Our Vision"
                className="w-full h-[250px] xs:h-[300px] sm:h-[350px] md:h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop"
                }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#008059]/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}