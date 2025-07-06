export default function TimerCard({ timer }: { timer: number }) {
    const progressPercent = Math.min((timer / 86400) * 100, 100)
    const hours = Math.floor((86400 - timer) / 3600)
    const minutes = Math.floor(((86400 - timer) % 3600) / 60)
    const seconds = (86400 - timer) % 60
  
    return (
      <div className="combined-card">
        <h2 className="dolphin-header" style={{ textAlign: 'center' }}>Choose Your Dolphin</h2>
        <p className="card-subtitle">
          Place TON bets on one or more NFTs. If your Dolphin hits, you win with a multiplier!
        </p>
  
        <div className="timer-box">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
          <p className="timer-text">
            Time Until The End: {hours}h {minutes}m {seconds}s
          </p>
        </div>
      </div>
    )
  }
  