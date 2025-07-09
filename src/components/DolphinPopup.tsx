import { useEffect, useState } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { X } from 'lucide-react';

import background1 from '../assets/background1.jpg';
import tonSymbol from '../assets/ton_symbol.jpg';
import creditIcon from '../assets/credit.jpg';

function StakeComplete({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center"
      style={{
        width: '100vw',
        height: '100vh',
        padding: '1rem',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '300px',
          borderRadius: '1rem',
          backgroundImage: `url(${background1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          color: '#fff',
          padding: '2rem 1rem',
          textAlign: 'center',
          position: 'relative',
          backdropFilter: 'blur(4px)',
          filter: 'brightness(1)',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'transparent',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          <X size={20} />
        </button>

        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✅</div>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Splash Sent!
        </h2>

        <p>Your dolphin is now in the race. Track the draw progress in your Profile.</p>
      </div>
    </div>
  );
}

export default function DolphinPopup({
  image,
  name,
  onClose,
}: {
  image: string;
  name: string;
  onClose: () => void;
}) {
  useTonConnectUI(); // intentionally not using value

  const [selectedCurrency, setSelectedCurrency] = useState('TON');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showStakeComplete, setShowStakeComplete] = useState(false);

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

  const handlePlayClick = () => {
    setShowStakeComplete(true);
  };

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
              backgroundPosition: 'top',
              color: 'white',
              filter: 'brightness(1)',
              padding: '4rem 1.5rem 2rem',
              overflowY: 'auto',
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

            <div className="flex justify-center gap-3 mt-6 flex-wrap">
              <input
                type="number"
                style={{
                  height: '44px',
                  width: '120px',
                  background: '#fff',
                  borderRadius: '8px',
                  border: 'none',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  marginBottom: '10px',
                  marginRight: '10px',
                }}
              />
              <div
                style={{
                  height: '44px',
                  width: '120px',
                  background: '#fff',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  cursor: 'pointer',
                  color: '#000',
                  marginBottom: '10px',
                }}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img
                  src={selectedCurrency === 'TON' ? tonSymbol : creditIcon}
                  alt="currency"
                  style={{ width: '18px', marginRight: '6px' }}
                />
                <span>{selectedCurrency} ▼</span>

                {dropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '45px',
                      left: 0,
                      width: '100%',
                      background: '#fff',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                      zIndex: 10,
                      color: '#000',
                    }}
                  >
                    <div
                      onClick={() => {
                        setSelectedCurrency('TON');
                        setDropdownOpen(false);
                      }}
                      style={{ padding: '0.5rem', display: 'flex', alignItems: 'center' }}
                    >
                      <img src={tonSymbol} alt="TON" style={{ width: '18px', marginRight: '6px' }} />
                      TON
                    </div>
                    <div
                      onClick={() => {
                        setSelectedCurrency('Credit');
                        setDropdownOpen(false);
                      }}
                      style={{ padding: '0.5rem', display: 'flex', alignItems: 'center' }}
                    >
                      <img src={creditIcon} alt="Credit" style={{ width: '18px', marginRight: '6px' }} />
                      Credit
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                style={{
                  width: '100%',
                  maxWidth: '200px',
                  padding: '0.75rem',
                  background: 'linear-gradient(90deg, #f72585, #7209b7)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer',
                }}
                onClick={handlePlayClick}
              >
                Play
              </button>
            </div>
          </div>
        </div>
      </div>

      {showStakeComplete && <StakeComplete onClose={() => setShowStakeComplete(false)} />}
    </>
  );
}
