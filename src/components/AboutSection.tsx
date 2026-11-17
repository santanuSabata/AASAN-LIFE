import React from 'react';
import { BookOpen, Briefcase, Compass } from 'lucide-react';

interface AboutFeature {
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ABOUT_FEATURES: AboutFeature[] = [
  {
    number: '01',
    title: 'Learn from Basics',
    description: 'Understand insurance concepts, products and industry fundamentals.',
    icon: BookOpen,
  },
  {
    number: '02',
    title: 'Industry-Oriented Learning',
    description: 'Explore how insurance works in real business environments.',
    icon: Briefcase,
  },
  {
    number: '03',
    title: 'Career Development',
    description: 'Develop professional knowledge and skills relevant to the insurance industry.',
    icon: Compass,
  },
];

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-14">
          <p className="text-sm font-semibold text-[#1455D9] mb-2">About AASAN LIFE</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0A2055] tracking-tight mb-5">
            Making Insurance Learning Easier
          </h2>
          <p className="text-base sm:text-lg text-[#17233D]/80 leading-relaxed mb-4">
            At AASAN LIFE, we believe that understanding the insurance industry should be accessible
            to everyone. Our online training and paid internship programme is designed to introduce
            aspiring professionals to insurance concepts, industry operations and practical
            knowledge.
          </p>
          <p className="text-base sm:text-lg text-[#17233D]/80 leading-relaxed">
            We aim to help individuals develop the understanding and confidence required to explore
            opportunities in the insurance sector.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {ABOUT_FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                className="bg-[#F5F8FC]/65 border border-[#0A2055]/10 rounded-xl p-7 hover:bg-white hover:shadow-[0_10px_28px_rgba(10,32,85,0.07)] transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#0A2055] text-white flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#FF851B]" aria-hidden="true" />
                  </div>
                  <span className="font-[family-name:var(--font-display)] text-sm font-bold text-[#1455D9] tabular-nums">
                    {feature.number}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#0A2055] mb-2.5">{feature.title}</h3>
                <p className="text-base text-[#17233D]/80 leading-relaxed">{feature.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
