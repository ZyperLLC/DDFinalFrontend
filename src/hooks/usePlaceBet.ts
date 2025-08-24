import { useContext } from "react";
import toast from "react-hot-toast";
import { UserContext } from "../Context/UserContextProvider";
import {Bet} from "../types";
import { placeBet, getLatestRound } from "../api/userApi";

export const usePlaceBet = ()=>{
    const context = useContext(UserContext);
    /**
     * Place a bet
     * @param betData Bet data to place
     */

    //betdata should contain the fields betId, amountBet, numberBettedOn,hasWon, amountWon, useTon, holdingNFT
    async function place(betData: Partial<Bet>) {
      if (!context?.user.telegramId) {
        toast.error("User not logged in");
        return;
      }
      try{
          const result = await placeBet(context.user.telegramId, betData);
          toast.success("Bet Placed Successfully");
          
          // Get the latest round to ensure we have the correct roundId
          const latestRound = await getLatestRound();
          const currentRoundId = latestRound?.bettingRoundNo || betData.betId || 1;
          
          // Update context with proper creditBets data
          const currentCreditBets = context?.user.creditBets;
          const newNumberOfBets = (currentCreditBets?.numberOfBets || 0) + 1;
          
          context?.setCreditBets({
            roundId: currentRoundId,
            numberOfBets: newNumberOfBets
          });
          
          console.log("Bet Result:", result);
          console.log("Updated creditBets:", { roundId: currentRoundId, numberOfBets: newNumberOfBets });
      }catch(err){
        toast.error("Error Occured");
        console.log(err);
      }
    }
    return {
      place
    }
}