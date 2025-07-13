import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import dolphin1 from '../assets/dolphins/dolphin1.jpg';
import dolphin2 from '../assets/dolphins/dolphin2.jpg';
import dolphin3 from '../assets/dolphins/dolphin3.jpg';
import dolphin4 from '../assets/dolphins/dolphin4.jpg';
import dolphin5 from '../assets/dolphins/dolphin5.jpg';
import dolphin6 from '../assets/dolphins/dolphin6.jpg';
import dolphin7 from '../assets/dolphins/dolphin7.jpg';
import dolphin8 from '../assets/dolphins/dolphin8.jpg';
import dolphin9 from '../assets/dolphins/dolphin9.jpg';

import DolphinPopup from './stakepopup';

export default function StakeDolphinGrid() {
  const { t } = useTranslation();

  const dolphinCards = [
    dolphin1, dolphin2, dolphin3,
    dolphin4, dolphin5, dolphin6,
    dolphin7, dolphin8, dolphin9
  ];

  const dolphinNames = [
    t('stakeGrid.names.0'),
    t('stakeGrid.names.1'),
    t('stakeGrid.names.2'),
    t('stakeGrid.names.3'),
    t('stakeGrid.names.4'),
    t('stakeGrid.names.5'),
    t('stakeGrid.names.6'),
    t('stakeGrid.names.7'),
    t('stakeGrid.names.8')
  ];

  const [selectedDolphinIndex, setSelectedDolphinIndex] = useState<number | null>(null);

  return (
    <>
      <div className="staking-grid-card w-full max-w-4xl mx-auto flex-grow mb-4">
        <h2 className="card-title font-semibold text-lg sm:text-xl mb-8">
          {t('stakeGrid.title')}
        </h2>

        <div className="dolphin-grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {dolphinCards.map((card, index) => (
            <img
              key={index}
              src={card}
              alt={dolphinNames[index]}
              className="dolphin page-logo"
              onClick={() => setSelectedDolphinIndex(index)}
            />
          ))}
        </div>
      </div>

      {selectedDolphinIndex !== null && (
        <DolphinPopup
          image={dolphinCards[selectedDolphinIndex]}
          name={dolphinNames[selectedDolphinIndex]}
          onClose={() => setSelectedDolphinIndex(null)}
        />
      )}
    </>
  );
}
