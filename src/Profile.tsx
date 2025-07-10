import Navbar from './components/Navbar';
import background1 from './assets/background1.jpg';
import dolphin1 from './assets/dolphins/dolphin1.jpg';
import dolphin2 from './assets/dolphins/dolphin2.jpg';
import dolphin3 from './assets/dolphins/dolphin3.jpg';

import creditIcon from './assets/credit.jpg';
import tonSymbol from './assets/ton_symbol.jpg';

import LogoDisplay from './components/LogoDisplay';
import ConnectWalletCard from './components/ConnectWalletCard';
import StakedNFTCard from './components/StakedNFTCard';
import GameHistoryCard from './components/GameHistoryCard';
import SectionBox from './components/SectionBox';

import './index.css';
import { ConnectButton } from './components/ConnectButton';
import { useContext } from 'react';
import { UserContext } from './Context/UserContextProvider';
import { fromNano } from '@ton/ton';

export default function Profile() {
  const context = useContext(UserContext);
  const isWalletConnected = context?.user.walletAddress;
  
  return (
    <div
      className="page profile-page"
      style={{
        backgroundImage: `url(${background1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '120vh',
      }}
    >
      <LogoDisplay />
      <ConnectWalletCard />

      {/* Wallet Info Section - only visible if wallet is connected */}
    
        <div className="w-full mt-4 px-4">
          <div
            className="w-[80%] max-w-[360px] mx-auto flex flex-col items-center gap-3"
          >
            {/* Wallet Address Box */}
            <ConnectButton/>

            {/* TON Input Box */}
            <div className="w-full bg-white text-black flex justify-between items-center px-4 py-3 rounded-[12px]">
              <span>{}</span>
              <div className="flex items-center gap-2">
                <img
                  src={tonSymbol}
                  alt="TON"
                  className="rounded-full opacity-80"
                  width={20}
                  height={20}
                />
                <span>TON</span>
              </div>
            </div>

            {/* Deposit Button */}
            <button
              className="w-full py-3 rounded-[12px] font-semibold"
              style={{
                background: 'linear-gradient(to right, #D93CE6, #7B3FE4)',
                color: 'white',
              }}
            >
              Deposit
            </button>
          </div>
        </div>
  

      {/* Balance Section */}
      <div className="w-full mt-4 mb-6 px-4">
        <div
          className="w-[80%] max-w-[360px] mx-auto rounded-[16px] shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-[10px]"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            color: 'white',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <h2 className="text-[1.5rem] font-bold text-left" style={{ margin: 0 }}>
            Balance
          </h2>

          {/* Credit Row */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img
                src={creditIcon}
                alt="Credit"
                className="rounded-full"
                width={26}
                height={26}
              />
              <span style={{ fontSize: '1rem' }}>Credit</span>
            </div>
            <span style={{ fontSize: '1rem', fontWeight: '600' }}>{context?.user.creditBalance}</span>
          </div>

          {/* TON Row */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img
                src={tonSymbol}
                alt="TON"
                className="rounded-full"
                width={24}
                height={24}
                style={{ opacity: isWalletConnected ? 1 : 0.4 }}
              />
              <span
                style={{
                  fontSize: '1rem',
                  opacity: isWalletConnected ? 1 : 0.4,
                }}
              >
                TON
              </span>
            </div>
            <span
              style={{
                fontSize: '1rem',
                fontWeight: '600',
                opacity: isWalletConnected ? 1 : 0.4,
              }}
            >
              {isWalletConnected ? fromNano(context?.user.tonBalance??0n) : 'Connect wallet'}
            </span>
          </div>

          {/* Send TON Button */}
          {isWalletConnected && (
            <button
              className="w-full mt-2 py-3 rounded-[12px] font-semibold"
              style={{
                background: 'linear-gradient(to right, #D93CE6, #7B3FE4)',
                color: 'white',
              }}
            >
              Send TON to Wallet
            </button>
          )}
        </div>
      </div>

      {/* Staked NFTs Section */}
      <SectionBox title="Staked NFT's">
        <StakedNFTCard image={dolphin2} name="NFT NAME" time="13d 3h 12m" reward="2 TON" />
        <StakedNFTCard image={dolphin1} name="NFT NAME" time="7d 12h 34m" reward="3.2 TON" />
      </SectionBox>

      {/* Game History Section */}
      <SectionBox title="Game History">
        <GameHistoryCard image={dolphin1} day="DAY 1" cost="1 TON" prize="7 TON" result="win" />
        <GameHistoryCard image={dolphin2} day="DAY 2" cost="1 TON" prize="0 TON" result="lose" />
        <GameHistoryCard image={dolphin3} day="DAY 3" cost="4 TON" prize="28 TON" result="win" />
      </SectionBox>

      <Navbar />
    </div>
  );
}
