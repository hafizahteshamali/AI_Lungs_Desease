// TestimonialSlider.jsx
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TestimonialSlider = () => {
  // Sample testimonials data
  const testimonials = [
    {
      id: 1,
      text: "Early detection saves lives. This platform makes diagnosis reliable and easy to understand for both doctors and patients.",
      name: "Dr. Emily Rodriguez",
      position: "Pulmonologist",
      image: "/assets/images/home/Dr-Emily-Rodriguez.jpg",
      hospital: "University Hospital",
      number: "16"
    },
    {
      id: 2,
      text: "The integration was seamless and our team adapted quickly. Diagnostic accuracy improved significantly.",
      name: "Dr. Robert Kim",
      position: "Medical Director",
      image: "/assets/images/home/Dr-Robert-Kim.jpg",
      hospital: "General Hospital",
      number: "16"
    },
    {
      id: 3,
      text: "Real-time analysis is incredible. We now get results in minutes instead of hours.",
      name: "Dr. Lisa Wang",
      position: "Diagnostic Specialist",
      image: "/assets/images/home/Dr-Lisa-Wang.jpg",
      hospital: "Memorial Medical",
      number: "16"
    }
  ];

  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          dots: true
        }
      }
    ]
  };

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-blue-50 to-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          What Doctors Say
        </h2>
        
        <div className="relative bg-white rounded-2xl shadow-xl p-6 md:p-8 lg:p-12 max-w-6xl mx-auto">
          <Slider {...settings} className="testimonial-slider">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="outline-none">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
                  {/* Left side - Number and testimonial text */}
                  <div className="flex-1">
                    <div className="flex items-start gap-6">
                      <div className="flex flex-col items-center">
                        <div className="text-6xl md:text-7xl font-bold text-blue-600 opacity-20 mb-2">
                          {testimonial.number}
                        </div>
                        <div className="text-lg font-medium text-gray-600 mt-2">
                          Testimonial
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="text-lg md:text-xl text-gray-700 italic leading-relaxed mb-6">
                          {testimonial.text}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right side - Doctor info */}
                  <div className="w-full lg:w-1/3">
                    <div className="bg-blue-50 rounded-xl p-6 md:p-8 border-l-4 border-blue-500">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center">
                        <img src={testimonial.image} alt="" className="h-[70px] w-[70px] rounded-full object-fill" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{testimonial.name}</h3>
                          <p className="text-blue-600 font-medium">{testimonial.position}</p>
                          <p className="text-gray-600">{testimonial.hospital}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-yellow-500 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      
                      <p className="text-gray-600">Verified Doctor</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          
          {/* Custom arrows */}
          <style jsx>{`
            .testimonial-slider .slick-prev,
            .testimonial-slider .slick-next {
              width: 40px;
              height: 40px;
              background: #3b82f6;
              border-radius: 50%;
              display: flex !important;
              align-items: center;
              justify-content: center;
              z-index: 10;
            }
            
            .testimonial-slider .slick-prev:hover,
            .testimonial-slider .slick-next:hover {
              background: #2563eb;
            }
            
            .testimonial-slider .slick-prev {
              left: -20px;
            }
            
            .testimonial-slider .slick-next {
              right: -20px;
            }
            
            .testimonial-slider .slick-prev:before,
            .testimonial-slider .slick-next:before {
              font-size: 20px;
              color: white;
            }
            
            .testimonial-slider .slick-dots {
              bottom: -40px;
            }
            
            .testimonial-slider .slick-dots li button:before {
              font-size: 12px;
            }
            
            @media (max-width: 768px) {
              .testimonial-slider .slick-prev {
                left: 10px;
              }
              
              .testimonial-slider .slick-next {
                right: 10px;
              }
            }
          `}</style>
        </div>
        
        {/* Stats section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600">99%</div>
            <div className="text-gray-600 mt-2">Accuracy Rate</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600">50+</div>
            <div className="text-gray-600 mt-2">Hospitals Using</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600">24/7</div>
            <div className="text-gray-600 mt-2">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;