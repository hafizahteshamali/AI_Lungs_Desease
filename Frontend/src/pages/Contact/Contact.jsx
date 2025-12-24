import ContactFormSection from "./elements/ContactFormSection";
import ContactHeroSection from "./elements/ContactHeroSection";
import ContactInfoSection from "./elements/ContactInfoSection";
import FAQSection from "./elements/FAQSection";
import TeamContactSection from "./elements/TeamContactSection";


export default function Contact() {
  return (
    <div className="min-h-screen">
      <ContactHeroSection />
      <ContactInfoSection />
      <ContactFormSection />
      <TeamContactSection />
      <FAQSection />
    </div>
  )
}