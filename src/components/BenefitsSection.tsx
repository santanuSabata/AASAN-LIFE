import React from 'react';
import { MonitorPlay, BookCheck, BriefcaseBusiness, TrendingUp } from 'lucide-react';

interface BenefitItem {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const BENEFITS: BenefitItem[] = [
  {
    title: 'Flexible Online Learning',
    description: 'Learn through an online training environment.',
    icon: MonitorPlay,
  },
  {
    title: 'Industry-Focused Curriculum',
    description: 'Explore concepts relevant to the insurance industry.',
    icon: BookCheck,
  },
  {
    title: 'Practical Knowledge',
    description: 'Understand insurance products, operations and business applications.',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Career-Oriented Development',
    description:
      'Build foundational knowledge to prepare for opportunities in the insurance sector.',
    icon: TrendingUp,
  },
];

export const BenefitsSection: React.FC = () => {
  return (
    <section id="benefits" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-14">
          <p className="text-sm font-semibold text-[#1455D9] mb-2">Why Choose AASAN LIFE</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0A2055] tracking-tight">
            Why Start Your Insurance Learning Journey With Us?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <article
                key={benefit.title}
                className="bg-[#F5F8FC]/55 border border-[#0A2055]/10 rounded-xl p-6 hover:bg-white hover:border-[#1455D9]/30 hover:shadow-[0_10px_28px_rgba(10,32,85,0.06)] transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0A2055] flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-[#FF851B]" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-[#0A2055] mb-2">{benefit.title}</h3>
                <p className="text-sm sm:text-base text-[#17233D]/80 leading-relaxed">
                  {benefit.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
