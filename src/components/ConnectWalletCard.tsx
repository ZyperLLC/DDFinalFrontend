import { useTranslation } from 'react-i18next';
import { ConnectButton } from './ConnectButton';
import { useTonConnectUiContext } from '../Context/TonConnectUiContext';

const ConnectWalletCard = () => {
  const { t } = useTranslation();
  const { tonConnectUI } = useTonConnectUiContext();
  const isConnected = !!tonConnectUI?.account?.address;

  return (
    <div className="profile-card">
      <h1 className="profile-heading">
        {isConnected ? t('connectCard.connected.heading') : t('connectCard.heading')}
      </h1>

      <p className="profile-subheading">
        {isConnected
          ? t('connectCard.connected.description')
          : t('connectCard.description.line1')}
      </p>

      {/* Style wrapper */}
      <div
        style={{
          backgroundColor: isConnected ? '#ffffff' : '#2563eb',
          color: isConnected ? '#2563eb' : '#ffffff',
          border: isConnected ? '1px solid #2563eb' : 'none',
          borderRadius: '8px',
          padding: '12px 20px',
          fontWeight: 600,
          textAlign: 'center',
          cursor: 'pointer',
          display: 'inline-block',
        }}
      >
        <ConnectButton />
      </div>
    </div>
  );
};

export default ConnectWalletCard;
