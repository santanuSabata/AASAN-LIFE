import React from 'react';
import { ClipboardEdit, PhoneCall, Laptop } from 'lucide-react';

interface ProcessStep {
  stepNumber: string;
  label: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const STEPS: ProcessStep[] = [
  {
    stepNumber: '01',
    label: 'STEP 01',
    title: 'Submit Your Enquiry',
    description: 'Fill out the online enquiry form with your basic details.',
    icon: ClipboardEdit,
  },
  {
    stepNumber: '02',
    label: 'STEP 02',
    title: 'Connect With Our Team',
    description:
      'Our team will contact you to explain the internship programme, fee structure and enrolment process.',
    icon: PhoneCall,
  },
  {
    stepNumber: '03',
    label: 'STEP 03',
    title: 'Begin Your Learning Journey',
    description: 'Complete the enrolment process and start your online training programme.',
    icon: Laptop,
  },
];

export const ProcessSection: React.FC = () => {
  return (
    <section id="how-to-join" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <p className="text-sm font-semibold text-[#1455D9] mb-2">How to Join</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0A2055] tracking-tight">
            Start Your Journey in 3 Simple Steps
          </h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {/* Connecting line across desktop steps */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-8 left-[16.66%] right-[16.66%] h-0.5 bg-gradient-to-r from-[#1455D9]/25 via-[#E4B052]/50 to-[#1455D9]/25"
          />

          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <article
                key={step.stepNumber}
                className="relative flex flex-col items-center text-center bg-[#F5F8FC]/60 border border-[#0A2055]/10 rounded-xl p-7 pt-8"
              >
                <div className="relative z-10 w-16 h-16 rounded-full bg-[#0A2055] text-white flex items-center justify-center mb-5 ring-8 ring-white shadow-sm">
                  <span className="font-[family-name:var(--font-display)] text-lg font-extrabold tabular-nums text-white">
                    {step.stepNumber}
                  </span>
                  <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#E4B052] flex items-center justify-center shadow-xs">
                    <Icon className="w-3.5 h-3.5 text-[#0A2055]" aria-hidden="true" />
                  </span>
                </div>

                <p className="text-xs font-bold tracking-wider text-[#1455D9] uppercase mb-1.5">
                  {step.label}
                </p>
                <h3 className="text-xl font-bold text-[#0A2055] mb-2.5">{step.title}</h3>
                <p className="text-sm sm:text-base text-[#17233D]/80 leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
