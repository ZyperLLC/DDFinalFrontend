
import { useTranslation } from 'react-i18next';

export default function DolphinGrid({
  dolphins,
  onDolphinClick,
}: {
  dolphins: string[];
  onDolphinClick?: (index: number) => void;
}) {
  const { t } = useTranslation();

  return (
    <div className="combined-card2">
      <h2 className="dolphin-header" style={{ marginTop: '1rem' }}>
        {t('choose_dolphin')}
      </h2>
      <div className="dolphin-grid">
        {dolphins.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={t('dolphin_alt', { number: i + 1 })}
            className="dolphin page-logo"
            onClick={() => onDolphinClick?.(i)}
          />
        ))}
      </div>
    </div>
  );
}
