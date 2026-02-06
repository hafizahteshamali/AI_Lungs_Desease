import { FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa"

export default function TeamContactSection() {
  // Team contacts array banaya hai with details
  const teamContacts = [
    {
      name: "Sajjad Ali", // Team member name
      role: "Team Lead & Backend Developer", // Team member role
      email: "sajjadali1714@gmail.com", // Team member email
      phone: "+92 311 2903664", // Team member phone number
      expertise: "AI Model Development and Training, Project Documentation, Backend Development & System Architecture", // Updated expertise
      color: "#5056e6", // Color for styling
      image: "/assets/images/about/sajjad.png", // Team member image path
      rollNumber: "1077-2022" // University roll number
    },
    {
      name: "Muhammad Huzaifa Latif", // Team member name
      role: "Mobile App Developer", // Team member role
      email: "muhammadhuzaifax50@gmail.com", // Team member email
      phone: "+92 331 4661215", // Team member phone number
      expertise: "Mobile Application Development & AI Integration", // Team member expertise
      color: "#008059", // Color for styling
      image: "/assets/images/about/huzaifa-latif.png", // Team member image path
      rollNumber: "844-2022" // University roll number
    },
    {
      name: "Hafiz Ahtesham Ali Rehmani", // Team member name
      role: "Web Application Developer", // Team member role
      email: "hafizahteshamali363617@gmail.com", // Team member email
      phone: "+92 3308419436", // Team member phone number
      expertise: "Web Platform Development & Frontend Deployment", // Team member expertise
      color: "#007a9b", // Color for styling
      image: "/assets/images/about/ahtesham-ali.png", // Team member image path
      rollNumber: "617-2022" // University roll number
    }
  ]

  return (
    // Main section with white background
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto"> {/* Centered container */}
        {/* Header section with centered text */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-[#5056e6]/10 rounded-full mb-3 sm:mb-4"> {/* Badge */}
            <span className="text-xs sm:text-sm font-semibold text-[#5056e6]">FYP TEAM CONTACTS</span> {/* Badge text */}
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-3 sm:mb-4"> {/* Main heading */}
            Connect With
            <span className="text-[#5056e6]"> Precision Scan Developers</span> {/* Colored text */}
          </h2>
          <p className="text-sm xs:text-base sm:text-lg text-[#979999] max-w-2xl mx-auto"> {/* Description */}
            Direct contact with FEST BSSE final year project team members
          </p>
        </div>

        {/* Team contacts cards - Using flex instead of grid */}
        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-6 sm:gap-8"> {/* Flex container */}
          {teamContacts.map((member, index) => ( // Map through team contacts
            <div 
              key={index} // Unique key for React list
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-500 w-[100%] md:w-[49%] lg:w-[30%] md:max-w-none" // Card styling
            >
              {/* Top color bar for each card */}
              <div 
                className="h-2 w-full" // Color bar styling
                style={{ backgroundColor: member.color }} // Dynamic color from member data
              ></div>

              <div className="p-6"> {/* Card content container */}
                {/* Profile section with image and details */}
                <div className="flex items-center gap-4 mb-4"> {/* Profile container */}
                  <img 
                    src={member.image} // Team member image
                    alt={member.name} // Alt text for accessibility
                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md flex-shrink-0" // Image styling
                    onError={(e) => { // Error handling for image
                      e.target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop" // Fallback image
                    }}
                  />
                  <div className="min-w-0 flex-1"> {/* Text container */}
                    <h3 className="text-lg font-bold text-black truncate">{member.name}</h3> {/* Name */}
                    <p className="text-[#5056e6] font-semibold text-sm truncate">{member.role}</p> {/* Role */}
                    <p className="text-xs text-gray-500 mt-1">Roll: {member.rollNumber}</p> {/* Roll number */}
                  </div>
                </div>

                {/* Expertise section */}
                <p className="text-sm text-[#979999] mb-4 line-clamp-2">{member.expertise}</p> {/* Expertise text */}

                {/* Contact details section */}
                <div className="space-y-3"> {/* Contact items container */}
                  {/* Email contact */}
                  <div className="flex items-center gap-3"> {/* Email row */}
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0"> {/* Email icon container */}
                      <FaEnvelope className="text-gray-600 text-sm" /> {/* Email icon */}
                    </div>
                    <span className="text-sm text-gray-700 truncate">{member.email}</span> {/* Email address */}
                  </div>
                  
                  {/* Phone contact */}
                  <div className="flex items-center gap-3"> {/* Phone row */}
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0"> {/* Phone icon container */}
                      <FaPhone className="text-gray-600 text-sm" /> {/* Phone icon */}
                    </div>
                    <span className="text-sm text-gray-700">{member.phone}</span> {/* Phone number */}
                  </div>
                </div>

                {/* Action buttons section */}
                <div className="mt-6 pt-6 border-t border-gray-100"> {/* Separated buttons section */}
                  <div className="flex justify-center gap-4"> {/* Buttons container */}
                    {/* Email button */}
                    <a 
                      href={`mailto:${member.email}`} // mailto link for email
                      className="flex items-center gap-2 px-4 py-2 bg-[#5056e6] text-white text-sm rounded-lg hover:bg-[#3a25b8] transition-colors whitespace-nowrap" // Button styling
                    >
                      <FaEnvelope className="text-xs" /> {/* Email icon */}
                      Send Email {/* Button text */}
                    </a>
                    {/* Phone button */}
                    <a 
                      href={`tel:${member.phone.replace(/[^+\d]/g, '')}`} // tel link for phone (removing non-numeric chars)
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:border-[#5056e6] hover:text-[#5056e6] transition-colors whitespace-nowrap" // Button styling
                    >
                      <FaPhone className="text-xs" /> {/* Phone icon */}
                      Call Now {/* Button text */}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Consultant Information section - Updated */}
        <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-gray-50 rounded-xl border border-blue-200 max-w-3xl mx-auto"> {/* Consultant container */}
          <div className="flex flex-col md:flex-row items-center gap-6"> {/* Responsive layout */}
            {/* Icon container */}
            <div className="flex-shrink-0"> {/* Icon wrapper */}
              <div className="w-16 h-16 rounded-full bg-[#5056e6] flex items-center justify-center"> {/* Icon circle */}
                <FaEnvelope className="text-white text-2xl" /> {/* Envelope icon */}
              </div>
            </div>
            {/* Text content */}
            <div className="flex-1 text-center md:text-left"> {/* Text container */}
              <h3 className="text-xl font-bold text-black mb-2">Project Consultants</h3> {/* Updated title */}
              <p className="text-gray-700"> {/* Consultant details */}
                <span className="font-semibold">Consultant:</span> Muhammad Khawaja Hassan Nizami <br/> {/* Updated to Consultant */}
                <span className="font-semibold">Co-Consultant:</span> Ms. Azadi Memon<br/> {/* Updated to Co-Consultant */}
                <span className="text-sm text-gray-600">FEST BSSE Final Year Project 2025</span> {/* Project details */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}