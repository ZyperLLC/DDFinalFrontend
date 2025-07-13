import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import popupImage from '../assets/popupbg.jpg';
import { ConnectButton } from './ConnectButton';

export default function WelcomePopup({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation();

  return (
    <div
      className="welcome-popup-image-bg"
      style={{ backgroundImage: `url(${popupImage})`, zIndex: 10 }}
    >
      <button className="close-btn" onClick={onClose}>
        <X size={22} />
      </button>
      <div className="popup-content">
        <h2>{t('welcome_popup.title')}</h2>
        <ul>
          <li>🟣 {t('welcome_popup.line1')}</li>
          <li>🟣 {t('welcome_popup.line2')}</li>
          <li>🟣 {t('welcome_popup.line3')}</li>
        </ul>
        <div className='w-full px-4'>
         <ConnectButton />
       </div>
      </div>
    </div>
  );
}
