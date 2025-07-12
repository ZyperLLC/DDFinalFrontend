import { useTranslation } from 'react-i18next';
import { ConnectButton } from './ConnectButton';

const ConnectWalletCard = () => {
  const { t } = useTranslation();

  return (
    <div className="profile-card">
      <h1 className="profile-heading">{t('connectCard.heading')}</h1>
      <p className="profile-subheading">
        {t('connectCard.description.line1')}<br />
        {t('connectCard.description.line2')}
      </p>
      <ConnectButton />
    </div>
  );
};

export default ConnectWalletCard;
