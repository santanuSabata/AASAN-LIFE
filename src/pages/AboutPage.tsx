import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { AppLink } from '../context/RouterContext';
import { PageHeader } from '../components/PageHeader';
import { PageMeta } from '../components/PageMeta';
import { AboutSection } from '../components/AboutSection';
import { KeyMetricsSection } from '../components/KeyMetricsSection';
import { FinalCTA } from '../components/FinalCTA';
import BannerImg from '../assets/images/AboutUs.jpeg';

function useInViewport(threshold = 0.05) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Immediately show if already in or above the viewport on mount/route change
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
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

interface MotionBlockProps {
  children: React.ReactNode;
  variant?: 'up' | 'scale';
  delayMs?: number;
  className?: string;
}

const MotionBlock: React.FC<MotionBlockProps> = ({
  children,
  variant = 'up',
  delayMs = 0,
  className = '',
}) => {
  const { ref, isVisible } = useInViewport(0.05);

  const hiddenTransform =
    variant === 'scale'
      ? 'translate3d(0, 16px, 0) scale(0.97)'
      : 'translate3d(0, 24px, 0)';
  const visibleTransform = 'translate3d(0, 0, 0) scale(1)';

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? visibleTransform : hiddenTransform,
        transitionProperty: 'opacity, transform',
        transitionDuration: '650ms',
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
        transitionDelay: `${delayMs}ms`,
        willChange: 'transform, opacity',
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export const AboutPage: React.FC = () => {
  return (
    <>
      <PageMeta
        title="About Us | AASAN BIMA EDUCATION Insurance Training"
        description="Learn about AASAN BIMA EDUCATION, our mission to simplify online insurance education, and how we prepare aspiring learners for industry opportunities."
        keywords="About AASAN BIMA EDUCATION, Insurance Learning Platform, Online Insurance Education, Insurance Career Foundation"
      />
      <PageHeader
        eyebrow="About Us"
        title="Making Insurance Learning Easier"
        description="AASAN BIMA EDUCATION is an online insurance training platform focused on educating and preparing aspiring individuals for opportunities in the insurance sector."
        ctaLabel="Explore Internship Program"
        ctaTo="/internship-program"
        imageUrl={BannerImg}
        imageAlt="Students attending online insurance training session"
      />

      <MotionBlock variant="up">
        <AboutSection />
      </MotionBlock>

      {/* Purpose & Educational Approach */}
      <section className="py-14 sm:py-16 bg-[#F5F8FC] border-y border-[#0A2055]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionBlock variant="scale" delayMs={60}>
            <div className="group bg-white border border-[#0A2055]/10 rounded-2xl p-7 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-[0_6px_24px_rgba(10,32,85,0.04)] hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(10,32,85,0.08)] transition-all duration-300">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1455D9]">
                  <ShieldCheck
                    className="w-4 h-4 text-[#E4B052] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
                    aria-hidden="true"
                  />
                  <span>Our Educational Philosophy</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2055] tracking-tight">
                  Clarity Before Complexity
                </h2>
                <p className="text-base text-[#17233D]/80 leading-relaxed">
                  Many students, graduates, and job seekers want to explore careers in insurance but
                  struggle to find structured training that explains how policies, corporate coverage,
                  risk assessment, and operations work in practice. AASAN BIMA EDUCATION bridges that gap
                  through focused online training designed for real-world understanding.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                <AppLink
                  to="/what-you-learn"
                  className="group/btn w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#1455D9] hover:bg-[#0A2055] active:scale-[0.99] rounded-lg transition-all duration-200"
                >
                  <span>See What You Learn</span>
                  <ArrowRight
                    className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1"
                    aria-hidden="true"
                  />
                </AppLink>
                <AppLink
                  to="/contact-us"
                  className="w-full inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-[#0A2055] bg-[#F5F8FC] hover:bg-[#0A2055]/8 active:scale-[0.99] border border-[#0A2055]/15 rounded-lg transition-all duration-200"
                >
                  Contact Our Team
                </AppLink>
              </div>
            </div>
          </MotionBlock>
        </div>
      </section>

      <MotionBlock variant="up" delayMs={60}>
        <KeyMetricsSection />
      </MotionBlock>

      <MotionBlock variant="up" delayMs={80}>
        <FinalCTA />
      </MotionBlock>
    </>
  );
};