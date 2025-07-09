// useTonClient.ts - Simplified for TON Connect
import { getHttpEndpoint } from '@orbs-network/ton-access';
import { TonClient } from "@ton/ton";
import { useAsyncInitialize } from './useAsyncInitialize.ts';

export function useTonClient(enabled: boolean) {
  console.log('useTonClient', { enabled });
  
  const { data: client, loading, error } = useAsyncInitialize(
    async () => {
      return new TonClient({
        endpoint: await getHttpEndpoint({ network: 'testnet' }),
      });
    },
    [enabled] // Pass enabled as dependency
  );
  
  return { client, loading, error };
}
