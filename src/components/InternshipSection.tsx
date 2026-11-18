import React from 'react';
import { ArrowRight, Check, Laptop, Shield, Layers, Award } from 'lucide-react';

const PROGRAMME_HIGHLIGHTS = [
  { label: 'Online Training', icon: Laptop },
  { label: 'Insurance Industry Knowledge', icon: Shield },
  { label: 'Practical Learning Exposure', icon: Layers },
  { label: 'Professional Skill Development', icon: Award },
];

const PROGRAMME_METRICS = [
  { label: 'Programme Type', value: 'Online Internship' },
  { label: 'Category', value: 'Insurance Training' },
  { label: 'Programme Nature', value: 'Paid Internship' },
  { label: 'Learning Mode', value: '100% Online' },
];

const PROGRAMME_SPECS = [
  { label: 'Programme Type', value: 'Online Internship' },
  { label: 'Programme Category', value: 'Insurance Industry Training' },
  { label: 'Programme Nature', value: 'Paid Internship' },
  { label: 'Learning Mode', value: 'Online' },
  {
    label: 'Programme Details',
    value: 'Contact our team for duration, fee structure and enrolment information.',
  },
];

export const InternshipSection: React.FC = () => {
  return (
    <section id="internship-programme" className="bg-white">
      {/* 4-Column Quick Overview Strip (cbacademy-style clean summary row) */}
      <div className="border-b border-[#0A2055]/10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 lg:divide-x divide-[#0A2055]/10">
            {PROGRAMME_METRICS.map((item, idx) => (
              <div
                key={item.label}
                className={`pt-3 sm:pt-0 ${idx > 0 ? 'lg:pl-6' : ''}`}
              >
                <p className="text-xs font-bold uppercase tracking-wider text-[#1455D9] mb-1">
                  {item.label}
                </p>
                <p className="font-[family-name:var(--font-display)] text-lg sm:text-xl font-extrabold text-[#0A2055]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navy Showcase Band */}
      <div className="py-16 sm:py-20 bg-[#0A2055] text-white relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#1455D9]/25 blur-3xl"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-6">
              <p className="text-sm font-semibold text-[#FF851B] mb-2.5">
                Internship Programme
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
                Explore Our Online Paid Internship Programme
              </h2>
              <p className="text-base sm:text-lg text-white/85 leading-relaxed mb-8 max-w-xl">
                Start your journey into the insurance industry with structured online training and
                industry-focused learning.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PROGRAMME_HIGHLIGHTS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="flex items-center gap-3.5 p-4 rounded-xl bg-white/8 border border-white/12"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#1455D9] flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-[#FF851B]" aria-hidden="true" />
                      </div>
                      <span className="text-sm sm:text-base font-semibold text-white">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Programme Card */}
            <div className="lg:col-span-6">
              <div className="bg-white text-[#17233D] rounded-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.22)]">
                <div className="flex items-center justify-between gap-4 pb-5 mb-6 border-b border-[#0A2055]/10">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0A2055]">
                      Programme Overview
                    </h3>
                    <p className="text-sm text-[#17233D]/70 mt-0.5">
                      AASAN LIFE · Insurance Industry Training
                    </p>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-[#F5F8FC] border border-[#0A2055]/10 flex items-center justify-center shrink-0">
                    <Check className="w-5 h-5 text-[#FF851B]" aria-hidden="true" />
                  </div>
                </div>

                <dl className="divide-y divide-[#0A2055]/10 mb-7">
                  {PROGRAMME_SPECS.map((spec) => (
                    <div
                      key={spec.label}
                      className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6"
                    >
                      <dt className="text-sm font-semibold text-[#0A2055] shrink-0">
                        {spec.label}:
                      </dt>
                      <dd className="text-sm sm:text-base text-[#17233D]/85 sm:text-right">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <a
                  href="#enquiry-form"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-[#1455D9] hover:bg-[#0A2055] rounded-lg transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1455D9]"
                >
                  <span>Enquire About Programme</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
