import React, { useState } from 'react';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';
import { BrandLogo } from './BrandLogo';
import { LegalDocType, LegalModal } from './LegalModal';

const FOOTER_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Internship Programme', href: '#internship-programme' },
  { label: "What You'll Learn", href: '#curriculum' },
  { label: 'FAQs', href: '#faqs' },
];

export const Footer: React.FC = () => {
  const [legalDoc, setLegalDoc] = useState<LegalDocType>(null);

  return (
    <>
      <footer id="contact" className="bg-[#0A2055] text-white pt-14 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/12">
            {/* Left Column: Brand Logo, Tagline, Short Description */}
            <div className="md:col-span-5">
              <a
                href="#home"
                aria-label="AASAN LIFE Home"
                className="inline-flex items-center mb-3"
              >
                <BrandLogo variant="light" />
              </a>
              <p className="text-sm font-semibold text-[#FF851B] mb-3">
                {COMPANY_CONFIG.tagline}
              </p>
              <p className="text-sm text-white/75 leading-relaxed max-w-sm">
                {COMPANY_CONFIG.shortDescription}
              </p>
            </div>

            {/* Middle Column: Navigation Links */}
            <div className="md:col-span-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
                Quick Links
              </h2>
              <ul className="space-y-2.5 text-sm text-white/75">
                {FOOTER_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="hover:text-[#FF851B] transition-colors inline-block py-0.5"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: Contact Details (Editable via src/config/company.ts) */}
            <div className="md:col-span-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
                Contact Us
              </h2>
              <ul className="space-y-3 text-sm text-white/80">
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#FF851B] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong className="font-semibold text-white">Phone:</strong>{' '}
                    {COMPANY_CONFIG.contact.phoneDisplay}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <MessageCircle
                    className="w-4 h-4 text-[#FF851B] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-white">WhatsApp:</strong>{' '}
                    {COMPANY_CONFIG.contact.whatsappDisplay}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#FF851B] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong className="font-semibold text-white">Email:</strong>{' '}
                    {COMPANY_CONFIG.contact.emailDisplay}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#FF851B] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong className="font-semibold text-white">Address:</strong>{' '}
                    {COMPANY_CONFIG.contact.addressDisplay}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-white/70">
            <p>Copyright © 2026 AASAN LIFE. All Rights Reserved.</p>
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => setLegalDoc('privacy')}
                className="hover:text-white transition-colors underline-offset-4 hover:underline"
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={() => setLegalDoc('terms')}
                className="hover:text-white transition-colors underline-offset-4 hover:underline"
              >
                Terms &amp; Conditions
              </button>
            </div>
          </div>
        </div>
      </footer>

      <LegalModal docType={legalDoc} onClose={() => setLegalDoc(null)} />
    </>
  );
};
