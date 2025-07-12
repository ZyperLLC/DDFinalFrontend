// src/Friend.tsx

import Navbar from './components/Navbar';
import background1 from './assets/background1.jpg';
import logo from './assets/logo.jpg';
import './index.css';
import FriendsLeaderBoard from './components/FriendsLeaderBoard';

export default function Friend() {
  const inviteLink = '';

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    alert('Invite link copied!');
  };

  return (
    <div
      className="page profile-page"
      style={{
        backgroundImage: `url(${background1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        position: 'relative',
        paddingTop: '5px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingLeft: '4rem',
        paddingRight: '4rem',
      }}
    >
      {/* Logo */}
      <img
        src={logo}
        alt="Logo"
        className="animated-logo"
        style={{
          width: '250px',
          marginBottom: '3.5rem',
        }}
      />

      {/* Invite Section */}
      <div className="invite-container">
        <h1 className="invite-heading">Invite a Friend</h1>
        <p className="invite-subheading">
          Connect your wallet to unlock staking, betting and daily prizes.
        </p>

        <div className="invite-box">
          <div className='w-full bg-white text-red-300 text-md text-center  rounded-md'>{inviteLink}</div>
          <button className="invite-copy-btn" onClick={handleCopy}>
            Copy
          </button>
        </div>
      </div>

      {/* Friends Leaderboard Component */}
      <FriendsLeaderBoard />

      <Navbar />
    </div>
  );
}