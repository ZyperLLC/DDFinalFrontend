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
        {isConnected ? (
          t('connectCard.connected.description')
        ) : (
          <>
            {t('connectCard.description.line1')}<br />
            {t('connectCard.description.line2')}
          </>
        )}
      </p>
      <ConnectButton />
    </div>
  );
};

export default ConnectWalletCard;
