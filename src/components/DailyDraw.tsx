import { useEffect, useRef, useState } from 'react';
import background from '../assets/background3.png';
import logo from '../assets/logo.jpg';
import Button from '../components/DrawButton';
import glowFrame from '../assets/frame.png';
import lineImg1 from '../assets/Line 1.png';
import lineImg2 from '../assets/Line 2.png';

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

  const handlePlay = async () => {
    if (isDrawing) return;

    return new Promise<void>((resolve) => {
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
        resolve();
      }, 10000);
    });
  };

  return (
    <div
      className="min-h-screen w-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden relative"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Winner Modal */}
      {showWinnerModal && winnerIndex !== null ? (
        <div className="absolute inset-0 flex items-center justify-center backdrop-blur-md z-50 p-4">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl  text-center shadow-xl w-[90%] max-w-sm">
            <h2
              className="combined-card text-white text-center font-poppins text-[40px] font-semibold leading-[120%] space-y-4"
              style={{
                fontFeatureSettings: "'liga' off, 'clig' off",
                fontStyle: 'normal',
                color: 'white',
              }}
            >
              FINTALIK WINNER
            </h2>

            <img
              src={dolphinImages[winnerIndex]}
              alt="Winning Dolphin"
              className="w-[60%] h-auto rounded-lg border-4 border-white mb-4"
            />

            <div className="flex items-center justify-center mb-4 gap-4 combined-card">
              <img src={lineImg1} alt="line left" className="h-1 w-16 sm:w-24 object-contain" />
              <p
                style={{
                  color: '#98FF3F',
                  textAlign: 'center',
                  fontFeatureSettings: "'liga' off, 'clig' off",
                  fontFamily: 'Poppins',
                  fontSize: '24px',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  lineHeight: '120%',
                }}
              >
                You won!
              </p>
              <img src={lineImg2} alt="line right" className="h-1 w-16 sm:w-24 object-contain" />
            </div>


              <button
                onClick={() => setShowWinnerModal(false)}
                className="combined-card"

                 style={{
                  color: 'white',
                  textAlign: 'center',
                  fontFeatureSettings: "'liga' off, 'clig' off",
                  fontFamily: 'Poppins',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '120%',
                }}
              >
                Come Back Tomorrow
              </button>
          </div>
        </div>
      ) : (
        <>
          {/* Logo */}
          <div className="flex flex-col items-center text-center">
            <img src={logo} alt="Logo" className="animated-logo mb-14" style={{ width: '250px' }} />
          </div>

          {/* Heading */}
          <div className="w-full max-w-4xl mx-auto text-center">
            <h1
              className="text-white text-center font-poppins text-[40px] font-semibold leading-[120%] space-y-2"
              style={{
                fontFeatureSettings: "'liga' off, 'clig' off",
                fontStyle: 'normal',
                color: 'white',
              }}
            >
              {heading.map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </h1>
          </div>

          {/* Timer */}
          <div className="relative z-10 mb-10 combined-card">
            <p
              className="text-white text-center font-poppins text-[15px] font-semibold leading-[120%]"
              style={{
                fontFeatureSettings: "'liga' off, 'clig' off",
                fontStyle: 'normal',
                color: 'white',
              }}
            >
              {isDrawing ? 'Please wait...' : 'Next Draw In : 14h 21m 45s'}
            </p>
          </div>

          {/* Carousel Section */}
          <div className="relative w-full max-w-5xl flex items-center justify-center mb-10">
            {/* Centered Frame Image */}
            <div className="absolute z-10 pointer-events-none flex items-center justify-center mb-24">
              <img
                src={glowFrame}
                alt="Center Frame"
                className="w-[184px] h-[227px]"
              />
            </div>

            {/* Scrollable Strip */}
            <div
              ref={scrollRef}
              className="flex overflow-x-hidden scroll-smooth z-0 rounded-xl gap-6"
              style={{
                width: '100%',
                padding: '1.5rem 0',
                background: 'linear-gradient(180deg, rgba(0, 43, 255, 0.30) 0%, rgba(42, 67, 193, 0.30) 100%)',
                backdropFilter: 'blur(5px)',
                WebkitBackdropFilter: 'blur(5px)',
                marginTop: '10px'
              }}
            >
              {[...dolphinImages, ...dolphinImages].map((img, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 flex justify-center items-center w-[92px] h-[92px] aspect-square gap-[16px] transition-transform duration-300 ${
                    winnerIndex === index ? 'scale-110 border-4 border-yellow-400' : ''
                  }`}
                >
                  <img
                    src={img}
                    alt={`Dolphin ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg border-2 border-transparent hover:border-white transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Play Button */}
          <div className="mt-24 z-10 relative ">
            <Button text="Play Dolphin Dash" onClick={handlePlay} />
          </div>
        </>

      )}

    </div>
  );
}

export default DailyDraw;
