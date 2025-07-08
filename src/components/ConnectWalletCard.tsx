import React, { useState, useEffect } from 'react';
import tonSymbol from '../assets/ton_symbol.jpg';

interface Props {
  onConnect: () => void;
  onDisconnect: () => void;
  isWalletConnected: boolean;
  walletAddress?: string;
  tonBalance?: number;
}

const ConnectWalletCard: React.FC<Props> = ({
  onConnect,
  onDisconnect,
  isWalletConnected,
  walletAddress = '0xCa1e...e094',
  tonBalance = 3.5,
}) => {
  const [showModal, setShowModal] = useState(false);

  // Disable scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showModal]);

  return (
    <>
      <div className="profile-card w-[90%] max-w-[360px] mx-auto mt-6 p-4 rounded-2xl shadow-lg text-white backdrop-blur-md bg-white/10">
        {!isWalletConnected ? (
          <>
            <h1 className="profile-heading text-2xl font-bold mb-2">Step in the Game</h1>
            <p className="profile-subheading text-sm mb-4">
              Connect your wallet to unlock staking,<br />
              betting and daily prizes.
            </p>
            <button
              className="connect-wallet-button w-full py-3 rounded-xl font-semibold text-white"
              style={{
                background: 'linear-gradient(to right, #D93CE6, #7B3FE4)',
              }}
              onClick={onConnect}
            >
              Connect Wallet
            </button>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-1" style={{ color: 'white' }}>
              Wallet Connected
            </h1>

            <p className="text-sm" style={{ color: 'white', marginTop: '-2px', marginBottom: '18px' }}>
              Your wallet is now active — you're ready to interact, stake, and play.
            </p>

            <div
              onClick={() => setShowModal(true)}
              className="w-full bg-white text-center font-semibold text-base shadow-md cursor-pointer"
              style={{
                color: '#7b3fe4',
                padding: '12px 0px',
                backgroundColor: '#ffffff',
                borderRadius: '7px',
                overflowWrap: 'break-word',
                wordBreak: 'break-word',
              }}
            >
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </div>

            <div
              className="w-full text-black mt-3 text-base font-semibold shadow-md flex justify-between items-center"
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '7px',
                padding: '12px 0px',
                marginTop: '10px',
              }}
            >
              <span style={{ paddingLeft: '16px' }}>{tonBalance}</span>
              <div className="flex items-center gap-5" style={{ paddingRight: '16px' }}>
                <img src={tonSymbol} className="object-contain" alt="TON Symbol" width={25} height={20} />
                <span className="font-medium ml-3">TON</span>
              </div>
            </div>

            <button
              className="w-full mt-4 py-3 rounded-xl text-lg font-bold shadow-md hover:scale-105 transition-transform"
              style={{
                background: 'linear-gradient(to right, #f72585, #7209b7)',
                color: 'white',
                borderRadius: '15px',
                padding: '18px 12px',
                marginTop: '10px',
              }}
            >
              Deposit
            </button>
          </>
        )}
      </div>

      {/* Modal Overlay + Disconnect */}
      {showModal && (
        <>
          <div
            className="fixed inset-0 z-40 backdrop-blur-md"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
            onClick={() => setShowModal(false)}
          />

          <div
            className="fixed left-0 right-0 z-50 flex justify-center px-4"
            style={{
              bottom: '64px',
              pointerEvents: 'none',
            }}
            onClick={() => setShowModal(false)}
          >
            <div
              className="w-full max-w-md rounded-2xl p-6 text-center bg-white"
              style={{
                pointerEvents: 'auto',
                boxShadow: '0 0 20px rgba(0,0,0,0.15)',
                margin: '0 auto',
                backgroundColor: '#ffffff',
                padding: '5px 20px 20px',
                maxWidth: '280px',
                borderRadius: '7px',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-2 text-[#7b3fe4]">Wallet Check</h2>
              <p className="text-sm mb-6 text-[#7b3fe4]">
                You’ve disconnected your wallet. That’s totally fine — just remember you’ll need to reconnect
                to stake, play, and receive rewards. Swim back in anytime. The ocean’s still open.
              </p>
              <button
                onClick={() => {
                  setShowModal(false);
                  onDisconnect(); // ✅ disconnect
                }}
                className="w-[90%] max-w-[300px] mx-auto py-4 rounded-xl text-white font-semibold mt-4"
                style={{
                  background: 'linear-gradient(to right, #f72585, #7209b7)',
                  height: '36px',
                  display: 'block',
                  color: '#ffffff',
                  borderRadius: '7px',
                }}
              >
                Disconnect
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ConnectWalletCard;
