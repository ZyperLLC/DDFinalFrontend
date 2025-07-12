import { useTranslation } from 'react-i18next';
import '../index.css';

const leaderboardData = [
  { user: '@usernameuser…', reward: '3 123' },
  { user: '@usernameuser…', reward: '1 532 345' },
  { user: '@usernameuser…', reward: '22 432' },
  { user: '@usernameuser…', reward: '234 153' },
  { user: '@usernameuser…', reward: '23 421' },
];

export default function FriendsLeaderBoard() {
  const { t } = useTranslation();

  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-heading">{t('friends.heading')}</h2>

      <div className="leaderboard-header">
        <span>{t('friends.username')}</span>
        <span>{t('friends.reward')}</span>
      </div>

      {leaderboardData.map((entry, index) => (
        <div key={index} className="leaderboard-row">
          <span>{entry.user}</span>
          <span>{entry.reward}</span>
        </div>
      ))}
    </div>
  );
}
