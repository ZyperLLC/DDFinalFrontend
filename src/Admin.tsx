import { useContext, useEffect, useState } from 'react';
import { UserContext } from './Context/UserContextProvider';
import Navbar from './components/Navbar';
import logo from './assets/logo.jpg';
import background1 from './assets/background1.jpg';

import {
  getBettingRounds,
  getBettingRoundById,
  getUser,
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

const ADMIN_WALLETS = [
  'UQBQkP1aMvsrIx-SyYNSI-OoWMLeQwSjFzTBB9rU-3_r1Dc-',
  'UQD4qp7lDCNW94HiMOS0hsAdo_UuWEu7MeWS7wVEKV156D4r',
];

const NAVBAR_HEIGHT_PX = 80;

export default function AdminPage() {
  const context = useContext(UserContext);
  const walletAddress = context?.user.walletAddress;
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'ton' | 'credits'>('all');

  const [userBets, setUserBets] = useState<any[]>([]);

  const [currentRound, setCurrentRound] = useState<any>(null);
  const [isLoadingRound, setIsLoadingRound] = useState(true);

  useEffect(() => {
    if (!walletAddress) return;
    if (ADMIN_WALLETS.includes(walletAddress)) {
      setIsAuthorized(true);
    }
  }, [walletAddress]);

  useEffect(() => {
    const fetchCurrentRound = async () => {
      try {
        const rounds = await getBettingRounds();
        if (rounds && rounds.length > 0) {
          const latestRound = rounds[rounds.length - 1];
          const roundDetail = await getBettingRoundById(latestRound.id);
          setCurrentRound(roundDetail);

          if (context?.user?.telegramId && roundDetail?.id) {
            const userData = await getUser(context.user.telegramId);
            const matchedBets = userData.bets.filter(
              (bet: any) => bet.roundId === roundDetail.id
            );
            setUserBets(matchedBets);
          }
        }
      } catch (error) {
        console.error('Error fetching round or user data:', error);
      } finally {
        setIsLoadingRound(false);
      }
    };

    fetchCurrentRound();
  }, []);

  const filteredBets =
    activeFilter === 'all'
      ? userBets
      : userBets.filter(bet => bet.tokenType === activeFilter);

  if (!walletAddress) {
    return (
      <div
        className="min-h-screen flex flex-col justify-center items-center text-white"
        style={{ backgroundImage: `url(${background1})`, backgroundSize: 'cover' }}
      >
        <img src={logo} alt="Logo" className="w-40 mb-6" />
        <p>Please connect your wallet to access admin page.</p>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div
        className="min-h-screen flex flex-col justify-center items-center text-white"
        style={{ backgroundImage: `url(${background1})`, backgroundSize: 'cover' }}
      >
        <img src={logo} alt="Logo" className="w-40 mb-6" />
        <p>Access Denied. You are not an admin.</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen text-white p-6"
      style={{
        backgroundImage: `url(${background1})`,
        backgroundSize: 'cover',
        paddingBottom: `${NAVBAR_HEIGHT_PX}px`,
        color: 'white' ,
      }}
    >
      {/* Header */}
      <div className="flex flex-col items-center text-center">
        <img src={logo} alt="Logo" className="animated-logo mb-14" style={{ width: '250px' }} />
        <h1 className="text-3xl font-bold mb-6 text-white">Admin Section</h1>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button className="admin-btn">Start Round</button>
          <button className="admin-btn">Stop Round</button>
          <input
            placeholder="Winning Number"
            className="bg-gray-800 p-2 rounded text-white w-40 text-center"
          />
          <button className="admin-btn">Distribute Prizes</button>
        </div>
      </div>

      {/* Collapsible Sections */}
      <div className="flex flex-col space-y-16 max-w-3xl px-6">
        {/* Current Round Info */}
        <details className="admin-section w-full text-white">
          <summary className="admin-summary text-xl font-semibold cursor-pointer">
            Current Round Info
          </summary>
          {isLoadingRound ? (
            <p className="mt-4">Loading round data...</p>
          ) : currentRound ? (
            <table className="admin-table w-full text-white mt-4">
              <thead>
                <tr><th>Field</th><th>Value</th></tr>
              </thead>
              <tbody>
                <tr><td>Round ID</td><td>{currentRound.id}</td></tr>
                <tr><td>Status</td><td>{currentRound.status}</td></tr>
                <tr><td>Total Bets</td><td>{currentRound.totalBets}</td></tr>
                <tr><td>Total Amount</td><td>{currentRound.totalAmount}</td></tr>
                <tr><td>TON Amount</td><td>{currentRound.tonAmount}</td></tr>
                <tr><td>Credit Amount</td><td>{currentRound.creditAmount}</td></tr>
                <tr><td>Start Time</td><td>{new Date(currentRound.createdAt).toLocaleString()}</td></tr>
              </tbody>
            </table>
          ) : (
            <p className="mt-4">No round found.</p>
          )}
        </details>

        {/* Total Bets */}
        <details className="admin-section w-full text-white">
          <summary className="admin-summary text-xl font-semibold cursor-pointer">
            Total Bets
          </summary>
          <div className="flex justify-start gap-4 mt-4 mb-4">
            <button className={`admin-btn ${activeFilter === 'all' ? 'bg-blue-600' : ''}`} onClick={() => setActiveFilter('all')}>All</button>
            <button className={`admin-btn ${activeFilter === 'ton' ? 'bg-blue-600' : ''}`} onClick={() => setActiveFilter('ton')}>TON</button>
            <button className={`admin-btn ${activeFilter === 'credits' ? 'bg-blue-600' : ''}`} onClick={() => setActiveFilter('credits')}>Credits</button>
          </div>
          <table className="admin-table w-full text-white mb-4">
            <thead>
              <tr><th>S.No.</th><th>NFT Name</th><th>Amount</th><th>TON/CREDITS</th></tr>
            </thead>
            <tbody>
              {filteredBets.map((bet, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="flex items-center gap-2">
                    <img
                      src={dolphinImages[bet.nftId]}
                      alt={`Dolphin ${bet.nftId}`}
                      className="w-8 h-8 rounded"
                    />
                    Dolphin {bet.nftId}
                  </td>
                  <td>{bet.amount}</td>
                  <td>{bet.tokenType.toUpperCase()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>

        {/* Result Mockup */}
        <details className="admin-section w-full text-white">
          <summary className="admin-summary text-xl font-semibold cursor-pointer">
            Result Mockup
          </summary>
          <div className="flex flex-col sm:flex-row justify-start items-start gap-2 mt-4">
            <input
              placeholder="Enter Number"
              className="bg-gray-800 p-2 rounded text-white w-40 text-center"
            />
            <button className="admin-btn">Check</button>
          </div>
          <table className="admin-table w-full text-white mt-4 mb-4">
            <thead>
              <tr><th>Username</th><th>Amount Placed</th><th>TON/CREDITS</th></tr>
            </thead>
            <tbody>
              <tr><td>user1</td><td>20</td><td>TON</td></tr>
              <tr><td>user2</td><td>15</td><td>CREDITS</td></tr>
            </tbody>
          </table>
        </details>
      </div>

      {/* Fixed Bottom Navbar */}
      <div
        className="fixed bottom-0 left-0 w-full z-20"
        style={{ height: `${NAVBAR_HEIGHT_PX}px` }}
      >
        <Navbar />
      </div>
    </div>
  );
}
