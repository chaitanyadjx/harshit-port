import React from 'react';
import { motion } from 'framer-motion';

// Easing curves for smooth mechanical motion
export const transitionEase = [0.22, 1, 0.36, 1];

// Stagger container supporting both 'visible' and 'show' keys
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.02,
    },
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.02,
    },
  },
};

// Card entrance supporting both 'visible' and 'show' keys
export const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: transitionEase,
    },
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: transitionEase,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2 },
  },
};

// Tag pop-in with soft scale bounce
export const tagVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.02,
      duration: 0.3,
      ease: transitionEase,
    },
  }),
  show: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.02,
      duration: 0.3,
      ease: transitionEase,
    },
  }),
};

// Text reveal wrapper that always renders text cleanly
export function TextReveal({ children, className = '', delay = 0 }) {
  return (
    <span className={`overflow-hidden-wipe ${className}`} style={{ display: 'inline-block' }}>
      <motion.span
        style={{ display: 'inline-block' }}
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: transitionEase, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function AnimatedSection({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: transitionEase, delay }}
    >
      {children}
    </motion.div>
  );
}
