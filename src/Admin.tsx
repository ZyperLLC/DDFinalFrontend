import { useContext, useEffect, useState } from 'react';
import { UserContext } from './Context/UserContextProvider';
import Navbar from './components/Navbar';
import logo from './assets/logo.jpg';
import background1 from './assets/background1.jpg';
import  Accordion  from './components/Accordion';
import {
  getAllUsers,
  getLatestRound,
} from './api/userApi';
import toast from 'react-hot-toast';
import { fromNano } from '@ton/ton';
import { useEndRound } from './hooks/useEndRound';

// Dolphin images
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
  31: dolphin31, 32: dolphin32, 33: dolphin33, 34: dolphin34, 35: dolphin35, 36: dolphin36
};

const ADMIN_WALLETS = import.meta.env.VITE_ADMIN_WALLET;
const NAVBAR_HEIGHT_PX = 80;

export default function AdminPage() {
  const context = useContext(UserContext);
  const walletAddress = context?.user.walletAddress;

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'ton' | 'credits'>('all');
  const [userBets, setUserBets] = useState<any[]>([]);
  const [currentRound, setCurrentRound] = useState<any>(null);
  const [resultNumber, setResultNumber] = useState<string>('');
  const [checkedBets, setCheckedBets] = useState<any[]>([]);
  const [currentBets, setCurrentBets] = useState<any[]>([]);
  const [winningNumber, setWinningNumber] = useState<number | null>(null);

  const { stopCurrentRound, endBettingRound } = useEndRound();

  useEffect(() => {
    if (!walletAddress) return;
    if (ADMIN_WALLETS.includes(walletAddress)) setIsAuthorized(true);
  }, [walletAddress]);

  useEffect(() => {
    const fetchCurrentRound = async () => {
      try {
        const roundDetail = await getLatestRound();

        if (roundDetail?.bettingRoundNo) {
          setCurrentRound(roundDetail);

          const allUsers = await getAllUsers();
          const allBets: any[] = [];
          const betsToAdd: any[] = [];

          allUsers.forEach((user: any) => {
            if (user.betsPlace?.length) {
              user.betsPlace
                .filter((b: any) => b.betId === roundDetail.bettingRoundNo)
                .forEach((bet: any) => {
                  if (allBets[bet.numberBettedOn]) {
                    allBets[bet.numberBettedOn] = {
                      nftId: bet.numberBettedOn,
                      amount: allBets[bet.numberBettedOn].amount + Number(bet.useTon ? fromNano(bet.amountBet) : bet.amountBet),
                      tonAmount: bet.useTon ? allBets[bet.numberBettedOn].tonAmount + Number(fromNano(bet.amountBet)) : allBets[bet.numberBettedOn].tonAmount,
                      tokenType: bet.useTon ? 'ton' : 'credits'
                    };
                  } else {
                    allBets[bet.numberBettedOn] = {
                      nftId: bet.numberBettedOn,
                      amount: bet.useTon ? Number(fromNano(bet.amountBet)) : Number(bet.amountBet),
                      tonAmount: bet.useTon ? Number(fromNano(bet.amountBet)) : 0,
                      tokenType: bet.useTon ? 'ton' : 'credits',
                    };
                  }

                  betsToAdd.push({
                    username: user.username,
                    walletAddress: user.walletAddress,
                    bet
                  });
                });
            }
          });

          setUserBets(allBets);
          setCurrentBets(betsToAdd);
        } else {
          setCurrentRound(null);
        }
      } catch (error) {
        console.error('Error fetching round or user data:', error);
      }
    };

    fetchCurrentRound();
  }, []);

  const handleEndRound = async () => {
    if (!winningNumber || winningNumber < 1 || winningNumber > 36) {
      toast.error("Please Enter the winning number between 1 to 36");
      return;
    }
    await endBettingRound(winningNumber);
    toast.success(`Winning Number ${winningNumber}`);
  };

  const handleCheckResult = () => {
    const num = parseInt(resultNumber, 10);
    if (isNaN(num) || !currentRound) return;
    if (num < 1 || num > 36) {
      toast.error("Number should be between 1 to 36");
      return;
    }

    const bets = currentBets.filter((betObj: any) => betObj.bet.numberBettedOn === num);
    setCheckedBets(bets);
  };

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
    <div className="min-h-screen text-white p-6" style={{ backgroundImage: `url(${background1})`, backgroundSize: 'cover', paddingBottom: `${NAVBAR_HEIGHT_PX}px` }}>
      <div className="flex flex-col items-center text-center">
        <img src={logo} alt="Logo" className="animated-logo mb-14" style={{ width: '250px' }} />
        <h1 className="text-3xl font-bold mb-6" style={{color:'white'}}>Admin Section</h1>

        <div className="flex flex-wrap justify-center gap-6 mb-12 flex-col items-center">
          <button className="admin-btn" onClick={stopCurrentRound}>Stop Betting</button>
           <input type="number" min={1} max={36} placeholder='Type Winning No.' onChange={(e)=>setWinningNumber(Number(e.target.value))} style={{borderRadius:"10px", padding:"10px 5px", width:'100%'}}/>
          <button className="admin-btn" onClick={handleEndRound}>End Round</button>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-6 max-w-3xl px-6 mt-10">

        {/* Current Round Info */}
        <div>
         <Accordion title="Current Round Info">
          {currentRound ? (
            <table className="admin-table w-full mt-4 text-white">
              <thead><tr><th>Field</th><th>Value</th></tr></thead>
              <tbody>
                <tr><td>Round ID</td><td>{currentRound.bettingRoundNo}</td></tr>
                <tr><td>Status</td><td>{currentRound.hasEnded ? 'Ended' : 'Ongoing'}</td></tr>
                <tr><td>Total Bets</td><td>{currentRound.totalBets}</td></tr>
                <tr><td>Total Amount</td><td>{currentRound.totalAmountBetted.toFixed(2)}</td></tr>
                <tr><td>TON Amount</td><td>{currentRound.tonAmountBetted.toFixed(2)}</td></tr>
                <tr><td>Credit Amount</td><td>{currentRound.creditAmountBetted.toFixed(2)}</td></tr>
                <tr><td>Start Time</td><td>{currentRound.startedAt}</td></tr>
              </tbody>
            </table>
          ) : (
            <p className="mt-4">No round found.</p>
          )}
         </Accordion>
        </div>

        {/* Total Bets */}
        <div>
         <Accordion title="Total Bets">
          <div className="flex gap-4 mt-4 mb-4">
            <button className={`admin-btn ${activeFilter === 'all' ? 'bg-blue-600' : ''}`} onClick={() => setActiveFilter('all')}>All</button>
            <button className={`admin-btn ${activeFilter === 'ton' ? 'bg-blue-600' : ''}`} onClick={() => setActiveFilter('ton')}>TON</button>
            <button className={`admin-btn ${activeFilter === 'credits' ? 'bg-blue-600' : ''}`} onClick={() => setActiveFilter('credits')}>Credits</button>
          </div>
          <table className="admin-table w-full mb-4 text-white">
            <thead><tr><th>No.</th><th>NFT</th><th>Total</th><th>TON</th><th>Credit</th></tr></thead>
            <tbody>
              {userBets.map((b: any) => (
                <tr key={b.nftId}>
                  <td>{b.nftId}</td>
                  <td><img src={dolphinImages[b.nftId]} width="40px" /></td>
                  <td>{b.amount.toFixed(2)}</td>
                  <td>{b.tonAmount}</td>
                  <td>{(b.amount.toFixed(2) - b.tonAmount).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Accordion>
        </div>

        {/* Result Mockup */}
        <div>
        <Accordion title="Result Mockup">
          <input
            placeholder="Winning Number"
            value={resultNumber}
            onChange={e => setResultNumber(e.target.value)}
            className="bg-gray-800 p-2 rounded text-white w-40 text-center"
          />
          <button className="admin-btn mt-2" onClick={handleCheckResult}>Check</button>
          {checkedBets.length > 0 ? (
            <table className="admin-table w-full mt-4 text-white">
              <thead><tr><th>Username</th><th>Amount</th><th>Token</th></tr></thead>
              <tbody>
                {checkedBets.map((betObject: any, idx: number) => (
                  <tr key={idx}>
                    <td>{betObject.username}</td>
                    <td>{betObject.bet.useTon ? fromNano(betObject.bet.amountBet) : betObject.bet.amountBet}</td>
                    <td>{betObject.bet.useTon ? 'ton' : 'credit'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="mt-4 text-white">No matching bets for this number.</p>
          )}
        </Accordion>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full" style={{ height: `${NAVBAR_HEIGHT_PX}px` }}>
        <Navbar />
      </div>
    </div>
  );
}
