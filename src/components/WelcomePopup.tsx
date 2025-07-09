import { X } from 'lucide-react';
import popupImage from '../assets/popupbg.jpg';
import { ConnectButton } from './ConnectButton';

export default function WelcomePopup({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="welcome-popup-image-bg"
      style={{ backgroundImage: `url(${popupImage})`, zIndex: 10 }}
    >
      <button className="close-btn" onClick={onClose}>
        <X size={22} />
      </button>
      <div className="popup-content">
        <h2>Welcome to Dolphin Dash!</h2>
        <ul>
          <li>🟣 In the world of Dolphin Dash, legends are chosen daily.</li>
          <li>🟣 Stake your dolphins, fuel the tide with TON, and test your luck in the arena.</li>
          <li>🟣 Connect your wallet. Your journey begins.</li>
        </ul>
        <ConnectButton/>
      </div>
    </div>
  );
}