import React, { useEffect, useRef, useState } from 'react';
import { Award, Building2, Users } from 'lucide-react';
import { KEY_METRICS, KeyMetric } from '../config/company';

const METRIC_ICONS: Record<
  KeyMetric['id'],
  React.ComponentType<{ className?: string }>
> = {
  'students-enrolled': Users,
  'industry-partners': Building2,
  'courses-completed': Award,
};

interface AnimatedCounterProps {
  target: number;
  suffix: string;
  shouldStart: boolean;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  suffix,
  shouldStart,
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplayValue(target);
      return;
    }

    const durationMs = 1100;
    let startTime: number | null = null;
    let rafId: number;

    const step = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }
      const elapsed = timestamp - startTime;
      const progress = Math.min(1, elapsed / durationMs);
      // Ease-out cubic for smooth settling
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(target * eased));

      if (progress < 1) {
        rafId = window.requestAnimationFrame(step);
      }
    };

    rafId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(rafId);
  }, [shouldStart, target]);

  return (
    <span className="tabular-nums">
      {displayValue.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
};

export const KeyMetricsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasEnteredView, setHasEnteredView] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setHasEnteredView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setHasEnteredView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="key-metrics"
      className="py-16 sm:py-20 bg-[#0A2055] text-white relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#1455D9]/25 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-sm font-semibold text-[#FF851B] mb-2">Programme Milestones</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
            Key Metrics
          </h2>
          <p className="text-base sm:text-lg text-white/80 leading-relaxed">
            Measuring our commitment to structured online insurance learning and industry
            readiness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {KEY_METRICS.map((metric) => {
            const Icon = METRIC_ICONS[metric.id];
            return (
              <article
                key={metric.id}
                className="bg-white/8 border border-white/15 rounded-2xl p-7 sm:p-8 text-center flex flex-col items-center hover:bg-white/12 transition-colors"
              >
                <div className="w-13 h-13 rounded-xl bg-[#1455D9] flex items-center justify-center mb-5 shadow-sm">
                  <Icon className="w-6 h-6 text-[#FF851B]" aria-hidden="true" />
                </div>

                <p
                  className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-2"
                  aria-label={`${metric.targetValue.toLocaleString('en-IN')}${metric.suffix} ${metric.label}`}
                >
                  <AnimatedCounter
                    target={metric.targetValue}
                    suffix={metric.suffix}
                    shouldStart={hasEnteredView}
                  />
                </p>

                <h3 className="text-lg font-bold text-[#FF851B] mb-2">{metric.label}</h3>
                <p className="text-sm text-white/75 leading-relaxed max-w-xs">
                  {metric.description}
                </p>
              </article>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-white/55">
          Sample figures shown for layout preview — update verified numbers in{' '}
          <code className="font-mono text-white/80">src/config/company.ts</code>.
        </p>
      </div>
    </section>
  );
};
