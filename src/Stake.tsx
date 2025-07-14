import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import BackgroundOverlay from './components/BackgroundOverlay';
import Logo from './components/Logo';
import StakeHeader from './components/StakeHeader';
import StakeDolphinGrid from './components/StakeDolphinGrid';
import './index.css';
import { slideUpFade } from './utils/animations';

// Parent container with stagger
const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

export default function Stake() {
  const NAVBAR_HEIGHT_PX = 80;

  return (
    <div className="relative min-h-screen flex flex-col">
      <BackgroundOverlay />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col flex-grow items-center px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28"
        style={{ paddingBottom: `${NAVBAR_HEIGHT_PX}px` }}
      >
        <motion.div variants={slideUpFade} className="w-full">
          <Logo />
        </motion.div>

        <motion.div variants={slideUpFade} className="w-full mt-4">
          <StakeHeader />
        </motion.div>

        <motion.div variants={slideUpFade} className="w-full mt-6">
          <StakeDolphinGrid />
        </motion.div>
      </motion.div>

      <div
        className="fixed bottom-0 left-0 w-full z-20"
        style={{ height: `${NAVBAR_HEIGHT_PX}px` }}
      >
        <Navbar />
      </div>
    </div>
  );
}
