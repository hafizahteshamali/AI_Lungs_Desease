import { FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa"

export default function TeamContactSection() {
  const teamContacts = [
    {
      name: "Dr. Sarah Johnson",
      role: "Medical Partnerships Director",
      email: "sarah@preciousscan.com",
      phone: "+1 (555) 123-4567",
      expertise: "Hospital Integration & Medical Partnerships",
      color: "#5056e6",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop"
    },
    {
      name: "Michael Chen",
      role: "Technical Support Lead",
      email: "michael@preciousscan.com",
      phone: "+1 (555) 123-4568",
      expertise: "AI System Implementation & Technical Support",
      color: "#008059",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Clinical Integration Specialist",
      email: "emily@preciousscan.com",
      phone: "+1 (555) 123-4569",
      expertise: "Clinical Workflow Integration & Training",
      color: "#007a9b",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
    }
  ]

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-[#5056e6]/10 rounded-full mb-3 sm:mb-4">
            <span className="text-xs sm:text-sm font-semibold text-[#5056e6]">MEET OUR TEAM</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-3 sm:mb-4">
            Direct Contact With Our
            <span className="text-[#5056e6]"> Experts</span>
          </h2>
          <p className="text-sm xs:text-base sm:text-lg text-[#979999] max-w-2xl mx-auto">
            Connect directly with specialists who can help with your specific needs
          </p>
        </div>

        {/* Grid ki jagah flex use kiya */}
        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-6 sm:gap-8">
          {teamContacts.map((member, index) => (
            <div 
              key={index}
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex-1 min-w-[300px] max-w-[400px] md:max-w-none"
            >
              {/* Top Color Bar */}
              <div 
                className="h-2 w-full"
                style={{ backgroundColor: member.color }}
              ></div>

              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md flex-shrink-0"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-bold text-black truncate">{member.name}</h3>
                    <p className="text-[#5056e6] font-semibold text-sm truncate">{member.role}</p>
                  </div>
                </div>

                <p className="text-sm text-[#979999] mb-4 line-clamp-2">{member.expertise}</p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaEnvelope className="text-gray-600 text-sm" />
                    </div>
                    <span className="text-sm text-gray-700 truncate">{member.email}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaPhone className="text-gray-600 text-sm" />
                    </div>
                    <span className="text-sm text-gray-700">{member.phone}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex justify-center gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#5056e6] text-white text-sm rounded-lg hover:bg-[#3a25b8] transition-colors whitespace-nowrap">
                      <FaEnvelope className="text-xs" />
                      Send Email
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:border-[#5056e6] hover:text-[#5056e6] transition-colors whitespace-nowrap">
                      <FaPhone className="text-xs" />
                      Call Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}