import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { InternshipSection } from './components/InternshipSection';
import { LearningSection } from './components/LearningSection';
import { BenefitsSection } from './components/BenefitsSection';
import { EligibilitySection } from './components/EligibilitySection';
import { ProcessSection } from './components/ProcessSection';
import { KeyMetricsSection } from './components/KeyMetricsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { EnquiryForm } from './components/EnquiryForm';
import { FAQSection } from './components/FAQSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { InternshipModal } from './components/InternshipModal';
import { ScrollProgressBar } from './components/ScrollProgressBar';

export default function App() {
  const [isInternshipModalOpen, setIsInternshipModalOpen] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#17233D]">
      <ScrollProgressBar />
      <Navbar onOpenModal={() => setIsInternshipModalOpen(true)} />
      <main className="flex-1">
        <HeroSection onOpenModal={() => setIsInternshipModalOpen(true)} />
        <InternshipSection />
        <AboutSection />
        <LearningSection />
        <BenefitsSection />
        <EligibilitySection />
        <ProcessSection />
        <KeyMetricsSection />
        <TestimonialsSection />
        <EnquiryForm />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingActions />
      <InternshipModal
        isOpen={isInternshipModalOpen}
        onClose={() => setIsInternshipModalOpen(false)}
      />
    </div>
  );
}
