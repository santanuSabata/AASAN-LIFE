import React, { useState } from 'react';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Compass,
  GraduationCap,
  Search,
  Shield,
} from 'lucide-react';
import { AppLink } from '../context/RouterContext';

interface AudienceSegment {
  id: string;
  title: string;
  summary: string;
  challenge: string;
  approach: string;
  takeaways: string[];
  focusModules: string;
  icon: React.ComponentType<{ className?: string }>;
}

const AUDIENCE_SEGMENTS: AudienceSegment[] = [
  {
    id: 'college-students',
    title: 'College Students',
    summary: 'Build insurance sector awareness alongside your ongoing college studies.',
    challenge:
      'Academic coursework rarely explains how life, general, and corporate insurance teams actually work day-to-day.',
    approach:
      'A flexible online learning format that introduces insurance terminology, policy structures, and industry workflows from the ground up.',
    takeaways: [
      'Understand core insurance principles before graduation',
      'Explore corporate and retail insurance product categories',
      'Build practical industry vocabulary and communication skills',
    ],
    focusModules: 'Fundamentals of Insurance · Life & General Insurance',
    icon: GraduationCap,
  },
  {
    id: 'fresh-graduates',
    title: 'Fresh Graduates',
    summary: 'Gain structured industry knowledge as you prepare for professional opportunities.',
    challenge:
      'Stepping out of college without domain familiarity makes it harder to navigate interviews and entry-level industry conversations.',
    approach:
      'Industry-oriented online training covering insurance operations, policy documentation, and risk assessment fundamentals.',
    takeaways: [
      'Bridge classroom theory with real insurance sector operations',
      'Understand policy documentation and operational workflows',
      'Strengthen research, communication, and client interaction skills',
    ],
    focusModules: 'Insurance Operations · Professional Skills',
    icon: Award,
  },
  {
    id: 'job-seekers',
    title: 'Job Seekers',
    summary: 'Develop foundational insurance knowledge to explore opportunities in the sector.',
    challenge:
      'Exploring openings in insurance without clear knowledge of products, risk concepts, and documentation slows down confidence.',
    approach:
      'Structured online training designed to clarify both retail and corporate insurance products alongside operational essentials.',
    takeaways: [
      'Build clarity across Life, General, and Corporate Insurance',
      'Learn how businesses assess and manage risk',
      'Prepare thoughtfully for insurance sector discussions',
    ],
    focusModules: 'Corporate Insurance · Risk Assessment',
    icon: Search,
  },
  {
    id: 'career-explorers',
    title: 'Career Explorers',
    summary: 'Discover how the insurance sector operates before making your next move.',
    challenge:
      'Evaluating a new industry feels uncertain when reliable, structured introductory training is hard to find.',
    approach:
      'An accessible online internship programme offering guided exposure to insurance concepts and real business applications.',
    takeaways: [
      'Explore how insurance supports individuals and enterprises',
      'Understand key policy types including Fire, Marine, and Group Health',
      'Assess where your strengths align inside the insurance industry',
    ],
    focusModules: 'Corporate Insurance · Insurance Operations',
    icon: Compass,
  },
  {
    id: 'interested-individuals',
    title: 'Individuals Interested in Insurance',
    summary: 'Learn insurance concepts from scratch in a structured online environment.',
    challenge:
      'Technical policy jargon and scattered resources make insurance seem overly complex to newcomers.',
    approach:
      'Clear, step-by-step online modules tailored for anyone curious to learn how insurance works in practice.',
    takeaways: [
      'Learn risk protection principles in plain, accessible language',
      'Gain structured exposure through a paid online internship',
      'Develop confidence across core insurance concepts',
    ],
    focusModules: 'Fundamentals of Insurance · Risk Assessment',
    icon: Shield,
  },
];

export const EligibilitySection: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(AUDIENCE_SEGMENTS[0].id);
  const selectedSegment =
    AUDIENCE_SEGMENTS.find((s) => s.id === selectedId) ?? AUDIENCE_SEGMENTS[0];
  const SelectedIcon = selectedSegment.icon;

  return (
    <section
      id="who-can-apply"
      className="py-16 sm:py-20 bg-[#F5F8FC] border-y border-[#0A2055]/8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-14">
          <p className="text-sm font-semibold text-[#1455D9] mb-2">Who Can Apply</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0A2055] tracking-tight mb-4">
            Who Can Join Our Internship Programme?
          </h2>
          <p className="text-base sm:text-lg text-[#17233D]/80 leading-relaxed">
            Our programme is designed for individuals who are interested in learning about the
            insurance industry.
          </p>
        </div>

        {/* Interactive 5/7 Split Explorer (cbacademy.online signature section pattern) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left 5 Columns: Segment Selector */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-[#0A2055]/65 mb-1">
              Select Your Profile
            </p>
            {AUDIENCE_SEGMENTS.map((segment) => {
              const Icon = segment.icon;
              const isActive = segment.id === selectedSegment.id;

              return (
                <button
                  key={segment.id}
                  type="button"
                  onClick={() => setSelectedId(segment.id)}
                  aria-pressed={isActive}
                  className={`w-full text-left flex items-center justify-between gap-4 p-4 rounded-xl border transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1455D9] ${
                    isActive
                      ? 'bg-[#0A2055] text-white border-[#0A2055] shadow-[0_8px_24px_rgba(10,32,85,0.16)] lg:translate-x-1.5'
                      : 'bg-white text-[#0A2055] border-[#0A2055]/10 hover:border-[#1455D9]/35 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive
                          ? 'bg-white/12 text-[#FF851B]'
                          : 'bg-[#F5F8FC] text-[#1455D9]'
                      }`}
                    >
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-[family-name:var(--font-display)] text-base font-bold truncate">
                        {segment.title}
                      </p>
                      <p
                        className={`text-xs truncate mt-0.5 ${
                          isActive ? 'text-white/75' : 'text-[#17233D]/65'
                        }`}
                      >
                        {segment.summary}
                      </p>
                    </div>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-[#FF851B]' : 'text-[#0A2055]/40'
                    }`}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>

          {/* Right 7 Columns: Dynamic Segment Detail Panel */}
          <div className="lg:col-span-7 flex">
            <div className="w-full bg-white border border-[#0A2055]/12 rounded-2xl p-6 sm:p-8 shadow-[0_12px_34px_rgba(10,32,85,0.06)] flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center gap-4 pb-5 border-b border-[#0A2055]/10">
                  <div className="w-12 h-12 rounded-xl bg-[#0A2055] flex items-center justify-center shrink-0">
                    <SelectedIcon className="w-6 h-6 text-[#FF851B]" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#1455D9]">
                      Participant Pathway
                    </p>
                    <h3 className="text-2xl font-bold text-[#0A2055]">
                      {selectedSegment.title}
                    </h3>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#0A2055]/60 mb-1">
                      Common Starting Challenge
                    </p>
                    <p className="text-sm sm:text-base text-[#17233D]/80 leading-relaxed">
                      {selectedSegment.challenge}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F5F8FC] border border-[#1455D9]/15">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#1455D9] mb-1">
                      How AASAN LIFE Helps
                    </p>
                    <p className="text-sm sm:text-base text-[#0A2055] leading-relaxed">
                      {selectedSegment.approach}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#0A2055]/60 mb-2.5">
                      Key Learning Outcomes
                    </p>
                    <ul className="space-y-2.5">
                      {selectedSegment.takeaways.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm sm:text-base font-medium text-[#17233D]"
                        >
                          <CheckCircle2
                            className="w-5 h-5 text-[#FF851B] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#0A2055]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#0A2055]/55">
                    Relevant Programme Focus
                  </p>
                  <p className="text-sm font-bold text-[#0A2055] mt-0.5">
                    {selectedSegment.focusModules}
                  </p>
                </div>

                <AppLink
                  to="/contact-us"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base font-semibold text-white bg-[#1455D9] hover:bg-[#0A2055] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 shadow-[0_6px_18px_rgba(20,85,217,0.22)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1455D9]"
                >
                  <span>Start Your Journey</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </AppLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
