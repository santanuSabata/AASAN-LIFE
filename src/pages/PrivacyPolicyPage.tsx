import React from 'react';
import { COMPANY_CONFIG } from '../config/company';
import { AppLink } from '../context/RouterContext';
import { PageHeader } from '../components/PageHeader';
import { PageMeta } from '../components/PageMeta';

const POLICY_SECTIONS = [
  {
    title: '1. Information We Collect',
    body: [
      `When you submit an internship enquiry or newsletter subscription on the ${COMPANY_CONFIG.companyName} website, we collect the details you voluntarily provide. For internship enquiries, this includes your Full Name, Mobile Number, Email Address, Current Qualification, Current Status, City, and Preferred Contact Method.`,
      'For industry updates subscriptions, we collect your Email Address. If you interact with the AASAN BIMA EDUCATION Advisor chat, messages sent during your session are processed to generate responses to your questions.',
    ],
  },
  {
    title: '2. How We Use Your Information',
    body: [
      'Your enquiry details are used strictly to contact you via your preferred method (Call or WhatsApp), share accurate information about the Online Paid Internship Programme (including fee structure, schedule, and enrolment steps), and address your questions.',
      'Newsletter email addresses are used solely to deliver insurance industry insights, training updates, and upcoming internship cohort announcements.',
    ],
  },
  {
    title: '3. No Sale or Unsolicited Sharing of Data',
    body: [
      `${COMPANY_CONFIG.companyName} does not sell, rent, or trade your personal contact details to third-party marketers or unrelated advertisers.`,
      'If you choose to continue your enquiry via WhatsApp, your formatted enquiry details will be opened in WhatsApp in accordance with your device and WhatsApp privacy terms.',
    ],
  },
  {
    title: '4. Data Security & Retention',
    body: [
      'We take reasonable administrative and technical care to protect submitted enquiry details against unauthorized access or disclosure. When the website is operated in Demo Mode without a configured webhook endpoint, form submissions are validated locally in your browser and are not transmitted to an external server.',
    ],
  },
  {
    title: '5. Your Rights & Contact Information',
    body: [
      `You may request access to, correction of, or deletion of your enquiry information at any time by contacting ${COMPANY_CONFIG.companyName} using our official contact details:`,
      `Email: ${COMPANY_CONFIG.contact.emailDisplay} · Phone: ${COMPANY_CONFIG.contact.phoneDisplay} · Address: ${COMPANY_CONFIG.contact.addressDisplay}`,
    ],
  },
];

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <PageMeta
        title="Privacy Policy | AASAN BIMA EDUCATION Training"
        description="Read the AASAN BIMA EDUCATION Privacy Policy explaining how internship enquiry details, newsletter emails, and advisor chat sessions are handled."
        keywords="AASAN BIMA EDUCATION Privacy Policy, Data Protection, Internship Enquiry Privacy"
      />
      <PageHeader
        eyebrow="Legal & Privacy"
        title="Privacy Policy"
        description={`How ${COMPANY_CONFIG.companyName} collects, uses, and safeguards the personal information you share with us.`}
      />

      <section className="py-14 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F5F8FC]/60 border border-[#0A2055]/10 rounded-2xl p-6 sm:p-10 space-y-8">
            <div className="pb-5 border-b border-[#0A2055]/10 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-[#17233D]/70">
              <span>Effective Year: 2026</span>
              <span>Entity: {COMPANY_CONFIG.companyName}</span>
            </div>

            {POLICY_SECTIONS.map((section) => (
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
                to="/terms-and-conditions"
                className="text-sm font-semibold text-[#1455D9] hover:text-[#0A2055] transition-colors"
              >
                Read Terms &amp; Conditions →
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
