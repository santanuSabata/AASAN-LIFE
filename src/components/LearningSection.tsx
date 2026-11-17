import React from 'react';
import {
  ShieldCheck,
  Layers,
  Building2,
  FileCheck2,
  Scale,
  MessageSquareMore,
} from 'lucide-react';

interface CurriculumModule {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CURRICULUM_MODULES: CurriculumModule[] = [
  {
    title: 'Fundamentals of Insurance',
    description:
      'Learn the basic principles of insurance, risk protection, insurance terminology and how the insurance industry works.',
    icon: ShieldCheck,
  },
  {
    title: 'Life & General Insurance',
    description:
      'Understand the difference between life insurance and general insurance and explore their key products.',
    icon: Layers,
  },
  {
    title: 'Corporate Insurance',
    description:
      'Get introduced to corporate insurance products such as Fire, Marine, Engineering, Group Health and Liability Insurance.',
    icon: Building2,
  },
  {
    title: 'Insurance Operations',
    description:
      'Understand insurance processes, documentation, policy structures and basic operational activities.',
    icon: FileCheck2,
  },
  {
    title: 'Risk Assessment',
    description:
      'Learn how businesses identify, understand and manage different types of risks.',
    icon: Scale,
  },
  {
    title: 'Professional Skills',
    description:
      'Develop communication, customer interaction, research and professional understanding of the insurance sector.',
    icon: MessageSquareMore,
  },
];

export const LearningSection: React.FC = () => {
  return (
    <section id="curriculum" className="py-16 sm:py-20 bg-[#F5F8FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-14">
          <p className="text-sm font-semibold text-[#1455D9] mb-2">Programme Curriculum</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0A2055] tracking-tight">
            What Will You Learn During the Programme?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {CURRICULUM_MODULES.map((module) => {
            const Icon = module.icon;
            return (
              <article
                key={module.title}
                className="bg-white border border-[#0A2055]/10 rounded-xl p-6 sm:p-7 hover:border-[#1455D9]/35 hover:shadow-[0_10px_28px_rgba(10,32,85,0.06)] transition-all duration-200 flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F5F8FC] border border-[#1455D9]/15 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-[#1455D9]" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-[#0A2055] mb-2.5">{module.title}</h3>
                <p className="text-base text-[#17233D]/80 leading-relaxed">{module.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
