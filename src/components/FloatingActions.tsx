import React, { useEffect, useState } from 'react';
import { ArrowUp, Bot, X } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';
import { AppLink } from '../context/RouterContext';

const DEFAULT_WHATSAPP_MESSAGE =
  'Hello AASAN LIFE Team, I would like to know more about the Online Paid Internship Programme.';

interface FloatingActionsProps {
  isChatOpen: boolean;
  onToggleChat: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  isChatOpen,
  onToggleChat,
}) => {
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 320);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  const whatsappDigits = COMPANY_CONFIG.contact.whatsappDigits.replace(/\D/g, '');
  const whatsappUrl = whatsappDigits
    ? `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(DEFAULT_WHATSAPP_MESSAGE)}`
    : null;

  return (
    <div
      aria-label="Quick actions"
      className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3"
    >
      {/* Go to Top Button (visible after scrolling) */}
      <button
        type="button"
        onClick={handleScrollToTop}
        aria-label="Go to top"
        title="Go to top"
        className={`w-12 h-12 rounded-full bg-[#0A2055] hover:bg-[#1455D9] text-white border border-white/20 shadow-[0_6px_18px_rgba(10,32,85,0.24)] inline-flex items-center justify-center transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1455D9] ${
          showTopButton
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-3 pointer-events-none'
        }`}
      >
        <ArrowUp className="w-5 h-5" aria-hidden="true" />
      </button>

      {/* WhatsApp Quick Action Button */}
      {whatsappUrl ? (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          title="Chat with AASAN LIFE on WhatsApp"
          className="w-12 h-12 rounded-full bg-[#1455D9] hover:bg-[#0A2055] text-white border-2 border-[#FF851B] shadow-[0_8px_22px_rgba(20,85,217,0.3)] inline-flex items-center justify-center transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1455D9]"
        >
          <WhatsAppIcon />
        </a>
      ) : (
        <AppLink
          to="/contact-us"
          aria-label="Enquire via Contact page"
          title="Enquire via Contact Us (set whatsappDigits in src/config/company.ts)"
          className="w-12 h-12 rounded-full bg-[#1455D9] hover:bg-[#0A2055] text-white border-2 border-[#FF851B] shadow-[0_8px_22px_rgba(20,85,217,0.3)] inline-flex items-center justify-center transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1455D9]"
        >
          <WhatsAppIcon />
        </AppLink>
      )}

      {/* Gemini Advisor Chatbot Launcher */}
      <button
        type="button"
        onClick={onToggleChat}
        aria-expanded={isChatOpen}
        aria-label={isChatOpen ? 'Close AASAN LIFE Advisor' : 'Open AASAN LIFE Advisor'}
        title={isChatOpen ? 'Close AASAN LIFE Advisor' : 'Ask AASAN LIFE Advisor (Gemini)'}
        className="h-12 px-4 rounded-full bg-[#0A2055] hover:bg-[#1455D9] text-white border-2 border-[#FF851B] shadow-[0_10px_26px_rgba(10,32,85,0.28)] inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1455D9]"
      >
        {isChatOpen ? (
          <>
            <X className="w-4 h-4 text-[#FF851B]" aria-hidden="true" />
            <span>Close Chat</span>
          </>
        ) : (
          <>
            <Bot className="w-4 h-4 text-[#FF851B]" aria-hidden="true" />
            <span>Ask Advisor</span>
          </>
        )}
      </button>
    </div>
  );
};

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="currentColor"
      aria-hidden="true"
      className="w-5 h-5"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.8 14.01c-.24.68-1.41 1.3-1.95 1.38-.5.08-1.13.11-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3 0-1.43.75-2.13 1.02-2.42.27-.29.58-.36.77-.36h.55c.18 0 .42-.07.66.5.24.58.82 2 .89 2.14.07.14.12.31.02.5-.1.19-.14.31-.29.48-.14.17-.31.38-.44.51-.14.14-.29.3-.13.59.17.29.74 1.22 1.59 1.98 1.09.97 2.01 1.27 2.3 1.42.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.39-.24.65-.14.27.1 1.69.8 1.98.94.29.14.48.22.55.34.07.12.07.7-.17 1.38z" />
    </svg>
  );
}
