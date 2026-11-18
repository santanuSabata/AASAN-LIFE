import React from 'react';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';
import { PageHeader } from '../components/PageHeader';
import { PageMeta } from '../components/PageMeta';
import { EnquiryForm } from '../components/EnquiryForm';
import { ProcessSection } from '../components/ProcessSection';
import { FAQSection } from '../components/FAQSection';

export const ContactPage: React.FC = () => {
  const contactCards = [
    {
      label: 'Phone',
      value: COMPANY_CONFIG.contact.phoneDisplay,
      icon: Phone,
    },
    {
      label: 'WhatsApp',
      value: COMPANY_CONFIG.contact.whatsappDisplay,
      icon: MessageCircle,
    },
    {
      label: 'Email',
      value: COMPANY_CONFIG.contact.emailDisplay,
      icon: Mail,
    },
    {
      label: 'Office Address',
      value: COMPANY_CONFIG.contact.addressDisplay,
      icon: MapPin,
    },
  ];

  return (
    <>
      <PageMeta
        title="Contact Us & Enquire | AASAN LIFE"
        description="Contact AASAN LIFE to enquire about our Online Paid Insurance Internship Programme, schedule details, and enrolment guidance from our team."
        keywords="Contact AASAN LIFE, Insurance Internship Enquiry, Apply Online Internship, AASAN LIFE"
      />
      <PageHeader
        eyebrow="Contact Us"
        title="Ready to Start Your Insurance Career Journey?"
        description="Reach out to the AASAN LIFE team for internship duration, fee structure, and enrolment guidance."
      />

      {/* Direct Contact Cards */}
      <section className="py-12 sm:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactCards.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.label}
                  className="bg-[#F5F8FC]/70 border border-[#0A2055]/10 rounded-xl p-6"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#0A2055] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#FF851B]" aria-hidden="true" />
                  </div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-[#1455D9] mb-1.5">
                    {item.label}
                  </h2>
                  <p className="text-sm sm:text-base font-semibold text-[#0A2055] break-words">
                    {item.value}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <EnquiryForm />
      <ProcessSection />
      <FAQSection />
    </>
  );
};
