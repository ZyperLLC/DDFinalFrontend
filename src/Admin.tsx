import { useContext, useEffect, useState } from 'react';
import { UserContext } from './Context/UserContextProvider';
import Navbar from './components/Navbar';
import logo from './assets/logo.jpg';
import background1 from './assets/background1.jpg';

import {
  getAllUsers,
  getLatestBettingRound,
} from './api/userApi';


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

const dolphinImages: { [key: number]: any } = {
  1: dolphin1, 2: dolphin2, 3: dolphin3, 4: dolphin4, 5: dolphin5, 6: dolphin6,
  7: dolphin7, 8: dolphin8, 9: dolphin9, 10: dolphin10, 11: dolphin11, 12: dolphin12,
  13: dolphin13, 14: dolphin14, 15: dolphin15, 16: dolphin16, 17: dolphin17, 18: dolphin18,
  19: dolphin19, 20: dolphin20, 21: dolphin21, 22: dolphin22, 23: dolphin23, 24: dolphin24,
  25: dolphin25, 26: dolphin26, 27: dolphin27, 28: dolphin28, 29: dolphin29, 30: dolphin30,
  31: dolphin31, 32: dolphin32, 33: dolphin33, 34: dolphin34, 35: dolphin35, 36: dolphin36,
};

interface Bet {
  betId: string;
  numberBettedOn: number;
  amountBet: number;
  useTon: boolean;
}

interface User {
  telegramId: string;
  username?: string;
  betsPlace?: Bet[];
}

const ADMIN_WALLETS = [
  'UQBQkP1aMvsrIx-SyYNSI-OoWMLeQwSjFzTBB9rU-3_r1Dc-',
  'UQD4qp7lDCNW94HiMOS0hsAdo_UuWEu7MeWS7wVEKV156D4r',
];

const NAVBAR_HEIGHT_PX = 80;
const ITEMS_PER_PAGE = 10;

export default function AdminPage() {
  const context = useContext(UserContext);
  const walletAddress = context?.user.walletAddress;
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'ton' | 'credits'>('all');
  const [userBets, setUserBets] = useState<any[]>([]);
  const [currentRound, setCurrentRound] = useState<any>(null);
  const [isLoadingRound, setIsLoadingRound] = useState(true);
  const [resultNumber, setResultNumber] = useState<string>('');
  const [checkedBets, setCheckedBets] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!walletAddress) return;
    if (ADMIN_WALLETS.includes(walletAddress)) setIsAuthorized(true);
  }, [walletAddress]);

  useEffect(() => {
    async function fetchData() {
      try {
        const roundDetail = await getLatestBettingRound();
        setCurrentRound(roundDetail);

        if (roundDetail?.bettingRoundNo) {
          const allUsers = await getAllUsers();
          const allBets: any[] = [];

            allUsers.forEach((user: User) => {
  if (user.betsPlace?.length) {
    user.betsPlace
      .filter((b: Bet) => b.betId === roundDetail.bettingRoundNo)
      .forEach((bet: Bet) => {
        allBets.push({
          username: user.username || user.telegramId,
          nftId: bet.numberBettedOn,
          amount: bet.amountBet,
          tokenType: bet.useTon ? 'ton' : 'credits',
        });
      });
  }
});


          setUserBets(allBets);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingRound(false);
      }
    }
    fetchData();
  }, []);

  const handleCheckResult = () => {
    const num = parseInt(resultNumber, 10);
    if (isNaN(num) || !currentRound) return;
    setCheckedBets(userBets.filter(b => b.nftId === num));
  };

  const filteredBets = activeFilter === 'all' ? userBets : userBets.filter(b => b.tokenType === activeFilter);
  const paginatedBets = filteredBets.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filteredBets.length / ITEMS_PER_PAGE);

  if (!walletAddress) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-white" style={{ backgroundImage: `url(${background1})`, backgroundSize: 'cover' }}>
        <img src={logo} alt="Logo" className="w-40 mb-6" />
        <p>Please connect your wallet to access admin page.</p>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-white" style={{ backgroundImage: `url(${background1})`, backgroundSize: 'cover' }}>
        <img src={logo} alt="Logo" className="w-40 mb-6" />
        <p>Access Denied. You are not an admin.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white p-6" style={{ backgroundImage: `url(${background1})`, backgroundSize: 'cover', paddingBottom: `${NAVBAR_HEIGHT_PX}px`,  color:'white'}}>
      <div className="flex flex-col items-center text-center">
        <img src={logo} alt="Logo" className="animated-logo mb-14" style={{ width: '250px' }} />
        <h1 className="text-3xl font-bold mb-6">Admin Section</h1>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button className="admin-btn">Start Round</button>
          <button className="admin-btn">Stop Round</button>
          <input placeholder="Winning Number" value={resultNumber} onChange={e => setResultNumber(e.target.value)} className="bg-gray-800 p-2 rounded text-white w-40 text-center" />
          <button className="admin-btn" onClick={handleCheckResult}>Check</button>
          <button className="admin-btn">Distribute Prizes</button>
        </div>
      </div>

      <div className="flex flex-col space-y-16 max-w-3xl px-6">

        {/* Current Round Info */}
        <details className="admin-section w-full">
          <summary className="admin-summary text-xl font-semibold">Current Round Info</summary>
          {isLoadingRound ? (
            <p className="mt-4">Loading round data...</p>
          ) : currentRound ? (
            <table className="admin-table w-full mt-4 text-white">
              <thead><tr><th>Field</th><th>Value</th></tr></thead>
              <tbody>
                <tr><td>Round ID</td><td>{currentRound._id}</td></tr>
                <tr><td>Status</td><td>{currentRound.hasEnded ? 'Ended' : 'Ongoing'}</td></tr>
                <tr><td>Total Bets</td><td>{userBets.length}</td></tr>
                <tr><td>Total Amount</td><td>{userBets.reduce((s, b) => s + b.amount, 0)}</td></tr>
                <tr><td>TON Amount</td><td>{userBets.filter(b => b.tokenType === 'ton').reduce((s, b) => s + b.amount, 0)}</td></tr>
                <tr><td>Credit Amount</td><td>{userBets.filter(b => b.tokenType === 'credits').reduce((s, b) => s + b.amount, 0)}</td></tr>
                <tr><td>Start Time</td><td>{new Date(currentRound.startedAt).toLocaleString()}</td></tr>
              </tbody>
            </table>
          ) : (
            <p className="mt-4">No round found.</p>
          )}
        </details>

        {/* Total Bets */}
        <details className="admin-section w-full">
          <summary className="admin-summary text-xl font-semibold">Total Bets</summary>
          <div className="flex gap-4 mt-4 mb-4">
            <button className={`admin-btn ${activeFilter === 'all' ? 'bg-blue-600' : ''}`} onClick={() => { setActiveFilter('all'); setCurrentPage(1); }}>All</button>
            <button className={`admin-btn ${activeFilter === 'ton' ? 'bg-blue-600' : ''}`} onClick={() => { setActiveFilter('ton'); setCurrentPage(1); }}>TON</button>
            <button className={`admin-btn ${activeFilter === 'credits' ? 'bg-blue-600' : ''}`} onClick={() => { setActiveFilter('credits'); setCurrentPage(1); }}>Credits</button>
          </div>
          <table className="admin-table w-full mb-4 text-white">
            <thead><tr><th>S.No.</th><th>NFT</th><th>Amount</th><th>Token</th></tr></thead>
            <tbody>
              {paginatedBets.map((bet, idx) => (
                <tr key={idx}>
                  <td>{(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}</td>
                  <td className="flex items-center gap-2">
                    <img src={dolphinImages[bet.nftId]} className="w-8 h-8 rounded" alt="" />
                    Dolphin {bet.nftId}
                  </td>
                  <td>{bet.amount}</td>
                  <td>{bet.tokenType.toUpperCase()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {totalPages > 1 && (
            <div className="flex justify-center gap-4 mt-2">
              <button className="admin-btn px-3" onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>Prev</button>
              <span>Page {currentPage} of {totalPages}</span>
              <button className="admin-btn px-3" onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
            </div>
          )}
        </details>

        {/* Result Mockup */}
        <details className="admin-section w-full">
          <summary className="admin-summary text-xl font-semibold">Result Mockup</summary>
          {checkedBets.length > 0 ? (
            <table className="admin-table w-full mt-4 text-white">
              <thead><tr><th>Username</th><th>Amount</th><th>Token</th></tr></thead>
              <tbody>
                {checkedBets.map((b, i) => (
                  <tr key={i}>
                    <td>{b.username}</td>
                    <td>{b.amount}</td>
                    <td>{b.tokenType.toUpperCase()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="mt-4">No matching bets for this number.</p>
          )}
        </details>
      </div>

      <div className="fixed bottom-0 left-0 w-full" style={{ height: `${NAVBAR_HEIGHT_PX}px` }}>
        <Navbar />
      </div>
    </div>
  );
}
