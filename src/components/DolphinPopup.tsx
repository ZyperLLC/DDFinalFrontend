import { useContext, useEffect, useState } from 'react';
import { X } from 'lucide-react';

import background1 from '../assets/background1.jpg';
import tonSymbol from '../assets/ton_symbol.jpg';
import creditIcon from '../assets/credit.jpg';
import { Bet } from '../types';
import { getBettingRounds, placeBet } from '../api/userApi';
import { UserContext } from '../Context/UserContextProvider';
import toast from 'react-hot-toast';

export default function DolphinPopup({
  image,
  name,
  onClose,
}: {
  image: string;
  name: string;
  onClose: () => void;
}) {
  const [selectedCurrency, setSelectedCurrency] = useState('TON');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [amount,setAmount] = useState(0);
  const context = useContext(UserContext);

  async function handlePlayClick(noBettedOn:number){
    console.log("handlePlayClick called with amount:", amount, "and noBettedOn:", noBettedOn);
    if (!(amount >= 0.1 && amount <= 10)) {
      toast.error("Amount must be between 0.1 and 10");
      return;
    }
    if(noBettedOn < 1 || noBettedOn > 36){
      toast.error("Please select a number between 1 and 36");
      return;
    }
    const bets = await getBettingRounds();
    if (!bets || bets.bettingRounds.length === 0) {
      toast.error("No betting rounds available");
      return;
    }
    const betData: Partial<Bet> = {
      betId: bets.bettingRounds.length - 1 ,
      amountBet: amount, // This should be set based on user input
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
    }
  }
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
              onChange={(e) => setAmount(Number(e.target.value))}
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
                color: '#000000',
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
              onClick={() => handlePlayClick(1)} 
            >
              Play
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
