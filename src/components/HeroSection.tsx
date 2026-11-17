import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

const HERO_ILLUSTRATION_PATH = '/src/assets/images/hero_insurance_learning_1794917031234.jpg';

const HIGHLIGHTS = [
  '100% Online Learning',
  'Industry-Focused Training',
  'Paid Internship Programme',
];

export const HeroSection: React.FC = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-[#F5F8FC] via-[#F5F8FC]/60 to-white border-b border-[#0A2055]/8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Core Proposition & CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-sm font-semibold tracking-wide text-[#1455D9] mb-3">
              AASAN LIFE · Online Insurance Training &amp; Internship
            </p>

            <h1 className="text-[clamp(2.25rem,4vw,3.5rem)] font-extrabold text-[#0A2055] leading-[1.12] tracking-tight mb-5">
              Build Your Career in the Insurance Industry
            </h1>

            <p className="text-base sm:text-lg text-[#17233D]/80 leading-relaxed max-w-xl mb-7">
              Learn. Train. Grow. Join AASAN LIFE&apos;s Online Paid Internship Programme and develop
              the knowledge and professional skills needed to explore opportunities in the insurance
              sector.
            </p>

            {/* Three Highlight Points (Clean unboxed typography with icon markers) */}
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-8">
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

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#enquiry-form"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-[#1455D9] hover:bg-[#0A2055] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 shadow-[0_6px_20px_rgba(20,85,217,0.24)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1455D9]"
              >
                <span>Apply for Internship</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href="#internship-programme"
                className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-[#0A2055] bg-white hover:bg-[#F5F8FC] border border-[#0A2055]/20 hover:border-[#1455D9]/40 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1455D9]"
              >
                Explore Programme
              </a>
            </div>
          </div>

          {/* Right Column: Hero Illustration */}
          <div className="lg:col-span-6 flex items-stretch">
            <div className="relative w-full rounded-2xl overflow-hidden bg-[#F5F8FC] border border-[#0A2055]/10 shadow-[0_12px_36px_rgba(10,32,85,0.08)] flex items-center justify-center min-h-[300px] sm:min-h-[380px]">
              {!imageError ? (
                <img
                  src={HERO_ILLUSTRATION_PATH}
                  alt="Young Indian professional learning insurance concepts online through a laptop alongside digital protection shield and policy training dashboards"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full p-8 flex flex-col items-center justify-center text-center bg-gradient-to-br from-[#F5F8FC] to-[#E6EEF9]">
                  <div className="w-16 h-16 rounded-2xl bg-[#0A2055] flex items-center justify-center mb-4">
                    <ShieldCheck className="w-9 h-9 text-[#FF851B]" aria-hidden="true" />
                  </div>
                  <p className="font-[family-name:var(--font-display)] text-lg font-bold text-[#0A2055]">
                    AASAN LIFE Online Training
                  </p>
                  <p className="text-sm text-[#17233D]/70 mt-1 max-w-xs">
                    Structured online insurance learning &amp; paid internship programme.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
