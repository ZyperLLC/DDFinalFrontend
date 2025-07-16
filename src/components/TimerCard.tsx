import { useTranslation } from 'react-i18next';

export default function TimerCard({ timer }: { timer: number }) {
  const { t } = useTranslation();

  // Calculate progress based on remaining time
  // Assuming the game round is 24 hours (86400 seconds)
  const progressPercent = 100;
  const hours = 0;
  const minutes = 0;
  const seconds = 0;
  console.log("timer",timer);
  console.log("progressPercent",progressPercent);
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
