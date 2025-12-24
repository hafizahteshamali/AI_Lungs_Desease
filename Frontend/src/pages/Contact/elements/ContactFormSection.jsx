import { useState } from "react"
import { FaPaperPlane, FaCheckCircle, FaHeadset } from "react-icons/fa"

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        organization: "",
        subject: "",
        message: ""
      })
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-[#f9f9f9]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          {/* Left: Form - Takes 2/3 of space on large screens */}
          <div className="lg:w-2/3 bg-white rounded-xl p-6 sm:p-8 shadow-lg">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-[#5056e6] rounded-lg flex items-center justify-center">
                <FaPaperPlane className="text-white text-lg" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-black">Send us a Message</h2>
            </div>
            
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-[#008059]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaCheckCircle className="text-[#008059] text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-3">Message Sent Successfully!</h3>
                <p className="text-[#979999]">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5056e6] focus:border-transparent outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5056e6] focus:border-transparent outline-none transition-all"
                      placeholder="john@hospital.com"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
                    <input
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5056e6] focus:border-transparent outline-none transition-all"
                      placeholder="Hospital Name"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5056e6] focus:border-transparent outline-none transition-all bg-white"
                    >
                      <option value="">Select a subject</option>
                      <option value="partnership">Partnership Inquiry</option>
                      <option value="technical">Technical Support</option>
                      <option value="sales">Sales Inquiry</option>
                      <option value="general">General Question</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5056e6] focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-[#5056e6] to-[#3d43d4] text-white font-bold rounded-lg hover:from-[#3d43d4] hover:to-[#2e32b3] transition-all duration-300 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message
                      <FaPaperPlane />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right: Info - Takes 1/3 of space on large screens */}
          <div className="lg:w-1/3 space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-black mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-[#5056e6]/10 rounded-lg flex items-center justify-center shrink-0">
                    <FaPaperPlane className="text-[#5056e6] text-xl" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-black">General Inquiries</h4>
                    <p className="text-[#979999] text-sm">contact@preciousscan.com</p>
                    <p className="text-[#979999] text-sm mt-1">Response time: 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-[#008059]/10 rounded-lg flex items-center justify-center shrink-0">
                    <FaHeadset className="text-[#008059] text-xl" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-black">Technical Support</h4>
                    <p className="text-[#979999] text-sm">support@preciousscan.com</p>
                    <p className="text-[#979999] text-sm mt-1">24/7 Emergency Support</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#5056e6] to-[#3d43d4] rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Business Hours</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-semibold">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-semibold">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-semibold">Emergency Only</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}