import { endRound, getAllUsers, getBettingRounds, startRound, stopRound } from "../api/userApi"
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
        const rounds = await getBettingRounds();
        const currentRoundId = rounds.length;
        const users = await getAllUsers();

        const endbetdata = await endRound(winningNumber);
        if(endbetdata){
            toast.success("Betting Round Ended");
            const startbetdata = await startRound();
            if(startbetdata){
                toast.success("New Round Started");
            }
        }else{
            toast.error("Error starting round");
            return;
        }
        

        const tonWinningBets = Dictionary.empty<bigint,Bet>();
        let index = 0;
        users.map((user:User)=>{
            if(user.betsPlace.length===0){
                return;
            }
            user.betsPlace.map((bet)=>{
                if(bet &&bet.betId==currentRoundId && bet.numberBettedOn==winningNumber && bet.amountBet>0){
                tonWinningBets.set(BigInt(index),{
                    $$type:'Bet',
                    player: Address.parse(user.walletAddress),
                    hasNFT:bet.holdingNFT,
                    amountBet:bet.useTon?BigInt(bet.amountBet):toNano(`${bet.amountBet}`)
                    })
                    console.log(user)
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
          toast.success("Prizes Distributed Successfully");
            setTimeout(async ()=>{
                await startNewRound();  
            },5000);
        }
      }catch(err){
        toast.error("Error Occured");
        console.log(err);
      }
      }
      
      async function startNewRound(){
        if (!tonConnectUI) {
            toast.error("Wallet not connected");
            return;
        } 
        try{
            const result = await tonConnectUI?.sendTransaction({
                validUntil:Math.floor(Date.now()/1000)+60,
                messages:[{
                    address:contractAddress,
                    amount:toNano('0.005').toString(),
                    payload:beginCell()
                    .storeUint(0,32)
                    .storeStringTail("startbet")
                    .endCell()
                    .toBoc()
                    .toString('base64')
                }]
            });
            if(result.boc){
                toast.success("StartRound transaction successful");
            }
        }catch(err){
            console.log(err);
        }
      }
    return {
        stopCurrentRound,
        endBettingRound
    }
}