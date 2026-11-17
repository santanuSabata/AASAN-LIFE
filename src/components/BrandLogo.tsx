import React from 'react';

interface BrandLogoProps {
  variant?: 'dark' | 'light';
  className?: string;
}

/**
 * Official AASAN LIFE brand lockup component.
 * If you replace this vector mark with an external PNG/SVG logo file later,
 * keep the aspect ratio locked and do not distort the dimensions.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'dark',
  className = '',
}) => {
  const textColor = variant === 'light' ? 'text-white' : 'text-[#0A2055]';
  const accentTextColor = variant === 'light' ? 'text-[#FF851B]' : 'text-[#1455D9]';

  return (
    <span className={`inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 ${className}`}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="w-9 h-9 shrink-0"
      >
        <rect width="64" height="64" rx="14" fill="#0A2055" />
        <path
          d="M32 10L50 17.5V31.5C50 42.6 42.3 51.8 32 55C21.7 51.8 14 42.6 14 31.5V17.5L32 10Z"
          fill="#1455D9"
          stroke="#FFFFFF"
          strokeWidth="2"
        />
        <path d="M24 34.5L32 21L40 34.5H35.6L32 28.2L28.4 34.5H24Z" fill="#FFFFFF" />
        <path
          d="M26.5 38.5C29.8 40.8 34.2 40.8 37.5 38.5"
          stroke="#FF851B"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      </svg>
      <span className={`font-[family-name:var(--font-display)] text-xl font-extrabold tracking-tight leading-none ${textColor}`}>
        AASAN <span className={accentTextColor}>LIFE</span>
      </span>
    </span>
  );
};
