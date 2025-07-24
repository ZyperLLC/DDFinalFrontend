import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../assets/background3.png';
import logo from '../assets/logo.jpg';
import Button from '../components/Button';

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
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollStep = 1;
    const scrollDelay = 20;

    const interval = setInterval(() => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
        scrollAmount = 0;
      } else {
        scrollAmount += scrollStep;
        scrollContainer.scrollLeft = scrollAmount;
      }
    }, scrollDelay);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen w-screen flex flex-col items-center bg-cover bg-center bg-no-repeat transition-all duration-300 overflow-hidden"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Logo */}
      <div className="mt-10 mb-6">
        <img src={logo} alt="Logo" className="page-logo" />
      </div>

      {/* Heading */}
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
          Daily Dolphin <br /> Dash Draw
        </h1>
      </div>

      {/* Timer */}
      <div className="mb-6 combined-card">
        <p className="text-white text-lg text-center">
          Next Draw In : 14h 21m 45s
        </p>
      </div>

      {/* Carousel Section */}
      <div className="relative w-full max-w-5xl h-30 flex items-center justify-center mb-2 overflow-hidden px-4">
        {/* Glowing Frame */}
        <div className="absolute z-10 w-32 h-44 border-4 rounded-xl pointer-events-none"
          style={{
            borderImage: 'linear-gradient(45deg, #00f0ff, #ff00f7) 1',
            boxShadow: '0 0 30px rgba(0,255,255,0.6), 0 0 30px rgba(255,0,255,0.3)',
          }}
        />

        {/* Scrollable Strip */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-hidden scroll-smooth"
          style={{
            width: '100%',
            padding: '1.5rem 0',
            display: 'flex',
            whiteSpace: 'nowrap',
          }}
        >
          {[...dolphinImages, ...dolphinImages].map((img, index) => (
            <div key={index} className="flex-shrink-0 w-20 h-20">
              <img
                src={img}
                alt={`Dolphin ${index + 1}`}
                className="w-full h-full object-contain rounded-lg border-2 border-transparent hover:border-white transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Play Button */}
      <Button text="Play Dolphin Dash" onClick={() => navigate('/play')} />
    </div>
  );
}

export default DailyDraw;
