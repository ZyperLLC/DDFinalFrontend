// src/components/FriendsLeaderboard.tsx
import { useContext } from 'react';
import '../index.css';
import { UserContext } from '../Context/UserContextProvider';

export default function FriendsLeaderBoard() {
  const context = useContext(UserContext);
  const friendsList = context?.user.friends || [];
  
  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-heading">Friends Leaderboard</h2>

      <div className="leaderboard-header">
        <span>SNo.</span>
        <span>Username</span>
      </div>

      {friendsList.map((username, index) => (
        <div key={index} className="leaderboard-row">
          <span>{index}</span>
          <span>{username}</span>
        </div>
      ))}
    </div>
  );
}