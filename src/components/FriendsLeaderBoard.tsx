// src/components/FriendsLeaderboard.tsx
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import '../index.css';
import { UserContext } from '../Context/UserContextProvider';

export default function  FriendsLeaderBoard() {
  const context = useContext(UserContext);
  const friendsList = context?.user.friends || [];
  const { t } = useTranslation();
  
  return (
    <div className="leaderboard-container" style={{
      marginTop:'10px'
    }}>
      <h2 className="leaderboard-heading">{t('friends.heading')}</h2>{/* Serial Number */}

      <div className="leaderboard-header">
        <span>{t('friends.serialNumber')}</span>
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
