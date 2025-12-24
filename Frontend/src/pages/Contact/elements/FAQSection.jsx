import { useState } from "react"
import { FaPlus, FaMinus } from "react-icons/fa"

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: "How quickly can I get a response?",
      answer: "We typically respond within 2 hours during business hours (9 AM - 6 PM PST, Monday-Friday). For urgent medical institution support, we offer 24/7 emergency response.",
      category: "General"
    },
    {
      question: "Is your system HIPAA compliant?",
      answer: "Yes, our AI diagnostic system is fully HIPAA compliant. We use end-to-end encryption, secure data storage, and follow all healthcare privacy regulations to ensure patient data protection.",
      category: "Security"
    },
    {
      question: "How do I integrate your AI with my existing systems?",
      answer: "We provide seamless integration through APIs, HL7/FHIR standards, and dedicated technical support. Our team works closely with your IT department for smooth implementation.",
      category: "Technical"
    },
    {
      question: "What training and support do you provide?",
      answer: "We offer comprehensive training programs, including on-site training, video tutorials, and 24/7 technical support. Regular updates and maintenance are included.",
      category: "Support"
    },
    {
      question: "Can I request a demo before purchasing?",
      answer: "Absolutely! We offer free personalized demos for healthcare institutions. Contact our sales team to schedule a demo tailored to your specific needs.",
      category: "Sales"
    },
    {
      question: "What makes your AI different from others?",
      answer: "Our AI combines 98% clinical accuracy with real-time processing, designed specifically for healthcare professionals. We focus on early detection and seamless clinical workflow integration.",
      category: "Product"
    }
  ]

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-[#f9f9f9]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-[#5056e6]/10 rounded-full mb-3 sm:mb-4">
            <span className="text-xs sm:text-sm font-semibold text-[#5056e6]">FAQ</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-3 sm:mb-4">
            Frequently Asked
            <span className="text-[#5056e6]"> Questions</span>
          </h2>
          <p className="text-sm xs:text-base sm:text-lg text-[#979999] max-w-2xl mx-auto">
            Find quick answers to common questions about our services and support
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex justify-between items-center text-left"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <span className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-700 rounded whitespace-nowrap shrink-0">
                    {faq.category}
                  </span>
                  <span className="font-bold text-gray-800 text-sm sm:text-base truncate">{faq.question}</span>
                </div>
                <div className={`ml-4 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${openIndex === index ? 'bg-[#5056e6] text-white' : 'bg-gray-100 text-gray-600'}`}>
                  {openIndex === index ? <FaMinus className="text-xs" /> : <FaPlus className="text-xs" />}
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4 border-t border-gray-100">
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed pt-4">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="text-sm text-gray-600">Still have questions?</p>
            <button className="px-8 py-3 bg-gradient-to-r from-[#5056e6] to-[#3d43d4] text-white font-bold rounded-lg hover:from-[#3d43d4] hover:to-[#2e32b3] transition-all duration-300 hover:shadow-lg whitespace-nowrap">
              Contact Support Team
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}