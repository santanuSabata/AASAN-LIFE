import React, { useEffect, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Quote,
  Video,
  X,
} from 'lucide-react';
import { PARTICIPANT_STORIES } from '../config/company';

interface VideoTestimonialItem {
  id: string;
  name: string;
  qualification: string;
  city: string;
  focusArea: string;
  duration: string;
  quote: string;
  thumbnailUrl?: string;
  videoUrl?: string; // e.g., '/assets/videos/testimonial-1.mp4' or 'https://www.youtube.com/embed/...'
}

const VIDEO_TESTIMONIALS: VideoTestimonialItem[] = [
  {
    id: 'vid-1',
    name: 'Rohan Sharma',
    qualification: 'B.Com Graduate',
    city: 'Jaipur',
    focusArea: 'Corporate & Health Insurance',
    duration: '01:45',
    quote:
      'Practical case discussions and internship tasks made insurance policy structures clear before my first interview.',
    thumbnailUrl: '/assets/images/video-testimonial-1.jpg',
    videoUrl: '',
  },
  {
    id: 'vid-2',
    name: 'Sneha Kulkarni',
    qualification: 'MBA Finance',
    city: 'Pune',
    focusArea: 'Risk Assessment & Operations',
    duration: '02:10',
    quote:
      'Having a structured online curriculum plus hands-on assignments helped me connect classroom concepts to real underwriting workflows.',
    thumbnailUrl: '/assets/images/video-testimonial-2.jpg',
    videoUrl: '',
  },
  {
    id: 'vid-3',
    name: 'Arjun Verma',
    qualification: 'Commerce Student',
    city: 'Bhiwadi',
    focusArea: 'General Insurance & Claims',
    duration: '01:30',
    quote:
      'The step-by-step guidance from mentors gave me confidence when explaining coverage terms and claims processes.',
    thumbnailUrl: '/assets/images/video-testimonial-3.jpg',
    videoUrl: '',
  },
];

function useInViewport(threshold = 0.08) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95) {
      setIsVisible(true);
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

function getCardsPerView(): number {
  if (typeof window === 'undefined') return 3;
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 768) return 2;
  return 1;
}

function getEmbedUrl(rawUrl?: string): string | null {
  if (!rawUrl) return null;
  if (rawUrl.includes('youtube.com/embed/')) return rawUrl;

  const watchMatch = rawUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
  if (watchMatch?.[1]) {
    return `https://www.youtube.com/embed/${watchMatch[1]}?autoplay=1`;
  }
  return null;
}

export const TestimonialsSection: React.FC = () => {
  const [cardsPerView, setCardsPerView] = useState<number>(getCardsPerView);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [activeVideo, setActiveVideo] = useState<VideoTestimonialItem | null>(null);
  const [modalEntered, setModalEntered] = useState(false);
  const [brokenThumbs, setBrokenThumbs] = useState<Record<string, boolean>>({});

  const headerView = useInViewport(0.1);
  const carouselView = useInViewport(0.08);
  const videoHeaderView = useInViewport(0.1);
  const videoGridView = useInViewport(0.08);

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

  useEffect(() => {
    if (!activeVideo) return;
    const frame = requestAnimationFrame(() => setModalEntered(true));
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeVideoModal();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeVideo]);

  const openVideoModal = (item: VideoTestimonialItem) => {
    setActiveVideo(item);
  };

  const closeVideoModal = () => {
    setModalEntered(false);
    setTimeout(() => {
      setActiveVideo(null);
    }, 200);
  };

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

  const embedUrl = getEmbedUrl(activeVideo?.videoUrl);

  return (
    <section
      id="success-stories"
      aria-roledescription="carousel"
      aria-label="Student Success Stories"
      onKeyDown={handleKeyDown}
      className="py-16 sm:py-20 bg-[#F5F8FC]/60 border-t border-[#0A2055]/8 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header + Desktop Navigation Controls */}
        <div
          ref={headerView.ref}
          style={{
            opacity: headerView.isVisible ? 1 : 0,
            transform: headerView.isVisible
              ? 'translate3d(0, 0, 0)'
              : 'translate3d(0, 20px, 0)',
            transition:
              'opacity 600ms cubic-bezier(0.22, 1, 0.36, 1), transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12"
        >
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
              className="group/nav w-11 h-11 rounded-full bg-white border border-[#0A2055]/15 text-[#0A2055] hover:bg-[#1455D9] hover:text-white hover:border-[#1455D9] active:scale-95 transition-all duration-200 inline-flex items-center justify-center shadow-2xs cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1455D9]"
            >
              <ChevronLeft
                className="w-5 h-5 transition-transform duration-200 group-hover/nav:-translate-x-0.5"
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next testimonials"
              className="group/nav w-11 h-11 rounded-full bg-white border border-[#0A2055]/15 text-[#0A2055] hover:bg-[#1455D9] hover:text-white hover:border-[#1455D9] active:scale-95 transition-all duration-200 inline-flex items-center justify-center shadow-2xs cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1455D9]"
            >
              <ChevronRight
                className="w-5 h-5 transition-transform duration-200 group-hover/nav:translate-x-0.5"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        {/* Responsive Card Carousel Track */}
        <div ref={carouselView.ref} className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] -mx-3"
            style={{
              transform: `translate3d(-${(currentIndex * 100) / cardsPerView}%, 0, 0)`,
            }}
          >
            {PARTICIPANT_STORIES.map((story, idx) => (
              <div
                key={story.id}
                style={{
                  width: `${100 / cardsPerView}%`,
                  opacity: carouselView.isVisible ? 1 : 0,
                  transform: carouselView.isVisible
                    ? 'translate3d(0, 0, 0)'
                    : 'translate3d(0, 22px, 0)',
                  transitionProperty: 'opacity, transform',
                  transitionDuration: '600ms',
                  transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                  transitionDelay: `${Math.min(idx, 3) * 90}ms`,
                }}
                className="shrink-0 px-3"
              >
                <article className="group/card h-full bg-white border border-[#0A2055]/10 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-[0_6px_22px_rgba(10,32,85,0.04)] hover:-translate-y-1.5 hover:border-[#1455D9]/35 hover:shadow-[0_16px_34px_rgba(10,32,85,0.09)] transition-all duration-300">
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-[#F5F8FC] border border-[#0A2055]/10 flex items-center justify-center transition-transform duration-300 group-hover/card:scale-105 group-hover/card:-rotate-6">
                        <Quote className="w-5 h-5 text-[#E4B052]" aria-hidden="true" />
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
                      className="w-11 h-11 rounded-full bg-[#0A2055] text-white font-[family-name:var(--font-display)] text-sm font-bold flex items-center justify-center shrink-0 transition-transform duration-300 group-hover/card:scale-105"
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
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1455D9] ${
                  isActive
                    ? 'w-8 bg-[#1455D9]'
                    : 'w-2.5 bg-[#0A2055]/20 hover:bg-[#0A2055]/40'
                }`}
              />
            );
          })}
        </div>

        {/* ── VIDEO TESTIMONIALS SUBSECTION ── */}
        <div className="mt-16 pt-14 border-t border-[#0A2055]/10">
          <div
            ref={videoHeaderView.ref}
            style={{
              opacity: videoHeaderView.isVisible ? 1 : 0,
              transform: videoHeaderView.isVisible
                ? 'translate3d(0, 0, 0)'
                : 'translate3d(0, 20px, 0)',
              transition:
                'opacity 600ms cubic-bezier(0.22, 1, 0.36, 1), transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
          >
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1455D9] mb-1.5">
                <Video className="w-4 h-4 text-[#E4B052]" aria-hidden="true" />
                <span>Video Testimonials</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#0A2055] tracking-tight">
                Watch Learner Video Walkthroughs
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#17233D]/70 max-w-md">
              Click any story card to preview the video testimonial. Add MP4 or YouTube URLs in{' '}
              <code className="font-mono text-[#0A2055]">VIDEO_TESTIMONIALS</code>.
            </p>
          </div>

          <div
            ref={videoGridView.ref}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {VIDEO_TESTIMONIALS.map((item, idx) => {
              const showThumb = Boolean(item.thumbnailUrl) && !brokenThumbs[item.id];
              return (
                <article
                  key={item.id}
                  style={{
                    opacity: videoGridView.isVisible ? 1 : 0,
                    transform: videoGridView.isVisible
                      ? 'translate3d(0, 0, 0) scale(1)'
                      : 'translate3d(0, 24px, 0) scale(0.98)',
                    transitionProperty: 'opacity, transform, box-shadow, border-color',
                    transitionDuration: '650ms',
                    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                    transitionDelay: `${idx * 110}ms`,
                  }}
                  className="group/vid bg-white border border-[#0A2055]/10 rounded-2xl overflow-hidden shadow-[0_6px_22px_rgba(10,32,85,0.05)] hover:-translate-y-1.5 hover:border-[#1455D9]/35 hover:shadow-[0_18px_38px_rgba(10,32,85,0.1)] transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Video Poster / Play Trigger */}
                    <button
                      type="button"
                      onClick={() => openVideoModal(item)}
                      aria-label={`Play video testimonial from ${item.name}`}
                      className="relative w-full aspect-video bg-gradient-to-br from-[#0A2055] via-[#0E2A6B] to-[#1455D9] overflow-hidden flex items-center justify-center text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1455D9]"
                    >
                      {showThumb && (
                        <img
                          src={item.thumbnailUrl}
                          alt={`${item.name} video testimonial preview`}
                          onError={() =>
                            setBrokenThumbs((prev) => ({ ...prev, [item.id]: true }))
                          }
                          className="w-full h-full object-cover object-top opacity-75 group-hover/vid:scale-105 transition-transform duration-500 ease-out"
                        />
                      )}
                      <div className="absolute inset-0 bg-[#0A2055]/35 group-hover/vid:bg-[#0A2055]/20 transition-colors duration-300" />

                      {/* Duration Pill */}
                      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/70 text-white text-[11px] font-mono font-semibold">
                        {item.duration}
                      </span>

                      {/* Focus Area Tag */}
                      <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-white/95 text-[#0A2055] text-[11px] font-bold">
                        {item.focusArea}
                      </span>

                      {/* Animated Play Button Ring + Button */}
                      <span className="relative z-10 inline-flex items-center justify-center">
                        <span
                          aria-hidden="true"
                          className="absolute w-14 h-14 rounded-full bg-[#E4B052]/40 animate-ping"
                          style={{ animationDuration: '2.4s' }}
                        />
                        <span className="relative w-14 h-14 rounded-full bg-[#E4B052] text-[#0A2055] flex items-center justify-center shadow-lg group-hover/vid:scale-110 transition-transform duration-300">
                          <Play className="w-6 h-6 fill-current ml-0.5" aria-hidden="true" />
                        </span>
                      </span>
                    </button>

                    <div className="p-5 sm:p-6">
                      <p className="text-sm text-[#17233D]/80 leading-relaxed mb-4">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                    </div>
                  </div>

                  <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-[#0A2055]/10 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="text-sm sm:text-base font-bold text-[#0A2055] truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-[#17233D]/70 truncate">
                        {item.qualification} · {item.city}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => openVideoModal(item)}
                      className="group/watch inline-flex items-center gap-1 text-xs font-bold text-[#1455D9] hover:text-[#0A2055] shrink-0 cursor-pointer transition-colors"
                    >
                      <span>Watch</span>
                      <span className="transition-transform duration-200 group-hover/watch:translate-x-1">
                        →
                      </span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-[#17233D]/55">
          Sample participant feedback shown for layout preview — manage entries in{' '}
          <code className="font-mono text-[#0A2055]/75">src/config/company.ts</code>.
        </p>
      </div>

      {/* Video Player Modal */}
      {activeVideo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Video testimonial by ${activeVideo.name}`}
          onClick={closeVideoModal}
          style={{
            opacity: modalEntered ? 1 : 0,
            transition: 'opacity 200ms ease-out',
          }}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              opacity: modalEntered ? 1 : 0,
              transform: modalEntered
                ? 'translate3d(0, 0, 0) scale(1)'
                : 'translate3d(0, 16px, 0) scale(0.96)',
              transition:
                'opacity 240ms cubic-bezier(0.22, 1, 0.36, 1), transform 240ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
            className="w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-[#0A2055]/15"
          >
            <div className="flex items-center justify-between px-5 py-3.5 bg-[#0A2055] text-white">
              <div>
                <h4 className="text-sm sm:text-base font-bold">{activeVideo.name}</h4>
                <p className="text-xs text-[#E4B052]">
                  {activeVideo.qualification} · {activeVideo.city} · {activeVideo.focusArea}
                </p>
              </div>
              <button
                type="button"
                onClick={closeVideoModal}
                aria-label="Close video modal"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="aspect-video bg-black flex items-center justify-center">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={`${activeVideo.name} testimonial`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : activeVideo.videoUrl ? (
                <video
                  src={activeVideo.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="p-6 text-center text-white max-w-md space-y-2">
                  <p className="text-sm font-bold text-[#E4B052]">
                    Video Source Not Yet Attached
                  </p>
                  <p className="text-xs text-white/80 leading-relaxed">
                    Add an <code className="font-mono">.mp4</code> path (e.g.{' '}
                    <code className="font-mono">/assets/videos/testimonial-1.mp4</code>) or YouTube
                    link to <code className="font-mono">videoUrl</code> for{' '}
                    <strong>{activeVideo.name}</strong> in{' '}
                    <code className="font-mono">VIDEO_TESTIMONIALS</code>.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};