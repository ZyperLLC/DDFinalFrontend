import { useContext, useEffect, useState } from 'react';
import { UserContext } from './Context/UserContextProvider';
import Navbar from './components/Navbar';
import logo from './assets/logo.jpg';
import background1 from './assets/background1.jpg';

import { getBettingRounds, getBettingRoundById } from './api/userApi';

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

  const allBets = [
    { id: 1, nft: 'Dolphin 1', amount: 20, type: 'ton' },
    { id: 2, nft: 'Dolphin 4', amount: 15, type: 'credits' },
    { id: 3, nft: 'Dolphin 2', amount: 18, type: 'ton' },
  ];

  const filteredBets =
    activeFilter === 'all' ? allBets : allBets.filter(bet => bet.type === activeFilter);

  // Round state
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
        }
      } catch (error) {
        console.error("Error fetching betting round:", error);
      } finally {
        setIsLoadingRound(false);
      }
    };

    fetchCurrentRound();
  }, []);

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
      }}
    >
      {/* Header */}
      <div className="flex flex-col items-center text-center">
        <img src={logo} alt="Logo" className="animated-logo mb-14" style={{ width: '250px' }} />
        <h1 className="text-3xl font-bold mb-6 text-white" style={{ color: 'white' }}>Admin Section</h1>
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
          <summary className="admin-summary text-xl font-semibold cursor-pointer" style={{ color: 'white' }}>
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
        <details className="admin-section w-full text-white" style={{ color: 'white' }}>
          <summary className="admin-summary text-xl font-semibold cursor-pointer" >
            Total Bets
          </summary>
          <div className="flex justify-start gap-4 mt-4 mb-4">
            <button
              className={`admin-btn ${activeFilter === 'all' ? 'bg-blue-600' : ''}`}
              onClick={() => setActiveFilter('all')}
            >All</button>
            <button
              className={`admin-btn ${activeFilter === 'ton' ? 'bg-blue-600' : ''}`}
              onClick={() => setActiveFilter('ton')}
            >TON</button>
            <button
              className={`admin-btn ${activeFilter === 'credits' ? 'bg-blue-600' : ''}`}
              onClick={() => setActiveFilter('credits')}
            >Credits</button>
          </div>
          <table className="admin-table w-full text-white mb-4">
            <thead>
              <tr><th>S.No.</th><th>NFT Name</th><th>Amount</th><th>TON/CREDITS</th></tr>
            </thead>
            <tbody>
              {filteredBets.map((bet, index) => (
                <tr key={bet.id}>
                  <td>{index + 1}</td>
                  <td>{bet.nft}</td>
                  <td>{bet.amount}</td>
                  <td>{bet.type.toUpperCase()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>

        {/* Result Mockup */}
        <details className="admin-section w-full text-white" style={{ color: 'white' }}>
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
