
import { useTranslation } from 'react-i18next';
import { useEffect, useState, useRef } from 'react';
import { getBettingRoundById, getBettingRounds } from '../api/userApi';

export default function DolphinGrid({
  dolphins,
  onDolphinClick,
  timer,
}: {
  dolphins: string[];
  onDolphinClick: (index: number) => void;
  timer: number;
}) {
  const { t } = useTranslation();
  const [winningNumber, setWinningNumber] = useState<number|null>(null);
  const checkInterval = useRef<NodeJS.Timeout | null>(null);
  const [isCheckingRound, setIsCheckingRound] = useState(false);

  const getStoredRoundDetails = () => {
    const stored = localStorage.getItem('lastRoundDetails');
    return stored ? JSON.parse(stored) : null;
  };

  const storeRoundDetails = (details: any) => {
    localStorage.setItem('lastRoundDetails', JSON.stringify(details));
  };

  const fetchAndCompareRound = async (isMounted: boolean) => {
    try {
      const lastRoundId = await getBettingRounds();
      if (!isMounted) return false;
      
      const lastRound = await getBettingRoundById(lastRoundId.length-1);
      if (!isMounted) return false;

      const storedDetails = getStoredRoundDetails();
      const hasNewWinner = !storedDetails || storedDetails.winningNumber !== lastRound.winningNumber || storedDetails.bettingRoundNo !== lastRoundId.length-1;

      if (hasNewWinner) {
        storeRoundDetails(lastRound);
        setWinningNumber(lastRound.winningNumber);
        return true; // Round has been updated
      }
      return false; // No update yet
    } catch (error) {
      console.error('Error fetching round details:', error);
      return false;
    }
  };

  useEffect(() => {
    let isMounted = true;

    // Function to start periodic checking
    const startPeriodicCheck = () => {
      if (checkInterval.current) return; // Don't start if already running

      setIsCheckingRound(true);
      checkInterval.current = setInterval(async () => {
        const updated = await fetchAndCompareRound(isMounted);
        if (updated && checkInterval.current) {
          clearInterval(checkInterval.current);
          checkInterval.current = null;
          setIsCheckingRound(false);
        }
      }, 1000); // Check every second
    };

    // Initial fetch on mount
    const initializeFetch = async () => {
      const stored = getStoredRoundDetails();
      if (stored) {
        setWinningNumber(stored.winningNumber);
      }
      await fetchAndCompareRound(isMounted);
    };

    // Start checking when timer hits 0
    if (timer === 0 && !isCheckingRound) {
      startPeriodicCheck();
    }

    // Initial fetch when component mounts
    if (!isCheckingRound) {
      initializeFetch();
    }

    // Cleanup
    return () => {
      isMounted = false;
      if (checkInterval.current) {
        clearInterval(checkInterval.current);
        checkInterval.current = null;
      }
    };
  }, [timer, isCheckingRound]); // Depend on timer and checking status

  return (
    <div className="combined-card2 bg-black/70">
      <div style={{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        width:"100%"
      }}>
      <h2 className="dolphin-header" style={{ marginTop: '1rem' }}>
        {t('last_winner')}
      </h2>

      <img src={dolphins[(winningNumber??0)-1]} key={1} alt={`Dolphin ${1}`} className="dolphin"/>
      </div>
      <h2 className="dolphin-header" style={{ marginTop: '1rem' }}>
        {t('pick_champion')}
      </h2>
      <div className="dolphin-grid">
        {dolphins.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Dolphin ${i + 1}`}
            className="dolphin"
            onClick={() => onDolphinClick(i)}
          />
        ))}
      </div>
    </div>
  );
}
