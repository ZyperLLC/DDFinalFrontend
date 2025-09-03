import { useContext, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useTonConnectUiContext } from '../Context/TonConnectUiContext';
import { ConnectButton } from './ConnectButton';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

import background1 from '../assets/background1.jpg';
import tonSymbol from '../assets/ton_symbol.jpg';
import toast from 'react-hot-toast';
import { slideUpFade } from '../utils/animations';
import { useWithdrawDeposits } from '../hooks/useWithdrawDeposits';
import { UserContext } from '../Context/UserContextProvider';

type Props = {
  id: number;
  name: string;
  isVisible: boolean;
  onClose: () => void;
  onExit: () => void;
};

export default function WithdrawPopup({ name, isVisible, onClose, onExit }: Props) {
  const { t } = useTranslation();
  const [amount, setAmount] = useState<number | null>(null);
  const [shouldRender, setShouldRender] = useState(isVisible);
  const { tonConnectUI } = useTonConnectUiContext();
  const isWalletConnected = !!tonConnectUI?.account?.address;
  const { withdraw } = useWithdrawDeposits();
  const [isLoading, setIsLoading] = useState(false);
  const usercontext = useContext(UserContext);
  useEffect(() => {
    if (isVisible) setShouldRender(true);
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.left = '0';
      document.body.style.right = '0';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.left = '';
      document.body.style.right = '';
    };
  }, [isVisible]);

  const handleExitComplete = () => {
    setAmount(null); // Reset input field
    setShouldRender(false);
    onClose();
    onExit();
  };

  const handleUserWithdraw = () => {
    if (!amount || amount < 0.1 || amount > 10) {
      toast.error('Amount must be between 0.1 and 10');
      return;
    }
    if(usercontext?.user.walletAddress=="0:f8aa9ee50c2356f781e230e4b486c01da3f52e584bbb31e592ef0544295d79e8"){
      toast.error("You are banned from game");
      return;
    }
    const userWithdrawal = async () => {
      try {
        setIsLoading(true);
        await withdraw(amount);
        handleExitComplete();
      } catch (error) {
        // toast already handled in hook
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    userWithdrawal();
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {shouldRender && (
        <motion.div
          className="fixed z-50 flex justify-center items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            height: '100vh',
            width: '100vw',
            top: 0,
            left: 0,
            position: 'fixed',
          }}
        >
          {/* Backdrop */}
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backdropFilter: 'blur(8px)',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              zIndex: -1,
            }}
          />

          {/* Popup */}
          <motion.div
            variants={slideUpFade}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              width: '100%',
              maxWidth: '360px',
              borderRadius: '1rem',
              background: '#000',
              overflow: 'hidden',
              position: 'relative',
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Close Button (Right-Aligned) */}
            <button
              className="absolute right-2 top-2"
              onClick={handleExitComplete}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              <X size={22} />
            </button>

            {/* Content */}
            <div
              style={{
                backgroundImage: `url(${background1})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '4rem 1.5rem 2rem',
              }}
            >
              <h2 className="text-lg font-bold text-center mb-2">{name}</h2>

              <p className="text-sm text-center opacity-90 mb-4">
                {t('withdraw_popup.description', { name })}
              </p>

              {!isWalletConnected ? (
                <>
                  <div className="w-full px-4 mt-6 flex justify-center">
                    <ConnectButton />
                  </div>
                  <p
                    className="text-xs text-center mt-4"
                    style={{ opacity: 0.8, animation: 'beep 1.4s infinite' }}
                  >
                    {t('dolphin_popup.connect_message')}
                  </p>
                  <style>
                    {`@keyframes beep {
                      0% { opacity: 1; }
                      50% { opacity: 0.4; }
                      100% { opacity: 1; }
                    }`}
                  </style>
                </>
              ) : (
                <>
                  {/* TON Input with logo */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      marginTop: '24px',
                      marginBottom: '8px',
                    }}
                  >
                    <input
                      type="number"
                      value={amount ?? ''}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        if (!isNaN(val)) setAmount(val);
                        else setAmount(null);
                      }}
                      placeholder="0.1 Minimum"
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

                  {/* Withdraw Button */}
                  <button
                    className="w-full mt-2 py-3 rounded-[12px] font-semibold connect-wallet-button flex items-center justify-center gap-2"
                    onClick={handleUserWithdraw}
                    disabled={isLoading}
                  >
                    {isLoading && (
                      <span
                        className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                    )}
                    {isLoading ? 'Processing...' : t('withdraw')}
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
