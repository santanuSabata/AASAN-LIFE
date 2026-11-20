import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ShieldCheck, ArrowRight } from 'lucide-react';
import { COMPANY_CONFIG, NAV_ITEMS } from '../config/company';
import { AppLink, useAppRouter } from '../context/RouterContext';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  onOpenModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentPath } = useAppRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const phoneIsConfigured =
    COMPANY_CONFIG.contact.phoneDisplay &&
    !COMPANY_CONFIG.contact.phoneDisplay.includes('[ADD');

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Slim Top Utility Bar (Desktop & Tablet) */}
      <div className="hidden sm:block bg-[#0A2055] text-white text-xs border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            {phoneIsConfigured ? (
              <a
                href={`tel:${COMPANY_CONFIG.contact.phoneDisplay.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-1.5 text-white/90 hover:text-[#E4B052] transition-colors whitespace-nowrap shrink-0"
              >
                <Phone className="w-3.5 h-3.5 text-[#E4B052]" aria-hidden="true" />
                <span>Enquiry Desk: {COMPANY_CONFIG.contact.phoneDisplay}</span>
              </a>
            ) : (
              <AppLink
                to="/contact-us"
                className="inline-flex items-center gap-1.5 text-white/90 hover:text-[#E4B052] transition-colors whitespace-nowrap shrink-0"
              >
                <Phone className="w-3.5 h-3.5 text-[#E4B052]" aria-hidden="true" />
                <span>Enquiry Desk: {COMPANY_CONFIG.contact.phoneDisplay}</span>
              </AppLink>
            )}
            <span className="hidden md:inline text-white/30" aria-hidden="true">
              |
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-white/85 whitespace-nowrap">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E4B052]" aria-hidden="true" />
              <span>{COMPANY_CONFIG.tagline}</span>
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[#E4B052] font-semibold whitespace-nowrap">
              Online Paid Internship Programme
            </span>
            <span className="text-white/30" aria-hidden="true">
              ·
            </span>
            <AppLink
              to="/contact-us"
              className="inline-flex items-center gap-1 font-semibold text-white hover:text-[#E4B052] transition-colors whitespace-nowrap"
            >
              <span>Enquire Now</span>
              <ArrowRight className="w-3 h-3" aria-hidden="true" />
            </AppLink>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation Bar */}
      <div
        className={`w-full bg-white/95 backdrop-blur-md transition-shadow duration-200 ${
          isScrolled
            ? 'shadow-[0_6px_24px_rgba(10,32,85,0.09)] border-b border-[#0A2055]/10'
            : 'border-b border-[#0A2055]/8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 lg:gap-8 h-16 lg:h-[72px]">
            {/* Left: AASAN BIMA EDUCATION Official Logo */}
            <AppLink
              to="/"
              aria-label="AASAN BIMA EDUCATION Home"
              onClick={handleLinkClick}
              className="inline-flex items-center shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1455D9] rounded-md"
            >
              <BrandLogo variant="dark" />
            </AppLink>

            {/* Center/Right Desktop Navigation */}
            <nav
              aria-label="Primary Navigation"
              className="hidden lg:flex items-center gap-5 xl:gap-6 text-[13.5px] xl:text-sm font-medium text-[#17233D]"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = currentPath === item.href;
                return (
                  <AppLink
                    key={item.href}
                    to={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:transition-all after:duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1455D9] rounded-xs ${
                      isActive
                        ? 'text-[#1455D9] font-semibold after:w-full after:bg-[#E4B052]'
                        : 'text-[#17233D]/85 hover:text-[#1455D9] after:w-0 after:bg-[#E4B052] hover:after:w-full'
                    }`}
                  >
                    {item.label}
                  </AppLink>
                );
              })}
            </nav>

            {/* Right: Primary CTA + Mobile Toggle */}
            <div className="flex items-center gap-3 shrink-0">
              {onOpenModal ? (
                <button
                  type="button"
                  onClick={onOpenModal}
                  className="hidden sm:inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-white bg-[#1455D9] hover:bg-[#0A2055] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 shadow-[0_2px_10px_rgba(20,85,217,0.22)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1455D9]"
                >
                  <span>Apply for Internship</span>
                </button>
              ) : (
                <AppLink
                  to="/contact-us"
                  className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white bg-[#1455D9] hover:bg-[#0A2055] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 shadow-[0_2px_10px_rgba(20,85,217,0.22)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1455D9]"
                >
                  Apply for Internship
                </AppLink>
              )}

              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-[#0A2055] hover:bg-[#F5F8FC] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1455D9]"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="lg:hidden bg-white border-t border-[#0A2055]/10 shadow-lg"
          >
            <nav
              aria-label="Mobile Navigation"
              className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = currentPath === item.href;
                return (
                  <AppLink
                    key={item.href}
                    to={item.href}
                    onClick={handleLinkClick}
                    aria-current={isActive ? 'page' : undefined}
                    className={`px-3 py-3 text-base rounded-lg transition-colors ${
                      isActive
                        ? 'font-bold text-[#1455D9] bg-[#F5F8FC]'
                        : 'font-medium text-[#17233D] hover:text-[#1455D9] hover:bg-[#F5F8FC]'
                    }`}
                  >
                    {item.label}
                  </AppLink>
                );
              })}
              <div className="pt-3 mt-2 border-t border-[#0A2055]/10">
                {onOpenModal ? (
                  <button
                    type="button"
                    onClick={() => {
                      handleLinkClick();
                      onOpenModal();
                    }}
                    className="w-full inline-flex items-center justify-center px-5 py-3 text-base font-semibold text-white bg-[#1455D9] hover:bg-[#0A2055] rounded-lg transition-colors"
                  >
                    Apply for Internship
                  </button>
                ) : (
                  <AppLink
                    to="/contact-us"
                    onClick={handleLinkClick}
                    className="w-full inline-flex items-center justify-center px-5 py-3 text-base font-semibold text-white bg-[#1455D9] hover:bg-[#0A2055] rounded-lg transition-colors"
                  >
                    Apply for Internship
                  </AppLink>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
