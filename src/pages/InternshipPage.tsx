import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { PageMeta } from '../components/PageMeta';
import { InternshipSection } from '../components/InternshipSection';
import { EligibilitySection } from '../components/EligibilitySection';
import { ProcessSection } from '../components/ProcessSection';
import { FinalCTA } from '../components/FinalCTA';
import internshipBannerImg from '../assets/images/internship_banner.jpeg';

interface InternshipPageProps {
  onOpenModal: () => void;
}

export const InternshipPage: React.FC<InternshipPageProps> = ({ onOpenModal }) => {
  return (
    <>
      <PageMeta
        title="Online Paid Internship Program | AASAN BIMA EDUCATION"
        description="Explore AASAN BIMA EDUCATION's Online Paid Internship Programme, learner eligibility pathways, and 3-step enrolment process for aspiring professionals."
        keywords="Online Paid Internship Programme, Insurance Internship Eligibility, Enrolment Process, AASAN BIMA EDUCATION"
      />
      <PageHeader
        eyebrow="Paid Internship Programme"
        title="Start Your Insurance Career"
        description="Gain hands-on professional training and industry experience with AASAN BIMA EDUCATION."
        breadcrumbLabel="Internship Programme"
        ctaLabel="Apply Now"
        ctaTo="/contact-us"
        imageUrl={internshipBannerImg}
        imageAlt="Students attending online insurance training session"
        stats={[
          { value: '100%', label: 'Online Training' },
          { value: 'Paid', label: 'Internship Stipend' },
          { value: '100%', label: 'Job Assistance' }
        ]}
      />

      <InternshipSection />
      <EligibilitySection />
      <ProcessSection />
      <FinalCTA />
    </>
  );
};
