import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
  MotionConfig,
  type Variants,
} from 'framer-motion';

export const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;

export const VIEWPORT_ONCE = {
  once: true,
  amount: 0.16,
} as const;

/**
 * Wrap your root App component in <MotionProvider> to automatically respect
 * OS-level prefers-reduced-motion settings globally.
 */
export const MotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MotionConfig reducedMotion="user" transition={{ duration: 0.55, ease: EASE_PREMIUM }}>
    {children}
  </MotionConfig>
);

/**
 * Smooth route-to-route page wrapper (place around your active route view in App.tsx)
 */
export const PageTransitionWrapper: React.FC<{
  routeKey: string;
  children: React.ReactNode;
}> = ({ routeKey, children }) => (
  <AnimatePresence mode="wait" initial={false}>
    <motion.div
      key={routeKey}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.28, ease: EASE_PREMIUM }}
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none' | 'scale' | 'blur';

interface RevealProps {
  children: React.ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  className?: string;
}

/**
 * Viewport-triggered scroll reveal supporting fade-up/down/left/right, scale-in, and blur-to-focus.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.55,
  className = '',
}) => {
  const getInitial = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: 24 };
      case 'down':
        return { opacity: 0, y: -24 };
      case 'left':
        return { opacity: 0, x: 28 };
      case 'right':
        return { opacity: 0, x: -28 };
      case 'scale':
        return { opacity: 0, scale: 0.94 };
      case 'blur':
        return { opacity: 0, filter: 'blur(8px)', y: 12 };
      case 'none':
      default:
        return { opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
      }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration, delay, ease: EASE_PREMIUM }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const staggerContainerVariants: Variants = {
  hidden: {},
  visible: (staggerDelay: number = 0.08) => ({
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.05,
    },
  }),
};

const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_PREMIUM },
  },
};

export const StaggerGroup: React.FC<{
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}> = ({ children, staggerDelay = 0.08, className = '' }) => (
  <motion.div
    variants={staggerContainerVariants}
    custom={staggerDelay}
    initial="hidden"
    whileInView="visible"
    viewport={VIEWPORT_ONCE}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <motion.div variants={staggerItemVariants} className={className}>
    {children}
  </motion.div>
);

/**
 * Tactile card hover wrapper with subtle GPU-accelerated lift & tap feedback
 */
export const MotionCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  liftY?: number;
}> = ({ children, className = '', liftY = -4 }) => (
  <motion.div
    whileHover={{ y: liftY, transition: { duration: 0.22, ease: EASE_PREMIUM } }}
    whileTap={{ scale: 0.99 }}
    className={className}
  >
    {children}
  </motion.div>
);

/**
 * Subtle desktop-only parallax wrapper for hero visuals & decorative glows
 */
export const SubtleParallax: React.FC<{
  children: React.ReactNode;
  offset?: number;
  className?: string;
}> = ({ children, offset = 24, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

/**
 * Smooth viewport-triggered number counter (preserves prefixes/suffixes like "₹15,999/-" or "85%")
 */
export const AnimatedCounter: React.FC<{
  target: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  className?: string;
}> = ({ target, prefix = '', suffix = '', durationMs = 1400, className = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let startTimestamp: number | null = null;
    let frameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / durationMs, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(eased * target));
      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, target, durationMs]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
};