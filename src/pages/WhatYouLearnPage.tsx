import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { PageMeta } from '../components/PageMeta';
import { LearningSection } from '../components/LearningSection';
import { FAQSection } from '../components/FAQSection';
import { FinalCTA } from '../components/FinalCTA';

export const WhatYouLearnPage: React.FC = () => {
  return (
    <>
      <PageMeta
        title="Insurance Curriculum & Modules | AASAN LIFE"
        description="Explore all 6 modules in AASAN LIFE's online training: insurance fundamentals, life and general, corporate policies, operations, risk, and skills."
        keywords="Insurance Curriculum, Corporate Insurance Training, Life and General Insurance, Risk Assessment, AASAN LIFE"
      />
      <PageHeader
        eyebrow="Programme Curriculum"
        title="What Will You Learn During the Programme?"
        description="Explore the 6 foundational insurance modules covering risk protection, life and general insurance, corporate policies, operations, risk assessment, and professional skills."
        ctaLabel="Enquire About Curriculum"
        ctaTo="/contact-us"
      />

      <LearningSection />
      <FAQSection />
      <FinalCTA />
    </>
  );
};
