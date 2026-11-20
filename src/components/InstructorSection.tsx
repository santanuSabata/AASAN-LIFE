import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Award,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  GraduationCap,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import { AppLink } from '../context/RouterContext';
import { submitEnquiryToGoogleSheet } from './HeroSection';
import {
  FloatingOrb,
  MagneticButton,
  SpotlightCard,
  TextReveal,
} from './motion/SiteEffects';

interface InstructorProfile {
  id: string;
  name: string;
  role: string;
  badge: string;
  initials: string;
  photoPath: string;
  bio: string;
  highlights: string[];
}

const INSTRUCTORS: InstructorProfile[] = [
  {
    id: 'parveen',
    name: 'Mr. Parveen',
    role: 'Lead Educator · Insurance Operations & Risk',
    badge: 'Lead Educator',
    initials: 'MP',
    photoPath: '/assets/images/instructor_parveen.png',
    bio: 'Guides learners through practical insurance operations, policy structuring, risk assessment, and real-world case frameworks with structured mentorship.',
    highlights: [
      'Life, Health & General Policy Operations',
      'Risk Evaluation & Claims Workflow Guidance',
    ],
  },
  {
    id: 'shantanu',
    name: 'Mr. Shantanu',
    role: 'Lead Educator · Corporate Insurance & Advisory',
    badge: 'Lead Educator',
    initials: 'MS',
    photoPath: '/assets/images/instructor_shantanu.png',
    bio: 'Mentors students, graduates, and career-switchers on commercial risk advisory, client consulting, live case projects, and career readiness.',
    highlights: [
      'Corporate & Commercial Risk Advisory',
      'Live Case Studies & Career Mentorship',
    ],
  },
  {
    id: 'pallavi',
    name: 'Ms. Pallavi',
    role: 'Lead Educator · Client Advisory & Policy Servicing',
    badge: 'Lead Educator',
    initials: 'PR',
    photoPath: '/assets/images/instructor_pallavi.jpeg',
    bio: 'Trains aspiring learners on client needs analysis, policy documentation, renewal workflows, and professional communication for insurance roles.',
    highlights: [
      'Policy Servicing & Documentation Standards',
      'Client Advisory & Soft-Skills Readiness',
    ],
  },
];

const SHARED_MENTORSHIP_PILLARS = [
  {
    title: 'Hands-on Industry Training',
    description: 'Practical insurance workflows and policy structures explained simply',
    icon: Briefcase,
  },
  {
    title: 'Live Mentorship & Case Studies',
    description: 'Interactive doubt-clearing and real-world case assignments',
    icon: Users,
  },
  {
    title: 'Career & Placement Guidance',
    description: 'Interview preparation and portfolio project walkthroughs',
    icon: Award,
  },
];

const DEMO_TIME_SLOTS = [
  { id: '11:00', label: '11:00 AM – 12:00 PM IST', startHour: 11, endHour: 12 },
  { id: '16:00', label: '04:00 PM – 05:00 PM IST', startHour: 16, endHour: 17 },
  { id: '19:00', label: '07:00 PM – 08:00 PM IST', startHour: 19, endHour: 20 },
];

function useInViewport(threshold = 0.08) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95) {
      setIsVisible(true);
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

function buildGoogleCalendarUrl(params: {
  dateStr: string;
  startHour: number;
  endHour: number;
  attendeeName?: string;
}): string {
  const cleanDate = params.dateStr.replace(/-/g, '');
  const pad = (n: number) => String(n).padStart(2, '0');
  const start = `${cleanDate}T${pad(params.startHour)}0000`;
  const end = `${cleanDate}T${pad(params.endHour)}0000`;

  const title = encodeURIComponent(
    'Free Demo Session: Online Insurance Training & Paid Internship | AASAN BIMA EDUCATION'
  );
  const details = encodeURIComponent(
    `Live Interactive Demo Session with Lead Educators Mr. Parveen, Mr. Shantanu & Ms. Pallavi Rajput.\n\n` +
      (params.attendeeName ? `Participant: ${params.attendeeName}\n` : '') +
      `Topics Covered:\n` +
      `• Insurance Industry Career Roadmap\n` +
      `• Life, Health & Corporate Policy Operations\n` +
      `• Paid Internship Structure & Live Projects\n\n` +
      `Hosted by AASAN BIMA EDUCATION`
  );
  const location = encodeURIComponent('Online Live Session (Link shared via WhatsApp/Email)');

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}&ctz=Asia/Kolkata`;
}

function getTomorrowDateStringIST(): string {
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(tomorrow);
}

interface InstructorSectionProps {
  onOpenModal?: () => void;
}

const InstructorCard: React.FC<{
  instructor: InstructorProfile;
  index: number;
  isVisible: boolean;
}> = ({ instructor, index, isVisible }) => {
  const [imgError, setImgError] = useState(false);

  const initialX = index === 0 ? -16 : index === 2 ? 16 : 0;

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? 'translate3d(0, 0, 0) scale(1)'
          : `translate3d(${initialX}px, 24px, 0) scale(0.98)`,
        transitionProperty: 'opacity, transform',
        transitionDuration: '650ms',
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
        transitionDelay: `${index * 110}ms`,
        willChange: 'transform, opacity',
      }}
      className="h-full"
    >
      <SpotlightCard
        spotlightColor="rgba(20, 85, 217, 0.09)"
        className="group h-full bg-gradient-to-br from-[#F5F8FC] via-white to-[#F5F8FC]/60 rounded-3xl border border-[#0A2055]/12 p-6 sm:p-7 shadow-[0_16px_44px_rgba(10,32,85,0.08)] hover:border-[#1455D9]/35 hover:shadow-[0_24px_54px_rgba(10,32,85,0.13)] transition-shadow duration-300"
      >
        <article className="h-full flex flex-col justify-between">
          <div>
            {/* Portrait Container */}
            <div className="relative w-full max-w-xs mx-auto mb-6">
              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#0A2055] via-[#1455D9] to-[#E4B052] opacity-15 group-hover:opacity-25 blur-sm transition-opacity duration-300"
              />
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#0A2055]/15 bg-[#0A2055] aspect-[4/4.3] shadow-md flex items-center justify-center">
                {!imgError ? (
                  <img
                    src={instructor.photoPath}
                    alt={`${instructor.name} — ${instructor.role}`}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="text-center p-6 text-white space-y-2.5">
                    <div className="w-20 h-20 mx-auto rounded-full bg-white/10 border-2 border-[#E4B052] flex items-center justify-center font-serif text-2xl font-bold text-[#E4B052] transition-transform duration-300 group-hover:scale-105">
                      {instructor.initials}
                    </div>
                    <p className="text-base font-bold tracking-wide">{instructor.name}</p>
                    <p className="text-[11px] text-[#E4B052] uppercase tracking-widest font-semibold">
                      {instructor.badge}
                    </p>
                  </div>
                )}

                {/* Floating Name & Role Pill */}
                <div className="absolute bottom-3 left-3 right-3 bg-[#0A2055]/95 backdrop-blur-md border border-white/15 rounded-xl px-3.5 py-2.5 text-white flex items-center justify-between gap-2 transition-transform duration-300 group-hover:-translate-y-0.5">
                  <div className="min-w-0">
                    <p className="text-sm font-extrabold leading-tight truncate">
                      {instructor.name}
                    </p>
                    <p className="text-[11px] text-[#E4B052] font-semibold truncate">
                      {instructor.role}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1455D9] text-[10px] font-bold uppercase tracking-wider shrink-0">
                    <Sparkles className="w-3 h-3 text-[#E4B052] transition-transform duration-300 group-hover:rotate-12" />
                    {instructor.badge}
                  </span>
                </div>
              </div>
            </div>

            {/* Bio & Highlights */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1455D9]">
                <GraduationCap className="w-4 h-4 text-[#E4B052] shrink-0 transition-transform duration-300 group-hover:-rotate-6" />
                <span>{instructor.badge}</span>
              </div>
              <h3 className="text-2xl font-extrabold text-[#0A2055] group-hover:text-[#1455D9] transition-colors duration-200">
                {instructor.name}
              </h3>
              <p className="text-sm text-[#17233D]/80 leading-relaxed">{instructor.bio}</p>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-[#0A2055]/10 space-y-2">
            {instructor.highlights.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0A2055] bg-white px-3 py-2 rounded-xl border border-[#0A2055]/10 transition-all duration-200 hover:border-[#1455D9]/35 hover:translate-x-1"
              >
                <CheckCircle2 className="w-4 h-4 text-[#1455D9] shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </article>
      </SpotlightCard>
    </div>
  );
};

export const InstructorSection: React.FC<InstructorSectionProps> = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [modalEntered, setModalEntered] = useState(false);
  const [demoDate, setDemoDate] = useState(getTomorrowDateStringIST);
  const [selectedSlotId, setSelectedSlotId] = useState(DEMO_TIME_SLOTS[0].id);
  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [bookedCalendarUrl, setBookedCalendarUrl] = useState<string | null>(null);

  const headerView = useInViewport(0.1);
  const cardsView = useInViewport(0.08);
  const pillarsView = useInViewport(0.08);

  const selectedSlot =
    DEMO_TIME_SLOTS.find((s) => s.id === selectedSlotId) || DEMO_TIME_SLOTS[0];

  const openModal = () => {
    setIsDemoModalOpen(true);
    requestAnimationFrame(() => setModalEntered(true));
  };

  const resetModal = () => {
    setModalEntered(false);
    setTimeout(() => {
      setIsDemoModalOpen(false);
      setBookedCalendarUrl(null);
    }, 200);
  };

  useEffect(() => {
    if (!isDemoModalOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') resetModal();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDemoModalOpen]);

  const handleBookDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const gcalUrl = buildGoogleCalendarUrl({
      dateStr: demoDate,
      startHour: selectedSlot.startHour,
      endHour: selectedSlot.endHour,
      attendeeName: studentName.trim(),
    });

    try {
      await submitEnquiryToGoogleSheet({
        name: studentName.trim(),
        phone: studentPhone.trim(),
        email: studentEmail.trim(),
        course: `Free Demo Session (${demoDate} @ ${selectedSlot.label})`,
        source: 'instructor-demo-calendar',
      });
    } catch {
      // Even if sheet webhook is offline, still allow adding to Google Calendar
    } finally {
      setIsSaving(false);
      setBookedCalendarUrl(gcalUrl);
      window.open(gcalUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section className="py-20 bg-white border-b border-[#0A2055]/10 relative overflow-hidden">
      {/* Subtle Ambient Decorative Glows */}
      <FloatingOrb
        durationSec={8}
        travelPx={14}
        className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#1455D9]/[0.05] blur-3xl"
      />
      <FloatingOrb
        durationSec={9}
        travelPx={16}
        className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#E4B052]/[0.08] blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={headerView.ref}
          style={{
            opacity: headerView.isVisible ? 1 : 0,
            transform: headerView.isVisible
              ? 'translate3d(0, 0, 0)'
              : 'translate3d(0, 22px, 0)',
            transition:
              'opacity 600ms cubic-bezier(0.22, 1, 0.36, 1), transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#1455D9]/10 border border-[#1455D9]/20 text-[#1455D9] text-xs font-extrabold tracking-wider uppercase mb-3 shadow-xs">
            Our Instructors
          </span>
          <TextReveal delayMs={60}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2055] tracking-tight mb-4 leading-tight">
              Learn Directly From Lead Educators
            </h2>
          </TextReveal>
          <p className="text-base sm:text-lg text-[#17233D]/80 leading-relaxed">
            Build job-ready insurance skills under the mentorship of Mr. Parveen, Mr. Shantanu, and Ms. Pallavi Rajput through hands-on training, live case studies, and guided career support.
          </p>
        </div>

        {/* Three Instructor Cards Grid */}
        <div
          ref={cardsView.ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 items-stretch"
        >
          {INSTRUCTORS.map((instructor, idx) => (
            <InstructorCard
              key={instructor.id}
              instructor={instructor}
              index={idx}
              isVisible={cardsView.isVisible}
            />
          ))}
        </div>

        {/* Shared Mentorship Highlights Strip & CTAs */}
        <div
          ref={pillarsView.ref}
          style={{
            opacity: pillarsView.isVisible ? 1 : 0,
            transform: pillarsView.isVisible
              ? 'translate3d(0, 0, 0)'
              : 'translate3d(0, 24px, 0)',
            transition:
              'opacity 650ms cubic-bezier(0.22, 1, 0.36, 1), transform 650ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
          className="mt-10 bg-[#F5F8FC] rounded-3xl border border-[#0A2055]/10 p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {SHARED_MENTORSHIP_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  style={{
                    opacity: pillarsView.isVisible ? 1 : 0,
                    transform: pillarsView.isVisible
                      ? 'translate3d(0, 0, 0)'
                      : 'translate3d(0, 16px, 0)',
                    transition:
                      'opacity 550ms cubic-bezier(0.22, 1, 0.36, 1), transform 550ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 200ms ease',
                    transitionDelay: `${100 + idx * 90}ms`,
                  }}
                  className="group/pillar bg-white rounded-2xl border border-[#0A2055]/10 p-4 shadow-2xs hover:-translate-y-1 hover:border-[#1455D9]/30 hover:shadow-md"
                >
                  <div className="flex items-center gap-2 text-[#1455D9] font-extrabold text-base sm:text-lg">
                    <Icon className="w-5 h-5 text-[#E4B052] shrink-0 transition-transform duration-300 group-hover/pillar:scale-110 group-hover/pillar:rotate-6" />
                    <span>{pillar.title}</span>
                  </div>
                  <p className="text-xs text-[#17233D]/75 mt-1 font-medium">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <MagneticButton strength={0.18}>
              <button
                type="button"
                onClick={openModal}
                className="group/cta inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0A2055] hover:bg-[#1455D9] active:scale-[0.98] text-white text-sm font-bold rounded-xl transition-all duration-200 cursor-pointer shadow-sm hover:shadow-[0_10px_25px_rgba(20,85,217,0.28)]"
              >
                <Calendar className="w-4 h-4 text-[#E4B052] transition-transform duration-200 group-hover/cta:scale-110" />
                <span>Book a Free Demo Session</span>
                <ArrowRight className="w-4 h-4 text-[#E4B052] transition-transform duration-200 group-hover/cta:translate-x-1" />
              </button>
            </MagneticButton>

            <AppLink
              to="/what-you-learn"
              className="group/link inline-flex items-center gap-1.5 text-sm font-bold text-[#1455D9] hover:text-[#0A2055] transition-colors"
            >
              <span>Explore Full Syllabus</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
            </AppLink>
          </div>
        </div>
      </div>

      {/* Google Calendar Demo Session Booking Modal */}
      {isDemoModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Book a Free Demo Session"
          onClick={resetModal}
          style={{
            opacity: modalEntered ? 1 : 0,
            transition: 'opacity 200ms ease-out',
          }}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              opacity: modalEntered ? 1 : 0,
              transform: modalEntered
                ? 'translate3d(0, 0, 0) scale(1)'
                : 'translate3d(0, 16px, 0) scale(0.96)',
              transition:
                'opacity 240ms cubic-bezier(0.22, 1, 0.36, 1), transform 240ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
            className="w-full max-w-lg bg-white rounded-3xl border border-[#0A2055]/15 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-5 bg-gradient-to-r from-[#0A2055] to-[#1455D9] text-white flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#E4B052]">
                  Live Interactive Session · Asia/Kolkata (IST)
                </p>
                <h3 className="text-lg sm:text-xl font-extrabold">
                  Book a Free Demo Session
                </h3>
              </div>
              <button
                type="button"
                onClick={resetModal}
                aria-label="Close modal"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6">
              {bookedCalendarUrl ? (
                <div className="text-center space-y-4 py-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-extrabold text-[#0A2055]">
                      Demo Slot Reserved!
                    </h4>
                    <p className="text-xs sm:text-sm text-[#17233D]/75 mt-1">
                      Scheduled for <strong>{demoDate}</strong> ({selectedSlot.label}). Click below if Google Calendar didn&apos;t open automatically.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    <a
                      href={bookedCalendarUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#1455D9] hover:bg-[#0A2055] active:scale-[0.98] text-white text-sm font-bold transition-all"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Add to Google Calendar</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      type="button"
                      onClick={resetModal}
                      className="px-5 py-3 rounded-xl border border-[#0A2055]/15 text-sm font-bold text-[#0A2055] hover:bg-[#F5F8FC] active:scale-[0.98] transition-all cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleBookDemoSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0A2055] mb-1.5">
                        Select Date *
                      </label>
                      <input
                        type="date"
                        required
                        min={getTomorrowDateStringIST()}
                        value={demoDate}
                        onChange={(e) => setDemoDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#0A2055]/15 bg-[#F5F8FC] text-[#0A2055] focus:outline-none focus:ring-2 focus:ring-[#1455D9] transition-shadow"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0A2055] mb-1.5">
                        Preferred Time (IST) *
                      </label>
                      <select
                        value={selectedSlotId}
                        onChange={(e) => setSelectedSlotId(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#0A2055]/15 bg-[#F5F8FC] text-[#0A2055] focus:outline-none focus:ring-2 focus:ring-[#1455D9] transition-shadow"
                      >
                        {DEMO_TIME_SLOTS.map((slot) => (
                          <option key={slot.id} value={slot.id}>
                            {slot.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0A2055] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#0A2055]/15 bg-[#F5F8FC] text-[#0A2055] focus:outline-none focus:ring-2 focus:ring-[#1455D9] transition-shadow"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0A2055] mb-1.5">
                        Mobile / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit number"
                        value={studentPhone}
                        onChange={(e) => setStudentPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#0A2055]/15 bg-[#F5F8FC] text-[#0A2055] focus:outline-none focus:ring-2 focus:ring-[#1455D9] transition-shadow"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0A2055] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#0A2055]/15 bg-[#F5F8FC] text-[#0A2055] focus:outline-none focus:ring-2 focus:ring-[#1455D9] transition-shadow"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#17233D]/70 bg-[#F5F8FC] p-3 rounded-xl border border-[#0A2055]/10">
                    <Clock className="w-4 h-4 text-[#1455D9] shrink-0" />
                    <span>
                      Submitting saves your seat and opens <strong>Google Calendar</strong> to add a reminder automatically.
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSaving}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#1455D9] hover:bg-[#0A2055] active:scale-[0.99] disabled:opacity-60 text-white font-bold text-sm transition-all cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-[#E4B052]" />
                    <span>{isSaving ? 'Scheduling...' : 'Confirm & Add to Google Calendar'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};