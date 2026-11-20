import React from 'react';
import { BookOpen, Briefcase, Compass, Sparkles } from 'lucide-react';

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
    description: 'Understand insurance concepts, products and industry fundamentals from the ground up.',
    icon: BookOpen,
  },
  {
    number: '02',
    title: 'Industry-Oriented Learning',
    description: 'Explore how insurance works in real business environments with practical use cases.',
    icon: Briefcase,
  },
  {
    number: '03',
    title: 'Career Development',
    description: 'Develop professional knowledge, skills, and confidence relevant to the insurance sector.',
    icon: Compass,
  },
];

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-28 bg-gradient-to-b from-white via-[#F5F8FC]/40 to-white relative overflow-hidden">
      {/* Background Decorative Glow Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1455D9]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1455D9]/10 text-[#1455D9] text-xs font-semibold tracking-wider uppercase mb-4 border border-[#1455D9]/20 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#E4B052]" />
            About AASAN BIMA EDUCATION
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0A2055] tracking-tight mb-6 leading-tight">
            Making Insurance Learning <span className="text-[#1455D9]">Easier</span>
          </h2>
          
          <p className="text-base sm:text-lg text-[#17233D]/80 leading-relaxed mb-4">
            At AASAN BIMA EDUCATION, we believe that understanding the insurance industry should be accessible
            to everyone. Our online training and paid internship programme is designed to introduce
            aspiring professionals to insurance concepts, industry operations and practical
            knowledge.
          </p>
          <p className="text-base sm:text-lg text-[#17233D]/80 leading-relaxed">
            We aim to help individuals develop the understanding and confidence required to explore
            opportunities in the insurance sector.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {ABOUT_FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                className="group relative bg-white border border-[#0A2055]/10 rounded-2xl p-8 shadow-xs hover:shadow-[0_16px_40px_rgba(10,32,85,0.08)] hover:border-[#1455D9]/30 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* Top Row: Icon & Number Badge */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0A2055] to-[#1455D9] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-[#E4B052]" aria-hidden="true" />
                    </div>
                    <span className="font-mono text-base font-bold text-[#1455D9]/60 group-hover:text-[#1455D9] transition-colors">
                      {feature.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0A2055] mb-3 group-hover:text-[#1455D9] transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-[#17233D]/75 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom decorative accent line */}
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#0A2055]/10 to-transparent group-hover:via-[#1455D9] transition-all duration-500 mt-6 rounded-full" />
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};