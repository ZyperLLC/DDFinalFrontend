import { useTranslation } from 'react-i18next';
import { ConnectButton } from './ConnectButton';
import { useTonConnectUiContext } from '../Context/TonConnectUiContext';

import tonSymbol from '../assets/ton_symbol.jpg';

const ConnectWalletCard = () => {
  const { t } = useTranslation();
  const { tonConnectUI } = useTonConnectUiContext();
  const isWalletConnected = !!tonConnectUI?.account?.address;

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

      {/* 👇 Only this instance of the button is styled differently */}
      <div>
        <ConnectButton />
      </div>

      {/* ✅ Wallet Info Section (only if wallet is connected) */}
      {isWalletConnected && (
        <div className="w-full mt-4 px-4">
          <div className="w-[80%] max-w-[360px] mx-auto flex flex-col items-center gap-3">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '10px 14px',
                width: '100%',
              }}
            >
              <input
                type="text"
                value="0"
                placeholder="0"
                readOnly
                style={{
                  border: 'none',
                  outline: 'none',
                  flex: 1,
                  backgroundColor: 'transparent',
                  fontSize: '16px',
                  color: '#000',
                }}
              />
              <div
                style={{
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
              className="w-full py-3 rounded-[12px] font-semibold connect-wallet-button"
              // Optional style
              // style={{
              //   background: 'linear-gradient(to right, #D93CE6, #7B3FE4)',
              //   color: 'white',
              // }}
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
