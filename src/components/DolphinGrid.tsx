
import { useTranslation } from 'react-i18next';

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
