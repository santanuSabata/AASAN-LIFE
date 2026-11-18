import React, { useState } from 'react';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  FileCheck2,
  Layers,
  Scale,
  ShieldCheck,
} from 'lucide-react';
import { EnquiryFormFields } from './EnquiryFormFields';

const HERO_ILLUSTRATION_PATH = '/src/assets/images/hero_insurance_learning_1794917031234.jpg';

const HIGHLIGHTS = [
  '100% Online Learning',
  'Industry-Focused Training',
  'Paid Internship Programme',
];

const CORE_SUBJECTS = [
  { label: 'Fundamentals', icon: ShieldCheck },
  { label: 'Life & General', icon: Layers },
  { label: 'Corporate Insurance', icon: Building2 },
  { label: 'Operations', icon: FileCheck2 },
  { label: 'Risk Assessment', icon: Scale },
];

interface HeroSectionProps {
  onOpenModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenModal }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#F5F8FC]/70 border-b border-[#0A2055]/10"
    >
      {/* Subtle Architectural Grid Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #0A2055 1px, transparent 1px), linear-gradient(to bottom, #0A2055 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left 7 Columns: Headline, Value Proposition, Core Topics, Dual CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-sm font-semibold text-[#1455D9]">
              AASAN LIFE · Online Insurance Training &amp; Paid Internship Programme
            </p>

            <h1 className="text-[clamp(2.25rem,4.2vw,3.65rem)] font-extrabold text-[#0A2055] leading-[1.12] tracking-tight">
              Build Your Career in the{' '}
              <span className="text-[#1455D9]">Insurance Industry</span>
            </h1>

            <p className="text-base sm:text-lg text-[#17233D]/80 leading-relaxed max-w-2xl">
              Learn. Train. Grow. Join AASAN LIFE&apos;s Online Paid Internship Programme and develop
              the knowledge and professional skills needed to explore opportunities in the insurance
              sector.
            </p>

            {/* Key Programme Attributes Row */}
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
              {HIGHLIGHTS.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-2.5 text-sm font-semibold text-[#0A2055]"
                >
                  <CheckCircle2
                    className="w-5 h-5 text-[#FF851B] shrink-0"
                    aria-hidden="true"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {/* Core Insurance Learning Pillars Strip */}
            <div className="pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-[#0A2055]/65 mb-3">
                Core Insurance Domains Covered
              </p>
              <div className="flex flex-wrap gap-2.5">
                {CORE_SUBJECTS.map((subject) => {
                  const Icon = subject.icon;
                  return (
                    <span
                      key={subject.label}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-[#0A2055]/12 text-xs sm:text-sm font-semibold text-[#0A2055] shadow-2xs"
                    >
                      <Icon className="w-4 h-4 text-[#1455D9]" aria-hidden="true" />
                      <span>{subject.label}</span>
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Dual CTA Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {onOpenModal ? (
                <button
                  type="button"
                  onClick={onOpenModal}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-[#1455D9] hover:bg-[#0A2055] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 shadow-[0_6px_20px_rgba(20,85,217,0.24)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1455D9]"
                >
                  <span>Apply for Internship</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              ) : (
                <a
                  href="#enquiry-form"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-[#1455D9] hover:bg-[#0A2055] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 shadow-[0_6px_20px_rgba(20,85,217,0.24)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1455D9]"
                >
                  <span>Apply for Internship</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              )}

              <a
                href="#internship-programme"
                className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-[#0A2055] bg-white hover:bg-[#F5F8FC] border border-[#0A2055]/20 hover:border-[#1455D9]/40 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1455D9]"
              >
                Explore Programme
              </a>
            </div>
          </div>

          {/* Right 5 Columns: Stacked Visual Card + Quick Internship Enquiry (cbacademy pattern) */}
          <div className="lg:col-span-5 relative w-full max-w-lg mx-auto lg:max-w-none">
            <div
              aria-hidden="true"
              className="hidden sm:block absolute -inset-3 bg-gradient-to-tr from-[#1455D9]/15 to-[#FF851B]/15 rounded-3xl -z-10 rotate-1"
            />
            <div className="bg-white rounded-2xl border border-[#0A2055]/12 shadow-[0_16px_44px_rgba(10,32,85,0.12)] overflow-hidden">
              {/* Top Visual Header */}
              <div className="relative h-48 sm:h-52 w-full bg-[#F5F8FC] overflow-hidden">
                {!imageError ? (
                  <img
                    src={HERO_ILLUSTRATION_PATH}
                    alt="Young Indian professional learning insurance concepts online through a laptop alongside digital protection shield and policy training dashboards"
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0A2055] to-[#1455D9]">
                    <ShieldCheck className="w-14 h-14 text-[#FF851B]" aria-hidden="true" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2055]/85 via-[#0A2055]/25 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <p className="text-xs font-semibold text-[#FF851B]">
                    AASAN LIFE · Online Training
                  </p>
                  <p className="text-lg font-bold leading-snug">
                    Enquire About Paid Internship Programme
                  </p>
                </div>
              </div>

              {/* Embedded Quick Enquiry Form */}
              <div className="p-5 sm:p-6">
                <EnquiryFormFields idPrefix="hero" compact />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
