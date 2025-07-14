import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';

import background1 from './assets/background1.jpg';
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

import creditIcon from './assets/credit.jpg';
import tonSymbol from './assets/ton_symbol.jpg';

import LogoDisplay from './components/LogoDisplay';
import ConnectWalletCard from './components/ConnectWalletCard';
import StakedNFTCard from './components/StakedNFTCard';
import GameHistoryCard from './components/GameHistoryCard';
import SectionBox from './components/SectionBox';

import './index.css';
import { UserContext } from './Context/UserContextProvider';
// import { useWithdrawDeposits } from './hooks/useWithdrawDeposits';
import { motion } from 'framer-motion';
import { slideUpFade } from './utils/animations';

export default function Profile() {
  const { t } = useTranslation();
  const context = useContext(UserContext);
  const isWalletConnected = !!context?.user.walletAddress;
  // const {withdraw} = useWithdrawDeposits();
  // const [amountToWithdraw,_] = useState<number>(0.1);
  
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
    36: dolphin36
  }

  // const handleUserWithdraw = () => {
  //   const userWithdrawal = async ()=>{
  //     await withdraw(amountToWithdraw);
  //   }
  //   userWithdrawal();
  // }
  return (
    <motion.div variants={slideUpFade} initial="hidden" animate="visible"
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

      {/* ✅ Show Balance Section only when wallet is connected */}
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
            <h2 className="text-[1.5rem] font-bold text-left" style={{ margin: 0 }}>
              {t('profile.balance')}
            </h2>

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
              <span
                style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                }}
              >
                {context?.user.tonBalance?.toString().slice(0,4) ?? '0'}
              </span>
            </div>

            {/* <button
              className="w-full mt-2 py-3 rounded-[12px] font-semibold connect-wallet-button"

              onClick={handleUserWithdraw}
            >
              {t('profile.sendTon')}
            </button> */}
          </div>
        </div>
      )}

      {/* Staked NFTs */}
      <SectionBox title={t('profile.stakedNfts')}>
        {context?.user.stakedNfts && context?.user.stakedNfts.length ===0 &&
          <p className='text-white ' style={{color:"white",textAlign:"center"}}>No Dolphin Dash NFTs staked </p>}
        
        
        {context?.user.stakedNfts && context.user.stakedNfts.length !== 0 && context.user.stakedNfts.map((nft) => (
          <StakedNFTCard contractAddress={nft.nftAddress}/>  
        ))}
      </SectionBox>

      {/* Game History */}
      <SectionBox title={t('profile.gameHistory')}>
        {context?.user.bets && context?.user.bets.length ===0 &&
          <p className='text-white ' style={{color:"white",textAlign:"center"}}>No games played yet </p>
          }
        
        
        {context?.user.bets!==undefined && context?.user.bets.length !== 0 && context?.user?.bets.map((bet, index) => (
          <GameHistoryCard
            key={index}
            image={dolphinImages[bet.numberBettedOn]} // Replace with bet.dolphinImage if available
            cost={`${bet.amountBet}`}
            prize={`${bet.amountWon}`}
            useTon = {bet.useTon}
            betId = {bet.betId}
            result={bet.hasWon?'win':"lose"} // 'win' or 'lose'
          />
        ))}
      </SectionBox>

      <Navbar />
    </motion.div>
  );
}