
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { getBettingRoundById, getBettingRounds } from '../api/userApi';

export default function DolphinGrid({
  dolphins,
  onDolphinClick,
}: {
  dolphins: string[];
  onDolphinClick: (index: number) => void;
}) {
  const { t } = useTranslation();
  const [winningNumber,setWinningNumber] = useState<number|null>(null);

  useEffect(()=>{
    async function fetchRoundDetails(){
      const lastRoundId = await getBettingRounds();
      const lastRound = await getBettingRoundById(lastRoundId.length-1);
      setWinningNumber(lastRound.winningNumber);
    }
    fetchRoundDetails();
  })

  return (
    <div className="combined-card2 bg-black/70">
      <div style={{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        width:"100%"
      }}>
      <h2 className="dolphin-header" style={{ marginTop: '1rem' }}>
        {t('last_winner')}
      </h2>

      <img src={dolphins[(winningNumber??0)-1]} key={1} alt={`Dolphin ${1}`} className="dolphin"/>
      </div>
      <h2 className="dolphin-header" style={{ marginTop: '1rem' }}>
        {t('pick_champion')}
      </h2>
      <div className="dolphin-grid">
        {dolphins.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Dolphin ${i + 1}`}
            className="dolphin"
            onClick={() => onDolphinClick(i)}
          />
        ))}
      </div>
    </div>
  );
}
