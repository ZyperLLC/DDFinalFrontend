import { useTranslation } from 'react-i18next';

export default function TimerCard({ timer }: { timer: number }) {
  const { t } = useTranslation();

  const progressPercent = Math.min((timer / 86400) * 100, 100);
  const hours = Math.floor((86400 - timer) / 3600);
  const minutes = Math.floor(((86400 - timer) % 3600) / 60);
  const seconds = (86400 - timer) % 60;

  return (
    <div className="combined-card" style={{ marginTop: '1rem' }}>
      <h2 className="dolphin-header" style={{ textAlign: 'center' }}>
        {t('choose_dolphin')}
      </h2>

      <p className="card-subtitle">{t('place_ton_bets')}</p>

      <div className="timer-box">
        {/* Centered progress bar */}
        <div className="progress-bar-wrapper">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        <p className="timer-text" style={{ textAlign: 'center', marginTop: '0.5rem' }}>
          {t('time_until_end', { hours, minutes, seconds })}
        </p>
      </div>
    </div>
  );
}
