import { useState, useEffect, useRef } from "react"
import { FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa"

export default function TeamSection() {
  const [visibleMembers, setVisibleMembers] = useState([])
  const sectionRef = useRef(null)

  const team = [
    {
      name: "Dr. Raj Patel",
      role: "Chief Medical Officer",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
      bio: "Leading medical expert with 20+ years in diagnostic radiology",
      color: "#5056e6",
    },
    {
      name: "Sarah Chen",
      role: "AI/ML Lead",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      bio: "PhD in Computer Science, specializing in medical AI applications",
      color: "#008059",
    },
    {
      name: "Dr. Ahmed Hassan",
      role: "Lead Radiologist",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      bio: "Board-certified radiologist with expertise in early detection",
      color: "#007a9b",
    },
    {
      name: "Emily Rodriguez",
      role: "Product Manager",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      bio: "Healthcare technology expert focused on user experience",
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
              setVisibleMembers((prev) => [...prev, index])
            }, index * 150)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      const cards = sectionRef.current.querySelectorAll('[data-index]')
      cards.forEach((card) => observer.observe(card))
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 xs:px-5 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header - Responsive */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 px-4">
          <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-[#5056e6]/10 rounded-full mb-3 sm:mb-4">
            <span className="text-xs sm:text-sm font-semibold text-[#5056e6]">OUR TEAM</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-3 sm:mb-4">
            Meet Our Expert Team
          </h2>
          <p className="text-sm xs:text-base sm:text-lg text-[#979999] max-w-xl sm:max-w-2xl mx-auto leading-relaxed">
            Dedicated professionals working together to revolutionize healthcare through AI
          </p>
        </div>

        {/* Team Container - Grid ki jagah flex use kiya */}
        <div ref={sectionRef} className="flex flex-col sm:flex-row flex-wrap gap-6 sm:gap-8 justify-center">
          {team.map((member, index) => {
            const isVisible = visibleMembers.includes(index)
            return (
              <div
                key={index}
                data-index={index}
                className={`group relative bg-white border border-gray-200 sm:border-gray-300 rounded-lg sm:rounded-xl overflow-hidden transition-all duration-500 ease-out hover:shadow-lg sm:hover:shadow-xl hover:-translate-y-1 sm:hover:-translate-y-2 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 sm:translate-y-8'
                } flex-1 min-w-[280px] sm:min-w-[250px] md:min-w-[280px] lg:min-w-0 max-w-[320px] sm:max-w-none`}
                style={{ 
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                {/* Image Container - Responsive Height */}
                <div className="relative h-48 xs:h-56 sm:h-64 md:h-72 lg:h-80 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
                    }}
                    loading="lazy"
                  />
                  <div 
                    className="absolute inset-0 bg-gradient-to-t to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(to top, ${member.color}cc, transparent)`
                    }}
                  ></div>
                  
                  {/* Social Links on Hover - Responsive */}
                  <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a 
                      href="#" 
                      className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-[#5056e6] hover:text-white transition-colors duration-200 flex-shrink-0"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedin className="text-xs sm:text-sm" />
                    </a>
                    <a 
                      href="#" 
                      className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-[#008059] hover:text-white transition-colors duration-200 flex-shrink-0"
                      aria-label="Twitter"
                    >
                      <FaTwitter className="text-xs sm:text-sm" />
                    </a>
                    <a 
                      href="#" 
                      className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-[#007a9b] hover:text-white transition-colors duration-200 flex-shrink-0"
                      aria-label="Email"
                    >
                      <FaEnvelope className="text-xs sm:text-sm" />
                    </a>
                  </div>
                </div>

                {/* Content - Responsive Padding & Fonts */}
                <div className="p-4 xs:p-5 sm:p-6">
                  <h3 className="text-lg xs:text-xl sm:text-xl font-bold text-black mb-1 group-hover:text-[#5056e6] transition-colors duration-200">
                    {member.name}
                  </h3>
                  <p className="text-[#5056e6] font-semibold text-sm sm:text-base mb-2 sm:mb-3">{member.role}</p>
                  <p className="text-xs xs:text-sm text-[#979999] leading-relaxed sm:leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                {/* Accent Line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: member.color }}
                ></div>
              </div>
            )
          })}
        </div>

        {/* Optional: View All Button or Additional Text */}
        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-xs sm:text-sm text-[#979999] italic mb-4">
            Our team combines medical expertise with cutting-edge technology
          </p>
          <a 
            href="#" 
            className="inline-block px-6 py-2 sm:px-8 sm:py-3 bg-[#5056e6] text-white text-sm sm:text-base font-medium rounded-lg hover:bg-[#3a25b8] transition-colors duration-200"
          >
            View Full Team
          </a>
        </div>
      </div>
    </section>
  )
}