const BenefitsSection = () => {
    const benefits = [
      {
        number: "98%",
        label: "Accuracy Rate",
        image: "/assets/images/home/accuracy-rate.jpg",
      },
      {
        number: "<2min",
        label: "Analysis Time",
        image: "/assets/images/home/analysis-time.jpg",
      },
      {
        number: "500K+",
        label: "Images Trained",
        image: "/assets/images/home/image-trained.jpg",
      },
    ]
  
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <img
                  src={benefit.image || "/placeholder.svg"}
                  alt={benefit.label}
                  className="w-full h-64 rounded-xl object-cover mb-6"
                />
                <h3 className="text-4xl font-bold text-[#4932e4] mb-2">{benefit.number}</h3>
                <p className="text-xl text-gray-600">{benefit.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  export default BenefitsSection
  