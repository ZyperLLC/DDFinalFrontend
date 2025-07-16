import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useTonConnectUiContext } from '../Context/TonConnectUiContext';
import { ConnectButton } from './ConnectButton';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

import background1 from '../assets/background1.jpg';
import tonSymbol from '../assets/ton_symbol.jpg';
import creditIcon from '../assets/credit.jpg';
import toast from 'react-hot-toast';
import { slideUpFade } from '../utils/animations';
import { useWithdrawDeposits } from '../hooks/useWithdrawDeposits';

type Props = {
  id: number;
  name: string;
  isVisible: boolean;
  onClose: () => void;
  onExit: () => void;
};

export default function WithdrawPopup({ name, isVisible, onClose, onExit }: Props) {
  const { t } = useTranslation();
  const [selectedCurrency, setSelectedCurrency] = useState('TON');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [amount, setAmount] = useState<number | null>(null);

  const [shouldRender, setShouldRender] = useState(isVisible);
  const { tonConnectUI } = useTonConnectUiContext();
  const isWalletConnected = !!tonConnectUI?.account?.address;
  const {withdraw} = useWithdrawDeposits();
  const [amountToWithdraw,_] = useState<number>(0.1);

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

  const handleWithdraw = () => {
    if (!amount || amount < 0.1 || amount > 10) {
      toast.error('Amount must be between 0.1 and 10');
      return;
    }

    toast.success(`Withdrawing ${amount} ${selectedCurrency}`);
    handleExitComplete(); // Close modal after confirmation
  };

  const handleExitComplete = () => {
    setShouldRender(false);
    onClose();
    onExit(); // Now properly used
  };

  const handleUserWithdraw = () => {
    const userWithdrawal = async ()=>{
      await withdraw(amountToWithdraw);
    }
    userWithdrawal();
   }
   
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
            {/* Close Button */}
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
                  {/* Input + Dropdown */}
                  <div className="flex justify-center gap-3 mt-6 flex-wrap">
                    <input
                      type="number"
                      placeholder="0.1 - 10"
                      value={amount ?? ''}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        if (!isNaN(val)) setAmount(val);
                      }}
                      style={{
                        height: '40px',
                        width: '130px',
                        background: '#fff',
                        borderRadius: '8px',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: '#000',
                      }}
                    />
                    <div
                      style={{
                        height: '40px',
                        width: '130px',
                        background: '#fff',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        cursor: 'pointer',
                        color: '#000',
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
                            {t('dolphin_popup.credit')}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Withdraw Button */}
                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={handleWithdraw}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: 'linear-gradient(90deg, #f72585, #7209b7)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 600,
                        fontSize: '1rem',
                        cursor: 'pointer',
                      }}
                    >
                      {t('Withdraw')}
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
