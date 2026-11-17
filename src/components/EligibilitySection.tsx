import React from 'react';
import {
  ArrowRight,
  GraduationCap,
  Award,
  Search,
  Compass,
  Shield,
} from 'lucide-react';

interface AudienceGroup {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ELIGIBLE_GROUPS: AudienceGroup[] = [
  {
    title: 'College Students',
    subtitle: 'Build practical insurance sector awareness alongside your studies.',
    icon: GraduationCap,
  },
  {
    title: 'Fresh Graduates',
    subtitle: 'Gain structured industry knowledge as you prepare for professional roles.',
    icon: Award,
  },
  {
    title: 'Job Seekers',
    subtitle: 'Strengthen your understanding of insurance products and operations.',
    icon: Search,
  },
  {
    title: 'Career Explorers',
    subtitle: 'Discover how life, general, and corporate insurance teams operate.',
    icon: Compass,
  },
  {
    title: 'Individuals Interested in Insurance',
    subtitle: 'Anyone eager to learn insurance fundamentals from the ground up.',
    icon: Shield,
  },
];

export const EligibilitySection: React.FC = () => {
  return (
    <section
      id="who-can-apply"
      className="py-16 sm:py-20 bg-[#F5F8FC] border-y border-[#0A2055]/8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-sm font-semibold text-[#1455D9] mb-2">Who Can Apply</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0A2055] tracking-tight mb-4">
            Who Can Join Our Internship Programme?
          </h2>
          <p className="text-base sm:text-lg text-[#17233D]/80 leading-relaxed">
            Our programme is designed for individuals who are interested in learning about the
            insurance industry.
          </p>
        </div>

        {/* Balanced 5-card grid (3 on first row + 2 centered on second row on lg) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 mb-10">
          {ELIGIBLE_GROUPS.map((group, index) => {
            const Icon = group.icon;
            const spanClass =
              index < 3
                ? 'lg:col-span-2'
                : index === 3
                ? 'lg:col-span-2 lg:col-start-2'
                : 'lg:col-span-2 sm:col-span-2 lg:col-start-4';

            return (
              <article
                key={group.title}
                className={`${spanClass} bg-white border border-[#0A2055]/10 rounded-xl p-6 flex items-start gap-4 hover:border-[#1455D9]/35 hover:shadow-[0_8px_24px_rgba(10,32,85,0.06)] transition-all duration-200`}
              >
                <div className="w-11 h-11 rounded-xl bg-[#F5F8FC] border border-[#1455D9]/15 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#1455D9]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0A2055] mb-1.5">{group.title}</h3>
                  <p className="text-sm text-[#17233D]/75 leading-relaxed">{group.subtitle}</p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="text-center">
          <a
            href="#enquiry-form"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-[#1455D9] hover:bg-[#0A2055] rounded-lg transition-colors duration-150 shadow-[0_6px_18px_rgba(20,85,217,0.22)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1455D9]"
          >
            <span>Start Your Journey</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};
