import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { AppLink } from '../context/RouterContext';
import { PageHeader } from '../components/PageHeader';
import { PageMeta } from '../components/PageMeta';
import { AboutSection } from '../components/AboutSection';
import { KeyMetricsSection } from '../components/KeyMetricsSection';
import { FinalCTA } from '../components/FinalCTA';

export const AboutPage: React.FC = () => {
  return (
    <>
      <PageMeta
        title="About Us | AASAN LIFE Insurance Training"
        description="Learn about AASAN LIFE, our mission to simplify online insurance education, and how we prepare aspiring learners for industry opportunities."
        keywords="About AASAN LIFE, Insurance Learning Platform, Online Insurance Education, Insurance Career Foundation"
      />
      <PageHeader
        eyebrow="About Us"
        title="Making Insurance Learning Easier"
        description="AASAN LIFE is an online insurance training platform focused on educating and preparing aspiring individuals for opportunities in the insurance sector."
        ctaLabel="Explore Internship Program"
        ctaTo="/internship-program"
      />

      <AboutSection />

      {/* Purpose & Educational Approach */}
      <section className="py-14 sm:py-16 bg-[#F5F8FC] border-y border-[#0A2055]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-[#0A2055]/10 rounded-2xl p-7 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1455D9]">
                <ShieldCheck className="w-4 h-4 text-[#FF851B]" aria-hidden="true" />
                <span>Our Educational Philosophy</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2055] tracking-tight">
                Clarity Before Complexity
              </h2>
              <p className="text-base text-[#17233D]/80 leading-relaxed">
                Many students, graduates, and job seekers want to explore careers in insurance but
                struggle to find structured training that explains how policies, corporate coverage,
                risk assessment, and operations work in practice. AASAN LIFE bridges that gap
                through focused online training designed for real-world understanding.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <AppLink
                to="/what-you-learn"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#1455D9] hover:bg-[#0A2055] rounded-lg transition-colors"
              >
                <span>See What You Learn</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </AppLink>
              <AppLink
                to="/contact-us"
                className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-[#0A2055] bg-[#F5F8FC] hover:bg-[#0A2055]/8 border border-[#0A2055]/15 rounded-lg transition-colors"
              >
                Contact Our Team
              </AppLink>
            </div>
          </div>
        </div>
      </section>

      <KeyMetricsSection />
      <FinalCTA />
    </>
  );
};
