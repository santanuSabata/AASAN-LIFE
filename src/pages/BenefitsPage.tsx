import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { PageMeta } from '../components/PageMeta';
import { BenefitsSection } from '../components/BenefitsSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { FinalCTA } from '../components/FinalCTA';
import BannerImg from '../assets/images/internship_banner.jpeg';
import { InstructorSection } from '../components/InstructorSection';

interface BenefitsPageProps {
  onOpenModal?: () => void;
}

export const BenefitsPage: React.FC<BenefitsPageProps> = ({ onOpenModal }) => {
  return (
    <>
      <PageMeta
        title="Internship Benefits & Learning | AASAN BIMA EDUCATION"
        description="Discover the benefits of AASAN BIMA EDUCATION's 100% online insurance training—flexible learning, industry focus, and practical career preparation."
        keywords="Insurance Internship Benefits, Online Insurance Learning, Student Success Stories, AASAN BIMA EDUCATION"
      />
      <PageHeader
        eyebrow="Programme Benefits"
        title="Why Start Your Insurance Learning Journey With Us?"
        description="Explore the flexible online learning format, industry-focused curriculum, and career-oriented foundation offered by AASAN BIMA EDUCATION."
        ctaLabel="Enquire Now"
        ctaTo="/contact-us"
        imageUrl={BannerImg}
        imageAlt="Why Start Your Insurance Journey With Us?"
      />

      <BenefitsSection />
      <InstructorSection onOpenModal={onOpenModal} />

      <TestimonialsSection />
      <FinalCTA />
    </>
  );
};