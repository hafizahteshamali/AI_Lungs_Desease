export default function BenefitsSection() {
  const benefits = [
    {
      number: "98%",
      label: "Accuracy Rate",
      icon: "✓",
    },
    {
      number: "<2min",
      label: "Analysis Time",
      icon: "⚡",
    },
    {
      number: "500K+",
      label: "Images Trained",
      icon: "📊",
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 text-center mb-16">Why Choose MediScan AI?</h2>

        {/* Grid ki jagah flex use kiya */}
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="text-center p-8 bg-white rounded-xl border border-slate-200 hover:shadow-lg transition-shadow duration-200 flex-1 min-w-[300px] md:min-w-0 max-w-[400px] md:max-w-none"
            >
              <div className="text-5xl mb-4 text-[#4932e4]">{benefit.icon}</div>
              <h3 className="text-5xl font-bold text-[#4932e4] mb-2">{benefit.number}</h3>
              <p className="text-slate-600 text-lg font-medium">{benefit.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}