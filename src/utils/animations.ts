import { Variants } from 'framer-motion';

export const slideUpFade: Variants = {
  hidden: (i = 0) => ({
    opacity: 0,
    y: 40,
    transition: {
      delay: i * 0.2,
    },
  }),
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
  exit: {
    opacity: 0,
    y: 40,
    transition: { duration: 0.3 },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};
