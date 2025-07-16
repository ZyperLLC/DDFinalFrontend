import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ConnectButton } from './ConnectButton';
import { useTonConnectUiContext } from '../Context/TonConnectUiContext';
import tonSymbol from '../assets/ton_symbol.jpg';
import { useDepositTon } from '../hooks/useDepositTon';

const ConnectWalletCard = () => {
  const { t } = useTranslation();
  const { tonConnectUI } = useTonConnectUiContext();
  const isWalletConnected = !!tonConnectUI?.account?.address;
  const {depositTon} = useDepositTon();
  const [tonAmount, setTonAmount] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^\d*\.?\d*$/.test(val)) {
      setTonAmount(val);
    }
  };
  const handleDepositTon = async () => {
    const amount = parseFloat(tonAmount);
    try{
      await depositTon(amount);
      setTonAmount('');
    }catch(err) {
      console.error("Error depositing TON:", err);
    }
  }
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
       <div className='w-full px-4'>
         <ConnectButton whiteBg/>
        </div>

      {isWalletConnected && (
        <div className="w-full mt-4 px-4">
          <div
            className=" mx-auto flex flex-col items-center gap-3"
            style={{ marginTop: '16px' }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
              }}
            >
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
              style={{
                marginTop: '12px',
              }}
              onClick={handleDepositTon}
            >
              {t('profile.deposit')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectWalletCard;
