import HeroSection from "./elements/HeroSection"
import FeaturesSection from "./elements/FeaturesSection"
import StatsSection from "./elements/StatsSection"
import HowItWorksSection from "./elements/HowItWorksSection"
import TestimonialsSection from "./elements/TestimonialsSection"
import CTASection from "./elements/CTASection"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  )
}
