import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'What is the AASAN BIMA EDUCATION Online Internship Programme?',
    answer:
      'It is an online paid internship programme designed to introduce individuals to the insurance industry through structured learning and industry-focused training.',
  },
  {
    question: 'Is this an online programme?',
    answer: 'Yes, the programme is designed to provide online training.',
  },
  {
    question: 'Is this a paid internship?',
    answer:
      'Yes, this is a paid internship programme. Contact our team for the applicable fee and enrolment details.',
  },
  {
    question: 'Who can apply?',
    answer:
      'Students, graduates, job seekers and individuals interested in learning about the insurance industry can enquire about the programme.',
  },
  {
    question: 'What will I learn?',
    answer:
      'You will explore insurance fundamentals, life and general insurance, corporate insurance, insurance operations, risk assessment and professional skills.',
  },
  {
    question: 'How can I register?',
    answer:
      'Complete the enquiry form on this website. Our team will contact you with further information.',
  },
  {
    question: 'Will I receive a certificate or job placement?',
    answer:
      'Please contact our team to confirm the applicable programme benefits and opportunities.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faqs" className="py-16 sm:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-[#1455D9] mb-2">Common Questions</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0A2055] tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3.5">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            const buttonId = `faq-button-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <div
                key={faq.question}
                className={`border rounded-xl transition-colors duration-150 ${
                  isOpen
                    ? 'border-[#1455D9]/40 bg-[#F5F8FC]/60'
                    : 'border-[#0A2055]/12 bg-white hover:border-[#0A2055]/25'
                }`}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleIndex(index)}
                    className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1455D9] rounded-xl"
                  >
                    <span className="text-base sm:text-lg font-bold text-[#0A2055]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#1455D9] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  data-open={isOpen}
                  className="accordion-panel"
                >
                  <div className="accordion-inner">
                    <p className="px-5 sm:px-6 pb-5 text-sm sm:text-base text-[#17233D]/80 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
