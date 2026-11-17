import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { InternshipSection } from './components/InternshipSection';
import { LearningSection } from './components/LearningSection';
import { BenefitsSection } from './components/BenefitsSection';
import { EligibilitySection } from './components/EligibilitySection';
import { ProcessSection } from './components/ProcessSection';
import { EnquiryForm } from './components/EnquiryForm';
import { FAQSection } from './components/FAQSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { InternshipModal } from './components/InternshipModal';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#17233D]">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <InternshipSection />
        <LearningSection />
        <BenefitsSection />
        <EligibilitySection />
        <ProcessSection />
        <EnquiryForm />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingActions />
      <InternshipModal />
    </div>
  );
}
