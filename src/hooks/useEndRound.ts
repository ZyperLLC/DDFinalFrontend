import { getAllUsers, stopRound } from "../api/userApi"
import toast from "react-hot-toast";
import { useTonConnectUiContext } from "../Context/TonConnectUiContext";
import { contractAddress } from "../constants";
import { Address, beginCell, Dictionary, toNano } from "@ton/ton";
import { Bet, storeEndBetting } from "../contracts/BetGame/BetGame_BetGame";
import { User } from "../types";

export const useEndRound = ()=>{
    const {tonConnectUI} = useTonConnectUiContext();

    async function stopCurrentRound(){
        try{
            const res = await stopRound();
            console.log(res);
            if(res){
                toast.success('Current Betting Round Stopped');
            }
        }catch(err){
            console.log(err);
            toast.error('Some Error Occured');
        }
    };

    async function endBettingRound(winningNumber:number){
        if (!tonConnectUI) {
            toast.error("Wallet not connected");
            return;
        }  
        const users = await getAllUsers();
        const tonWinningBets = Dictionary.empty<bigint,Bet>();
        let index = 0;
        users.map((user:User)=>{
            if(user.betsPlace.length===0){
                return;
            }
            user.betsPlace.map((bet)=>{
                if(bet && bet.numberBettedOn==winningNumber){
                tonWinningBets.set(BigInt(index),{
                    $$type:'Bet',
                    player: Address.parse(user.walletAddress),
                    hasNFT:bet.holdingNFT,
                    amountBet:toNano(`${bet.amountBet}`)
                    })
                }
                index++;
            })
        });
        console.log(tonWinningBets);

        try{
            const result = await tonConnectUI?.sendTransaction({
            validUntil: Math.floor(Date.now() / 1000) + 60, // 1 minute from now
            messages: [
                {
                address: contractAddress,
                amount: toNano('0.005').toString(),
                payload: beginCell()
                .store(storeEndBetting({
                    $$type:'EndBetting',
                    tonWinningBets
                }))
                .endCell()
                .toBoc()
                .toString('base64'),
                },
            ],
            });
        if(result.boc){
          console.log("Deposit Result:", result);
          toast.success("Deposit Successful");
        }
      }catch(err){
        toast.error("Error Occured");
        console.log(err);
      }
      }
    
    return {
        stopCurrentRound,
        endBettingRound
    }
}