import { useState } from 'react';
import dolphin1 from '../assets/dolphins/dolphin1.jpg';
import dolphin2 from '../assets/dolphins/dolphin2.jpg';
import dolphin3 from '../assets/dolphins/dolphin3.jpg';
import dolphin4 from '../assets/dolphins/dolphin4.jpg';
import dolphin5 from '../assets/dolphins/dolphin5.jpg';
import dolphin6 from '../assets/dolphins/dolphin6.jpg';
import dolphin7 from '../assets/dolphins/dolphin7.jpg';
import dolphin8 from '../assets/dolphins/dolphin8.jpg';
import dolphin9 from '../assets/dolphins/dolphin9.jpg';

import StakePopup from './stakepopup';

export default function StakeDolphinGrid() {
  const dolphinCards = [
    dolphin1, dolphin2, dolphin3,
    dolphin4, dolphin5, dolphin6,
    dolphin7, dolphin8, dolphin9
  ];

  const dolphinNames = [
    'RUGPULL RAY', 'HARMONIX', 'DND',
    'D.O.A.T.', 'ANDRE BAIT', 'ELLE TUSK',
    'DOLFIE TRUNK', 'JELLY THE JEET', 'FINTALIK'
  ];

  const [selectedDolphinIndex, setSelectedDolphinIndex] = useState<number | null>(null);
  const [isLoadingDolphin, setIsLoadingDolphin] = useState(false);

  const handleDolphinClick = (index: number) => {
    setIsLoadingDolphin(true);
    setTimeout(() => {
      setSelectedDolphinIndex(index);
      setIsLoadingDolphin(false);
    }, 2000);
  };

  return (
    <>
      {/* Spinner overlay (exact same as your Home.tsx style) */}
      {isLoadingDolphin && (
        <div className="spinner-overlay">
          <div className="custom-spinner" />
        </div>
      )}

      <div className="staking-grid-card w-full max-w-4xl mx-auto flex-grow mb-4">
        <h2 className="card-title font-semibold text-lg sm:text-xl mb-8">
          Available for Staking
        </h2>

        <div className="dolphin-grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {dolphinCards.map((card, index) => (
            <img
              key={index}
              src={card}
              alt={dolphinNames[index]}
              className="dolphin"
              style={{ cursor: 'pointer' }}
              onClick={() => handleDolphinClick(index)}
            />
          ))}
        </div>
      </div>

      {selectedDolphinIndex !== null && !isLoadingDolphin && (
        <StakePopup
          image={dolphinCards[selectedDolphinIndex]}
          name={dolphinNames[selectedDolphinIndex]}
          onClose={() => setSelectedDolphinIndex(null)}
        />
      )}

      {/* CSS for spinner */}
      <style>{`
        .spinner-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(6px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }

        .custom-spinner {
          width: 56px;
          height: 56px;
          border: 4px dotted white;
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
