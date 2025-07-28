import { useEffect, useRef, useState } from 'react';
import background from '../assets/background3.png';
import logo from '../assets/logo.jpg';
import glowFrame from '../assets/frame.png';
import { motion } from 'framer-motion';
import { slideUpFade } from '../utils/animations';
import dolphin1 from '../assets/dolphins/dolphin1.jpg';
import dolphin2 from '../assets/dolphins/dolphin2.jpg';
import dolphin3 from '../assets/dolphins/dolphin3.jpg';
import dolphin4 from '../assets/dolphins/dolphin4.jpg';
import dolphin5 from '../assets/dolphins/dolphin5.jpg';
import dolphin6 from '../assets/dolphins/dolphin6.jpg';
import dolphin7 from '../assets/dolphins/dolphin7.jpg';
import dolphin8 from '../assets/dolphins/dolphin8.jpg';
import dolphin9 from '../assets/dolphins/dolphin9.jpg';
import dolphin10 from '../assets/dolphins/dolphin10.jpg';
import dolphin11 from '../assets/dolphins/dolphin11.jpg';
import dolphin12 from '../assets/dolphins/dolphin12.jpg';
import dolphin13 from '../assets/dolphins/dolphin13.jpg';
import dolphin14 from '../assets/dolphins/dolphin14.jpg';
import dolphin15 from '../assets/dolphins/dolphin15.jpg';
import dolphin16 from '../assets/dolphins/dolphin16.jpg';
import dolphin17 from '../assets/dolphins/dolphin17.jpg';
import dolphin18 from '../assets/dolphins/dolphin18.jpg';
import dolphin19 from '../assets/dolphins/dolphin19.jpg';
import dolphin20 from '../assets/dolphins/dolphin20.jpg';
import dolphin21 from '../assets/dolphins/dolphin21.jpg';
import dolphin22 from '../assets/dolphins/dolphin22.jpg';
import dolphin23 from '../assets/dolphins/dolphin23.jpg';
import dolphin24 from '../assets/dolphins/dolphin24.jpg';
import dolphin25 from '../assets/dolphins/dolphin25.png';
import dolphin26 from '../assets/dolphins/dolphin26.png';
import dolphin27 from '../assets/dolphins/dolphin27.png';
import dolphin28 from '../assets/dolphins/dolphin28.png';
import dolphin29 from '../assets/dolphins/dolphin29.png';
import dolphin30 from '../assets/dolphins/dolphin30.png';
import dolphin31 from '../assets/dolphins/dolphin31.png';
import dolphin32 from '../assets/dolphins/dolphin32.png';
import dolphin33 from '../assets/dolphins/dolphin33.png';
import dolphin34 from '../assets/dolphins/dolphin34.png';
import dolphin35 from '../assets/dolphins/dolphin35.png';
import dolphin36 from '../assets/dolphins/dolphin36.png';

import WinnerModal from '../components/WinnerModal';

const dolphinImages = [
  dolphin1, dolphin2, dolphin3, dolphin4, dolphin5, dolphin6,
  dolphin7, dolphin8, dolphin9, dolphin10, dolphin11, dolphin12,
  dolphin13, dolphin14, dolphin15, dolphin16, dolphin17, dolphin18,
  dolphin19, dolphin20, dolphin21, dolphin22, dolphin23, dolphin24,
  dolphin25, dolphin26, dolphin27, dolphin28, dolphin29, dolphin30,
  dolphin31, dolphin32, dolphin33, dolphin34, dolphin35, dolphin36,
];

function DailyDraw() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [heading, setHeading] = useState(['Daily Dolphin', 'Dash Draw']);
  const [isDrawing, setIsDrawing] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(2);
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null);
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

 useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    scrollContainer.scrollLeft = 0;
    let scrollAmount = 0;

    if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);

    scrollIntervalRef.current = setInterval(() => {
      if (!scrollContainer) return;

      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
        scrollAmount = 0;
      } else {
        scrollAmount += scrollSpeed;
        scrollContainer.scrollLeft = scrollAmount;
      }
    }, 16);

    return () => {
      if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
    };
  }, [scrollSpeed]);

  useEffect(() => {
    if (countdown <= 0 && !isDrawing && winnerIndex === null) {
      handlePlay();
    }

    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, isDrawing, winnerIndex]);

  const handlePlay = () => {
    setIsDrawing(true);
    setHeading(['Drawing in', 'Progress']);
    setScrollSpeed(5);

    setTimeout(() => {
      setScrollSpeed(0);
      const randomIndex = Math.floor(Math.random() * dolphinImages.length);
      setWinnerIndex(randomIndex);
      setIsDrawing(false);
      setHeading(['Daily Dolphin', 'Dash Draw']);
      setShowWinnerModal(true);
    }, 10000); // 10s draw duration
  };


  return (
    <motion.div
      variants={slideUpFade}
      initial="hidden"
      animate="visible"
      className="relative h-screen w-screen flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${background})` }}
    >
      {showWinnerModal && winnerIndex !== null ? (
        <WinnerModal
          winnerImage={dolphinImages[winnerIndex]}
          onClose={() => setShowWinnerModal(false)}
          className="flex items-center justify-center h-full w-full"
        />
      ) : (
        <div className="flex flex-col items-center justify-between w-full h-full max-h-full overflow-hidden px-4 py-4">
          {/* Logo */}
          <img src={logo} alt="Logo" className="animated-logo mb-2" style={{ width: '160px' }} />

          {/* Heading */}
          <h1 className="text-white text-center text-[28px] font-semibold leading-tight font-poppins">
            {heading.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </h1>

          {/* Timer */}
          <p className="text-white text-[13px] font-medium mt-1">
            {isDrawing ? 'Please wait...' : `Next Draw In: ${countdown}s`}
          </p>

          {/* Carousel + Frame */}
          <div className="relative w-full max-w-5xl flex flex-col items-center justify-center mb-2 pb-2">
            <div className="absolute top-1/2 -translate-y-1/2 z-10 pointer-events-none">
              <img src={glowFrame} alt="Center Frame" className="w-[120px] h-[150px]" />
            </div>

            <div
              ref={scrollRef}
              className="flex overflow-x-hidden scroll-smooth z-0 rounded-xl gap-3"
              style={{
                width: '100%',
                padding: '0.75rem 0',
                background: 'linear-gradient(180deg, rgba(0, 43, 255, 0.30) 0%, rgba(42, 67, 193, 0.30) 100%)',
                backdropFilter: 'blur(5px)',
                WebkitBackdropFilter: 'blur(5px)',
                marginTop: '4px'
              }}
            >
              {[...dolphinImages, ...dolphinImages].map((img, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 flex justify-center items-center w-[72px] h-[72px] aspect-square transition-transform duration-300 ${
                    winnerIndex === index ? 'scale-110 border-2 border-yellow-400' : ''
                  }`}
                >
                  <img
                    src={img}
                    alt={`Dolphin ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg border border-transparent hover:border-white transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default DailyDraw;
