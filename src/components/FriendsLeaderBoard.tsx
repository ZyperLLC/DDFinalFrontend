// src/components/FriendsLeaderboard.tsx
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import '../index.css';
import { UserContext } from '../Context/UserContextProvider';

export default function FriendsLeaderBoard() {
  const context = useContext(UserContext);
  const friendsList = context?.user.friends || [];
  
  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-heading">Referred Friends </h2>

      <div className="leaderboard-header">
        <span>SNo.</span>
        <span>Username</span>
        <span>Credits</span>
  const { t } = useTranslation();

  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-heading">{t('friends.heading')}</h2>

      <div className="leaderboard-header">
        <span>{t('friends.username')}</span>
        <span>{t('friends.reward')}</span>
      </div>

      {friendsList.map((username, index) => (
        <div key={index} className="leaderboard-row">
          <span>{index+1}</span>
          <span>{username.slice(0,10) }{username.length>10?"...":""}</span>
          <span>0.01</span>
        </div>
      ))}
    </div>
  );
}
