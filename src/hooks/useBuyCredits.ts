import { Address, beginCell, toNano } from '@ton/core';
import { useContext } from 'react';
import { UserContext } from '../Context/UserContextProvider';
import { useTonConnectUiContext } from '../Context/TonConnectUiContext';
import { contractAddress } from '../constants';


export const useBuyCredits = async ()=>{   
    const userContext = useContext(UserContext);
    const tonConnectUI = useTonConnectUiContext();

    const USDT_MASTER = Address.parse(
      'EQCz6n1Zl1m6Z4uS0VFm_6U6v6RQb_fvD0EzF9p3c8n5a6s_' // USDT master
    );
    
    const senderAddress = userContext?.user.walletAddress;
    const sendUSDT = async (amount:string) => {
        // Fetch sender's USDT jetton wallet
        const res = await fetch(
          `https://tonapi.io/v2/accounts/${senderAddress}/jetton-wallets?jetton=${USDT_MASTER}`
        );
        const data = await res.json();
        const senderJettonWallet = Address.parse(data.address);


        const transferPayload = beginCell()
          .storeUint(0xf8a7ea5, 32) // op code
          .storeUint(0, 64) // query id
          .storeCoins(toNano(amount))
          .storeAddress(Address.parse(contractAddress))
          .storeAddress(null)
          .storeUint(0, 1)
          .storeCoins(toNano('0.02'))
          .storeUint(0, 1)
          .endCell();

        await tonConnectUI?.tonConnectUI!.sendTransaction({
          validUntil: Math.floor(Date.now() / 1000) + 300,
          messages: [
            {
              address: senderJettonWallet.toString(),
              amount: toNano('0.05').toString(),
              payload: transferPayload.toBoc().toString('base64')
            }
          ]
        });
        }
      return {
        sendUSDT
      }
      
    }

    