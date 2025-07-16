import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { ConnectButton } from './ConnectButton';
import { useTonConnectUiContext } from '../Context/TonConnectUiContext';
import tonSymbol from '../assets/ton_symbol.jpg';
import { useDepositTon } from '../hooks/useDepositTon';

interface Props {
  onConnect: () => void;
  onDisconnect: () => void;
  walletAddress?: string;
  tonBalance?: number;
}

const ConnectWalletCard: React.FC<Props> = ({
  onDisconnect,
}) => {
  const { t } = useTranslation();
  const { tonConnectUI } = useTonConnectUiContext();
  const isWalletConnected = !!tonConnectUI?.account?.address;
  const { depositTon } = useDepositTon();
  const [tonAmount, setTonAmount] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^\d*\.?\d*$/.test(val)) {
      setTonAmount(val);
    }
  };

  const handleDepositTon = async () => {
    const amount = parseFloat(tonAmount);
    try {
      await depositTon(amount);
      setTonAmount('');
    } catch (err) {
      console.error('Error depositing TON:', err);
    }
  };

  useEffect(() => {
    document.body.style.overflow = showModal ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [showModal]);

  return (
    <div className="profile-card">
      <h1 className="profile-heading">
        {isWalletConnected ? t('connectCard.connected.heading') : t('connectCard.heading')}
      </h1>

      <p className="profile-subheading">
        {isWalletConnected
          ? t('connectCard.connected.description')
          : t('connectCard.description.line1')}
      </p>

      <div className="w-full px-4">
        <ConnectButton whiteBg />
      </div>

      {isWalletConnected && (
        <div className="w-full mt-4 px-4">
          <div className="mx-auto flex flex-col items-center gap-3">
            <div style={{ position: 'relative', width: '100%' }}>
              <input
                type="text"
                value={tonAmount}
                onChange={handleChange}
                placeholder="0"
                style={{
                  width: '100%',
                  padding: '10px 50px 10px 14px',
                  borderRadius: '12px',
                  border: '1px solid #ccc',
                  fontSize: '16px',
                  color: '#000',
                  boxSizing: 'border-box',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '14px',
                  transform: 'translateY(-50%)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <img
                  src={tonSymbol}
                  alt="TON"
                  style={{ borderRadius: '50%', opacity: 0.8 }}
                  width={20}
                  height={20}
                />
                <span style={{ color: '#000', fontWeight: 500 }}>TON</span>
              </div>
            </div>

            <button
              className="w-full mt-2 py-3 rounded-[12px] font-semibold connect-wallet-button"
              style={{ marginTop: '12px' }}
              onClick={handleDepositTon}
            >
              {t('profile.deposit')}
            </button>

            <button
              className="w-full mt-2 py-3 rounded-[12px] font-semibold connect-wallet-button"
              style={{ marginTop: '12px' }}
              onClick={() => {
                // Replace with withdraw logic if you have it
                console.log('Withdraw clicked');
              }}
            >
              {t('profile.withdraw')}
            </button>

            {/* ✅ Disconnect Button */}
            <button
              className="w-full mt-2 py-3 rounded-[12px] font-semibold bg-red-500 text-white"
              style={{ marginTop: '12px' }}
              onClick={() => setShowModal(true)}
            >
              {t('profile.disconnect')}
            </button>
          </div>
        </div>
      )}

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
            style={{ bottom: '64px', pointerEvents: 'none' }}
          >
            <div
              className="w-full max-w-md rounded-2xl p-6 text-center bg-white"
              style={{
                pointerEvents: 'auto',
                boxShadow: '0 0 20px rgba(0,0,0,0.15)',
                margin: '0 auto',
                padding: '5px 20px 20px',
                maxWidth: '280px',
                borderRadius: '7px',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute"
                style={{
                  top: '0px',
                  right: '0px',
                  padding: '10px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <X size={18} color="#333" />
              </button>

              <h2 className="text-xl font-bold mb-2 text-[#7b3fe4]">Wallet Check</h2>
              <p className="text-sm mb-6 text-[#7b3fe4]">
                You’ve disconnected your wallet. That’s totally fine — just remember you’ll need to
                reconnect to stake, play, and receive rewards. Swim back in anytime. The ocean’s still open.
              </p>

              <button
                onClick={() => {
                  setShowModal(false);
                  onDisconnect();
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
    </div>
  );
};

export default ConnectWalletCard;
