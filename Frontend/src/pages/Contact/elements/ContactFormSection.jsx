import { useState } from "react" // React hooks import kar rahe hain
import { FaPaperPlane, FaCheckCircle, FaHeadset } from "react-icons/fa" // Icons import kar rahe hain

export default function ContactFormSection() {
  // State define kar rahe hain form data ke liye
  const [formData, setFormData] = useState({
    name: "", // Name field ke liye state
    email: "", // Email field ke liye state
    organization: "", // Organization field ke liye state
    subject: "", // Subject field ke liye state
    message: "" // Message field ke liye state
  })
  const [isSubmitting, setIsSubmitting] = useState(false) // Form submission status ke liye state
  const [isSubmitted, setIsSubmitted] = useState(false) // Form successful submission ke liye state

  // Handle form input changes function
  const handleChange = (e) => {
    setFormData({
      ...formData, // Previous form data copy kar rahe hain
      [e.target.name]: e.target.value // Specific field update kar rahe hain
    })
  }

  // Handle form submission function
  const handleSubmit = async (e) => {
    e.preventDefault() // Prevent default form submission
    setIsSubmitting(true) // Submitting status true kar rahe hain
    
    // API call simulate kar rahe hain setTimeout se
    setTimeout(() => {
      setIsSubmitting(false) // Submitting status false kar rahe hain
      setIsSubmitted(true) // Submitted status true kar rahe hain
      // Form data reset kar rahe hain
      setFormData({
        name: "",
        email: "",
        organization: "",
        subject: "",
        message: ""
      })
      
      // Success message reset karne ke liye timer
      setTimeout(() => {
        setIsSubmitted(false) // 5 seconds baad success message hide kar rahe hain
      }, 5000)
    }, 1500) // 1.5 seconds delay for simulation
  }

  return (
    // Main section with background color and padding
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-[#f9f9f9]">
      <div className="max-w-6xl mx-auto"> {/* Container with max width */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center"> {/* Responsive flex layout */}
          {/* Left Side: Contact Form */}
          <div className="lg:w-2/3 bg-white rounded-xl p-6 sm:p-8 shadow-lg"> {/* Form container */}
            <div className="flex items-center gap-2 mb-6"> {/* Form header with icon */}
              <div className="w-10 h-10 bg-[#5056e6] rounded-lg flex items-center justify-center"> {/* Icon container */}
                <FaPaperPlane className="text-white text-lg" /> {/* Icon */}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-black">Contact Precision Scan Team</h2> {/* Form title */}
            </div>
            
            {/* Success message display condition */}
            {isSubmitted ? (
              <div className="text-center py-12"> {/* Success message container */}
                <div className="w-20 h-20 bg-[#008059]/10 rounded-full flex items-center justify-center mx-auto mb-6"> {/* Check icon container */}
                  <FaCheckCircle className="text-[#008059] text-3xl" /> {/* Check icon */}
                </div>
                <h3 className="text-2xl font-bold text-black mb-3">Message Received!</h3> {/* Success title */}
                <p className="text-[#979999]">FYP team will respond within 24-48 hours.</p> {/* Success message */}
              </div>
            ) : (
              // Actual form
              <form onSubmit={handleSubmit} className="space-y-6"> {/* Form element with spacing */}
                {/* First row: Name and Email */}
                <div className="flex flex-col sm:flex-row gap-4"> {/* Responsive row layout */}
                  <div className="flex-1"> {/* Name field container */}
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label> {/* Label */}
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5056e6] focus:border-transparent outline-none transition-all"
                      placeholder="Dr. Ali Khan" // Placeholder text
                    />
                  </div>
                  <div className="flex-1"> {/* Email field container */}
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label> {/* Label */}
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5056e6] focus:border-transparent outline-none transition-all"
                      placeholder="contact@hospital.org" // Placeholder text
                    />
                  </div>
                </div>

                {/* Second row: Organization and Subject */}
                <div className="flex flex-col sm:flex-row gap-4"> {/* Responsive row layout */}
                  <div className="flex-1"> {/* Organization field container */}
                    <label className="block text-sm font-medium text-gray-700 mb-2">Organization/Institution</label> {/* Label */}
                    <input
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5056e6] focus:border-transparent outline-none transition-all"
                      placeholder="Hospital/University Name" // Placeholder text
                    />
                  </div>
                  <div className="flex-1"> {/* Subject field container */}
                    <label className="block text-sm font-medium text-gray-700 mb-2">Inquiry Type *</label> {/* Label */}
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5056e6] focus:border-transparent outline-none transition-all bg-white"
                    >
                      <option value="">Select inquiry type</option> {/* Default option */}
                      <option value="research">Research Collaboration</option> {/* Option 1 */}
                      <option value="clinical">Clinical Validation</option> {/* Option 2 */}
                      <option value="implementation">Implementation Inquiry</option> {/* Option 3 */}
                      <option value="technical">Technical Discussion</option> {/* Option 4 */}
                      <option value="academic">Academic Partnership</option> {/* Option 5 */}
                      <option value="general">General Information</option> {/* Option 6 */}
                    </select>
                  </div>
                </div>

                {/* Message textarea */}
                <div className="flex-1"> {/* Message container */}
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label> {/* Label */}
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6" // Fixed number of rows
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5056e6] focus:border-transparent outline-none transition-all resize-none" // Textarea styling
                    placeholder="Please describe your interest in Precision Scan project, potential collaboration, or any questions..." // Placeholder text
                  ></textarea>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting} // Disable button during submission
                  className="w-full py-4 bg-gradient-to-r from-[#5056e6] to-[#3d43d4] text-white font-bold rounded-lg hover:from-[#3d43d4] hover:to-[#2e32b3] transition-all duration-300 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2" // Button styling
                >
                  {isSubmitting ? (
                    // Loading state
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> {/* Spinner */}
                      Sending Message...
                    </>
                  ) : (
                    // Normal state
                    <>
                      Send to FYP Team
                      <FaPaperPlane /> {/* Send icon */}
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Side: Contact Information */}
          <div className="lg:w-1/3 space-y-8"> {/* Info container with spacing */}
            <div>
              <h3 className="text-2xl font-bold text-black mb-4">Project Contact Points</h3> {/* Info title */}
              <div className="space-y-4"> {/* Contact cards container */}
                {/* Project Inquiries card */}
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm"> {/* Card container */}
                  <div className="w-12 h-12 bg-[#5056e6]/10 rounded-lg flex items-center justify-center shrink-0"> {/* Icon container */}
                    <FaPaperPlane className="text-[#5056e6] text-xl" /> {/* Icon */}
                  </div>
                  <div className="flex-1"> {/* Content container */}
                    <h4 className="font-bold text-black">Project Inquiries</h4> {/* Card title */}
                    <p className="text-[#979999] text-sm">Precision Scan.fyp@fest.edu.pk</p> {/* Email */}
                    <p className="text-[#979999] text-sm mt-1">Response time: 24-48 hours</p> {/* Response time */}
                  </div>
                </div>

                {/* Technical Support card */}
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm"> {/* Card container */}
                  <div className="w-12 h-12 bg-[#008059]/10 rounded-lg flex items-center justify-center shrink-0"> {/* Icon container */}
                    <FaHeadset className="text-[#008059] text-xl" /> {/* Icon */}
                  </div>
                  <div className="flex-1"> {/* Content container */}
                    <h4 className="font-bold text-black">Technical Support</h4> {/* Card title */}
                    <p className="text-[#979999] text-sm">sajjad.1077@fest.edu.pk</p> {/* Email */}
                    <p className="text-[#979999] text-sm mt-1">Team Lead: Sajjad Ali</p> {/* Team lead info */}
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Response Hours card */}
            <div className="bg-gradient-to-br from-[#5056e6] to-[#3d43d4] rounded-xl p-6 text-white"> {/* Hours card with gradient */}
              <h3 className="text-xl font-bold mb-4">Academic Response Hours</h3> {/* Card title */}
              <div className="space-y-2"> {/* Hours list */}
                <div className="flex justify-between"> {/* Monday-Friday */}
                  <span>Monday - Friday</span>
                  <span className="font-semibold">9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between"> {/* Response Time */}
                  <span>Response Time</span>
                  <span className="font-semibold">24-48 hours</span>
                </div>
                <div className="flex justify-between"> {/* Semester Period */}
                  <span>Semester Period</span>
                  <span className="font-semibold">Regular Response</span>
                </div>
              </div>
              
              {/* Project Status section */}
              <div className="mt-6 pt-4 border-t border-white/20"> {/* Separated section */}
                <h4 className="font-bold mb-2">Project Status</h4> {/* Status title */}
                <div className="flex items-center gap-2"> {/* Status indicator */}
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div> {/* Green dot */}
                  <span className="text-sm">Active FYP Development</span> {/* Status text */}
                </div>
                <p className="text-sm opacity-90 mt-1">Final Year Project, FEST BSSE 2025</p> {/* Project details */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}