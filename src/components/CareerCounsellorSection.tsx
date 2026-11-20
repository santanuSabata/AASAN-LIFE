import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Send,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { submitEnquiryToGoogleSheet } from './HeroSection';
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

const COUNSELLOR_IMAGE_PATH = '/assets/images/counsellor_mentor.png';

const EXPERIENCE_OPTIONS = [
  'Working professional - Insurance & BFSI roles',
  'Working professional - Non insurance',
  'College student - Final year',
  'College student - 1st to pre-final year',
] as const;

type ExperienceOption = (typeof EXPERIENCE_OPTIONS)[number];

interface CounsellorFormState {
  name: string;
  email: string;
  phone: string;
  experience: ExperienceOption;
}

const INITIAL_STATE: CounsellorFormState = {
  name: '',
  email: '',
  phone: '',
  experience: EXPERIENCE_OPTIONS[2],
};

interface CareerCounsellorSectionProps {
  className?: string;
}

export const CareerCounsellorSection: React.FC<CareerCounsellorSectionProps> = ({
  className = '',
}) => {
  const [formState, setFormState] = useState<CounsellorFormState>(INITIAL_STATE);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanedPhone = formState.phone.replace(/\D/g, '').replace(/^91/, '').replace(/^0/, '');
    if (!formState.name.trim() || formState.name.trim().length < 2) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!/^[6-9]\d{9}$/.test(cleanedPhone)) {
      setErrorMsg('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitEnquiryToGoogleSheet({
        name: formState.name.trim(),
        email: formState.email.trim(),
        phone: cleanedPhone,
        course: `Free Career Counselling — ${formState.experience}`,
        message: `Experience Profile: ${formState.experience}`,
        source: 'career-counsellor-section',
      });
      setSubmitted(true);
    } catch (err) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Unable to submit your counselling request right now. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="career-counsellor"
      aria-label="Free Career Counselling"
      className={`relative overflow-hidden bg-[#050608] text-white py-16 sm:py-24 border-y border-white/10 ${className}`}
    >
      {/* Ambient Warm & Royal Blue Glows */}
      <FloatingOrb
        durationSec={8}
        travelPx={14}
        className="pointer-events-none absolute top-1/4 left-1/5 w-80 h-80 rounded-full bg-amber-500/15 blur-3xl"
      />
      <FloatingOrb
        durationSec={10}
        travelPx={16}
        className="pointer-events-none absolute -bottom-24 right-1/5 w-96 h-96 rounded-full bg-[#1455D9]/15 blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Mentor & Laptop Showcase with Floating Pills */}
          <Reveal direction="right" className="lg:col-span-6">
            <ParallaxLayer speed={0.05}>
              <div className="relative max-w-xl mx-auto py-6">
                {/* Warm Radial Spotlight Behind Mentor */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-10 top-6 bottom-12 rounded-full bg-gradient-to-b from-amber-500/20 via-[#1455D9]/10 to-transparent blur-2xl"
                />

                {/* Floating Badge 1: Free Career Counselling */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/15 text-xs font-semibold text-white shadow-lg absolute top-14 right-0 z-20"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#E4B052]" aria-hidden="true" />
                  <span>Free Career Counselling</span>
                </motion.div>

                {/* Mentor Image / Fallback Visual */}
                <div className="relative z-10 flex flex-col items-center">
                  {!imgError ? (
                    <img
                      src={COUNSELLOR_IMAGE_PATH}
                      alt="Career counsellor guiding learners online via laptop"
                      onError={() => setImgError(true)}
                      className="w-full max-w-md h-auto object-contain rounded-2xl transition-transform duration-500 hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="w-full max-w-md rounded-2xl border border-white/15 bg-gradient-to-b from-[#0A2055]/80 to-[#0B0E14] p-6 shadow-2xl">
                      <div className="flex flex-col items-center text-center pt-2 pb-6">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#1455D9] to-[#E4B052] p-0.5 mb-4 shadow-lg">
                          <div className="w-full h-full rounded-full bg-[#0A2055] flex items-center justify-center">
                            <ShieldCheck className="w-10 h-10 text-[#E4B052]" aria-hidden="true" />
                          </div>
                        </div>
                        <p className="text-base font-bold text-white">
                          AASAN BIMA EDUCATION Mentors
                        </p>
                        <p className="text-xs text-white/70 mt-1 max-w-xs">
                          1-on-1 guidance on insurance career paths, syllabus fit, and paid internship eligibility
                        </p>
                      </div>

                      {/* Laptop Base Mockup */}
                      <div className="mx-auto w-full max-w-sm">
                        <div className="h-32 rounded-t-xl border-2 border-white/20 bg-[#050608] flex items-center justify-center px-4 text-center">
                          <span className="text-xs font-semibold text-[#E4B052] tracking-wide">
                            Live 1-on-1 Counselling &amp; Internship Guidance
                          </span>
                        </div>
                        <div className="h-3.5 rounded-b-xl bg-gradient-to-r from-white/15 via-white/30 to-white/15" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Floating Badge 2: Help & Support */}
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/15 text-xs font-semibold text-white shadow-lg absolute bottom-10 left-0 z-20"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#E4B052]" aria-hidden="true" />
                  <span>Help &amp; Support</span>
                </motion.div>
              </div>
            </ParallaxLayer>
          </Reveal>

          {/* Right Column: Reach Out Form Card */}
          <Reveal direction="left" delay={0.08} className="lg:col-span-6">
            <SpotlightCard
              spotlightColor="rgba(228, 176, 82, 0.1)"
              className="rounded-2xl bg-[#0B0E14] border border-white/15 p-6 sm:p-8 shadow-[0_24px_60px_rgba(0,0,0,0.6)]"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-6">
                Reach out to our career counsellor for free
              </h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: EASE_PREMIUM }}
                  className="rounded-xl bg-emerald-950/50 border border-emerald-400/30 p-6 space-y-4"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="text-base font-bold text-white">
                        Counselling Request Received
                      </h3>
                      <p className="text-sm text-white/80 mt-1">
                        Thank you, {formState.name}. Our career counsellor will reach out to you
                        shortly regarding your insurance career &amp; internship options.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormState(INITIAL_STATE);
                    }}
                    className="text-xs font-bold text-[#E4B052] hover:underline cursor-pointer"
                  >
                    Submit another request
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {errorMsg && (
                    <div
                      role="alert"
                      className="flex items-center gap-2.5 px-4 py-3 rounded-lg bg-red-950/60 border border-red-500/40 text-red-200 text-xs sm:text-sm"
                    >
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" aria-hidden="true" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Name */}
                  <div>
                    <label
                      htmlFor="counsellor-name"
                      className="block text-sm font-medium text-white mb-2"
                    >
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="counsellor-name"
                      name="name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, name: e.target.value }))
                      }
                      placeholder="Enter name"
                      className="w-full px-4 py-3 rounded-lg bg-[#12161F] border border-white/15 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#E4B052] focus:ring-2 focus:ring-[#E4B052]/25 transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="counsellor-email"
                      className="block text-sm font-medium text-white mb-2"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="counsellor-email"
                      name="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, email: e.target.value }))
                      }
                      placeholder="Enter email"
                      className="w-full px-4 py-3 rounded-lg bg-[#12161F] border border-white/15 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#E4B052] focus:ring-2 focus:ring-[#E4B052]/25 transition-all"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label
                      htmlFor="counsellor-phone"
                      className="block text-sm font-medium text-white mb-2"
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center rounded-lg bg-[#12161F] border border-white/15 focus-within:border-[#E4B052] focus-within:ring-2 focus-within:ring-[#E4B052]/25 transition-all overflow-hidden">
                      <span
                        aria-hidden="true"
                        className="inline-flex items-center gap-1.5 pl-3.5 pr-2.5 py-3 text-xs font-bold text-white/85 border-r border-white/10 select-none shrink-0"
                      >
                        <span>🇮🇳</span>
                        <span>+91</span>
                      </span>
                      <input
                        id="counsellor-phone"
                        name="phone"
                        type="tel"
                        inputMode="numeric"
                        required
                        value={formState.phone}
                        onChange={(e) =>
                          setFormState((prev) => ({ ...prev, phone: e.target.value }))
                        }
                        placeholder="Enter phone number"
                        className="w-full px-3.5 py-3 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Experience Radio Group */}
                  <fieldset>
                    <legend className="block text-sm font-medium text-white mb-3">
                      Experience <span className="text-red-500">*</span>
                    </legend>
                    <StaggerGroup staggerDelay={0.05} className="space-y-2.5">
                      {EXPERIENCE_OPTIONS.map((option) => {
                        const isSelected = formState.experience === option;
                        return (
                          <StaggerItem key={option}>
                            <label
                              className={`flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer transition-all text-xs sm:text-sm ${
                                isSelected
                                  ? 'bg-white/[0.06] border-[#E4B052]/70 text-white'
                                  : 'bg-transparent border-transparent hover:bg-white/[0.03] text-white/85'
                              }`}
                            >
                              <input
                                type="radio"
                                name="experience"
                                value={option}
                                checked={isSelected}
                                onChange={() =>
                                  setFormState((prev) => ({ ...prev, experience: option }))
                                }
                                className="sr-only"
                              />
                              <span
                                aria-hidden="true"
                                className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                                  isSelected ? 'border-[#E4B052]' : 'border-white/45'
                                }`}
                              >
                                {isSelected && (
                                  <span className="w-2 h-2 rounded-full bg-[#E4B052]" />
                                )}
                              </span>
                              <span>{option}</span>
                            </label>
                          </StaggerItem>
                        );
                      })}
                    </StaggerGroup>
                  </fieldset>

                  <MagneticButton strength={0.15} className="w-full pt-1">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg bg-[#E4B052] hover:bg-white disabled:opacity-60 text-[#0A2055] font-extrabold text-sm transition-colors cursor-pointer shadow-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                          <span>Submitting Request...</span>
                        </>
                      ) : (
                        <>
                          <span>Book Free Counselling</span>
                          <Send className="w-4 h-4" aria-hidden="true" />
                        </>
                      )}
                    </motion.button>
                  </MagneticButton>
                </form>
              )}
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
};