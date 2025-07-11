import { beginCell, toNano } from "@ton/ton";
import { contractAddress } from "../constants";
import { useTonConnectUiContext } from "../Context/TonConnectUiContext"
import toast from "react-hot-toast";
import { depositAmount } from "../api/userApi";
import { useContext } from "react";
import { UserContext } from "../Context/UserContextProvider";

export const useDepositTon = ()=>{
    const {tonConnectUI} = useTonConnectUiContext();
    const context = useContext(UserContext);
    /**
     * Deposit Ton
     * @param amount Amount to deposit
     */
    async function depositTon(amount: number) {
      if (!tonConnectUI) {
        toast.error("Wallet not connected");
        return;
      }  
      if (amount <= 0) {
        toast.error("Amount must be greater than 0");
        return;
      }
      try{
          const result = await tonConnectUI?.sendTransaction({
          validUntil: Math.floor(Date.now() / 1000) + 60, // 1 minute from now
          messages: [
            {
              address: contractAddress,
              amount: toNano(`${(amount+0.005).toFixed(3)}`).toString(),
              payload: beginCell().storeUint(0, 32).storeStringTail('depositton').endCell().toBoc().toString('base64'),
            },
          ],
        });
        toast.success("Transaction Successful");
        if(result.boc){
          const result = await depositAmount(amount.toString(), true, Number(context?.user.telegramId) || 0);
          console.log("Deposit Result:", result);
          toast.success("Deposit Successful");
        }
      }catch(err){
        toast.error("Error Occured");
        console.log(err);
      }
      }
      return {
        depositTon
      }
}