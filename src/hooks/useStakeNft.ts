import { Address, beginCell, toNano } from "@ton/ton";
import { useTonConnectUiContext } from "../Context/TonConnectUiContext"
import toast from "react-hot-toast";
import { storeTransfer } from "../contracts/NFTItem/NFTItem_NFTItem";
import { stakeNFT } from "../api/userApi";
import { UserContext } from "../Context/UserContextProvider";
import { useContext } from "react";

export const useStakeNft = ()=>{
    const {tonConnectUI} = useTonConnectUiContext();
    const context = useContext(UserContext);
    /**
     * Deposit Ton
     * @param amount Amount to deposit
     */
   async function stakeNft(
  contractAddress: string,
  newOwner: string,
) {
  if (!tonConnectUI) {
    toast.error("Wallet not connected");
    return;
  }  
  try {
    const transferPayload = beginCell()
      .store(storeTransfer({
        query_id: 0n,
        $$type: 'Transfer',
        new_owner: Address.parse(newOwner), // Address of the new owner
        response_destination: Address.parse(newOwner), // Address to receive callbacks
        forward_amount: 0n, // Amount to forward with transfer
        forward_payload: beginCell().storeUint(0,32).endCell().asSlice(), // Additional payload data 
        custom_payload:null // Custom payload, can be adjusted as needed
      }))
      .endCell()
      .toBoc()
      .toString('base64');

    const result = await tonConnectUI?.sendTransaction({
      validUntil: Math.floor(Date.now() / 1000) + 60,
      messages: [
        {
          address:contractAddress,
          amount: toNano("0.01").toString(),
          payload: transferPayload
        },
      ],
    });
        if(result.boc){
            const stakeResult = await stakeNFT(context?.user.telegramId || '', contractAddress);
            console.log(stakeResult);
            toast.success("Stake NFT Successful");
        }
      }catch(err){
        toast.error("Error Occured");
        console.log(err);
      }
      }
      return {
        stakeNft
      }
}