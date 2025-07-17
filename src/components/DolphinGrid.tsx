
import { useTranslation } from 'react-i18next';
import dolphin24 from '../assets/dolphins/dolphin24.jpg';

export default function DolphinGrid({
  dolphins,
  onDolphinClick,
}: {
  dolphins: string[];
  onDolphinClick: (index: number) => void;
}) {
  const { t } = useTranslation();

  return (
    <div className="combined-card2">
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
      
      <img src={dolphin24} key={1} alt={`Dolphin ${1}`} className="dolphin"/>  
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
