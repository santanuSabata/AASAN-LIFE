import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { PageMeta } from '../components/PageMeta';
import { BenefitsSection } from '../components/BenefitsSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { FinalCTA } from '../components/FinalCTA';

export const BenefitsPage: React.FC = () => {
  return (
    <>
      <PageMeta
        title="Internship Benefits & Learning | AASAN LIFE"
        description="Discover the benefits of AASAN LIFE's 100% online insurance training—flexible learning, industry focus, and practical career preparation."
        keywords="Insurance Internship Benefits, Online Insurance Learning, Student Success Stories, AASAN LIFE"
      />
      <PageHeader
        eyebrow="Programme Benefits"
        title="Why Start Your Insurance Learning Journey With Us?"
        description="Explore the flexible online learning format, industry-focused curriculum, and career-oriented foundation offered by AASAN LIFE."
        ctaLabel="Enquire Now"
        ctaTo="/contact-us"
      />

      <BenefitsSection />
      <TestimonialsSection />
      <FinalCTA />
    </>
  );
};
