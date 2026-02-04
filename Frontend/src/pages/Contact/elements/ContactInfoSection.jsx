import { FaHeadset, FaClock, FaGlobe, FaShieldAlt } from "react-icons/fa"

export default function ContactInfoSection() {
  // Array banaya hai features ka jis mein project ke features store kiye hain
  const features = [
    {
      icon: <FaHeadset />, // Icon for Academic Support
      title: "Academic Support", // Title of first feature
      description: "Technical support from FYP project team for implementation guidance", // Description of feature
      color: "#5056e6", // Color code for styling
      delay: "0ms" // Animation delay for first item
    },
    {
      icon: <FaClock />, // Icon for Research Collaboration
      title: "Research Collaboration", // Title of second feature
      description: "Open to research partnerships with hospitals and medical institutions", // Description of feature
      color: "#008059", // Color code for styling
      delay: "100ms" // Animation delay for second item
    },
    {
      icon: <FaGlobe />, // Icon for Focus on Pakistan
      title: "Focus on Pakistan", // Title of third feature
      description: "Specifically designed for low-resource healthcare settings in Pakistan", // Description of feature
      color: "#007a9b", // Color code for styling
      delay: "200ms" // Animation delay for third item
    },
    {
      icon: <FaShieldAlt />, // Icon for Data Privacy
      title: "Data Privacy", // Title of fourth feature
      description: "Secure handling of medical images with patient confidentiality", // Description of feature
      color: "#5056e6", // Color code for styling
      delay: "300ms" // Animation delay for fourth item
    }
  ]

  return (
    // Main section container with responsive padding
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      {/* Centered container with max width */}
      <div className="max-w-7xl mx-auto">
        {/* Header section with centered text */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          {/* Badge with blue background */}
          <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-[#5056e6]/10 rounded-full mb-3 sm:mb-4">
            <span className="text-xs sm:text-sm font-semibold text-[#5056e6]">FYP PROJECT SUPPORT</span>
          </div>
          
          {/* Main heading with responsive text sizes */}
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-3 sm:mb-4">
            Project Collaboration for
            <span className="text-[#5056e6]"> Healthcare Improvement</span>
          </h2>
          
          {/* Description paragraph */}
          <p className="text-sm xs:text-base sm:text-lg text-[#979999] max-w-2xl mx-auto">
            We seek partnerships with healthcare institutions to validate and implement our AI diagnostic system
          </p>
        </div>

        {/* Features section using flex instead of grid - This is responsive layout */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 lg:gap-8 justify-center">
          {/* Map through features array to render each feature card */}
          {features.map((feature, index) => (
            <div 
              key={index} // Unique key for React list rendering
              className="group bg-white border border-gray-200 rounded-lg sm:rounded-xl p-5 sm:p-6 md:p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex-1 min-w-[250px] sm:min-w-[200px] lg:min-w-0 max-w-[350px] sm:max-w-none"
              style={{ animationDelay: feature.delay }} // Apply animation delay from feature object
            >
              {/* Icon container with hover effects */}
              <div 
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-xl flex items-center justify-center text-xl sm:text-2xl text-white mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                style={{ backgroundColor: feature.color }} // Apply color from feature object
              >
                {feature.icon} {/* Render the icon */}
              </div>
              
              {/* Feature title */}
              <h3 className="text-lg sm:text-xl font-bold text-black mb-2 sm:mb-3">{feature.title}</h3>
              
              {/* Feature description */}
              <p className="text-xs sm:text-sm text-[#979999] leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Additional project context section with gradient background */}
        <div className="mt-12 sm:mt-16 md:mt-20 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-blue-200">
          {/* Flex container for two columns - mobile: column, desktop: row */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Collaboration Opportunities section - left column */}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-black mb-4">Collaboration Opportunities</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span> {/* Blue bullet */}
                  <span className="text-gray-700">Clinical validation with radiologists</span> {/* List item text */}
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span> {/* Green bullet */}
                  <span className="text-gray-700">Dataset sharing for model improvement</span> {/* List item text */}
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 mr-2">•</span> {/* Cyan bullet */}
                  <span className="text-gray-700">Implementation in rural healthcare centers</span> {/* List item text */}
                </li>
              </ul>
            </div>
            
            {/* Expected Outcomes section - right column */}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-black mb-4">Expected Outcomes</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span> {/* Blue bullet */}
                  <span className="text-gray-700">Improved early detection rates</span> {/* List item text */}
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span> {/* Green bullet */}
                  <span className="text-gray-700">Reduced workload for radiologists</span> {/* List item text */}
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 mr-2">•</span> {/* Cyan bullet */}
                  <span className="text-gray-700">Research publications & real-world impact</span> {/* List item text */}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}