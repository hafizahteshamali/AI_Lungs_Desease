import { FaHeadset, FaClock, FaGlobe, FaShieldAlt } from "react-icons/fa"

export default function ContactInfoSection() {
  const features = [
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      description: "Round-the-clock technical support for our healthcare partners",
      color: "#5056e6",
      delay: "0ms"
    },
    {
      icon: <FaClock />,
      title: "Quick Response",
      description: "Typically respond within 2 hours during business days",
      color: "#008059",
      delay: "100ms"
    },
    {
      icon: <FaGlobe />,
      title: "Global Team",
      description: "Support available in multiple time zones and languages",
      color: "#007a9b",
      delay: "200ms"
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Communication",
      description: "HIPAA compliant and secure channels for medical data",
      color: "#5056e6",
      delay: "300ms"
    }
  ]

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-[#5056e6]/10 rounded-full mb-3 sm:mb-4">
            <span className="text-xs sm:text-sm font-semibold text-[#5056e6]">WHY CHOOSE US</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-3 sm:mb-4">
            Dedicated Support For
            <span className="text-[#5056e6]"> Healthcare Partners</span>
          </h2>
          <p className="text-sm xs:text-base sm:text-lg text-[#979999] max-w-2xl mx-auto">
            We provide exceptional support to ensure seamless integration and operation of our AI diagnostics
          </p>
        </div>

        {/* Grid ko flex se replace kiya */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 lg:gap-8 justify-center">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-white border border-gray-200 rounded-lg sm:rounded-xl p-5 sm:p-6 md:p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex-1 min-w-[250px] sm:min-w-[200px] lg:min-w-0 max-w-[350px] sm:max-w-none"
              style={{ animationDelay: feature.delay }}
            >
              <div 
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-xl flex items-center justify-center text-xl sm:text-2xl text-white mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                style={{ backgroundColor: feature.color }}
              >
                {feature.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-black mb-2 sm:mb-3">{feature.title}</h3>
              <p className="text-xs sm:text-sm text-[#979999] leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}