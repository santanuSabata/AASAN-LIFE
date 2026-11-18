import React from 'react';
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Compass,
  PhoneCall,
} from 'lucide-react';
import { AppLink, AppRoutePath } from '../context/RouterContext';
import { HeroSection } from '../components/HeroSection';
import { KeyMetricsSection } from '../components/KeyMetricsSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { FinalCTA } from '../components/FinalCTA';
import { PageMeta } from '../components/PageMeta';

interface HomePageProps {
  onOpenModal: () => void;
}

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
    title: 'About AASAN LIFE',
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

export const HomePage: React.FC<HomePageProps> = ({ onOpenModal }) => {
  return (
    <>
      <PageMeta
        title="AASAN LIFE | Online Insurance Training & Internship"
        description="Join AASAN LIFE's 100% Online Paid Insurance Internship Programme. Learn insurance fundamentals, corporate policies, risk, and operations today."
        keywords="Online Insurance Training, Paid Insurance Internship, Insurance Internship Programme, AASAN LIFE"
      />
      <HeroSection onOpenModal={onOpenModal} />

      {/* 4-Column Quick Overview Strip */}
      <section className="border-b border-[#0A2055]/10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 lg:divide-x divide-[#0A2055]/10">
            {PROGRAMME_FACTS.map((item, idx) => (
              <div key={item.label} className={`pt-3 sm:pt-0 ${idx > 0 ? 'lg:pl-6' : ''}`}>
                <p className="text-xs font-bold uppercase tracking-wider text-[#1455D9] mb-1">
                  {item.label}
                </p>
                <p className="font-[family-name:var(--font-display)] text-lg sm:text-xl font-extrabold text-[#0A2055]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Dedicated Pages Directory */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-sm font-semibold text-[#1455D9] mb-2">
              Explore AASAN LIFE
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0A2055] tracking-tight mb-3">
              Everything You Need to Know Before Enrolling
            </h2>
            <p className="text-base sm:text-lg text-[#17233D]/80 leading-relaxed">
              Navigate directly to dedicated sections for our background, curriculum, programme
              structure, learner benefits, and enquiry support.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
            {PAGE_DIRECTORY.map((card, idx) => {
              const Icon = card.icon;
              const spanClass =
                idx < 3
                  ? 'lg:col-span-2'
                  : idx === 3
                  ? 'lg:col-span-3'
                  : 'lg:col-span-3 sm:col-span-2';
              return (
                <article
                  key={card.title}
                  className={`${spanClass} bg-[#F5F8FC]/65 border border-[#0A2055]/10 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:bg-white hover:border-[#1455D9]/35 hover:shadow-[0_10px_28px_rgba(10,32,85,0.06)] transition-all duration-200`}
                >
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-[#0A2055] flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-[#FF851B]" aria-hidden="true" />
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
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </AppLink>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <KeyMetricsSection />
      <TestimonialsSection />
      <FinalCTA />
    </>
  );
};
