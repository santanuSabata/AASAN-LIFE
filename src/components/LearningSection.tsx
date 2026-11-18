import React, { useState } from 'react';
import {
  ShieldCheck,
  Layers,
  Building2,
  FileCheck2,
  Scale,
  MessageSquareMore,
  Check,
  ChevronDown,
} from 'lucide-react';

interface CurriculumModule {
  moduleCode: string;
  title: string;
  description: string;
  topics: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const CURRICULUM_MODULES: CurriculumModule[] = [
  {
    moduleCode: 'Module 01',
    title: 'Fundamentals of Insurance',
    description:
      'Learn the basic principles of insurance, risk protection, insurance terminology and how the insurance industry works.',
    topics: [
      'Core principles of risk protection and pooling',
      'Essential insurance terminology and key roles',
      'Overview of how the insurance ecosystem operates',
    ],
    icon: ShieldCheck,
  },
  {
    moduleCode: 'Module 02',
    title: 'Life & General Insurance',
    description:
      'Understand the difference between life insurance and general insurance and explore their key products.',
    topics: [
      'Life insurance vs. general insurance structures',
      'Overview of personal protection and health policies',
      'How policyholders and insurers interact across products',
    ],
    icon: Layers,
  },
  {
    moduleCode: 'Module 03',
    title: 'Corporate Insurance',
    description:
      'Get introduced to corporate insurance products such as Fire, Marine, Engineering, Group Health and Liability Insurance.',
    topics: [
      'Fire, Marine, and Engineering policy introductions',
      'Employee protection via Group Health insurance',
      'Business protection through Liability coverage basics',
    ],
    icon: Building2,
  },
  {
    moduleCode: 'Module 04',
    title: 'Insurance Operations',
    description:
      'Understand insurance processes, documentation, policy structures and basic operational activities.',
    topics: [
      'Proposal, policy issuance, and documentation basics',
      'Understanding policy structure and schedules',
      'Day-to-day operational workflows in insurance teams',
    ],
    icon: FileCheck2,
  },
  {
    moduleCode: 'Module 05',
    title: 'Risk Assessment',
    description:
      'Learn how businesses identify, understand and manage different types of risks.',
    topics: [
      'Identifying operational and financial risk exposures',
      'Understanding how risk evaluation guides coverage',
      'Practical frameworks for risk awareness and mitigation',
    ],
    icon: Scale,
  },
  {
    moduleCode: 'Module 06',
    title: 'Professional Skills',
    description:
      'Develop communication, customer interaction, research and professional understanding of the insurance sector.',
    topics: [
      'Clear professional communication and client interaction',
      'Structured industry research and policy comparison',
      'Workplace readiness for insurance sector environments',
    ],
    icon: MessageSquareMore,
  },
];

export const LearningSection: React.FC = () => {
  const [expandedModule, setExpandedModule] = useState<string | null>(
    CURRICULUM_MODULES[0].moduleCode
  );

  const toggleModule = (code: string) => {
    setExpandedModule((prev) => (prev === code ? null : code));
  };

  return (
    <section id="curriculum" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-14">
          <p className="text-sm font-semibold text-[#1455D9] mb-2">Programme Curriculum</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0A2055] tracking-tight mb-3">
            What Will You Learn During the Programme?
          </h2>
          <p className="text-base text-[#17233D]/75">
            Explore the 6 structured modules covering insurance fundamentals, corporate products,
            operations, risk assessment, and professional skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {CURRICULUM_MODULES.map((module) => {
            const Icon = module.icon;
            const isExpanded = expandedModule === module.moduleCode;

            return (
              <article
                key={module.title}
                className={`border rounded-2xl p-6 sm:p-7 transition-all duration-200 flex flex-col justify-between ${
                  isExpanded
                    ? 'bg-[#F5F8FC]/85 border-[#1455D9]/35 shadow-[0_10px_28px_rgba(10,32,85,0.07)]'
                    : 'bg-[#F5F8FC]/45 border-[#0A2055]/10 hover:bg-white hover:border-[#1455D9]/30'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-white border border-[#1455D9]/15 flex items-center justify-center shadow-2xs">
                      <Icon className="w-6 h-6 text-[#1455D9]" aria-hidden="true" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1455D9]">
                      {module.moduleCode}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0A2055] mb-2.5">{module.title}</h3>
                  <p className="text-sm sm:text-base text-[#17233D]/80 leading-relaxed mb-4">
                    {module.description}
                  </p>
                </div>

                {/* Interactive Syllabus Topics Toggle (cbacademy-style module breakdown) */}
                <div className="pt-4 border-t border-[#0A2055]/10">
                  <button
                    type="button"
                    onClick={() => toggleModule(module.moduleCode)}
                    aria-expanded={isExpanded}
                    className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#0A2055] hover:text-[#1455D9] transition-colors py-1"
                  >
                    <span>{isExpanded ? 'Hide Key Topics' : 'View Key Topics'}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#1455D9] transition-transform duration-200 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  <div className="accordion-panel" data-open={isExpanded}>
                    <div className="accordion-inner">
                      <ul className="pt-3 space-y-2">
                        {module.topics.map((topic) => (
                          <li
                            key={topic}
                            className="flex items-start gap-2 text-xs sm:text-sm text-[#17233D]/85"
                          >
                            <Check
                              className="w-4 h-4 text-[#FF851B] shrink-0 mt-0.5"
                              aria-hidden="true"
                            />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
