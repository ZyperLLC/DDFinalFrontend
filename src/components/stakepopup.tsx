import { useEffect, useState } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { X } from 'lucide-react';

import background1 from '../assets/background1.jpg';
import StakeComplete from './stakecomplete';

export default function StakePopup({
  image,
  name,
  onClose,
}: {
  image: string;
  name: string;
  onClose: () => void;
}) {
  const [_tonConnectUI] = useTonConnectUI();
  const [_selectedCurrency, _setSelectedCurrency] = useState('TON');
  const [_dropdownOpen, _setDropdownOpen] = useState(false);
  const [showCompletePopup, setShowCompletePopup] = useState(false);

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

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex justify-center items-center"
        style={{
          width: '100vw',
          maxWidth: '100vw',
          height: '100vh',
          padding: '1rem',
          overflow: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: -1,
          }}
        ></div>

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
              backgroundPosition: 'center',
              color: 'white',
              filter: 'brightness(1.4)',
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
            <p className="text-sm text-center mt-2" style={{ opacity: 0.9 }}>
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
                onClick={() => setShowCompletePopup(true)}
              >
                Stake
              </button>
            </div>
          </div>
        </div>
      </div>

      {showCompletePopup && (
        <StakeComplete onClose={() => setShowCompletePopup(false)} />
      )}
    </>
  );
}
