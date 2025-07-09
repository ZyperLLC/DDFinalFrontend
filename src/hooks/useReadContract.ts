// useReadContract.ts - Simplified version
import { useEffect, useState } from 'react';
import { BetGame } from '../../../ZyperLLC/DolphinDashFrontend/src/contracts/BetGame/BetGame_BetGame.ts';
import { useTonClient } from './useTonClient.ts';
import { useAsyncInitialize } from './useAsyncInitialize.ts';
import { Address, OpenedContract } from '@ton/core';

export function useReadContract({
  fun,
  enabled = true
}: {
  fun: 'owner' | 'balance' | 'round';
  enabled?: boolean;
}) {
  const { client, loading: clientLoading, error: clientError } = useTonClient(enabled);
  const [val, setVal] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { data: betGameContract, loading: contractLoading, error: contractError } = useAsyncInitialize(async () => {
    if (!client) return null;
    
    const contract = new BetGame(
      Address.parse(import.meta.env.VITE_CONTRACT_ADDRESS)
    );
    return client.open(contract) as OpenedContract<BetGame>;
  }, [client, enabled]);

  useEffect(() => {
    if (!enabled) {
      setVal(null);
      setError(null);
      setLoading(false);
      return;
    }

    if (!betGameContract) {
      setVal(null);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let result;
        switch(fun) {
          case 'owner':
            result = await betGameContract.getOwner();
            break;
          case 'balance':
            result = await betGameContract.getContractBalance();
            break;
          case 'round':
            result = await betGameContract.getBettingRound();
            break;
          default:
            throw new Error(`Unknown function: ${fun}`);
        }
        setVal(result.toString());
      } catch (err) {
        setError(err instanceof Error ? err : new Error(`Failed to get ${fun}`));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fun, betGameContract, enabled]);

  return {
    data: val,
    loading: enabled && (clientLoading || contractLoading || loading),
    error: clientError || contractError || error,
  };
}