import React from 'react';
import { COMPANY_CONFIG } from '../config/company';
import { AppLink } from '../context/RouterContext';
import { PageHeader } from '../components/PageHeader';
import { PageMeta } from '../components/PageMeta';

const TERMS_SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    body: [
      `By accessing and using the ${COMPANY_CONFIG.companyName} website, you agree to comply with and be bound by these Terms & Conditions. If you do not agree with any part of these terms, please refrain from using the website.`,
    ],
  },
  {
    title: '2. Programme Information & Enquiry Scope',
    body: [
      `${COMPANY_CONFIG.companyName} provides online insurance training and offers an Online Paid Internship Programme designed to introduce participants to insurance fundamentals, life and general insurance, corporate insurance, operations, risk assessment, and professional skills.`,
      'Submitting an enquiry form on this website expresses interest in receiving programme details and does not constitute automatic enrolment or a binding contract.',
    ],
  },
  {
    title: '3. Paid Internship Fees & Enrolment Confirmation',
    body: [
      'The AASAN BIMA EDUCATION internship is a paid internship programme. Applicable fee structures, training schedules, duration, and enrolment procedures are communicated directly by our team prior to registration.',
      'Any programme benefits or career opportunities are subject to the terms formally confirmed by the AASAN BIMA EDUCATION team at the time of enrolment.',
    ],
  },
  {
    title: '4. Online Learning & Advisor Guidance',
    body: [
      'The AASAN BIMA EDUCATION Advisor chat and website materials are provided for informational and educational guidance. While we strive for accuracy across all training descriptions, learners must rely on direct communication from our official team for final enrolment terms.',
    ],
  },
  {
    title: '5. Intellectual Property',
    body: [
      `All trademarks, logos (including the official ${COMPANY_CONFIG.companyName} brand mark), website copy, curriculum outlines, and training materials displayed on this website remain the intellectual property of ${COMPANY_CONFIG.companyName} and may not be copied, altered, or redistributed without prior written consent.`,
    ],
  },
  {
    title: '6. Limitation of Liability & Updates',
    body: [
      `${COMPANY_CONFIG.companyName} reserves the right to update programme modules, schedules, or these Terms & Conditions as needed. For questions regarding these terms, please reach us at ${COMPANY_CONFIG.contact.emailDisplay} or ${COMPANY_CONFIG.contact.phoneDisplay}.`,
    ],
  },
];

export const TermsPage: React.FC = () => {
  return (
    <>
      <PageMeta
        title="Terms & Conditions | AASAN BIMA EDUCATION"
        description="Review the AASAN BIMA EDUCATION Terms and Conditions governing website access, online insurance training information, and internship enquiries."
        keywords="AASAN BIMA EDUCATION Terms and Conditions, Paid Internship Terms, Online Training Terms"
      />
      <PageHeader
        eyebrow="Legal Terms"
        title="Terms & Conditions"
        description={`Terms governing website usage and internship programme enquiries with ${COMPANY_CONFIG.companyName}.`}
      />

      <section className="py-14 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F5F8FC]/60 border border-[#0A2055]/10 rounded-2xl p-6 sm:p-10 space-y-8">
            <div className="pb-5 border-b border-[#0A2055]/10 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-[#17233D]/70">
              <span>Effective Year: 2026</span>
              <span>Entity: {COMPANY_CONFIG.companyName}</span>
            </div>

            {TERMS_SECTIONS.map((section) => (
              <article key={section.title} className="space-y-3">
                <h2 className="text-xl font-bold text-[#0A2055]">{section.title}</h2>
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-sm sm:text-base text-[#17233D]/85 leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </article>
            ))}

            <div className="pt-6 border-t border-[#0A2055]/10 flex flex-wrap items-center justify-between gap-4">
              <AppLink
                to="/privacy-policy"
                className="text-sm font-semibold text-[#1455D9] hover:text-[#0A2055] transition-colors"
              >
                Read Privacy Policy →
              </AppLink>
              <AppLink
                to="/contact-us"
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-[#1455D9] hover:bg-[#0A2055] rounded-lg transition-colors"
              >
                Contact Our Team
              </AppLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
