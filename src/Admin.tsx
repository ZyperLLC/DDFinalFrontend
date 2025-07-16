import { useContext, useEffect, useState } from 'react';
import { UserContext } from './Context/UserContextProvider';
import Navbar from './components/Navbar';
import Accordion from './components/Accordion';
import logo from './assets/logo.jpg';
import background1 from './assets/background1.jpg';

const ADMIN_WALLETS = [
  'UQBQkP1aMvsrIx-SyYNSI-OoWMLeQwSjFzTBB9rU-3_r1Dc-',
  'UQD4qp7lDCNW94HiMOS0hsAdo_UuWEu7MeWS7wVEKV156D4r'
];

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

  const filteredBets = activeFilter === 'all' ? allBets : allBets.filter(bet => bet.type === activeFilter);

  useEffect(() => {
    if (!walletAddress) return;
    if (ADMIN_WALLETS.includes(walletAddress)) {
      setIsAuthorized(true);
    }
  }, [walletAddress]);

  if (!walletAddress) {
    return (
      <div
        className="min-h-screen flex flex-col justify-center items-center text-white text-center"
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
        className="min-h-screen flex flex-col justify-center items-center text-white text-center"
        style={{ backgroundImage: `url(${background1})`, backgroundSize: 'cover' }}
      >
        <img src={logo} alt="Logo" className="w-40 mb-6" />
        <p>Access Denied. You are not an admin.</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen text-white pt-6 pb-28 px-6 flex flex-col items-center text-center"
      style={{ backgroundImage: `url(${background1})`, backgroundSize: 'cover' }}
    >
      <img src={logo} alt="Logo" className="w-60 mb-6" />
      <h1 className="text-3xl font-bold mb-8">Admin Section</h1>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center items-center gap-4 mb-10">
        <button className="admin-btn">Start Round</button>
        <button className="admin-btn">Stop Round</button>
        <input
          placeholder="Winning Number"
          className="bg-gray-800 p-2 rounded text-white w-40 text-center"
        />
        <button className="admin-btn">Distribute Prizes</button>
      </div>

      {/* Current Round Info */}
      <Accordion title="Current Round Info">
        <table className="admin-table w-full mt-2 text-white">
          <thead>
            <tr><th>Field</th><th>Value</th></tr>
          </thead>
          <tbody>
            <tr><td>Round ID</td><td>5</td></tr>
            <tr><td>Start Time</td><td>10:00 AM</td></tr>
            <tr><td>Status</td><td>Ongoing</td></tr>
          </tbody>
        </table>
      </Accordion>

      {/* Total Bets */}
      <Accordion title="Total Bets">
        <div className="flex justify-center gap-4 mb-4">
          <button className={`admin-btn ${activeFilter === 'all' ? 'bg-blue-600' : ''}`} onClick={() => setActiveFilter('all')}>All</button>
          <button className={`admin-btn ${activeFilter === 'ton' ? 'bg-blue-600' : ''}`} onClick={() => setActiveFilter('ton')}>TON</button>
          <button className={`admin-btn ${activeFilter === 'credits' ? 'bg-blue-600' : ''}`} onClick={() => setActiveFilter('credits')}>Credits</button>
        </div>
        <table className="admin-table w-full text-white">
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
      </Accordion>

      {/* Result Mockup */}
      <Accordion title="Result Mockup">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mt-4">
          <input
            placeholder="Enter Number"
            className="bg-gray-800 p-2 rounded text-white w-40 text-center"
          />
          <button className="admin-btn">Check</button>
        </div>
        <table className="admin-table w-full text-white mt-4">
          <thead>
            <tr><th>Username</th><th>Amount Placed</th><th>TON/CREDITS</th></tr>
          </thead>
          <tbody>
            <tr><td>user1</td><td>20</td><td>TON</td></tr>
            <tr><td>user2</td><td>15</td><td>CREDITS</td></tr>
          </tbody>
        </table>
      </Accordion>

      <Navbar />
    </div>
  );
}
