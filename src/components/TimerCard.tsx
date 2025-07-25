import { useTranslation } from 'react-i18next';

export default function TimerCard({ timer }: { timer: number }) {
  const { t } = useTranslation();

  // Calculate progress based on remaining time
  // Assuming the game round is 24 hours (86400 seconds)
  const ROUND_DURATION = 86400;
  let percent = Math.min(((ROUND_DURATION - timer) / ROUND_DURATION) * 100, 100);
   const progressPercent = Math.max(0, Math.min(100, Math.floor(percent)));
  const hours = Math.floor((timer) / 3600);
  const minutes = Math.floor(((timer) % 3600) / 60);
  const seconds = (timer) % 60;
  return (
    <div className="combined-card bg-black/70" style={{ marginTop: '1rem' }}>
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
