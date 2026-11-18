import { useState } from 'react';
import { useAppRouter } from './context/RouterContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { InternshipModal } from './components/InternshipModal';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { AasanChatWidget } from './components/AasanChatWidget';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { InternshipPage } from './pages/InternshipPage';
import { WhatYouLearnPage } from './pages/WhatYouLearnPage';
import { BenefitsPage } from './pages/BenefitsPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';

export default function App() {
  const { currentPath } = useAppRouter();
  const [isInternshipModalOpen, setIsInternshipModalOpen] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const renderPage = () => {
    switch (currentPath) {
      case '/about-us':
        return <AboutPage />;
      case '/internship-program':
        return <InternshipPage onOpenModal={() => setIsInternshipModalOpen(true)} />;
      case '/what-you-learn':
        return <WhatYouLearnPage />;
      case '/benefits':
        return <BenefitsPage />;
      case '/contact-us':
        return <ContactPage />;
      case '/privacy-policy':
        return <PrivacyPolicyPage />;
      case '/terms-and-conditions':
        return <TermsPage />;
      case '/':
      default:
        return <HomePage onOpenModal={() => setIsInternshipModalOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#17233D]">
      <ScrollProgressBar />
      <Navbar onOpenModal={() => setIsInternshipModalOpen(true)} />
      <main className="flex-1">{renderPage()}</main>
      <Footer />
      <FloatingActions
        isChatOpen={isChatOpen}
        onToggleChat={() => setIsChatOpen((prev) => !prev)}
      />
      <AasanChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <InternshipModal
        isOpen={isInternshipModalOpen}
        onClose={() => setIsInternshipModalOpen(false)}
      />
    </div>
  );
}
