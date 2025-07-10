import { beginCell, toNano } from "@ton/ton";
import { contractAddress } from "../constants";
import { useTonConnectUiContext } from "../Context/TonConnectUiContext"
import toast from "react-hot-toast";

export const useDepositTon = ()=>{
    const {tonConnectUI} = useTonConnectUiContext();

    async function depositTon(amount: number) {
        try{
          const result = await tonConnectUI?.sendTransaction({
          validUntil: Math.floor(Date.now() / 1000) + 60, // 1 minute from now
          messages: [
            {
              address: contractAddress,
              amount: toNano(`${amount+0.005}`).toString(),
              payload: beginCell().storeUint(0, 32).storeStringTail('depositton').endCell().toBoc().toString('base64'),
            },
          ],
        });
        toast.success("Transaction Successful");
        console.log('Transaction Successful');
        console.log(result);
      }catch(err){
        toast.error("Error Occured");
        console.log(err);
      }
      }
      return {
        depositTon
      }
}