import { useContext } from "react";
import toast from "react-hot-toast";
import { UserContext } from "../Context/UserContextProvider";
import {Bet} from "../types";
import { placeBet } from "../api/userApi";

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
          console.log("Bet Result:", result);
      }catch(err){
        toast.error("Error Occured");
        console.log(err);
      }
    }
    return {
      place
    }
}