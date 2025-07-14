import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import background1 from './assets/background1.jpg';
import logo from './assets/logo.jpg';
import FriendsLeaderBoard from './components/FriendsLeaderBoard';
import './index.css';
import { slideUpFade } from './utils/animations';

export default function Friend() {
  const { t } = useTranslation();
  const inviteLink = '';

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    alert(t('friend.inviteCopied'));
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
      <motion.img
        src={logo}
        alt="Logo"
        className="animated-logo"
        style={{
          width: '250px',
          marginBottom: '3.5rem',
        }}
        variants={slideUpFade}
        initial="hidden"
        animate="visible"
      />

      {/* Invite Section */}
      <motion.div
        className="invite-container"
        variants={slideUpFade}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
      >
        <h1 className="invite-heading">{t('friend.title')}</h1>
        <p className="invite-subheading">{t('friend.description')}</p>

        <div className="invite-box">
          <input
            type="text"
            value={inviteLink}
            readOnly
            className="invite-input"
            placeholder={t('friend.placeholder')}
          />
          <button className="invite-copy-btn" onClick={handleCopy}>
            {t('friend.copy')}
          </button>
        </div>
      </motion.div>

      {/* Friends Leaderboard */}
      <motion.div
        variants={slideUpFade}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      >
        <FriendsLeaderBoard />
      </motion.div>

      <Navbar />
    </div>
  );
}
