import { useContext, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useTonConnectUiContext } from '../Context/TonConnectUiContext';
import { ConnectButton } from './ConnectButton';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

import background1 from '../assets/background1.jpg';
import tonSymbol from '../assets/ton_symbol.jpg';
import creditIcon from '../assets/credit.jpg';
import { Bet } from '../types';
import { getBettingRounds, placeBet } from '../api/userApi';
import { UserContext } from '../Context/UserContextProvider';
import toast from 'react-hot-toast';
import { slideUpFade } from '../utils/animations';
import { toNano } from '@ton/ton';

type Props = {
  id:number;
  image: string;
  name: string;
  isVisible: boolean;
  onClose: () => void;
  onExit: () => void;
};


export default function DolphinPopup({ id,image, name, onClose, isVisible }: Props) {
  const { t } = useTranslation();
  const [selectedCurrency, setSelectedCurrency] = useState('TON');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [amount,setAmount] = useState<number|null>(null);
  const context = useContext(UserContext);
  console.log("key",id);

  async function handlePlayClick(noBettedOn:number){
    console.log("handlePlayClick called with amount:", amount, "and noBettedOn:", noBettedOn);
    console.log("Context:",context?.user);
    
    const bets = await getBettingRounds();
    console.log("Bets:", bets);
    if (!bets || bets.length === 0) {
      toast.error("No game rounds available");
      return;
    }

    if(bets[bets.length-1].hasBettingStopped){
      toast.error("Draw Round Ended");
      return;
    }

    if(!amount){
      toast.error("Please enter the amount to be played");
      return;
    }
    if (amount && !(amount >= 0.1 && amount <= 10)) {
      toast.error("Amount must be between 0.1 and 10");
      return;
    }
    if(noBettedOn < 1 || noBettedOn > 36){
      toast.error("Please select a number between 1 and 36");
      return;
    }
    if(selectedCurrency==='TON'){
      if(context?.user.tonBalance && amount>context?.user.tonBalance){
        toast.error("Insufficient balance, deposit to play");
        return;
      }
    }else{
      if(context?.user.creditBalance && amount>context?.user.creditBalance){
        toast.error("Insufficient balance, deposit to play");
        return;
      }
    }
    const betData: Partial<Bet> = {
      betId: bets.length,
      amountBet: selectedCurrency === 'TON'?Number(toNano(amount)):amount, // This should be set based on user input
      numberBettedOn: noBettedOn,
      hasWon: false,
      amountWon: 0,
      useTon: selectedCurrency === 'TON',
      holdingNFT: context?.user.holdingNFTs ?? false, // This should be set based on user state
    }
    console.log("Bet Data:", betData);
    const result = await placeBet(context?.user.telegramId ?? '', betData);
    console.log("Bet Result:", result);
    if(result){
      toast.success("Amount placed successfully");
      handleExitComplete();
    }
  }
  const [shouldRender, setShouldRender] = useState(isVisible);

  const { tonConnectUI } = useTonConnectUiContext();
  const isWalletConnected = !!tonConnectUI?.account?.address;

  useEffect(() => {
    if (isVisible) setShouldRender(true);
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.maxWidth = '100vw';
      document.body.style.left = '0';
      document.body.style.right = '0';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.maxWidth = '';
      document.body.style.left = '';
      document.body.style.right = '';
    };
  }, [isVisible]);

  const handleExitComplete = () => {
    setShouldRender(false);
    onClose();
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
            height:"100vh",
            display:"flex",
            justifyContent:'center',
            alignItems:'center'
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

          {/* Beep animation */}
          <style>
            {`
              @keyframes beep {
                0% { opacity: 1; }
                50% { opacity: 0.3; }
                100% { opacity: 1; }
              }
              .beep-text {
                animation: beep 1.4s infinite;
              }
            `}
          </style>

          {/* Popup */}
          <motion.div
            variants={slideUpFade}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              width: '100%',
              maxWidth: '340px',
              borderRadius: '1rem',
              background: '#000',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              alignItems:'center',
              justifyContent:'center',
              position: 'relative',
            }}
          >
            <button
              className="close-btn absolute right-2 top-2 z-10"
              onClick={() => {
                setShouldRender(false);
              }}
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
                  maxWidth: '100px',
                  display: 'block',
                  margin: '0 auto 1rem',
                  borderRadius: '1rem',
                }}
              />
              <h2 className="text-lg font-bold text-center">
                {name}
              </h2>
              <div style={{ 
                height: '175px', 
                overflow: 'auto',
                marginBottom: '1rem'
               }}>
                <p className="text-sm text-center" style={{ 
                  opacity: 0.9,
                  paddingRight: '8px',
                }}>
                  {t('dolphin_popup.description', { name })}
                </p>
              </div>

              {tonConnectUI == null ? (
                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      border: '4px solid #fff',
                      borderTop: '4px solid transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                    }}
                  />
                  <style>
                    {`@keyframes spin {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                    }`}
                  </style>
                </div>
              ) : isWalletConnected ? (
                <>
                  <div className="flex justify-center gap-3 mt-6 flex-wrap"
                  >
                    <input
                      type="number"
                      placeholder={'0.1-10'}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        if (!isNaN(value)) {
                          setAmount(value);
                        }
                      }}
                      value={amount??''}
                      style={{
                        height: '40px',
                        width:'130px',
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
                        height: '40px',
                        width:'130px',
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
                            {t('dolphin_popup.credit')}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 flex justify-center">
                    <button
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
                      onClick={() => handlePlayClick(id + 1)}
                    >
                      {t('dolphin_popup.play')}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full px-4 mt-6 flex justify-center">
                    <ConnectButton />
                  </div>
                  <p
                    className="beep-text"
                    style={{
                      marginTop: '12px',
                      color: '#fff',
                      fontSize: '14px',
                      textAlign: 'center',
                      maxWidth: '260px',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      opacity: 0.9,
                    }}
                  >
                    {t('dolphin_popup.connect_message')}
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
