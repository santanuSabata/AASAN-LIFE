import React from 'react';
import { CheckCircle2, Info } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';
import { EnquiryFormFields } from './EnquiryFormFields';

export const EnquiryForm: React.FC = () => {
  const isLiveApiConfigured = Boolean(COMPANY_CONFIG.integrations.enquiryApiEndpoint.trim());

  return (
    <section id="enquiry-form" className="py-16 sm:py-20 bg-[#F5F8FC] border-y border-[#0A2055]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Context & Guidance */}
          <div className="lg:col-span-5">
            <p className="text-sm font-semibold text-[#1455D9] mb-2">
              Programme Registration &amp; Enquiry
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0A2055] tracking-tight mb-4">
              Ready to Start Your Insurance Career Journey?
            </h2>
            <p className="text-base sm:text-lg text-[#17233D]/80 leading-relaxed mb-7">
              Share your details and our team will contact you with complete information about the
              AASAN LIFE Online Paid Internship Programme.
            </p>

            <div className="bg-white border border-[#0A2055]/10 rounded-xl p-6 space-y-4">
              <h3 className="text-base font-bold text-[#0A2055]">
                What happens after you enquire?
              </h3>
              <ul className="space-y-3 text-sm text-[#17233D]/80">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="w-4 h-4 text-[#1455D9] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>
                    Our team connects with you via your preferred contact method (Call or WhatsApp).
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="w-4 h-4 text-[#1455D9] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>
                    You receive full clarity on programme structure, applicable fee, duration, and
                    enrolment steps.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="w-4 h-4 text-[#1455D9] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>
                    Zero automated spam—your details are used strictly for programme guidance.
                  </span>
                </li>
              </ul>

              {!isLiveApiConfigured && (
                <div className="pt-4 border-t border-[#0A2055]/10 flex items-start gap-2.5 text-xs text-[#17233D]/75">
                  <Info className="w-4 h-4 text-[#FF851B] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong>Demo Mode Active:</strong> Live CRM/Google Sheets webhook is not
                    connected yet. Submitting validates your details and prepares a WhatsApp-ready
                    enquiry summary.
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Validated Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#0A2055]/10 rounded-2xl p-6 sm:p-8 shadow-[0_12px_34px_rgba(10,32,85,0.06)]">
              <EnquiryFormFields idPrefix="section" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
