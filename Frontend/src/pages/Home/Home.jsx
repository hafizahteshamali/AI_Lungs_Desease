import HeroSection from "./elements/HeroSection"
import FeaturesSection from "./elements/FeaturesSection"
import StatsSection from "./elements/StatsSection"
import HowItWorksSection from "./elements/HowItWorksSection"
import TestimonialsSection from "./elements/TestimonialsSection"
import CTASection from "./elements/CTASection"
import XrayDemoSection from "./elements/XrayDemoSection"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      <HeroSection />
      <XrayDemoSection />
      <FeaturesSection />
      <StatsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  )
}
