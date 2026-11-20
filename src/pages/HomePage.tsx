import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Compass,
  PhoneCall,
  Award,
  Search,
  ShieldCheck,
  FileCheck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppLink, AppRoutePath } from '../context/RouterContext';
import { HeroSection } from '../components/HeroSection';
import { InstructorSection } from '../components/InstructorSection';
import { KeyMetricsSection } from '../components/KeyMetricsSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { FinalCTA } from '../components/FinalCTA';
import { PageMeta } from '../components/PageMeta';
import {
  AnimatedCounter,
  EASE_PREMIUM,
  MotionCard,
  Reveal,
  StaggerGroup,
  StaggerItem,
} from '../components/motion/MotionPrimitives';
import { PlacementAssistanceSection } from '../components/PlacementAssistanceSection';
import { CareerCounsellorSection } from '../components/CareerCounsellorSection';
interface HomePageProps {
  onOpenModal: () => void;
}

// Place logo.png inside your project's public/ folder (public/assets/aistudio/logo.png)
const AASAN_BIMA_LOGO = '/assets/aistudio/logo.png';

const PROGRAMME_FACTS = [
  { label: 'Programme Type', value: 'Online Internship' },
  { label: 'Category', value: 'Insurance Training' },
  { label: 'Programme Nature', value: 'Paid Internship' },
  { label: 'Learning Mode', value: '100% Online' },
];

interface PageHighlightCard {
  title: string;
  description: string;
  to: AppRoutePath;
  cta: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PAGE_DIRECTORY: PageHighlightCard[] = [
  {
    title: 'About AASAN BIMA EDUCATION',
    description:
      'Discover our mission to make insurance education accessible, structured, and practical for aspiring learners.',
    to: '/about-us',
    cta: 'Read About Us',
    icon: Compass,
  },
  {
    title: 'Internship Program',
    description:
      'Review programme highlights, eligible learner segments, and the 3-step enrolment journey.',
    to: '/internship-program',
    cta: 'Explore Internship',
    icon: Briefcase,
  },
  {
    title: 'What You Learn',
    description:
      'Inspect all 6 curriculum modules from Insurance Fundamentals and Corporate Policies to Risk Assessment.',
    to: '/what-you-learn',
    cta: 'View Curriculum',
    icon: BookOpen,
  },
  {
    title: 'Programme Benefits',
    description:
      'See why flexible online learning, industry focus, and practical knowledge set your foundation apart.',
    to: '/benefits',
    cta: 'Explore Benefits',
    icon: CheckCircle2,
  },
  {
    title: 'Contact & Enquire',
    description:
      'Connect with our team directly via our full enquiry form, phone, WhatsApp, or email.',
    to: '/contact-us',
    cta: 'Contact Us',
    icon: PhoneCall,
  },
];

const CREDENTIALS_LIST = [
  {
    id: 'certificate',
    title: 'INSURANCE TRAINING CERTIFICATE',
    subtitle: 'COURSE COMPLETION CERTIFICATE',
    icon: Award,
  },
  {
    id: 'excellence',
    title: 'CORPORATE PROJECTS EXCELLENCE',
    subtitle: 'PORTFOLIO CASE PROJECTS LETTER',
    icon: FileCheck,
  },
  {
    id: 'internship',
    title: 'INDUSTRY INTERNSHIP PROGRAM',
    subtitle: 'SIMULATED INTERNSHIP LETTER',
    icon: Briefcase,
  },
];

export const HomePage: React.FC<HomePageProps> = ({ onOpenModal }) => {
  const [activeCredential, setActiveCredential] = useState('certificate');
  const [verifyId, setVerifyId] = useState('');
  const [logoError, setLogoError] = useState(false);

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyId.trim()) {
      alert('Please enter a valid verification ID.');
      return;
    }
    alert(`Verifying credential ID: ${verifyId}...`);
  };

  return (
    <>
      <PageMeta
        title="AASAN BIMA EDUCATION | Online Insurance Training & Internship"
        description="Join AASAN BIMA EDUCATION's 100% Online Paid Insurance Internship Programme. Learn insurance fundamentals, corporate policies, risk, and operations today."
        keywords="Online Insurance Training, Paid Insurance Internship, Insurance Internship Programme, AASAN BIMA EDUCATION"
      />
      <HeroSection onOpenModal={onOpenModal} />

      {/* 4-Column Quick Overview Strip */}
      <section className="border-b border-[#0A2055]/10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <StaggerGroup
            staggerDelay={0.07}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 lg:divide-x divide-[#0A2055]/10"
          >
            {PROGRAMME_FACTS.map((item, idx) => (
              <StaggerItem
                key={item.label}
                className={`pt-3 sm:pt-0 ${idx > 0 ? 'lg:pl-6' : ''}`}
              >
                <p className="text-xs font-bold uppercase tracking-wider text-[#1455D9] mb-1">
                  {item.label}
                </p>
                <p className="font-[family-name:var(--font-display)] text-lg sm:text-xl font-extrabold text-[#0A2055]">
                  {item.value}
                </p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Explore Dedicated Pages Directory */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="up" className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-sm font-semibold text-[#1455D9] mb-2">
              Explore AASAN BIMA EDUCATION
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0A2055] tracking-tight mb-3">
              Everything You Need to Know Before Enrolling
            </h2>
            <p className="text-base sm:text-lg text-[#17233D]/80 leading-relaxed">
              Navigate directly to dedicated sections for our background, curriculum, programme
              structure, learner benefits, and enquiry support.
            </p>
          </Reveal>

          <StaggerGroup
            staggerDelay={0.08}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6"
          >
            {PAGE_DIRECTORY.map((card, idx) => {
              const Icon = card.icon;
              const spanClass =
                idx < 3
                  ? 'lg:col-span-2'
                  : idx === 3
                  ? 'lg:col-span-3'
                  : 'lg:col-span-3 sm:col-span-2';
              return (
                <StaggerItem key={card.title} className={spanClass}>
                  <MotionCard className="group h-full bg-[#F5F8FC]/65 border border-[#0A2055]/10 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:bg-white hover:border-[#1455D9]/35 hover:shadow-[0_14px_34px_rgba(10,32,85,0.08)] transition-colors duration-200">
                    <div>
                      <div className="w-11 h-11 rounded-xl bg-[#0A2055] flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3">
                        <Icon className="w-5 h-5 text-[#E4B052]" aria-hidden="true" />
                      </div>
                      <h3 className="text-xl font-bold text-[#0A2055] mb-2">{card.title}</h3>
                      <p className="text-sm sm:text-base text-[#17233D]/80 leading-relaxed mb-5">
                        {card.description}
                      </p>
                    </div>

                    <AppLink
                      to={card.to}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1455D9] hover:text-[#0A2055] transition-colors"
                    >
                      <span>{card.cta}</span>
                      <ArrowRight
                        className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </AppLink>
                  </MotionCard>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      <InstructorSection onOpenModal={onOpenModal} />

      {/* ── ACCREDITATIONS & CREDENTIALS SECTION ── */}
      <section className="py-20 bg-[#F5F8FC] border-t border-b border-[#0A2055]/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <Reveal direction="up" className="max-w-3xl mx-auto text-center mb-14">
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#1455D9]/10 border border-[#1455D9]/20 text-[#1455D9] text-xs font-extrabold tracking-wider uppercase mb-3 shadow-xs">
              Accreditations &amp; Credentials
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2055] tracking-tight mb-4 leading-tight">
              Earn Globally Recognized Professional Credentials
            </h2>
            <p className="text-base sm:text-lg text-[#17233D]/80 leading-relaxed">
              Stand out in recruitment funnels. Our certificates are integrated with unique verification IDs, allowing employers to confirm your skills instantly.
            </p>
          </Reveal>

          {/* Interactive Credential Showcase Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Available Credentials Selectors & Recruitment Perks */}
            <Reveal direction="right" className="lg:col-span-4 space-y-4">
              <p className="text-xs font-bold uppercase tracking-wider text-[#0A2055]/65">
                Available Credentials:
              </p>

              {CREDENTIALS_LIST.map((item) => {
                const isActive = activeCredential === item.id;
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setActiveCredential(item.id)}
                    className={`relative w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex items-start gap-3.5 cursor-pointer shadow-xs ${
                      isActive
                        ? 'bg-white border-[#1455D9] shadow-md ring-2 ring-[#1455D9]/20'
                        : 'bg-white/80 border-[#0A2055]/10 hover:bg-white hover:border-[#0A2055]/25'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isActive ? 'bg-[#1455D9] text-white' : 'bg-[#0A2055]/10 text-[#0A2055]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4
                        className={`text-sm sm:text-base font-bold ${
                          isActive ? 'text-[#1455D9]' : 'text-[#0A2055]'
                        }`}
                      >
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#17233D]/65 font-medium mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </motion.button>
                );
              })}

              {/* Accelerate Recruitment Box */}
              <div className="bg-white rounded-2xl border border-[#0A2055]/10 p-5 mt-6 shadow-xs">
                <h5 className="text-xs font-bold uppercase tracking-wider text-[#1455D9] mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#C69232]" />
                  Accelerate Recruitment
                </h5>
                <p className="text-xs sm:text-sm text-[#17233D]/80 leading-relaxed">
                  Our graduates can link certificates directly to their LinkedIn resume profile, increasing organic HR direct message requests by up to{' '}
                  <AnimatedCounter target={85} suffix="%" className="font-bold text-[#0A2055]" />.
                </p>
              </div>
            </Reveal>

            {/* Right Column: Formal Certificate Display & Verification Registry */}
            <Reveal direction="left" delay={0.1} className="lg:col-span-8 space-y-6">
              {/* Outer Certificate Frame */}
              <div className="bg-white rounded-3xl border border-[#0A2055]/15 p-4 sm:p-6 shadow-[0_20px_50px_rgba(10,32,85,0.12)] relative overflow-hidden">
                {/* Ambient Breathing Corner Accents */}
                <motion.div
                  animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-16 -right-16 w-48 h-48 bg-[#C69232]/10 rounded-full pointer-events-none"
                />
                <motion.div
                  animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#0A2055]/5 rounded-full pointer-events-none"
                />

                {/* Inner Certificate Sheet */}
                <div className="relative border-2 border-[#0A2055]/25 rounded-2xl p-6 sm:p-10 bg-gradient-to-b from-[#FFFEFA] via-white to-[#F8FAFD] text-center">
                  <div className="pointer-events-none absolute inset-2 rounded-xl border border-[#C69232]/40" />

                  {/* Top Header Row: Brand Logo + Credential Badge */}
                  <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 mb-6 border-b border-[#0A2055]/10">
                    {!logoError ? (
                      <img
                        src={AASAN_BIMA_LOGO}
                        alt="AASAN BIMA EDU — Insurance Education Made Simple"
                        onError={() => setLogoError(true)}
                        className="h-14 sm:h-16 w-auto object-contain"
                      />
                    ) : (
                      <div className="text-center sm:text-left">
                        <div className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-[#0A2055]">
                          AASAN BIMA <span className="text-[#C69232]">EDU</span>
                        </div>
                        <div className="text-[10px] tracking-[0.18em] uppercase text-[#0A2055]/75 font-semibold">
                          Insurance Education Made Simple
                        </div>
                      </div>
                    )}

                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A2055] text-[#F3D08A] text-[11px] font-bold uppercase tracking-widest shadow-xs">
                      <Award className="w-3.5 h-3.5 text-[#E4B052]" />
                      Official Credential
                    </div>
                  </div>

                  {/* Certificate Title */}
                  <p className="relative text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.22em] text-[#C69232] mb-1.5">
                    AASAN BIMA EDU • Credential Registry
                  </p>
                  <h3 className="relative font-serif text-2xl sm:text-4xl font-bold text-[#0A2055] tracking-tight mb-2">
                    Certificate of Achievement
                  </h3>
                  <p className="relative text-xs sm:text-sm text-[#17233D]/65 italic mb-5">
                    This is to formally certify that
                  </p>

                  {/* Recipient Name */}
                  <div className="relative inline-block px-6 pb-2 mb-6 border-b-2 border-[#C69232]/60">
                    <p className="font-serif text-3xl sm:text-4xl font-bold text-[#0A2055]">
                      John Doe
                    </p>
                  </div>

                  {/* Animated Credential Description Switcher */}
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activeCredential}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25, ease: EASE_PREMIUM }}
                      className="relative text-xs sm:text-sm text-[#17233D]/80 max-w-xl mx-auto leading-relaxed mb-8"
                    >
                      has successfully completed the{' '}
                      <strong className="text-[#0A2055] font-semibold">
                        {activeCredential === 'certificate'
                          ? 'Insurance Training Course'
                          : activeCredential === 'excellence'
                          ? 'Corporate Projects Excellence'
                          : 'Industry Internship Program'}
                      </strong>{' '}
                      and demonstrated practical proficiency in insurance operations, policy structuring, and risk assessment.
                    </motion.p>
                  </AnimatePresence>

                  {/* Bottom Signature, Gold Seal & Verification Block */}
                  <div className="relative grid grid-cols-1 sm:grid-cols-3 items-end gap-6 pt-6 border-t border-[#0A2055]/10 text-xs">
                    <div className="text-center sm:text-left">
                      <p className="font-serif italic text-base text-[#0A2055]">Amit Soni</p>
                      <div className="w-32 mx-auto sm:mx-0 border-t border-[#0A2055]/25 my-1" />
                      <p className="font-bold text-[#0A2055] text-[11px]">Amit Soni</p>
                      <p className="text-[11px] text-[#17233D]/60">Director, AASAN BIMA EDU</p>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                      <motion.div
                        whileHover={{ rotate: 12, scale: 1.06 }}
                        transition={{ duration: 0.25 }}
                        className="w-14 h-14 rounded-full border-2 border-dashed border-[#C69232] bg-[#C69232]/10 flex items-center justify-center text-[#0A2055] shadow-2xs"
                      >
                        <ShieldCheck className="w-6 h-6 text-[#C69232]" />
                      </motion.div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#0A2055]/70 mt-1.5">
                        Authenticated
                      </span>
                    </div>

                    <div className="bg-[#0A2055]/[0.04] border border-[#0A2055]/10 px-4 py-2.5 rounded-xl text-center sm:text-right font-mono text-[11px]">
                      <div className="text-[#0A2055] font-bold">ID: AL-INTR-2026-0587</div>
                      <div className="text-emerald-700 font-semibold mt-0.5">● Verified &amp; Active</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Employer Credential Verification Registry Bar */}
              <div className="bg-white rounded-2xl border border-[#0A2055]/12 p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-[#0A2055] mb-3 flex items-center gap-2">
                  <Search className="w-4 h-4 text-[#1455D9]" />
                  Employer Credential Verification Registry
                </p>
                <form onSubmit={handleVerifySubmit} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Enter verification ID (e.g., AL-829402)"
                      value={verifyId}
                      onChange={(e) => setVerifyId(e.target.value)}
                      className="w-full px-4 py-3 bg-[#F5F8FC] border border-[#0A2055]/15 rounded-xl text-xs sm:text-sm text-[#0A2055] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1455D9] transition-shadow"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0A2055] hover:bg-[#1455D9] text-white text-xs sm:text-sm font-bold rounded-xl transition-colors cursor-pointer shrink-0 shadow-sm"
                  >
                    Verify ID
                  </motion.button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <KeyMetricsSection />
      <CareerCounsellorSection />
      <TestimonialsSection />
      <PlacementAssistanceSection />
      <FinalCTA />
    </>
  );
};