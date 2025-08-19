import { useContext, useEffect, useState } from 'react';
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
import './index.css';
import { UserContext } from './Context/UserContextProvider';
import { motion } from 'framer-motion';
import { slideUpFade } from './utils/animations';
import { getBettingRoundById } from './api/userApi';
import { Search} from "lucide-react";

export default function Profile() {
  const { t } = useTranslation();
  const context = useContext(UserContext);
  const isWalletConnected = !!context?.user.walletAddress;
  const [isWithdrawPopupVisible, setIsWithdrawPopupVisible] = useState(false);
  const [enhancedBets, setEnhancedBets] = useState<
    { bet: any; startedAt: Date }[]
  >([]);
  const dolphinImages: { [key: number]: string } = {
    1: dolphin1, 2: dolphin2, 3: dolphin3, 4: dolphin4, 5: dolphin5, 6: dolphin6,
    7: dolphin7, 8: dolphin8, 9: dolphin9, 10: dolphin10, 11: dolphin11, 12: dolphin12,
    13: dolphin13, 14: dolphin14, 15: dolphin15, 16: dolphin16, 17: dolphin17, 18: dolphin18,
    19: dolphin19, 20: dolphin20, 21: dolphin21, 22: dolphin22, 23: dolphin23, 24: dolphin24,
    25: dolphin25, 26: dolphin26, 27: dolphin27, 28: dolphin28, 29: dolphin29, 30: dolphin30,
    31: dolphin31, 32: dolphin32, 33: dolphin33, 34: dolphin34, 35: dolphin35, 36: dolphin36
  };
  const handleUserWithdraw = () => {
    setIsWithdrawPopupVisible(true);
  };
  // Search state for game history
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const fetchBettingRounds = async () => {
      if (!context?.user.bets) return;
      const betsWithTimestamps = await Promise.all(
        context.user.bets.map(async (bet) => {
          try {
            const round = await getBettingRoundById(Number(bet.betId));
            return {
              bet,
              startedAt: new Date(round.startedAt),
            };
          } catch (err) {
            console.error('Failed to fetch round for betId:', bet.betId, err);
            return {
              bet,
              startedAt: new Date(0),
            };
          }
        })
      );
      betsWithTimestamps.sort(
        (a, b) => b.startedAt.getTime() - a.startedAt.getTime()
      );
      setEnhancedBets(betsWithTimestamps);
    };
    fetchBettingRounds();
  }, [context?.user.bets]);
  // Filter enhancedBets based on search query (search by betId)
  const filteredBets = enhancedBets.filter(({ bet }) => {
    if (!searchQuery.trim()) return true;
    return `${bet.betId}`.includes(searchQuery.trim());
  });
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
          <p style={{ color: 'white' }} className="text-center">No Dolphin Dash NFTs staked</p>
        )}
        {context?.user.stakedNfts?.map((nft) => (
          <StakedNFTCard key={nft.nftAddress} contractAddress={nft.nftAddress} />
        ))}
      </SectionBox>
      <SectionBox title={t('profile.gameHistory')}>
        {/* Search and Filter Section */}
<div className="flex flex-row items-center justify-center gap-4 mb-6">
  <div className="relative w-full max-w-[300px]">
    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white w-5 h-5 pointer-events-none" />
    <input
      type="text"
      placeholder="Search"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full bg-transparent border border-white rounded-2xl py-3 pl-12 pr-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
      style={{ color: 'white' }}
    />
  </div>
  <button
    onClick={() => alert('Filter clicked!')}
    className="w-full max-w-[150px] flex items-center justify-center gap-2 bg-transparent border border-white text-white rounded-2xl px-5 py-3 hover:bg-white/10 transition-colors font-semibold"
    style={{ color: 'white' }}
  >
    Filters
  </button>
</div>

        {/* Game list & buttons */}
        <div className="w-full max-w-[520px] mx-auto bg-[#232358] rounded-2xl p-5 sm:p-7 shadow-xl"
            style={{ background: "rgba(35,35,88,0.92)" }}>
          {/* Bets List */}
          {filteredBets.length === 0 ? (
            <p className="text-center text-white">No games matched your search</p>
          ) : (
            <div className="flex flex-col gap-3">
              {/* Draw Info example, add dynamic if you want */}
              <div className="text-white !text-white font-semibold text-lg mb-2 flex items-center gap-2">
  Draw #34 <span className="text-white px-2">·</span> 15 Aug 2025
</div>
              {filteredBets.map(({ bet }, index) => (
                <GameHistoryCard
                  key={index}
                  image={dolphinImages[bet.numberBettedOn]}
                  cost={`${bet.amountBet}`}
                  prize={`${bet.amountWon}`}
                  useTon={bet.useTon}
                  betId={`${bet.betId}`}
                  result={bet.hasWon ? 'win' : 'lose'}
                />
              ))}
            </div>
          )}
          {/* Navigation Buttons */}
<div className="flex flex-row items-center justify-between gap-4 mt-8"> {/* increased gap from 2 → 4 */}
  <button
    onClick={() => alert('Prev Draw clicked')}
    className="flex-1 py-3 rounded-2xl border border-white text-white font-semibold bg-transparent hover:bg-white transition text-base"
    style={{ minWidth: 0, color: 'white' }}
  >
    ← Prev Draw
  </button>
  <button
    onClick={() => alert('Jump to Round clicked')}
    className="flex-1 py-3 rounded-2xl border-2 border-white text-white font-semibold bg-transparent hover:bg-white/10 transition text-base mx-2"
    style={{
      boxShadow: "0 0 0 2px #232358, 0 2px 8px rgba(0,0,0,0.08)",
      background: 'rgba(35,35,88,0.95)',
      color: 'white',
    }}
  >
    Jump to Round
  </button>
  <button
    onClick={() => alert('Next Draw clicked')}
    className="flex-1 py-3 rounded-2xl border border-white text-white font-semibold bg-transparent hover:bg-white transition text-base"
    style={{ minWidth: 0, color: 'white' }}
  >
    Next Draw →
  </button>
</div>

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
