import { useState, useEffect, useRef } from "react"
import { FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa"

export default function TeamSection() {
  const [visibleMembers, setVisibleMembers] = useState([])
  const sectionRef = useRef(null)
  const consultantsRef = useRef(null)

  // REAL TEAM MEMBERS from your PDF with updated roles
  const team = [
    {
      name: "Sajjad Ali",
      role: "Dotnet Developer",
      image: "/assets/images/about/sajjad.png",
      bio: "BS Software Engineering, FEST BSSE (1077-2022). Focus: AI Model Development and Training",
      color: "#5056e6",
    },
    {
      name: "Muhammad Huzaifa Latif",
      role: "Wordpress Developer",
      image: "/assets/images/about/huzaifa-latif.png",
      bio: "BS Software Engineering, FEST BSSE (844-2022). Focus: Mobile Application Development & AI Integration",
      color: "#008059",
    },
    {
      name: "Hafiz Ahtesham Ali Rehmani",
      role: "MERN Stack Developer",
      image: "/assets/images/about/ahtesham-ali.png",
      bio: "BS Software Engineering, FEST BSSE (617-2022). Focus: Web Platform Development & Frontend Deployment",
      color: "#007a9b",
    },
    {
      name: "Muhammad Khawaja Hassan Nizami",
      role: "Project Consultant",
      image: "/assets/images/about/hassan-nizami.png",
      bio: "Assistant Professor, Department of Computing, FEST BSSE. Provides research guidance and technical consultation.",
      color: "#5056e6",
    },
    {
      name: "Ms. Azadi Memon",
      role: "Co-Consultant",
      image: "/assets/images/about/azadi-memon.jpg",
      bio: "Co-Consultant, Department of Computing, FEST BSSE. Provides additional guidance and support.",
      color: "#9b507a",
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

    // Observe first row (Development Team) cards
    if (sectionRef.current) {
      const cards = sectionRef.current.querySelectorAll('[data-index]')
      cards.forEach((card) => observer.observe(card))
    }

    // Observe second row (Project Consultants) cards
    if (consultantsRef.current) {
      const cards = consultantsRef.current.querySelectorAll('[data-index]')
      cards.forEach((card) => observer.observe(card))
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 xs:px-5 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header - Updated */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 px-4">
          <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-[#5056e6]/10 rounded-full mb-3 sm:mb-4">
            <span className="text-xs sm:text-sm font-semibold text-[#5056e6]">FYP TEAM</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-3 sm:mb-4">
            Meet the Precision Scan Team
          </h2>
          <p className="text-sm xs:text-base sm:text-lg text-[#979999] max-w-xl sm:max-w-2xl mx-auto leading-relaxed">
            Department of Computing, FEST BSSE - Final Year Project Group
          </p>
        </div>

        {/* First Row - First 3 Team Members (Students) */}
        <div className="flex flex-col items-center mb-8 sm:mb-12">
          <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-black mb-6 sm:mb-8 text-center">
            Development Team
          </h3>
          <div ref={sectionRef} className="flex flex-col sm:flex-row flex-wrap gap-6 sm:gap-8 justify-center w-full">
            {team.slice(0, 3).map((member, index) => {
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
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
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
        </div>

        {/* Second Row - Last 2 Team Members (Consultants) */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-black mb-6 sm:mb-8 text-center">
            Project Consultants
          </h3>
          <div ref={consultantsRef} className="flex flex-col sm:flex-row flex-wrap gap-6 sm:gap-8 justify-center w-full">
            {team.slice(3, 5).map((member, index) => {
              const originalIndex = index + 3
              const isVisible = visibleMembers.includes(originalIndex)
              return (
                <div
                  key={originalIndex}
                  data-index={originalIndex}
                  className={`group relative bg-white border border-gray-200 sm:border-gray-300 rounded-lg sm:rounded-xl overflow-hidden transition-all duration-500 ease-out hover:shadow-lg sm:hover:shadow-xl hover:-translate-y-1 sm:hover:-translate-y-2 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 sm:translate-y-8'
                  } flex-1 min-w-[280px] sm:min-w-[300px] md:min-w-[320px] lg:min-w-0 max-w-[380px] sm:max-w-none`}
                  style={{ 
                    transitionDelay: `${originalIndex * 150}ms`,
                  }}
                >
                  {/* Image Container - Responsive Height */}
                  <div className="relative h-48 xs:h-56 sm:h-64 md:h-72 lg:h-80 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
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
        </div>

        {/* Project Development Overview - Converted from grid to flex */}
        <div className="mt-12 sm:mt-16 p-4 xs:p-5 sm:p-6 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg sm:rounded-xl">
          <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-black mb-3 sm:mb-4 text-center">
            Project Development Responsibilities
          </h3>
          {/* Converted: grid grid-cols-1 sm:grid-cols-3 to flex container */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 justify-center">
            {/* First team member responsibilities - now flex item */}
            <div className="flex-1 min-w-[250px] max-w-[350px] bg-white p-4 rounded-lg border border-blue-100">
              <h4 className="font-bold text-blue-600 mb-2">Sajjad Ali</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Project Documentation</li>
                <li>• Backend Development</li>
                <li>• System Architecture</li>
                <li>• API Integration</li>
              </ul>
            </div>
            {/* Second team member responsibilities - now flex item */}
            <div className="flex-1 min-w-[250px] max-w-[350px] bg-white p-4 rounded-lg border border-green-100">
              <h4 className="font-bold text-green-600 mb-2">Muhammad Huzaifa</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Mobile Application</li>
                <li>• AI Model Integration</li>
                <li>• Cross-platform Development</li>
                <li>• User Interface Design</li>
              </ul>
            </div>
            {/* Third team member responsibilities - now flex item */}
            <div className="flex-1 min-w-[250px] max-w-[350px] bg-white p-4 rounded-lg border border-cyan-100">
              <h4 className="font-bold text-cyan-600 mb-2">Hafiz Ahtesham</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Web Application</li>
                <li>• Frontend Development</li>
                <li>• UI/UX Design</li>
                <li>• Deployment & Hosting</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}