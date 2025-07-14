// utils/animations.ts
import { Variants } from 'framer-motion';

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const slideUpFade: Variants = {
  hidden: (i = 0) => ({
    opacity: 0,
    y: 40,
    transition: {
      delay: i * 0.1,
    },
  }),
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};
