import { useContext, useEffect, useState } from 'react';
import logo from './assets/logo.jpg';
import background1 from './assets/background1.jpg';
import './index.css';

import WelcomePopup from './components/WelcomePopup';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import TimerCard from './components/TimerCard';
import DolphinGrid from './components/DolphinGrid';
import Navbar from './components/Navbar';
import DolphinPopup from './components/DolphinPopup';

import dolphin1 from './assets/dolphins/dolphin1.jpg';
import dolphin2 from './assets/dolphins/dolphin2.jpg';
import dolphin3 from './assets/dolphins/dolphin3.jpg';
import dolphin4 from './assets/dolphins/dolphin4.jpg';
import dolphin5 from './assets/dolphins/dolphin5.jpg';
import dolphin6 from './assets/dolphins/dolphin6.jpg';
import dolphin7 from './assets/dolphins/dolphin7.jpg';
import dolphin8 from './assets/dolphins/dolphin8.jpg';
import dolphin9 from './assets/dolphins/dolphin9.jpg';
import dolphin10 from './assets/dolphins/dolphin10.jpg';
import dolphin11 from './assets/dolphins/dolphin11.jpg';
import dolphin12 from './assets/dolphins/dolphin12.jpg';
import dolphin13 from './assets/dolphins/dolphin13.jpg';
import dolphin14 from './assets/dolphins/dolphin14.jpg';
import dolphin15 from './assets/dolphins/dolphin15.jpg';
import dolphin16 from './assets/dolphins/dolphin16.jpg';
import dolphin17 from './assets/dolphins/dolphin17.jpg';
import dolphin18 from './assets/dolphins/dolphin18.jpg';
import dolphin19 from './assets/dolphins/dolphin19.jpg';
import dolphin20 from './assets/dolphins/dolphin20.jpg';
import dolphin21 from './assets/dolphins/dolphin21.jpg';
import dolphin22 from './assets/dolphins/dolphin22.jpg';
import dolphin23 from './assets/dolphins/dolphin23.jpg';
import dolphin24 from './assets/dolphins/dolphin24.jpg';
import dolphin25 from './assets/dolphins/dolphin25.png';
import dolphin26 from './assets/dolphins/dolphin26.png';
import dolphin27 from './assets/dolphins/dolphin27.png';
import dolphin28 from './assets/dolphins/dolphin28.png';
import dolphin29 from './assets/dolphins/dolphin29.png';
import dolphin30 from './assets/dolphins/dolphin30.png';
import dolphin31 from './assets/dolphins/dolphin31.png';
import dolphin32 from './assets/dolphins/dolphin32.png';
import dolphin33 from './assets/dolphins/dolphin33.png';
import dolphin34 from './assets/dolphins/dolphin34.png';
import dolphin35 from './assets/dolphins/dolphin35.png';
import dolphin36 from './assets/dolphins/dolphin36.png';
import { UserContext } from './Context/UserContextProvider';
import { motion } from 'framer-motion';
import { slideUpFade } from './utils/animations';

const dolphins = [
  { image: dolphin1, name: 'RUGPULL RAY' },
  { image: dolphin2, name: 'HARMONIX' },
  { image: dolphin3, name: 'DND' },
  { image: dolphin4, name: 'D.O.A.T.' },
  { image: dolphin5, name: 'ANDRE BAIT' },
  { image: dolphin6, name: 'ELLE TUSK' },
  { image: dolphin7, name: 'DOLFIE TRUNK' },
  { image: dolphin8, name: 'JELLY THE JEET' },
  { image: dolphin9, name: 'FINTALIK' },
  { image: dolphin10, name: 'DRAINO' },
  { image: dolphin11, name: 'DUROPHIN' },
  { image: dolphin12, name: 'JUSTIN SINK' },
  { image: dolphin13, name: 'KOD' },
  { image: dolphin14, name: 'SHILLEERINA' },
  { image: dolphin15, name: 'TA-LIB' },
  { image: dolphin16, name: 'OLUWAPUMP' },
  { image: dolphin17, name: 'CHADRA SWAMI' },
  { image: dolphin18, name: 'PUMP.FIN' },
  { image: dolphin19, name: 'DOLPHOVICH' },
  { image: dolphin20, name: 'EL LIQUIDATOR' },
  { image: dolphin21, name: 'BOOKIE' },
  { image: dolphin22, name: 'BLUBBERROCK DTF' },
  { image: dolphin23, name: 'CARDOLPHO' },
  { image: dolphin24, name: 'SOLANIC' },
  { image: dolphin25, name: 'MODZILLA' },
  { image: dolphin26, name: 'PROMPTO' },
  { image: dolphin27, name: 'FUDDERINO' },
  { image: dolphin28, name: 'MOONWAVE' },
  { image: dolphin29, name: 'MCFLIPPER' },
  { image: dolphin30, name: 'FINTOSHI' },
  { image: dolphin31, name: 'GASOLINA' },
  { image: dolphin32, name: 'OG FINFATHER' },
  { image: dolphin33, name: 'DOLPH UN' },
  { image: dolphin34, name: 'WHALE WEI' },
  { image: dolphin35, name: 'TONY FLIPPINS' },
  { image: dolphin36, name: 'DOLPH D' },
];

function Home() {
  const [timer, setTimer] = useState(0);
  const context = useContext(UserContext);
  const [showPopup, setShowPopup] = useState(context?.user.telegramId ? false : true);
  const [selectedDolphin, setSelectedDolphin] = useState<null | { id:number,image: string; name: string }>(null);
  const [isDolphinPopupVisible, setIsDolphinPopupVisible] = useState(false);

  useEffect(() => {
    function getTimeUntilTarget() {
      const targetTime = new Date(Date.UTC(2025, 6, 15, 19, 30, 0, 0)); // July 15, 2025, 8 PM UTC
      const now = new Date();
      
      // Calculate seconds until target
      const secondsUntil = Math.floor((now.getTime() - targetTime.getTime()) / 1000);
      
      // If target time hasn't been reached yet, return positive seconds
      if (secondsUntil > 0) {
        return secondsUntil;
      }
      
      // If target time has passed, return 0
      return 0;
    }

    const interval = setInterval(() => {
      const timeUntil = getTimeUntilTarget();
      setTimer(timeUntil);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // show popup when a dolphin is selected
  useEffect(() => {
    if (selectedDolphin) {
      setIsDolphinPopupVisible(true); // fade in
    }
  }, [selectedDolphin]);

  const handleDolphinClose = () => {
    setIsDolphinPopupVisible(false); // trigger fade-out
  };

  const handleDolphinExit = () => {
    setSelectedDolphin(null); // fully unmount after fade-out
  };

  return (
    <div className="page" style={{ backgroundImage: `url(${background1})` }}>
      {showPopup && <WelcomePopup onClose={() => setShowPopup(false)} />}
      <LanguageSwitcher />

      <motion.div variants={slideUpFade} initial="hidden" animate="visible" className={`main-content-wrapper ${showPopup ? 'blurred' : ''}`}>
        <img src={logo} alt="Logo" className="page-logo" />
        <TimerCard timer={timer} />
        <DolphinGrid
          dolphins={dolphins.map((d) => d.image)}
          onDolphinClick={(index) => {
            setSelectedDolphin({
              id:index,
              image: dolphins[index].image,
              name: dolphins[index].name,
            });
          }}
        />
        <Navbar />
      </motion.div>

      {selectedDolphin && (
        <motion.div variants={slideUpFade} initial="hidden" animate="visible">
        <DolphinPopup
          id={selectedDolphin.id}
          image={selectedDolphin.image}
          name={selectedDolphin.name}
          isVisible={isDolphinPopupVisible}
          onClose={handleDolphinClose}
          onExit={handleDolphinExit}
        />
        </motion.div>
      )}
    </div>
  );
}

export default Home;
