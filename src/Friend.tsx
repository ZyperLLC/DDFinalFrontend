import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import background1 from './assets/background1.jpg';
import logo from './assets/logo.jpg';
import './index.css';
import FriendsLeaderBoard from './components/FriendsLeaderBoard';
import toast from 'react-hot-toast';
import { UserContext } from './Context/UserContextProvider';
import { useContext } from 'react';

export default function Friend() {
  const context = useContext(UserContext);
  const inviteLink = `https://t.me/ddtimertestbot/site?startapp=${context?.user.telegramId}`;

  const { t } = useTranslation();

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    toast.success(t('friend.inviteCopied'));
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
        <h1 className="invite-heading">{t('friend.title')}</h1>
        <p className="invite-subheading">
          {t('friend.description')}
        </p>

        <div className="invite-box">
          <button className="invite-copy-btn" onClick={handleCopy}>
            {t('friend.copy')}
          </button>
        </div>
      </div>

      {/* Friends Leaderboard Component */}
      <FriendsLeaderBoard />

      <Navbar />
    </div>
  );
}
