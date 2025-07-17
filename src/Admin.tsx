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

// Dolphin imports
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
import dolphin25 from './assets/dolphins/dolphin25.jpg';
import dolphin26 from './assets/dolphins/dolphin26.jpg';
import dolphin27 from './assets/dolphins/dolphin27.jpg';
import dolphin28 from './assets/dolphins/dolphin28.jpg';
import dolphin29 from './assets/dolphins/dolphin29.jpg';
import dolphin30 from './assets/dolphins/dolphin30.jpg';
import dolphin31 from './assets/dolphins/dolphin31.jpg';
import dolphin32 from './assets/dolphins/dolphin32.jpg';
import dolphin33 from './assets/dolphins/dolphin33.jpg';
import dolphin34 from './assets/dolphins/dolphin34.jpg';
import dolphin35 from './assets/dolphins/dolphin35.jpg';
import dolphin36 from './assets/dolphins/dolphin36.jpg';

const dolphins = [
  { image: dolphin1, name: 'RUGPULL RAY' },
  { image: dolphin2, name: 'HARMONIX' },
  { image: dolphin3, name: 'DND' },
  { image: dolphin4, name: 'D.O.A.T.' },
  { image: dolphin5, name: 'ANDRE BAIT' },
  { image: dolphin6, name: 'ELLE TUSK' },
  { image: dolphin7, name: 'DOLFIE TRUNK' },
  { image: dolphin8, name: 'JELLY THE JEET' },
  { image: dolphin9, name: 'FINTALIK' },
  { image: dolphin10, name: 'DRAINO' },
  { image: dolphin11, name: 'DUROPHIN' },
  { image: dolphin12, name: 'JUSTIN SINK' },
  { image: dolphin13, name: 'KOD' },
  { image: dolphin14, name: 'SHILLEERINA' },
  { image: dolphin15, name: 'TA-LIB' },
  { image: dolphin16, name: 'OLUWAPUMP' },
  { image: dolphin17, name: 'CHADRA SWAMI' },
  { image: dolphin18, name: 'PUMP.FIN' },
  { image: dolphin19, name: 'DOLPHOVICH' },
  { image: dolphin20, name: 'EL LIQUIDATOR' },
  { image: dolphin21, name: 'BOOKIE' },
  { image: dolphin22, name: 'BLUBBERROCK DTF' },
  { image: dolphin23, name: 'CARDOLPHO' },
  { image: dolphin24, name: 'SOLANIC' },
  { image: dolphin25, name: 'MODZILLA' },
  { image: dolphin26, name: 'PROMPTO' },
  { image: dolphin27, name: 'FUDDERINO' },
  { image: dolphin28, name: 'MOONWAVE' },
  { image: dolphin29, name: 'MCFLIPPER' },
  { image: dolphin30, name: 'FINTOSHI' },
  { image: dolphin31, name: 'GASOLINA' },
  { image: dolphin32, name: 'OG FINFATHER' },
  { image: dolphin33, name: 'DOLPH UN' },
  { image: dolphin34, name: 'WHALE WEI' },
  { image: dolphin35, name: 'TONY FLIPPINS' },
  { image: dolphin36, name: 'DOLPH D' },
];

const ADMIN_WALLETS = [
  'UQBQkP1aMvsrIx-SyYNSI-OoWMLeQwSjFzTBB9rU-3_r1Dc-',
  'UQD4qp7lDCNW94HiMOS0hsAdo_UuWEu7MeWS7wVEKV156D4r',
];

const NAVBAR_HEIGHT_PX = 80;

export default function AdminPage() {
  const context = useContext(UserContext);
  const walletAddress = context?.user.walletAddress;
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [currentRound, setCurrentRound] = useState<any>(null);
  const [bets, setBets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (walletAddress && ADMIN_WALLETS.includes(walletAddress)) {
      setIsAuthorized(true);
    }
  }, [walletAddress]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rounds = await getBettingRounds();
        const latestRound = rounds[rounds.length - 1];
        const roundDetails = await getBettingRoundById(latestRound.id);
        setCurrentRound(roundDetails);

        // Fetch single user by Telegram ID
        const telegramId = '123456789'; // TODO: Replace with actual Telegram ID
        const user = await getUser(telegramId);

        const roundBets: any[] = [];
        user.bets?.forEach((bet: any) => {
          if (bet.roundId === latestRound.id) {
            roundBets.push({
              username: user.username || 'Unknown',
              amount: bet.amount,
              type: bet.type,
              nftIndex: bet.nftIndex,
            });
          }
        });

        setBets(roundBets);
      } catch (err) {
        console.error('Failed to fetch admin data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!walletAddress) {
    return <div className="text-white p-10 text-center">Please connect your wallet</div>;
  }

  if (!isAuthorized) {
    return <div className="text-white p-10 text-center">Access Denied</div>;
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
      <div className="text-center mb-8">
        <img src={logo} alt="Logo" className="mx-auto w-40 mb-4" />
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>

      <div className="space-y-16 max-w-3xl mx-auto">
        <details className="bg-black/60 rounded p-4">
          <summary className="text-xl font-semibold cursor-pointer">Current Round Info</summary>
          {isLoading ? (
            <p className="mt-4">Loading...</p>
          ) : (
            <table className="w-full mt-4">
              <tbody>
                <tr><td>ID:</td><td>{currentRound?.id}</td></tr>
                <tr><td>Status:</td><td>{currentRound?.status}</td></tr>
                <tr><td>Total Bets:</td><td>{currentRound?.totalBets}</td></tr>
                <tr><td>Total Amount:</td><td>{currentRound?.totalAmount}</td></tr>
                <tr><td>TON:</td><td>{currentRound?.tonAmount}</td></tr>
                <tr><td>Credits:</td><td>{currentRound?.creditAmount}</td></tr>
              </tbody>
            </table>
          )}
        </details>

        <details className="bg-black/60 rounded p-4">
          <summary className="text-xl font-semibold cursor-pointer">Mapped Bets</summary>
          {bets.length === 0 ? (
            <p className="mt-4">No bets placed in this round.</p>
          ) : (
            <div className="grid gap-4 mt-4">
              {bets.map((bet, idx) => {
                const dolphin = dolphins[bet.nftIndex] || {};
                return (
                  <div key={idx} className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg">
                    {dolphin.image && (
                      <img
                        src={dolphin.image}
                        alt={dolphin.name}
                        className="w-16 h-16 rounded"
                      />
                    )}
                    <div>
                      <p className="font-semibold">{dolphin.name || 'Unknown'}</p>
                      <p>User: {bet.username}</p>
                      <p>Amount: {bet.amount} ({bet.type?.toUpperCase()})</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </details>
      </div>

      <div
        className="fixed bottom-0 left-0 w-full z-20"
        style={{ height: `${NAVBAR_HEIGHT_PX}px` }}
      >
        <Navbar />
      </div>
    </div>
  );
}
