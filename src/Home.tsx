import {useContext, useEffect, useState } from 'react';
import logo from './assets/logo.jpg';
import background1 from './assets/background1.jpg';
import './index.css';

import WelcomePopup from './components/WelcomePopup';
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
import { UserContext } from './Context/UserContextProvider';

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
];

function Home() {
  const [timer, setTimer] = useState(0);
  const context = useContext(UserContext);
  const [showPopup, setShowPopup] = useState(context?.user.telegramId ? false : true);
  const [selectedDolphin, setSelectedDolphin] = useState<null | { image: string; name: string }>(null);
  
  useEffect(() => {
    const saved = localStorage.getItem('dolphin_timer_start');
    let start = saved ? parseInt(saved) : Date.now();
    if (!saved) localStorage.setItem('dolphin_timer_start', `${start}`);
    
    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - start) / 1000);
      if (elapsed >= 86400) {
        start = Date.now();
        localStorage.setItem('dolphin_timer_start', `${start}`);
        setTimer(0);
      } else {
        setTimer(elapsed);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  
  return (
    <div className="page" style={{ backgroundImage: `url(${background1})` }}>
      {showPopup && <WelcomePopup onClose={() => setShowPopup(false)} />}
      {/* Blur wrapper for the main content */}
      <div className={`main-content-wrapper ${showPopup ? 'blurred' : ''}`}>
        <img src={logo} alt="Logo" className="page-logo" />
        <TimerCard timer={timer} />
        <DolphinGrid
          dolphins={dolphins.map((d) => d.image)}
          onDolphinClick={(index) => {
            setSelectedDolphin({
              image: dolphins[index].image,
              name: dolphins[index].name,
            });
          }}
        />

        <Navbar />
      </div>

      {/* DolphinPopup stays OUTSIDE blur, unaffected */}
      {selectedDolphin && (
        <DolphinPopup
          image={selectedDolphin.image}
          name={selectedDolphin.name}
          onClose={() => setSelectedDolphin(null)}
        />
      )}
    </div>
  );
}

export default Home;
