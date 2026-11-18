import React from 'react';
import { AppLink, AppRoutePath } from '../context/RouterContext';
import { Breadcrumb } from './Breadcrumb';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbLabel?: string;
  ctaLabel?: string;
  ctaTo?: AppRoutePath;
  onCtaClick?: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  title,
  description,
  breadcrumbLabel,
  ctaLabel,
  ctaTo,
  onCtaClick,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#0A2055] text-white py-14 sm:py-16 border-b border-white/10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#1455D9]/25 blur-3xl"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          variant="dark"
          className="mb-5"
          items={
            breadcrumbLabel
              ? [{ label: 'Home', to: '/' }, { label: breadcrumbLabel }]
              : undefined
          }
        />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FF851B] mb-2">
              {eyebrow}
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              {title}
            </h1>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl">
              {description}
            </p>
          </div>

          {ctaLabel && (onCtaClick || ctaTo) && (
            <div className="shrink-0">
              {onCtaClick ? (
                <button
                  type="button"
                  onClick={onCtaClick}
                  className="inline-flex items-center justify-center px-6 py-3 text-sm sm:text-base font-bold text-[#0A2055] bg-[#FF851B] hover:bg-white rounded-lg transition-colors whitespace-nowrap shadow-sm"
                >
                  {ctaLabel}
                </button>
              ) : ctaTo ? (
                <AppLink
                  to={ctaTo}
                  className="inline-flex items-center justify-center px-6 py-3 text-sm sm:text-base font-bold text-[#0A2055] bg-[#FF851B] hover:bg-white rounded-lg transition-colors whitespace-nowrap shadow-sm"
                >
                  {ctaLabel}
                </AppLink>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
