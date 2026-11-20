import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AnimatedCounter,
  EASE_PREMIUM,
  Reveal,
  StaggerGroup,
  StaggerItem,
} from './motion/MotionPrimitives';
import { FloatingOrb, SpotlightCard, TextReveal } from './motion/SiteEffects';

interface PartnerBrand {
  id: string;
  name: string;
  renderLogo: () => React.ReactNode;
}

const ROW_ONE_PARTNERS: PartnerBrand[] = [
  {
    id: 'v2c-insurance-brokers',
    name: 'V2C Insurance Brokers',
    renderLogo: () => (
      <span className="inline-flex items-center gap-2 font-extrabold tracking-tight text-base sm:text-lg text-[#0A2055]">
        <span className="px-1.5 py-0.5 rounded-md bg-gradient-to-tr from-[#1455D9] to-[#E4B052] text-white text-xs font-black">
          V2C
        </span>
        <span className="leading-tight text-left">
          <span className="block text-sm sm:text-base font-extrabold text-[#0A2055]">V2C</span>
          <span className="block text-[9px] font-bold uppercase tracking-widest text-[#C69232]">
            Insurance Brokers
          </span>
        </span>
      </span>
    ),
  },
  {
    id: 'policybazaar',
    name: 'Policybazaar',
    renderLogo: () => (
      <span className="font-sans text-lg sm:text-xl font-extrabold tracking-tight">
        <span className="text-[#0065FF]">policy</span>
        <span className="text-[#0A2055]">bazaar</span>
      </span>
    ),
  },
  {
    id: 'marsh-india',
    name: 'Marsh India',
    renderLogo: () => (
      <span className="inline-flex flex-col items-center leading-none">
        <span className="font-sans text-lg sm:text-xl font-black tracking-[0.18em] text-[#0A2055] uppercase">
          MARSH
        </span>
        <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#1455D9] mt-1">
          INDIA BROKERS
        </span>
      </span>
    ),
  },
  {
    id: 'aon-india',
    name: 'Aon India',
    renderLogo: () => (
      <span className="inline-flex items-baseline gap-1.5">
        <span className="font-sans text-xl sm:text-2xl font-black tracking-wider text-[#E11D48] uppercase">
          AON
        </span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#0A2055]/75">
          India
        </span>
      </span>
    ),
  },
  {
    id: 'prudent-brokers',
    name: 'Prudent Insurance Brokers',
    renderLogo: () => (
      <span className="inline-flex items-center gap-2">
        <span className="w-6 h-6 rounded-full bg-[#1455D9] border border-[#E4B052]/70 text-white font-serif font-bold text-xs inline-flex items-center justify-center">
          P
        </span>
        <span className="leading-tight text-left">
          <span className="block text-sm sm:text-base font-extrabold text-[#0A2055]">
            Prudent
          </span>
          <span className="block text-[9px] font-semibold uppercase tracking-wider text-[#17233D]/65">
            Insurance Brokers
          </span>
        </span>
      </span>
    ),
  },
];

const ROW_TWO_PARTNERS: PartnerBrand[] = [
  {
    id: 'wtw-india',
    name: 'Willis Towers Watson (WTW)',
    renderLogo: () => (
      <span className="inline-flex items-center gap-2">
        <span className="font-sans text-xl sm:text-2xl font-black tracking-tight text-[#7E22CE]">
          wtw
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0A2055]/75">
          India
        </span>
      </span>
    ),
  },
  {
    id: 'gallagher-india',
    name: 'Gallagher India',
    renderLogo: () => (
      <span className="inline-flex items-center gap-1.5 font-serif text-base sm:text-lg font-bold text-[#0A2055]">
        <span className="w-5 h-5 rounded-xs bg-[#C69232] text-white font-sans font-black text-xs inline-flex items-center justify-center">
          G
        </span>
        <span>Gallagher</span>
      </span>
    ),
  },
  {
    id: 'howden-india',
    name: 'Howden Insurance Brokers',
    renderLogo: () => (
      <span className="inline-flex flex-col items-center leading-none">
        <span className="font-sans text-lg sm:text-xl font-extrabold tracking-tight text-[#0284C7]">
          howden
        </span>
        <span className="text-[9px] font-semibold uppercase tracking-widest text-[#17233D]/65 mt-1">
          Insurance Brokers
        </span>
      </span>
    ),
  },
  {
    id: 'mahindra-brokers',
    name: 'Mahindra Insurance Brokers',
    renderLogo: () => (
      <span className="inline-flex flex-col items-center leading-tight">
        <span className="font-sans text-sm sm:text-base font-extrabold tracking-wide text-[#DC2626] uppercase">
          Mahindra
        </span>
        <span className="text-[9px] font-semibold uppercase tracking-widest text-[#0A2055]/75">
          Insurance Brokers
        </span>
      </span>
    ),
  },
  {
    id: 'bajaj-capital-broking',
    name: 'Bajaj Capital Insurance Broking',
    renderLogo: () => (
      <span className="inline-flex items-center gap-1.5">
        <span className="w-5 h-5 rounded-xs bg-[#0072CE] text-white font-black text-xs inline-flex items-center justify-center">
          B
        </span>
        <span className="leading-tight text-left">
          <span className="block text-xs sm:text-sm font-extrabold text-[#0A2055]">
            Bajaj Capital
          </span>
          <span className="block text-[9px] font-semibold uppercase tracking-wider text-[#1455D9]">
            Insurance Broking
          </span>
        </span>
      </span>
    ),
  },
];

interface PlacementAssistanceSectionProps {
  studentCount?: number;
  className?: string;
}

export const PlacementAssistanceSection: React.FC<PlacementAssistanceSectionProps> = ({
  studentCount = 30000,
  className = '',
}) => {
  const [marqueePaused, setMarqueePaused] = useState(false);

  const renderPartnerRow = (partners: PartnerBrand[], rowKey: string) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 items-center gap-4 sm:gap-2 py-5">
      {partners.map((partner, index) => {
        const hasDividerAfter = index < partners.length - 1;
        return (
          <div
            key={`${rowKey}-${partner.id}`}
            className={`relative flex items-center justify-center px-3 py-2 ${
              hasDividerAfter
                ? 'lg:after:content-[""] lg:after:absolute lg:after:right-0 lg:after:top-1/2 lg:after:-translate-y-1/2 lg:after:h-7 lg:after:w-px lg:after:bg-[#0A2055]/12'
                : ''
            }`}
          >
            <motion.div
              whileHover={{ scale: 1.07, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: EASE_PREMIUM }}
              className="group/logo relative px-3 py-2 rounded-xl transition-colors duration-200 hover:bg-[#F5F8FC] cursor-default select-none"
              title={partner.name}
            >
              {partner.renderLogo()}
              <span
                aria-hidden="true"
                className="pointer-events-none block h-0.5 w-0 mx-auto mt-1.5 rounded-full bg-gradient-to-r from-[#1455D9] via-[#E4B052] to-[#1455D9] transition-all duration-300 group-hover/logo:w-full"
              />
            </motion.div>
          </div>
        );
      })}
    </div>
  );

  return (
    <section
      aria-label="Placement Assistance"
      className={`relative overflow-hidden bg-[#F5F8FC] text-[#0A2055] py-16 sm:py-24 border-y border-[#0A2055]/10 ${className}`}
    >
      {/* Subtle Grid & Ambient Light Orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #0A2055 1px, transparent 1px), linear-gradient(to bottom, #0A2055 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <FloatingOrb
        durationSec={8}
        travelPx={14}
        className="pointer-events-none absolute -top-24 left-1/4 w-80 h-80 rounded-full bg-[#1455D9]/[0.08] blur-3xl"
      />
      <FloatingOrb
        durationSec={10}
        travelPx={16}
        className="pointer-events-none absolute -bottom-28 right-1/5 w-96 h-96 rounded-full bg-[#E4B052]/[0.14] blur-3xl"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading with animated counter */}
        <Reveal direction="up">
          <div className="max-w-3xl mb-12 sm:mb-14">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#1455D9]/10 border border-[#1455D9]/20 text-[#1455D9] text-xs font-extrabold uppercase tracking-wider mb-3">
              Placement &amp; Career Ecosystem
            </span>
            <TextReveal>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.2] text-[#0A2055]">
                World class placement assistance
                <span className="block mt-1">
                  that helped{' '}
                  <span className="text-[#1455D9]">
                    <AnimatedCounter target={studentCount} suffix="+" durationMs={1600} />
                  </span>{' '}
                  students
                </span>
              </h2>
            </TextReveal>
          </div>
        </Reveal>

        {/* 2-Row Indian Insurance Brokers Grid Container */}
        <SpotlightCard
          spotlightColor="rgba(20, 85, 217, 0.08)"
          className="rounded-3xl bg-white border border-[#0A2055]/12 px-4 sm:px-8 py-4 shadow-[0_14px_40px_rgba(10,32,85,0.07)]"
        >
          <StaggerGroup staggerDelay={0.08}>
            <StaggerItem>{renderPartnerRow(ROW_ONE_PARTNERS, 'row-1')}</StaggerItem>

            {/* Animated Gradient Hairline Divider */}
            <div className="relative h-px w-full bg-[#0A2055]/10 overflow-hidden">
              <motion.div
                aria-hidden="true"
                initial={{ x: '-100%' }}
                whileInView={{ x: '100%' }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1.3, ease: EASE_PREMIUM }}
                className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-[#1455D9]/65 to-transparent"
              />
            </div>

            <StaggerItem>{renderPartnerRow(ROW_TWO_PARTNERS, 'row-2')}</StaggerItem>
          </StaggerGroup>
        </SpotlightCard>

        {/* Continuous Smooth Ticker Strip (Pause on Hover) */}
        <div
          onMouseEnter={() => setMarqueePaused(true)}
          onMouseLeave={() => setMarqueePaused(false)}
          className="mt-8 pt-6 border-t border-[#0A2055]/10 overflow-hidden"
        >
          <div className="flex items-center justify-between gap-4 mb-3 text-[11px] font-bold uppercase tracking-widest text-[#17233D]/60">
            <span>Indian Insurance Broking &amp; Career Ecosystem</span>
            <span>{marqueePaused ? 'Paused on Hover' : 'Hover strip to pause'}</span>
          </div>

          <div className="relative flex overflow-hidden py-1">
            <motion.div
              animate={marqueePaused ? undefined : { x: ['0%', '-50%'] }}
              transition={
                marqueePaused
                  ? undefined
                  : { duration: 26, repeat: Infinity, ease: 'linear' }
              }
              className="flex shrink-0 items-center gap-8 pr-8"
            >
              {[
                ...ROW_ONE_PARTNERS,
                ...ROW_TWO_PARTNERS,
                ...ROW_ONE_PARTNERS,
                ...ROW_TWO_PARTNERS,
              ].map((item, idx) => (
                <span
                  key={`ticker-${item.id}-${idx}`}
                  className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-[#0A2055]/12 text-xs font-semibold text-[#0A2055] shadow-2xs whitespace-nowrap"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E4B052]" />
                  <span>{item.name}</span>
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};