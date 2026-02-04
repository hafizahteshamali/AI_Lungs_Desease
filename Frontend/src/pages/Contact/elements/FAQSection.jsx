import { useState } from "react" // React hooks import kar rahe hain
import { FaPlus, FaMinus } from "react-icons/fa" // Icons import kar rahe hain

export default function FAQSection() {
  // State define kar rahe hain open FAQ item track karne ke liye
  const [openIndex, setOpenIndex] = useState(null)

  // FAQ data array banaya hai FYP project ke context mein
  const faqs = [
    {
      question: "What diseases does CareVision detect?", // FAQ question
      answer: "CareVision is a dual AI system that detects lung diseases (COVID-19, pneumonia, lung opacity) and breast cancer from medical images. The system uses chest X-rays for lung diseases and mammograms for breast cancer detection.", // Detailed answer
      category: "Functionality" // FAQ category
    },
    {
      question: "How does the explainable AI (Grad-CAM) work?", // FAQ question
      answer: "Grad-CAM (Gradient-weighted Class Activation Mapping) generates visual heatmaps that highlight suspicious regions in medical images. This helps radiologists understand which areas influenced the AI's diagnosis, increasing transparency and trust.", // Detailed answer
      category: "Technical" // FAQ category
    },
    {
      question: "What datasets were used to train the AI model?", // FAQ question
      answer: "We used multiple medical image datasets: NIH ChestX-ray, CBIS-DDSM (mammograms), MIAS, BreakHis, and local Pakistani datasets. The total training dataset includes over 150,000 medical images.", // Detailed answer
      category: "Datasets" // FAQ category
    },
    {
      question: "Is this system designed for low-resource areas?", // FAQ question
      answer: "Yes, CareVision is specifically designed for regions with limited radiologists and healthcare infrastructure, with a focus on Pakistan. The cloud-based deployment makes it accessible via web and mobile platforms.", // Detailed answer
      category: "Target Users" // FAQ category
    },
    {
      question: "How accurate is the CareVision system?", // FAQ question
      answer: "Our Custom CNN model achieves 92-95% validation accuracy based on literature review benchmarks. The system is designed to support radiologists, not replace them, providing second opinions for early detection.", // Detailed answer
      category: "Performance" // FAQ category
    },
    {
      question: "Can hospitals implement this system?", // FAQ question
      answer: "Yes, we designed a business model for hospitals and clinics. The system includes subscription plans, per-use patient plans, and potential government/NGO collaborations for wider implementation in Pakistan.", // Detailed answer
      category: "Implementation" // FAQ category
    }
  ]

  return (
    // Main section with light background
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-[#f9f9f9]">
      <div className="max-w-4xl mx-auto"> {/* Centered container with max width */}
        {/* Header section */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-[#5056e6]/10 rounded-full mb-3 sm:mb-4"> {/* Badge */}
            <span className="text-xs sm:text-sm font-semibold text-[#5056e6]">PROJECT FAQ</span> {/* Badge text */}
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-3 sm:mb-4"> {/* Main heading */}
            CareVision Project
            <span className="text-[#5056e6]"> Questions</span> {/* Colored text */}
          </h2>
          <p className="text-sm xs:text-base sm:text-lg text-[#979999] max-w-2xl mx-auto"> {/* Description */}
            Common questions about our FYP project's functionality and implementation
          </p>
        </div>

        {/* FAQ items container */}
        <div className="space-y-4"> {/* Vertical spacing between FAQ items */}
          {faqs.map((faq, index) => ( // Map through FAQ array
            <div 
              key={index} // Unique key for React list
              className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md" // FAQ item styling
            >
              {/* FAQ question button */}
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)} // Toggle open/close
                className="w-full px-6 py-4 flex justify-between items-center text-left" // Button styling
              >
                {/* Left side: Category and question */}
                <div className="flex items-center gap-4 flex-1 min-w-0"> {/* Container for question */}
                  <span className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-700 rounded whitespace-nowrap shrink-0"> {/* Category badge */}
                    {faq.category} {/* Category text */}
                  </span>
                  <span className="font-bold text-gray-800 text-sm sm:text-base truncate">{faq.question}</span> {/* Question text */}
                </div>
                {/* Right side: Expand/collapse icon */}
                <div className={`ml-4 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${openIndex === index ? 'bg-[#5056e6] text-white' : 'bg-gray-100 text-gray-600'}`}> {/* Icon container */}
                  {openIndex === index ? <FaMinus className="text-xs" /> : <FaPlus className="text-xs" />} {/* Conditional icon */}
                </div>
              </button>
              
              {/* FAQ answer section (conditional display) */}
              {openIndex === index && ( // Only show if this FAQ is open
                <div className="px-6 pb-4 border-t border-gray-100"> {/* Answer container */}
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed pt-4">{faq.answer}</p> {/* Answer text */}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Project Context Information section */}
        <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-blue-200"> {/* Context container */}
          <h3 className="text-lg font-bold text-black mb-4 text-center">FYP Project Context</h3> {/* Context title */}
          {/* Converted grid to flex for better responsiveness */}
          <div className="flex flex-col md:flex-row gap-6"> {/* Responsive flex container */}
            {/* Left column: Problem Statement */}
            <div className="flex-1">
              <h4 className="font-semibold text-blue-600 mb-2">Problem Statement</h4> {/* Problem title */}
              <ul className="text-sm text-gray-700 space-y-1"> {/* Problem list */}
                <li>• 4M+ deaths from lung diseases annually globally</li> {/* List item 1 */}
                <li>• 82,800 lung disease deaths in Pakistan yearly</li> {/* List item 2 */}
                <li>• 1 in 9 women at risk of breast cancer in Pakistan</li> {/* List item 3 */}
                <li>• Limited radiologists in rural areas</li> {/* List item 4 */}
              </ul>
            </div>
            {/* Right column: Project Solution */}
            <div className="flex-1">
              <h4 className="font-semibold text-green-600 mb-2">Project Solution</h4> {/* Solution title */}
              <ul className="text-sm text-gray-700 space-y-1"> {/* Solution list */}
                <li>• Dual AI system for lung + breast cancer detection</li> {/* List item 1 */}
                <li>• Explainable AI with Grad-CAM visualizations</li> {/* List item 2 */}
                <li>• Clinical decision support with treatment suggestions</li> {/* List item 3 */}
                <li>• Cloud-based deployment for accessibility</li> {/* List item 4 */}
              </ul>
            </div>
          </div>
        </div>

        {/* Contact CTA section */}
        <div className="mt-12 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4"> {/* Responsive layout */}
            <p className="text-sm text-gray-600">Have more technical questions?</p> {/* CTA text */}
            <button className="px-8 py-3 bg-gradient-to-r from-[#5056e6] to-[#3d43d4] text-white font-bold rounded-lg hover:from-[#3d43d4] hover:to-[#2e32b3] transition-all duration-300 hover:shadow-lg whitespace-nowrap"> {/* CTA button */}
              Contact FYP Team {/* Button text */}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}