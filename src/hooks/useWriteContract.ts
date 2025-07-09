import { toNano, beginCell,  Dictionary } from "@ton/core";
import {contractAddress}  from "../../../ZyperLLC/DolphinDashFrontend/src/config";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { storeEndBetting, Bet, storeWithdrawTon } from "../../../ZyperLLC/DolphinDashFrontend/src/contracts/BetGame/BetGame_BetGame";

export const useWriteContract = ()=>{
    const [tonConnectUI] = useTonConnectUI();

    async function depositTon(amount: number) {
        try{
          const result = await tonConnectUI.sendTransaction({
          validUntil: Math.floor(Date.now() / 1000) + 60, // 1 minute from now
          messages: [
            {
              address: contractAddress,
              amount: toNano(`${amount+0.005}`).toString(),
              payload: beginCell().storeUint(0, 32).storeStringTail('depositton').endCell().toBoc().toString('base64'),
            },
          ],
        });
        console.log('Transaction Successful');
        console.log(result);
      }catch{
        console.log('Error occured');
      }
      }

      async function startRound(){
        try{
          const result = await tonConnectUI.sendTransaction({
            validUntil:Math.floor(Date.now()/1000) + 60,
            messages:[
              {
                address:contractAddress,
                amount:toNano('0.05').toString(),
                payload:beginCell().storeUint(0,32).storeStringTail('startbet').endCell().toBoc().toString('base64')
              }
            ]
          });
          console.log('Transaction Successful');
          console.log(result);
        }catch{
          console.log('Error Occured');
        }
      }

      async function endRound(winningBets:Bet[]){
        const betDict = Dictionary.empty<bigint, Bet>();
        winningBets.forEach((bet, idx) => {
          betDict.set(BigInt(idx), { ...bet, $$type: 'Bet' });
        });
      
        // Add $$type: 'EndBetting' to match the contract ABI
        const payload =  beginCell()
        .store(storeEndBetting({ $$type: 'EndBetting', tonWinningBets: betDict }))
        .endCell()
        .toBoc()
        .toString('base64');
        
        try{
          const result = await tonConnectUI.sendTransaction({
            validUntil:Math.floor(Date.now()/1000)+60,
            messages:[
              {
                address: contractAddress,
                amount: toNano('0.05').toString(),
                payload
              }
            ]
          })
          console.log('Transaction Succesful');
          console.log(result);
        }catch(err){
          console.log('Error occured');
          console.log(err);
        }
      }

      async function withdraw(amountToWithdraw:number){
        const payload = beginCell()
         .store(storeWithdrawTon({$$type:"WithdrawTon",amount:toNano(amountToWithdraw)}))
         .endCell()
         .toBoc()
         .toString('base64');


         await tonConnectUI.sendTransaction(
          {
            validUntil:Math.floor(Date.now()/1000)+60,
            messages:[
              {
                address:contractAddress,
                amount:toNano('0.005').toString(),
                payload
              }
            ]
          }
         )
      }
      return {
          depositTon,
          startRound,
          endRound,
          withdraw
      }
}