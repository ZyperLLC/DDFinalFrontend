import { useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';

import background1 from './assets/background1.jpg';
import creditIcon from './assets/credit.jpg';
import tonSymbol from './assets/ton_symbol.jpg';

import dolphin1 from './assets/dolphins/dolphin1.jpg';
import dolphin2 from './assets/dolphins/dolphin2.jpg';
import dolphin3 from './assets/dolphins/dolphin3.jpg';
import dolphin4 from './assets/dolphins/dolphin4.jpg';
import dolphin5 from './assets/dolphins/dolphin5.jpg';
import dolphin6 from './assets/dolphins/dolphin6.jpg';
import dolphin7 from './assets/dolphins/dolphin7.jpg';
import dolphin8 from './assets/dolphins/dolphin8.jpg';
import dolphin9 from './assets/dolphins/dolphin9.jpg';
import dolphin10 from './assets/dolphins/dolphin10.jpg';
import dolphin11 from './assets/dolphins/dolphin11.jpg';
import dolphin12 from './assets/dolphins/dolphin12.jpg';
import dolphin13 from './assets/dolphins/dolphin13.jpg';
import dolphin14 from './assets/dolphins/dolphin14.jpg';
import dolphin15 from './assets/dolphins/dolphin15.jpg';
import dolphin16 from './assets/dolphins/dolphin16.jpg';
import dolphin17 from './assets/dolphins/dolphin17.jpg';
import dolphin18 from './assets/dolphins/dolphin18.jpg';
import dolphin19 from './assets/dolphins/dolphin19.jpg';
import dolphin20 from './assets/dolphins/dolphin20.jpg';
import dolphin21 from './assets/dolphins/dolphin21.jpg';
import dolphin22 from './assets/dolphins/dolphin22.jpg';
import dolphin23 from './assets/dolphins/dolphin23.jpg';
import dolphin24 from './assets/dolphins/dolphin24.jpg';
import dolphin25 from './assets/dolphins/dolphin25.png';
import dolphin26 from './assets/dolphins/dolphin26.png';
import dolphin27 from './assets/dolphins/dolphin27.png';
import dolphin28 from './assets/dolphins/dolphin28.png';
import dolphin29 from './assets/dolphins/dolphin29.png';
import dolphin30 from './assets/dolphins/dolphin30.png';
import dolphin31 from './assets/dolphins/dolphin31.png';
import dolphin32 from './assets/dolphins/dolphin32.png';
import dolphin33 from './assets/dolphins/dolphin33.png';
import dolphin34 from './assets/dolphins/dolphin34.png';
import dolphin35 from './assets/dolphins/dolphin35.png';
import dolphin36 from './assets/dolphins/dolphin36.png';

import LogoDisplay from './components/LogoDisplay';
import ConnectWalletCard from './components/ConnectWalletCard';
import StakedNFTCard from './components/StakedNFTCard';
import GameHistoryCard from './components/GameHistoryCard';
import SectionBox from './components/SectionBox';
import WithdrawPopup from './components/Withdrawpopup';
// import BuyCredits from './components/BuyCredits';
// import Button from './components/Button';

import './index.css';
import { UserContext } from './Context/UserContextProvider';
import { motion } from 'framer-motion';
import { slideUpFade } from './utils/animations';
import { getBettingRoundById } from './api/userApi';

export default function Profile() {
  const { t } = useTranslation();
  const context = useContext(UserContext);
  const isWalletConnected = !!context?.user.walletAddress;
  const [isWithdrawPopupVisible, setIsWithdrawPopupVisible] = useState(false);

  const [enhancedBets, setEnhancedBets] = useState<{ bet: any; startedAt: Date }[]>([]);

  const dolphinImages: { [key: number]: string } = {
    1: dolphin1,
    2: dolphin2,
    3: dolphin3,
    4: dolphin4,
    5: dolphin5,
    6: dolphin6,
    7: dolphin7,
    8: dolphin8,
    9: dolphin9,
    10: dolphin10,
    11: dolphin11,
    12: dolphin12,
    13: dolphin13,
    14: dolphin14,
    15: dolphin15,
    16: dolphin16,
    17: dolphin17,
    18: dolphin18,
    19: dolphin19,
    20: dolphin20,
    21: dolphin21,
    22: dolphin22,
    23: dolphin23,
    24: dolphin24,
    25: dolphin25,
    26: dolphin26,
    27: dolphin27,
    28: dolphin28,
    29: dolphin29,
    30: dolphin30,
    31: dolphin31,
    32: dolphin32,
    33: dolphin33,
    34: dolphin34,
    35: dolphin35,
    36: dolphin36,
  };

  const handleUserWithdraw = () => {
    setIsWithdrawPopupVisible(true);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // States for UI-only values
  const [searchValue, setSearchValue] = useState('');
  const [drawId] = useState('34');
  const [drawDate] = useState('15 Aug 2025');

  useEffect(() => {
    const fetchBettingRounds = async () => {
      if (!context?.user.bets) return;

      const betsWithTimestamps = await Promise.all(
        context.user.bets.map(async (bet) => {
          try {
            const round = await getBettingRoundById(Number(bet.betId));
            return { bet, startedAt: new Date(round.startedAt) };
          } catch (err) {
            console.error('Failed to fetch round for betId:', bet.betId, err);
            return { bet, startedAt: new Date(0) };
          }
        }),
      );

      betsWithTimestamps.sort((a, b) => b.startedAt.getTime() - a.startedAt.getTime());

      setEnhancedBets(betsWithTimestamps);
    };
    fetchBettingRounds();
  }, [context?.user.bets]);

  const totalPages = Math.ceil(enhancedBets.length / itemsPerPage);
  const paginatedBets = enhancedBets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <motion.div
      variants={slideUpFade}
      initial="hidden"
      animate="visible"
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

      {isWalletConnected && (
        <div className="w-full mt-6 mb-6 px-4">
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
            <h2 className="text-[1.5rem] font-bold text-left">{t('profile.balance')}</h2>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img src={creditIcon} alt="Credit" className="rounded-full" width={26} height={26} />
                <span style={{ fontSize: '1rem' }}>{t('profile.credit')}</span>
              </div>
              <span style={{ fontSize: '1rem', fontWeight: '600' }}>
                {context?.user.creditBalance?.toFixed(3) ?? '0.00'}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-6">
                <img src={tonSymbol} alt="TON" className="rounded-full" width={24} height={24} />
                <span style={{ fontSize: '1rem' }}>TON</span>
              </div>
              <span style={{ fontSize: '1rem', fontWeight: '600' }}>
                {context?.user.tonBalance?.toString().slice(0, 4) ?? '0'}
              </span>
            </div>

            <button
              className="w-full mt-2 py-3 rounded-[12px] font-semibold connect-wallet-button"
              onClick={handleUserWithdraw}
            >
              {t('profile.sendTon')}
            </button>
          </div>
        </div>
      )}

      <SectionBox title={t('profile.stakedNfts')}>
        {context?.user.stakedNfts?.length === 0 && (
          <p style={{ color: 'white' }} className="text-center">
            No Dolphin Dash NFTs staked
          </p>
        )}
        {context?.user.stakedNfts?.map((nft) => (
          <StakedNFTCard key={nft.nftAddress} contractAddress={nft.nftAddress} />
        ))}
      </SectionBox>

      {/* Game History Section with Search, Draw header, and Nav buttons */}
      <SectionBox title={t('profile.gameHistory')}>
        {/* Search and Filters UI */}
        <div className="flex gap-3 mb-4 rounded-lg bg-[#1b274e] p-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search"
              className="w-full bg-[#232e50] rounded-md py-2 pl-10 pr-4 text-white outline-none text-base"
            />
            {/* Magnifier icon */}
            <svg
              className="absolute left-3 top-3 h-5 w-5 text-white/50"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M15.5 14h-.79l-.28-.27a6.471 6.471 0 001.48-5.34A6.5 6.5 0 104 13.5a6.471 6.471 0 005.34-1.48l.27.28v.79l5 4.99a1 1 0 001.41-1.41l-4.99-5zm-6 0A4.5 4.5 0 1114 9.5 4.5 4.5 0 019.5 14z" />
            </svg>
          </div>
          <button className="rounded-md bg-[#232e50] px-5 py-2 font-medium text-white">Filters</button>
        </div>

        {/* Draw header */}
        <div className="mb-4 rounded-lg bg-[#232e50] p-4 text-white">
          <span className="mr-4 text-xl font-semibold tracking-wider">Draw #{drawId}</span>
          <span className="text-yellow-400 font-medium">• {drawDate}</span>
        </div>

        {/* Game history cards list */}
        {enhancedBets.length === 0 ? (
          <p className="text-white text-center">No games played yet</p>
        ) : (
          paginatedBets.map(({ bet }, index) => (
            <GameHistoryCard
              key={index}
              image={dolphinImages[bet.numberBettedOn]}
              cost={`${bet.amountBet}`}
              prize={`${bet.amountWon}`}
              useTon={bet.useTon}
              betId={`${bet.betId}`}
              result={bet.hasWon ? 'win' : 'lose'}
            />
          ))
        )}

        {/* Pagination buttons */}
        <div className="mt-5 flex gap-3 justify-between">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className={`flex-1 rounded-md border-2 border-[#2d376a] bg-[#232e50] py-3 font-semibold text-white transition-colors ${
              currentPage === 1 ? 'cursor-not-allowed opacity-70' : 'hover:border-blue-600'
            }`}
          >
            ← Prev Draw
          </button>
          <button
            className="flex-1 rounded-md border-2 border-yellow-400 bg-[#232e50] py-3 font-semibold text-white hover:border-yellow-300"
            // Jump to round handler
          >
            Jump to Round
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className={`flex-1 rounded-md border-2 border-[#2d376a] bg-[#232e50] py-3 font-semibold text-white transition-colors ${
              currentPage === totalPages
                ? 'cursor-not-allowed opacity-70'
                : 'hover:border-blue-600'
            }`}
          >
            Next Draw →
          </button>
        </div>
      </SectionBox>

      <Navbar />

      {isWithdrawPopupVisible && (
        <WithdrawPopup
          id={1}
          name="Withdraw"
          isVisible={isWithdrawPopupVisible}
          onClose={() => setIsWithdrawPopupVisible(false)}
          onExit={() => setIsWithdrawPopupVisible(false)}
        />
      )}
    </motion.div>
  );
}
