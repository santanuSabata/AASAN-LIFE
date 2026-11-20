import React, { useEffect, useState } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId: number | null = null;

    const updateProgress = () => {
      rafId = null;
      const doc = document.documentElement;
      const scrollableHeight = doc.scrollHeight - window.innerHeight;
      if (scrollableHeight <= 0) {
        setProgress(0);
        return;
      }
      const nextProgress = Math.min(1, Math.max(0, window.scrollY / scrollableHeight));
      setProgress(nextProgress);
    };

    const handleScrollOrResize = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <div
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-[#0A2055]/8 pointer-events-none"
    >
      <div
        className="h-full w-full origin-left bg-gradient-to-r from-[#1455D9] to-[#E4B052] will-change-transform"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
};
