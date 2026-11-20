import React, { useState } from 'react';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  FileCheck2,
  Layers,
  Play,
  Scale,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { EnquiryFormFields } from './EnquiryFormFields';
import { AppLink } from '../context/RouterContext';
import {
  EASE_PREMIUM,
  Reveal,
  StaggerGroup,
  StaggerItem,
} from './motion/MotionPrimitives';
import {
  FloatingOrb,
  MagneticButton,
  ParallaxLayer,
  SpotlightCard,
} from './motion/SiteEffects';

const HERO_ILLUSTRATION_PATH = '/assets/images/hero_insurance_learning_1794917031234.jpg';

// Deployed Google Apps Script Web App URL
export const GOOGLE_SHEET_WEBAPP_URL =
  'https://script.google.com/macros/s/AKfycbxUsYEaIHwo9xzgX19dMUBRx0zKx6CnCvD9WLmKLk41Uz3BdJ1GA48SmHh5AzxrEI3u/exec';

export interface EnquiryPayload {
  name: string;
  email: string;
  phone: string;
  course?: string;
  message?: string;
  source?: string;
}

export async function submitEnquiryToGoogleSheet(payload: EnquiryPayload): Promise<void> {
  if (!GOOGLE_SHEET_WEBAPP_URL || GOOGLE_SHEET_WEBAPP_URL.includes('YOUR_SCRIPT_ID')) {
    throw new Error('Please replace GOOGLE_SHEET_WEBAPP_URL with your deployed Google Apps Script Web App URL.');
  }

  await fetch(GOOGLE_SHEET_WEBAPP_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: JSON.stringify({
      ...payload,
      submittedAt: new Date().toISOString(),
    }),
  });
}

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

      {/* Ambient Floating Decorative Accents */}
      <FloatingOrb
        durationSec={8}
        travelPx={14}
        className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#1455D9]/[0.06] blur-3xl z-0"
      />
      <FloatingOrb
        durationSec={9}
        travelPx={16}
        className="absolute -bottom-24 right-1/4 w-96 h-96 rounded-full bg-[#E4B052]/[0.09] blur-3xl z-0"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-5 lg:py-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left 7 Columns: New Batch Badge, Headline, Pricing Card, Core Topics, Dual CTAs */}
          <StaggerGroup staggerDelay={0.07} className="lg:col-span-7 space-y-6">
            {/* New Batch Pill Badge */}
            <StaggerItem>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#1455D9]/10 border border-[#1455D9]/25 text-[#1455D9] text-xs sm:text-sm font-extrabold tracking-wider uppercase shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1455D9] animate-pulse" />
                <span>New Batch Starting 15th Oct</span>
              </div>
            </StaggerItem>

            <StaggerItem>
              <p className="text-sm font-semibold text-[#1455D9]">
                AASAN BIMA EDUCATION · Online Insurance Training &amp; Paid Internship Programme
              </p>
            </StaggerItem>

            <StaggerItem>
              <h1 className="text-[clamp(2.25rem,4.2vw,3.65rem)] font-extrabold text-[#0A2055] leading-[1.12] tracking-tight">
                Build Your Career in the{' '}
                <span className="text-[#1455D9]">Insurance Industry</span>
              </h1>
            </StaggerItem>

            <StaggerItem>
              <p className="text-base sm:text-lg text-[#17233D]/80 leading-relaxed max-w-2xl">
                Learn. Train. Grow. Join AASAN BIMA EDUCATION&apos;s Online Paid Internship Programme and develop
                the knowledge and professional skills needed to explore opportunities in the insurance
                sector.
              </p>
            </StaggerItem>

            {/* Limited Time Offer Pricing Card */}
            <StaggerItem>
              <SpotlightCard
                spotlightColor="rgba(20, 85, 217, 0.08)"
                className="relative inline-block w-full max-w-lg bg-white rounded-2xl border border-[#1455D9]/20 p-5 shadow-[0_10px_30px_rgba(20,85,217,0.08)] my-2"
              >
                {/* Floating Offer Badge */}
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-3.5 right-6 bg-gradient-to-r from-rose-600 to-red-500 text-white text-xs font-extrabold px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 tracking-wider uppercase"
                >
                  <span>29% OFF</span>
                  <span>🔥</span>
                </motion.div>

                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Limited Time Offer
                </p>
                <div className="flex items-baseline gap-4 flex-wrap">
                  <span className="text-lg sm:text-xl font-bold text-slate-400 line-through">
                    ₹20,999/-
                  </span>
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#1455D9] tracking-tight">
                    ₹14,999/-
                  </span>
                </div>
              </SpotlightCard>
            </StaggerItem>

            {/* Key Programme Attributes Row */}
            <StaggerItem>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
                {HIGHLIGHTS.map((point) => (
                  <li
                    key={point}
                    className="group/item flex items-center gap-2.5 text-sm font-semibold text-[#0A2055]"
                  >
                    <CheckCircle2
                      className="w-5 h-5 text-[#E4B052] shrink-0 transition-transform duration-200 group-hover/item:scale-110"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </StaggerItem>

            {/* Core Insurance Learning Pillars Strip */}
            <StaggerItem>
              <div className="pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-[#0A2055]/65 mb-3">
                  Master Insurance Domains &amp; Tools
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {CORE_SUBJECTS.map((subject) => {
                    const Icon = subject.icon;
                    return (
                      <motion.span
                        key={subject.label}
                        whileHover={{ y: -2, scale: 1.02 }}
                        transition={{ duration: 0.18, ease: EASE_PREMIUM }}
                        className="group/pill inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0A2055] border border-black/10 text-xs sm:text-sm font-semibold text-white shadow-sm cursor-default"
                      >
                        <Icon
                          className="w-4 h-4 text-[#E4B052] transition-transform duration-200 group-hover/pill:rotate-6"
                          aria-hidden="true"
                        />
                        <span>{subject.label}</span>
                      </motion.span>
                    );
                  })}
                </div>
              </div>
            </StaggerItem>

            {/* Dual CTA Actions */}
            <StaggerItem>
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <MagneticButton strength={0.18}>
                  {onOpenModal ? (
                    <motion.button
                      type="button"
                      onClick={onOpenModal}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group/btn inline-flex items-center justify-center gap-2.5 px-7 py-4 text-base font-bold text-[#0A2055] bg-[#FFC107] hover:bg-[#ffb300] rounded-xl transition-all duration-150 whitespace-nowrap shrink-0 shadow-[0_8px_25px_rgba(255,193,7,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFC107] cursor-pointer"
                    >
                      <span className="w-7 h-7 rounded-full bg-[#0A2055]/10 flex items-center justify-center transition-transform duration-200 group-hover/btn:scale-105">
                        <Play
                          className="w-3.5 h-3.5 text-[#0A2055] fill-current ml-0.5"
                          aria-hidden="true"
                        />
                      </span>
                      <span>Book Free Demo Class</span>
                    </motion.button>
                  ) : (
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <AppLink
                        to="/contact-us"
                        className="group/btn inline-flex items-center justify-center gap-2.5 px-7 py-4 text-base font-bold text-[#0A2055] bg-[#FFC107] hover:bg-[#ffb300] rounded-xl transition-all duration-150 whitespace-nowrap shrink-0 shadow-[0_8px_25px_rgba(255,193,7,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFC107]"
                      >
                        <span className="w-7 h-7 rounded-full bg-[#0A2055]/10 flex items-center justify-center transition-transform duration-200 group-hover/btn:scale-105">
                          <Play
                            className="w-3.5 h-3.5 text-[#0A2055] fill-current ml-0.5"
                            aria-hidden="true"
                          />
                        </span>
                        <span>Book Free Demo Class</span>
                      </AppLink>
                    </motion.div>
                  )}
                </MagneticButton>

                <MagneticButton strength={0.15}>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <AppLink
                      to="/internship-program"
                      className="group/sec inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-bold text-[#0A2055] bg-white hover:bg-[#F5F8FC] border-2 border-[#0A2055]/15 hover:border-[#1455D9] rounded-xl transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1455D9]"
                    >
                      <span>Download Brochure</span>
                      <ArrowRight
                        className="w-4 h-4 text-[#1455D9] transition-transform duration-200 group-hover/sec:translate-x-1"
                        aria-hidden="true"
                      />
                    </AppLink>
                  </motion.div>
                </MagneticButton>
              </div>
            </StaggerItem>

            {/* Bottom accreditation row */}
            <StaggerItem>
              <div className="flex items-center gap-4 pt-2 text-xs font-semibold text-slate-500">
                <span>ISO 9001:2015</span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span className="flex items-center gap-1.5 text-[#1455D9]">
                  <ShieldCheck className="w-4 h-4" /> 100% Job Assistance
                </span>
              </div>
            </StaggerItem>
          </StaggerGroup>

          {/* Right 5 Columns: Stacked Visual Card + Quick Internship Enquiry */}
          <div className="lg:col-span-5 relative w-full max-w-lg mx-auto lg:max-w-none">
            <Reveal direction="scale" delay={0.12}>
              <ParallaxLayer speed={0.05}>
                <div
                  aria-hidden="true"
                  className="hidden sm:block absolute -inset-3 bg-gradient-to-tr from-[#1455D9]/15 to-[#E4B052]/15 rounded-3xl -z-10 rotate-1"
                />
                <div className="group/card bg-white rounded-2xl border border-[#0A2055]/12 shadow-[0_16px_44px_rgba(10,32,85,0.12)] overflow-hidden">
                  {/* Top Visual Header */}
                  <div className="relative h-48 sm:h-52 w-full bg-[#F5F8FC] overflow-hidden">
                    {!imageError ? (
                      <img
                        src={HERO_ILLUSTRATION_PATH}
                        alt="Young Indian professional learning insurance concepts online through a laptop alongside digital protection shield and policy training dashboards"
                        referrerPolicy="no-referrer"
                        onError={() => setImageError(true)}
                        className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover/card:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0A2055] to-[#1455D9]">
                        <ShieldCheck className="w-14 h-14 text-[#E4B052]" aria-hidden="true" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A2055]/85 via-[#0A2055]/25 to-transparent" />
                    <div className="absolute bottom-4 left-5 right-5 text-white">
                      <p className="text-xs font-semibold text-[#E4B052]">
                        AASAN BIMA EDUCATION · Online Training
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
              </ParallaxLayer>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};