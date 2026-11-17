import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../config/company';
import { BrandLogo } from './BrandLogo';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md transition-shadow duration-200 ${
        isScrolled
          ? 'shadow-[0_4px_20px_rgba(10,32,85,0.08)] border-b border-[#0A2055]/10'
          : 'border-b border-[#0A2055]/8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 lg:gap-8 h-16 lg:h-[72px]">
          {/* Left: AASAN LIFE Logo */}
          <a
            href="#home"
            aria-label="AASAN LIFE Home"
            className="inline-flex items-center shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1455D9] rounded-md"
          >
            <BrandLogo variant="dark" />
          </a>

          {/* Center/Right Desktop Navigation */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-5 xl:gap-6 text-[13.5px] xl:text-sm font-medium text-[#17233D]"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative py-1 whitespace-nowrap shrink-0 text-[#17233D]/85 hover:text-[#1455D9] transition-colors duration-150 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-[#FF851B] hover:after:w-full after:transition-all after:duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1455D9] rounded-xs"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right: Primary CTA + Mobile Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#enquiry-form"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white bg-[#1455D9] hover:bg-[#0A2055] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 shadow-[0_2px_10px_rgba(20,85,217,0.22)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1455D9]"
            >
              Apply for Internship
            </a>

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
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className="px-3 py-3 text-base font-medium text-[#17233D] hover:text-[#1455D9] hover:bg-[#F5F8FC] rounded-lg transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-3 mt-2 border-t border-[#0A2055]/10">
              <a
                href="#enquiry-form"
                onClick={handleLinkClick}
                className="w-full inline-flex items-center justify-center px-5 py-3 text-base font-semibold text-white bg-[#1455D9] hover:bg-[#0A2055] rounded-lg transition-colors"
              >
                Apply for Internship
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
