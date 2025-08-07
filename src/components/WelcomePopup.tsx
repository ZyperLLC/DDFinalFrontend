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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      style={{ backgroundImage: `url(${popupImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition"
        onClick={onClose}
      >
        <X size={22} />
      </button>

      {/* Animated Popup Content */}
      <motion.div
        className="w-full max-w-md bg-white rounded-xl shadow-xl p-6 overflow-y-auto max-h-[90vh] text-center"
        variants={slideUpFade}
        initial="hidden"
        animate="visible"
      >
        {/* Title */}
        <h2 className="text-2xl font-bold mb-4 text-gray-900">
          {t('welcome_popup.title')}
        </h2>

        {/* Description List */}
        <ul className="mt-1 mb-6 text-left space-y-4">
          {[t('welcome_popup.line1'), t('welcome_popup.line2'), t('welcome_popup.line3')].map(
            (line, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-700 text-sm sm:text-base">
                <img src={rectangle} alt="" className="w-4 h-4 mt-1" />
                {line}
              </li>
            )
          )}
        </ul>

        {/* Connect Button */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-xs">
            <ConnectButton />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
