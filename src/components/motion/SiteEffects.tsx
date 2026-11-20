import React, { useEffect, useRef, useState } from 'react';

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

/**
 * Smooth text/heading entrance with subtle vertical mask lift
 */
export const TextReveal: React.FC<{
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
}> = ({ children, delayMs = 0, className = '' }) => {
  const { ref, isVisible } = useInViewport(0.08);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 100%, 0)',
          transitionProperty: 'opacity, transform',
          transitionDuration: '650ms',
          transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
          transitionDelay: `${delayMs}ms`,
          willChange: 'transform, opacity',
        }}
      >
        {children}
      </div>
    </div>
  );
};

/**
 * Subtle magnetic pointer pull on desktop (automatically disabled on touch/reduced motion)
 */
export const MagneticButton: React.FC<{
  children: React.ReactNode;
  strength?: number;
  className?: string;
}> = ({ children, strength = 0.22, className = '' }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      return;
    }
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    setOffset({
      x: (e.clientX - centerX) * strength,
      y: (e.clientY - centerY) * strength,
    });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition:
          offset.x === 0 && offset.y === 0
            ? 'transform 350ms cubic-bezier(0.22, 1, 0.36, 1)'
            : 'transform 90ms ease-out',
        willChange: 'transform',
      }}
      className={`inline-block ${className}`}
    >
      {children}
    </div>
  );
};

/**
 * Interactive card with soft cursor-following highlight glow + gentle hover lift
 */
export const SpotlightCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}> = ({
  children,
  className = '',
  spotlightColor = 'rgba(20, 85, 217, 0.08)',
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [spot, setSpot] = useState({ x: 50, y: 50, active: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpot({ x, y, active: true });
  };

  const handleMouseLeave = () => {
    setSpot((prev) => ({ ...prev, active: false }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden transition-transform duration-300 ease-out hover:-translate-y-1.5 ${className}`}
    >
      <div
        aria-hidden="true"
        style={{
          opacity: spot.active ? 1 : 0,
          background: `radial-gradient(320px circle at ${spot.x}% ${spot.y}%, ${spotlightColor}, transparent 75%)`,
          transition: 'opacity 250ms ease',
        }}
        className="pointer-events-none absolute inset-0 z-0"
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

/**
 * Gentle floating ambient glow / decorative accent
 */
export const FloatingOrb: React.FC<{
  className?: string;
  durationSec?: number;
  travelPx?: number;
}> = ({ className = '', durationSec = 7, travelPx = 12 }) => {
  const [tick, setTick] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => {
      setTick((prev) => !prev);
    }, durationSec * 500);
    return () => window.clearInterval(id);
  }, [durationSec]);

  return (
    <div
      aria-hidden="true"
      style={{
        transform: tick
          ? `translate3d(0, -${travelPx}px, 0) scale(1.04)`
          : `translate3d(0, ${travelPx * 0.4}px, 0) scale(0.98)`,
        transition: `transform ${durationSec * 500}ms ease-in-out`,
        willChange: 'transform',
      }}
      className={`pointer-events-none ${className}`}
    />
  );
};

/**
 * Scroll-driven subtle depth parallax (desktop-friendly, light math)
 */
export const ParallaxLayer: React.FC<{
  children: React.ReactNode;
  speed?: number;
  className?: string;
}> = ({ children, speed = 0.08, className = '' }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth < 768) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let rafId = 0;

    const updatePosition = () => {
      rafId = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const delta = (viewportCenter - elementCenter) * speed;
      setTranslateY(Math.max(-36, Math.min(36, delta)));
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updatePosition);
      }
    };

    updatePosition();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [speed]);

  return (
    <div
      ref={ref}
      style={{
        transform: `translate3d(0, ${translateY}px, 0)`,
        willChange: 'transform',
      }}
      className={className}
    >
      {children}
    </div>
  );
};