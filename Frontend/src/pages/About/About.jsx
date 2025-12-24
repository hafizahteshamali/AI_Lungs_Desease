import AboutHeroSection from "./elements/AboutHeroSection"
import MissionSection from "./elements/MissionSection"
import ValuesSection from "./elements/ValuesSection"
import TeamSection from "./elements/TeamSection"
import AboutStatsSection from "./elements/AboutStatsSection"
import StorySection from "./elements/StorySection"
import AboutCTASection from "./elements/AboutCTASection"

export default function About() {
  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      <AboutHeroSection />
      <MissionSection />
      <ValuesSection />
      <TeamSection />
      <AboutStatsSection />
      <StorySection />
      <AboutCTASection />
    </div>
  )
}
