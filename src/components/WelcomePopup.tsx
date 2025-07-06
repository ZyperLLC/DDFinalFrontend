import { X } from 'lucide-react';
import popupImage from '../assets/popupbg.jpg';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { useEffect } from 'react';

export default function WelcomePopup({ onClose }: { onClose: () => void }) {
  const [tonConnectUI] = useTonConnectUI();

  const moveModalToTop = () => {
    const modal = document.getElementById('ton-connect-modal');
    if (modal) {
      // Force modal to topmost layer
      modal.style.zIndex = '9999999';
      modal.style.position = 'fixed';
      modal.style.top = '0';
      modal.style.left = '0';
      modal.style.right = '0';
      modal.style.bottom = '0';
      modal.style.pointerEvents = 'auto';

      // Ensure it's directly under body (if not already)
      if (modal.parentElement !== document.body) {
        document.body.appendChild(modal);
      }
    }
  };

  const handleConnectWallet = () => {
    tonConnectUI.openModal();

    // Retry until modal appears and is elevated
    let attempts = 0;
    const interval = setInterval(() => {
      const modal = document.getElementById('ton-connect-modal');
      if (modal || attempts >= 20) {
        moveModalToTop();
        clearInterval(interval);
      }
      attempts++;
    }, 100);
  };

  useEffect(() => {
    moveModalToTop(); // Apply fix if modal already exists
  }, []);

  return (
    <div
      className="welcome-popup-image-bg"
      style={{ backgroundImage: `url(${popupImage})`, zIndex: 9990 }}
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
        <button className="connect-wallet-btn" onClick={handleConnectWallet}>
          Connect wallet
        </button>
      </div>
    </div>
  );
}