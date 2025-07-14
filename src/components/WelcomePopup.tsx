import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import popupImage from '../assets/popupbg.jpg';
import rectangle from '../assets/Rectangle.png';
import { ConnectButton } from './ConnectButton';
import { slideUpFade } from '../utils/animations';

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

      <motion.div
        className="popup-content"
        variants={slideUpFade}
        initial="hidden"
        animate="visible"
      >
        <h2>{t('welcome_popup.title')}</h2>
        <ul className="space-y-2 mt-4">
          {[t('welcome_popup.line1'), t('welcome_popup.line2'), t('welcome_popup.line3')].map((line, index) => (
            <li key={index} className="flex  items-start gap-8">
              <img src={rectangle} alt="" className="w-4 h-4 mt-1" />
              {line}
            </li>
          ))}
        </ul>
        <div className="w-full px-4 ">
          <ConnectButton />
        </div>
      </motion.div>
    </div>
  );
}
