import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { AppLink } from '../context/RouterContext';
import {
  EASE_PREMIUM,
  Reveal,
  StaggerGroup,
  StaggerItem,
} from './motion/MotionPrimitives';
import {
  FloatingOrb,
  MagneticButton,
  ParallaxLayer,
  SpotlightCard,
  TextReveal,
} from './motion/SiteEffects';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="scale">
          <ParallaxLayer speed={0.04}>
            <SpotlightCard
              spotlightColor="rgba(228, 176, 82, 0.16)"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0A2055] via-[#0F3182] to-[#1455D9] px-6 py-12 sm:px-12 sm:py-16 text-white shadow-[0_20px_50px_rgba(10,32,85,0.18)]"
            >
              {/* Subtle Drifting Shield Geometric Accent */}
              <motion.div
                aria-hidden="true"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 3, 0],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="pointer-events-none absolute -right-10 -bottom-10 opacity-12 group-hover:opacity-20 transition-opacity duration-500"
              >
                <ShieldCheck className="w-64 h-64 text-white" strokeWidth={1.2} />
              </motion.div>

              {/* Floating Gold Ambient Glow */}
              <FloatingOrb
                durationSec={8}
                travelPx={14}
                className="pointer-events-none absolute top-0 right-0 w-72 h-72 rounded-full bg-[#E4B052]/15 blur-3xl"
              />

              <StaggerGroup staggerDelay={0.08} className="relative z-10 max-w-3xl">
                <StaggerItem>
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#E4B052] mb-3">
                    <motion.span
                      whileHover={{ rotate: 12, scale: 1.15 }}
                      transition={{ duration: 0.2, ease: EASE_PREMIUM }}
                      className="inline-flex"
                    >
                      <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                    </motion.span>
                    <span>AASAN BIMA EDUCATION · Insurance for a Secure Tomorrow.</span>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <TextReveal delayMs={40}>
                    <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-white leading-tight tracking-tight mb-4">
                      Your Journey Into the Insurance Industry Starts Here.
                    </h2>
                  </TextReveal>
                </StaggerItem>

                <StaggerItem>
                  <p className="text-base sm:text-lg text-white/85 leading-relaxed mb-8 max-w-2xl">
                    Take the first step towards developing your knowledge and understanding of the
                    insurance industry with AASAN BIMA EDUCATION.
                  </p>
                </StaggerItem>

                <StaggerItem>
                  <MagneticButton strength={0.2}>
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <AppLink
                        to="/contact-us"
                        className="group/cta inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-bold text-[#0A2055] bg-[#E4B052] hover:bg-white rounded-lg transition-colors duration-200 shadow-[0_8px_22px_rgba(0,0,0,0.2)] hover:shadow-[0_14px_30px_rgba(228,176,82,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E4B052]"
                      >
                        <span>Enquire Now</span>
                        <ArrowRight
                          className="w-4 h-4 transition-transform duration-200 group-hover/cta:translate-x-1"
                          aria-hidden="true"
                        />
                      </AppLink>
                    </motion.div>
                  </MagneticButton>
                </StaggerItem>
              </StaggerGroup>
            </SpotlightCard>
          </ParallaxLayer>
        </Reveal>
      </div>
    </section>
  );
};