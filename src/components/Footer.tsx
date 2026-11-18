import React, { useState } from 'react';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';
import { BrandLogo } from './BrandLogo';
import { LegalDocType, LegalModal } from './LegalModal';
import { NewsletterSubscription } from './NewsletterSubscription';

const FOOTER_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Internship Programme', href: '#internship-programme' },
  { label: "What You'll Learn", href: '#curriculum' },
  { label: 'FAQs', href: '#faqs' },
];

export const Footer: React.FC = () => {
  const [legalDoc, setLegalDoc] = useState<LegalDocType>(null);
  const [socialNotice, setSocialNotice] = useState<string | null>(null);

  const socialChannels = [
    {
      name: 'LinkedIn',
      url: COMPANY_CONFIG.social.linkedinUrl.trim(),
      placeholder: '[ADD LINKEDIN URL]',
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      url: COMPANY_CONFIG.social.instagramUrl.trim(),
      placeholder: '[ADD INSTAGRAM URL]',
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
          <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      url: COMPANY_CONFIG.social.facebookUrl.trim(),
      placeholder: '[ADD FACEBOOK URL]',
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
          <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <footer id="contact" className="bg-[#0A2055] text-white pt-14 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterSubscription />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/12">
            {/* Left Column: Brand Logo, Tagline, Short Description, Social Bar */}
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
              <p className="text-sm text-white/75 leading-relaxed max-w-sm mb-6">
                {COMPANY_CONFIG.shortDescription}
              </p>

              {/* Social Media Bar */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-white/70 mb-3">
                  Follow AASAN LIFE
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  {socialChannels.map((channel) =>
                    channel.url ? (
                      <a
                        key={channel.name}
                        href={channel.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`AASAN LIFE on ${channel.name}`}
                        title={channel.name}
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/10 border border-white/15 text-sm font-medium text-white hover:bg-[#1455D9] hover:border-[#1455D9] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF851B]"
                      >
                        {channel.icon}
                        <span>{channel.name}</span>
                      </a>
                    ) : (
                      <button
                        key={channel.name}
                        type="button"
                        onClick={() =>
                          setSocialNotice(
                            `${channel.name} profile placeholder (${channel.placeholder}) — add your official URL in src/config/company.ts.`
                          )
                        }
                        aria-label={`${channel.name} profile placeholder`}
                        title={`${channel.name}: ${channel.placeholder}`}
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/8 border border-white/15 text-sm font-medium text-white/85 hover:bg-white/15 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF851B]"
                      >
                        <span className="text-[#FF851B]">{channel.icon}</span>
                        <span>{channel.name}</span>
                      </button>
                    )
                  )}
                </div>
                {socialNotice && (
                  <p className="mt-2.5 text-xs text-[#FF851B] leading-relaxed" role="status">
                    {socialNotice}
                  </p>
                )}
              </div>
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
