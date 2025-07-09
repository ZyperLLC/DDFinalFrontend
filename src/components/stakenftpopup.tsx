import { useEffect, useState } from 'react';
import { useTonWallet } from '@tonconnect/ui-react'; // Removed unused useTonConnectUI
import { X } from 'lucide-react';

import background1 from '../assets/background1.jpg';
import StakeComplete from './unstakepopup'; // ✅ Your custom popup component

export default function StakePopup({
  image,
  name,
  onClose,
}: {
  image: string;
  name: string;
  onClose: () => void;
}) {
  const wallet = useTonWallet(); // ✅ still in use

  const [showCompletePopup, setShowCompletePopup] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false); // ✅ still in use

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.maxWidth = '100vw';
    document.body.style.left = '0';
    document.body.style.right = '0';

    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.maxWidth = '';
      document.body.style.left = '';
      document.body.style.right = '';
    };
  }, []);

  const handleStake = () => {
    if (!wallet) {
      return; // No popup, just return if wallet is not connected
    }

    setIsBuffering(true);
    setTimeout(() => {
      setIsBuffering(false);
      setShowCompletePopup(true);
    }, 2000);
  };

  return (
    <>
      {/* Buffering Spinner */}
      {isBuffering && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="w-14 h-14 border-4 border-t-white border-white/30 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Main Popup */}
      <div
        className="fixed inset-0 z-50 flex justify-center items-center"
        style={{
          width: '100vw',
          height: '100vh',
          padding: '1rem',
          overflow: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        {/* Blur Background */}
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: -1,
          }}
        ></div>

        {/* Content */}
        <div
          style={{
            width: '100%',
            maxWidth: '340px',
            borderRadius: '1rem',
            background: '#000',
            overflow: 'hidden',
            boxSizing: 'border-box',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          <button
            className="close-btn absolute right-2 top-2 z-10"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            <X size={22} />
          </button>

          <div
            style={{
              backgroundImage: `url(${background1})`,
              backgroundSize: 'cover',
              backgroundPosition: 'top',
              color: 'white',
              filter: 'brightness(1.1)',
              padding: '4rem 1.5rem 2rem',
              overflowY: 'auto',
              flex: 1,
            }}
          >
            <img
              src={image}
              alt={name}
              style={{
                width: '100%',
                maxWidth: '160px',
                display: 'block',
                margin: '0 auto 1rem',
                borderRadius: '1rem',
              }}
            />
            <h2 className="text-xl font-bold text-center">{name}</h2>
            <p
              className="text-sm text-center mt-2"
              style={{ opacity: 0.9, lineHeight: '1.4rem' }}
            >
              Crowned before he could swim straight, {name} turned the Dolphin Dash into his personal kingdom — staked $TON, seven rings, and a throne of broken dreams. Other dolphins call it luck — he just calls it Tuesday.
            </p>

            <div
              className="mt-6 flex justify-center"
              style={{
                width: '100%',
                maxWidth: '185px',
                margin: '1.5rem auto 0.5rem',
                padding: '0.5rem',
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                backdropFilter: 'blur(6px)',
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  color: '#32CD32',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                }}
              >
                APY: 2.85%
              </span>
            </div>

            <div className="mt-3 flex justify-center">
              <button
                style={{
                  width: '100%',
                  maxWidth: '200px',
                  padding: '0.5rem',
                  background: 'linear-gradient(90deg, #f72585, #7209b7)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer',
                }}
                onClick={handleStake}
                disabled={isBuffering}
              >
                {isBuffering ? 'Unstaking...' : 'Unstake'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {showCompletePopup && <StakeComplete onClose={() => setShowCompletePopup(false)} />}
    </>
  );
}
