import { useState, useEffect } from "react"
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa"

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Radiologist",
      hospital: "City Medical Center",
      image: "👩‍⚕️",
      rating: 5,
      text: "MediScan AI has revolutionized our diagnostic workflow. The accuracy and speed are remarkable, helping us detect early-stage lung diseases that might have been missed otherwise.",
      color: "#5056e6",
    },
    {
      name: "Dr. Michael Chen",
      role: "Oncologist",
      hospital: "Regional Cancer Institute",
      image: "👨‍⚕️",
      rating: 5,
      text: "The AI-powered breast cancer detection has been a game-changer. It's like having an extra pair of expert eyes reviewing every scan. Highly recommended for any medical facility.",
      color: "#008059",
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Pulmonologist",
      hospital: "University Hospital",
      image: "👩‍⚕️",
      rating: 5,
      text: "As a pulmonologist, I've seen firsthand how early detection saves lives. This platform makes it accessible and reliable. The detailed reports are comprehensive and easy to understand.",
      color: "#007a9b",
    },
  ]

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonials.length])

  const goToSlide = (index) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const nextSlide = () => {
    goToSlide((currentIndex + 1) % testimonials.length)
  }

  const prevSlide = () => {
    goToSlide((currentIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f9f9f9]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-[#5056e6]/10 rounded-full mb-4">
            <span className="text-sm font-semibold text-[#5056e6]">TESTIMONIALS</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4">
            Trusted by Healthcare Professionals
          </h2>
          <p className="text-lg text-[#979999] max-w-2xl mx-auto">
            See what doctors and medical professionals are saying about MediScan AI
          </p>
        </div>

        {/* Testimonial Carousel - Already using flex */}
        <div className="relative overflow-hidden">
          {/* Testimonial Cards Container */}
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="min-w-full px-4 flex-shrink-0"
              >
                <div className="bg-white border border-gray-300 rounded-2xl p-8 lg:p-12 shadow-lg ring-1 flex flex-col items-center">
                  {/* Quote Icon */}
                  <div className="flex justify-center mb-6">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-2xl text-white flex-shrink-0"
                      style={{ backgroundColor: testimonial.color }}
                    >
                      <FaQuoteLeft />
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-xl flex-shrink-0" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-lg text-[#979999] text-center mb-8 leading-relaxed max-w-3xl mx-auto flex-1">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="flex flex-col items-center mt-auto">
                    <div className="text-5xl mb-4">{testimonial.image}</div>
                    <h4 className="text-xl font-bold text-black mb-1">{testimonial.name}</h4>
                    <p className="text-[#979999] text-sm">{testimonial.role}</p>
                    <p className="text-[#979999] text-sm">{testimonial.hospital}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows - Already using flex */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 w-12 h-12 rounded-full bg-white border border-gray-300 shadow-lg flex items-center justify-center hover:bg-[#5056e6] hover:text-white hover:border-[#5056e6] transition-all duration-300 z-10 flex-shrink-0"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 w-12 h-12 rounded-full bg-white border border-gray-300 shadow-lg flex items-center justify-center hover:bg-[#5056e6] hover:text-white hover:border-[#5056e6] transition-all duration-300 z-10 flex-shrink-0"
            aria-label="Next testimonial"
          >
            <FaChevronRight />
          </button>

          {/* Dots Indicator - Already using flex */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 flex-shrink-0 ${
                  index === currentIndex
                    ? 'bg-[#5056e6] w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}