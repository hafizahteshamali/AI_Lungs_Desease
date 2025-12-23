const CTASection = () => {
    return (
      <section className="bg-[#008059] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Diagnostic Accuracy?</h2>
          <p className="text-xl text-green-100 mb-8">Join hospitals and clinics worldwide using AI-powered diagnostics</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-[#f0b100] text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition">
              Start Your Free Trial
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#008059] transition">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>
    )
  }
  
  export default CTASection
  