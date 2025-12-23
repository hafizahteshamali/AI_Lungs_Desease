"use client"

import { useState } from "react"
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle } from "react-icons/fa"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setSubmitted(true)
      setLoading(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
      setTimeout(() => setSubmitted(false), 4000)
    }, 1000)
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-grow">
        <section className="relative bg-gradient-to-r from-[#4932e4] via-[#007a9b] to-[#008059] text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-32 h-32 bg-[#f0b100] rounded-full blur-3xl"></div>
          </div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-balance">Get In Touch</h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Have questions about our AI diagnostic system? Our expert team is here to help
            </p>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Phone Card */}
              <div className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border-t-4 border-[#4932e4] hover:-translate-y-2">
                <div className="bg-gradient-to-br from-[#4932e4] to-[#3a25b8] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <FaPhone className="text-3xl text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Phone</h3>
                <p className="text-gray-600 text-center text-lg">+1 (555) 123-4567</p>
                <p className="text-gray-500 text-center text-sm mt-2">Available 24/7</p>
              </div>

              {/* Email Card */}
              <div className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border-t-4 border-[#008059] hover:-translate-y-2">
                <div className="bg-gradient-to-br from-[#008059] to-[#006a47] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <FaEnvelope className="text-3xl text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Email</h3>
                <p className="text-gray-600 text-center text-lg">support@mediscan.ai</p>
                <p className="text-gray-500 text-center text-sm mt-2">Response within 24 hours</p>
              </div>

              {/* Address Card */}
              <div className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border-t-4 border-[#007a9b] hover:-translate-y-2">
                <div className="bg-gradient-to-br from-[#007a9b] to-[#005a7a] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <FaMapMarkerAlt className="text-3xl text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Address</h3>
                <p className="text-gray-600 text-center text-lg">123 Medical Plaza</p>
                <p className="text-gray-500 text-center text-sm mt-2">Tech City, TC 12345</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Send us a Message</h2>
              <p className="text-gray-600 text-lg">Fill out the form below and we'll get back to you shortly</p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl shadow-xl p-8 md:p-12 border border-slate-200"
            >
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-800 font-semibold mb-3">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#4932e4] focus:ring-4 focus:ring-[#4932e4]/10 bg-white transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-gray-800 font-semibold mb-3">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#4932e4] focus:ring-4 focus:ring-[#4932e4]/10 bg-white transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Phone and Subject Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-800 font-semibold mb-3">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-5 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#008059] focus:ring-4 focus:ring-[#008059]/10 bg-white transition-all"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div>
                  <label className="block text-gray-800 font-semibold mb-3">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#008059] focus:ring-4 focus:ring-[#008059]/10 bg-white transition-all"
                    placeholder="How can we help?"
                  />
                </div>
              </div>

              {/* Message Textarea */}
              <div className="mb-8">
                <label className="block text-gray-800 font-semibold mb-3">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-5 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#007a9b] focus:ring-4 focus:ring-[#007a9b]/10 bg-white transition-all resize-none"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#4932e4] to-[#3a25b8] text-white font-bold py-4 px-6 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                <FaPaperPlane className={loading ? "animate-spin" : ""} />
                {loading ? "Sending..." : "Send Message"}
              </button>

              {/* Success Message */}
              {submitted && (
                <div className="mt-6 p-6 bg-gradient-to-r from-[#008059] to-[#006a47] text-white rounded-lg flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4">
                  <FaCheckCircle className="text-3xl flex-shrink-0" />
                  <div>
                    <p className="font-bold text-lg">Message Sent Successfully!</p>
                    <p className="text-green-100">Thank you for reaching out. Our team will respond within 24 hours.</p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Find Our Headquarters</h2>
            <div className="rounded-2xl overflow-hidden shadow-2xl h-96 bg-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.005529981421!2d67.0798734!3d24.897793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33ed99b197d7d%3A0xf77ba28a91dce806!2sIndus%20University!5e0!3m2!1sen!2s!4v1766516082282!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Indus University Location"
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="mt-8 bg-white rounded-2xl p-8 shadow-lg border-l-4 border-[#f0b100]">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Visit Our Office</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Indus University, ST-47, Block 7, Gulshan-e-Iqbal, Karachi, Sindh, Pakistan | Phone: +1 (555) 123-4567 | Email: support@mediscan.ai
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Contact