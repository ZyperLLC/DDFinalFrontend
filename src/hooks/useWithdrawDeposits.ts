import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { UserContext } from "../Context/UserContextProvider";
import toast from "react-hot-toast";
import { withdrawFunds } from '../api/userApi';
import { useTonConnectUiContext } from "../Context/TonConnectUiContext";
import { storeUserWithdrawal } from '../contracts/BetGame/BetGame_BetGame';
import { beginCell, toNano } from "@ton/ton";
import { contractAddress } from "../constants";

export const useWithdrawDeposits = () => {
  const { t } = useTranslation();
  const context = useContext(UserContext);
  const { user } = context || {};
  const { walletAddress } = user || {};
    const {tonConnectUI} = useTonConnectUiContext();

    const withdraw = async (amount: number) => {
    if (!walletAddress) {
      toast.error(t('withdraw.error.noWallet'));
      return;
    }


    try {
        const UserWithdrawalPaylod = beginCell()
        .store(storeUserWithdrawal({
            $$type: 'UserWithdrawal',
            amount: toNano(amount.toString()), 
        }))
        .endCell()
        .toBoc()
        .toString('base64');

        const transaction = await tonConnectUI?.sendTransaction({
            validUntil: Math.floor(Date.now() / 1000) + 60,
            messages: [
                {
                address: contractAddress,
                amount: toNano("0.01").toString(),
                payload: UserWithdrawalPaylod
                },
            ],
        });
        if(transaction?.boc){
            const response = await withdrawFunds(user?.telegramId??'', amount);
            console.log(response);
            toast.success(t('withdraw.success', { amount }));
        }
    } catch (error) {
      console.error('Withdraw error:', error);
      toast.error(t('withdraw.error.generic'));
    }
  };

  return { withdraw };
}