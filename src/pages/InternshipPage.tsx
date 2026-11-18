import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { PageMeta } from '../components/PageMeta';
import { InternshipSection } from '../components/InternshipSection';
import { EligibilitySection } from '../components/EligibilitySection';
import { ProcessSection } from '../components/ProcessSection';
import { FinalCTA } from '../components/FinalCTA';

interface InternshipPageProps {
  onOpenModal: () => void;
}

export const InternshipPage: React.FC<InternshipPageProps> = ({ onOpenModal }) => {
  return (
    <>
      <PageMeta
        title="Online Paid Internship Program | AASAN LIFE"
        description="Explore AASAN LIFE's Online Paid Internship Programme, learner eligibility pathways, and 3-step enrolment process for aspiring professionals."
        keywords="Online Paid Internship Programme, Insurance Internship Eligibility, Enrolment Process, AASAN LIFE"
      />
      <PageHeader
        eyebrow="Internship Program"
        title="Explore Our Online Paid Internship Programme"
        description="Start your journey into the insurance industry with structured online training, practical exposure, and guided professional skill development."
        ctaLabel="Apply for Internship"
        onCtaClick={onOpenModal}
      />

      <InternshipSection />
      <EligibilitySection />
      <ProcessSection />
      <FinalCTA />
    </>
  );
};
