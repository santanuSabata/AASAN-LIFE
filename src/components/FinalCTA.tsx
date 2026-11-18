import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { AppLink } from '../context/RouterContext';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0A2055] via-[#0F3182] to-[#1455D9] px-6 py-12 sm:px-12 sm:py-16 text-white shadow-[0_20px_50px_rgba(10,32,85,0.18)]">
          {/* Subtle Shield Geometric Accents */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -bottom-10 opacity-12"
          >
            <ShieldCheck className="w-64 h-64 text-white" strokeWidth={1.2} />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 right-0 w-72 h-72 rounded-full bg-[#FF851B]/15 blur-3xl"
          />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF851B] mb-3">
              <ShieldCheck className="w-4 h-4" aria-hidden="true" />
              <span>AASAN LIFE · Insurance for a Secure Tomorrow.</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-white leading-tight tracking-tight mb-4">
              Your Journey Into the Insurance Industry Starts Here.
            </h2>

            <p className="text-base sm:text-lg text-white/85 leading-relaxed mb-8 max-w-2xl">
              Take the first step towards developing your knowledge and understanding of the
              insurance industry with AASAN LIFE.
            </p>

            <AppLink
              to="/contact-us"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-bold text-[#0A2055] bg-[#FF851B] hover:bg-white rounded-lg transition-colors duration-150 shadow-[0_8px_22px_rgba(0,0,0,0.2)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF851B]"
            >
              <span>Enquire Now</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </AppLink>
          </div>
        </div>
      </div>
    </section>
  );
};
