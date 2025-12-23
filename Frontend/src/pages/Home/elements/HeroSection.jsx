import { FaArrowRight } from "react-icons/fa"

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-[#4932e4] via-[#007a9b] to-[#008059] text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Early Detection. <span className="text-[#f0b100]">Saves Lives.</span>
            </h1>
            <p className="text-xl text-gray-100 mb-8 leading-relaxed">
              Revolutionary AI-powered diagnostic system for early detection of lung disease and breast cancer from
              medical images with 98% accuracy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex items-center justify-center gap-2 px-8 py-3 bg-[#f0b100] text-[#4932e4] font-semibold rounded-lg hover:bg-yellow-400 transition">
                Start Free Trial <FaArrowRight size={16} />
              </button>
              <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#4932e4] transition">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=500&fit=crop"
              alt="Medical AI Scanning"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#4932e4] to-transparent opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
