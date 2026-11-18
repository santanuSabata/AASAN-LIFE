import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { PARTICIPANT_STORIES } from '../config/company';

function getCardsPerView(): number {
  if (typeof window === 'undefined') return 3;
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 768) return 2;
  return 1;
}

export const TestimonialsSection: React.FC = () => {
  const [cardsPerView, setCardsPerView] = useState<number>(getCardsPerView);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      const nextPerView = getCardsPerView();
      setCardsPerView(nextPerView);
      const maxIdx = Math.max(0, PARTICIPANT_STORIES.length - nextPerView);
      setCurrentIndex((prev) => Math.min(prev, maxIdx));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, PARTICIPANT_STORIES.length - cardsPerView);
  const totalPages = maxIndex + 1;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      handlePrev();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      handleNext();
    }
  };

  return (
    <section
      id="success-stories"
      aria-roledescription="carousel"
      aria-label="Student Success Stories"
      onKeyDown={handleKeyDown}
      className="py-16 sm:py-20 bg-[#F5F8FC]/60 border-t border-[#0A2055]/8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header + Desktop Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#1455D9] mb-2">
              Participant Experiences
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0A2055] tracking-tight mb-3">
              Student Success Stories
            </h2>
            <p className="text-base sm:text-lg text-[#17233D]/80 leading-relaxed">
              Hear from past participants across India on how structured online insurance training
              built their clarity and confidence.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous testimonials"
              className="w-11 h-11 rounded-full bg-white border border-[#0A2055]/15 text-[#0A2055] hover:bg-[#1455D9] hover:text-white hover:border-[#1455D9] transition-colors inline-flex items-center justify-center shadow-2xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1455D9]"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next testimonials"
              className="w-11 h-11 rounded-full bg-white border border-[#0A2055]/15 text-[#0A2055] hover:bg-[#1455D9] hover:text-white hover:border-[#1455D9] transition-colors inline-flex items-center justify-center shadow-2xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1455D9]"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Responsive Card Carousel Track */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] -mx-3"
            style={{
              transform: `translate3d(-${(currentIndex * 100) / cardsPerView}%, 0, 0)`,
            }}
          >
            {PARTICIPANT_STORIES.map((story) => (
              <div
                key={story.id}
                className="shrink-0 px-3"
                style={{ width: `${100 / cardsPerView}%` }}
              >
                <article className="h-full bg-white border border-[#0A2055]/10 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-[0_6px_22px_rgba(10,32,85,0.04)] hover:border-[#1455D9]/30 transition-colors">
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-[#F5F8FC] border border-[#0A2055]/10 flex items-center justify-center">
                        <Quote className="w-5 h-5 text-[#FF851B]" aria-hidden="true" />
                      </div>
                      <span className="text-xs font-semibold text-[#1455D9]">
                        {story.focusArea}
                      </span>
                    </div>

                    <blockquote className="text-sm sm:text-base text-[#17233D]/85 leading-relaxed mb-6">
                      &ldquo;{story.feedback}&rdquo;
                    </blockquote>
                  </div>

                  {/* Participant Identity Footer */}
                  <div className="pt-5 border-t border-[#0A2055]/10 flex items-center gap-3.5">
                    <div
                      aria-hidden="true"
                      className="w-11 h-11 rounded-full bg-[#0A2055] text-white font-[family-name:var(--font-display)] text-sm font-bold flex items-center justify-center shrink-0"
                    >
                      {story.initials}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base font-bold text-[#0A2055] truncate">
                        {story.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#17233D]/70 truncate">
                        {story.qualification} <span aria-hidden="true">·</span> {story.city}
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Indicator Dots */}
        <div
          className="mt-8 flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Testimonial slides"
        >
          {Array.from({ length: totalPages }).map((_, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={`slide-dot-${idx}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`View testimonial group ${idx + 1}`}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1455D9] ${
                  isActive ? 'w-8 bg-[#1455D9]' : 'w-2.5 bg-[#0A2055]/20 hover:bg-[#0A2055]/40'
                }`}
              />
            );
          })}
        </div>

        <p className="mt-5 text-center text-xs text-[#17233D]/55">
          Sample participant feedback shown for layout preview — manage entries in{' '}
          <code className="font-mono text-[#0A2055]/75">src/config/company.ts</code>.
        </p>
      </div>
    </section>
  );
};
