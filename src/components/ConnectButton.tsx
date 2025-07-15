import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { UserContext } from '../Context/UserContextProvider';
import { useTonConnectUiContext } from '../Context/TonConnectUiContext';
import { retrieveLaunchParams } from '@telegram-apps/sdk';
import { Bet, User } from '../types';
import { useUser } from '../hooks/useUser';
import { useGetCredits } from '../hooks/useGetCredits';
import { addFriend } from '../api/userApi';
import { Address } from '@ton/ton';
import { toUserFriendlyAddress } from '@tonconnect/sdk';

type ConnectButtonProps = {
  whiteBg?: boolean;
};

export const ConnectButton = ({ whiteBg = false }: ConnectButtonProps) => {
  const { t } = useTranslation();
    const {tgWebAppData,tgWebAppStartParam} = retrieveLaunchParams();

  const { tonConnectUI: tonConnectUiInstance } = useTonConnectUiContext();
  const context = useContext(UserContext);

  const [address, setAddress] = useState<string | null>(
    tonConnectUiInstance?.account?.address ?? null
  );

  const { register, fetchUser, error } = useUser();
  const { fetchNFTs } = useGetCredits();

  const fetchDolphinCredits = async (address: string) => {
    let finfatherNft = 0;
    let hasFinFather = false;
    if (address) {
      const nfts = await fetchNFTs(address);
      if (nfts.length <= 0) return { hasNft: false, hasFinFather: false };
      for (const nft of nfts) {
        if (nft.metadata?.name?.toLowerCase().includes('finfather')) {
          hasFinFather = true;
          finfatherNft++;
        }
      }
      return {
        hasNft: true,
        hasFinFather,
        finfatherNft,
        totalNfts: nfts.length - finfatherNft,
      };
    }
  };

    const checkRegisteredUser = async (address:string)=>{
        //if addess is empty return
        if(!address || address.trim() === ""){
            console.log("Address is empty");
            return;
        }else{
            try{
                let creditBalance=0;
                if(tgWebAppData?.user?.id && tgWebAppData.user?.username){
                    
                    //if address is not empty , check if user is registered                    
                    const userData = await fetchUser(tgWebAppData?.user?.id.toString());
                    console.log("User Data:", userData);
                    if(userData!=undefined && userData!=null){
                        // if user is registered, fetch user data and set context
                        toast.success("Welcome Back " + userData?.username);
                    }else{
                        // if user is not registered, register user and set context
                        const nft = await fetchDolphinCredits(address);
                        if(nft?.hasNft){
                            if(nft?.hasFinFather){
                                creditBalance = (nft.finfatherNft ?? 1) * 18.51;
                            }
                            else{
                                creditBalance = (nft.totalNfts??1) * 4.5;
                            }
                             context?.setHoldingNFTs(true);
                        }else{
                            context?.setHoldingNFTs(false);
                        }
                        const newUser: Partial<User> = {
                            telegramId: tgWebAppData?.user?.id.toString(),
                            walletAddress: address,
                            username: tgWebAppData?.user?.username,
                            creditBalance: creditBalance ?? 0,
                        };
                        await register(newUser);
                        console.log("start param",tgWebAppStartParam);

                        if(tgWebAppStartParam!== undefined && tgWebAppStartParam !== null && tgWebAppStartParam !== ""){
                        await addFriend(tgWebAppStartParam.trim(),tgWebAppData?.user?.username ?? "");
                        }
                        toast.success("User Registered Successfully");
                    }
                    context?.setTelegramId(tgWebAppData?.user?.id.toString());
                    const bouncableAddress = toUserFriendlyAddress(address);
                    context?.setWalletAddress(bouncableAddress);
                    context?.setTonBalance(userData?.tonBalance ?? BigInt(0)); 
                    context?.setCreditBalance(userData?.creditBalance ?? creditBalance); 
                    context?.setFriends(userData?.friends);
                    context?.setBets(userData?.betsPlace?.sort((a:Bet, b:Bet) => b.betId - a.betId) ?? []);
                    context?.setStakedNfts(userData?.stakedNFTs ?? []);
                }
            }catch{
                console.log("Error fetching user data");
                console.error(error);
                toast.error("Failed to fetch user data");
            }
        }
     
  };

  useEffect(() => {
    if (tonConnectUiInstance) {
      const unsubscribe = tonConnectUiInstance.onStatusChange(async (wallet) => {
        try {
          if (wallet) {
            setAddress(wallet?.account.address);
            toast.success(t('wallet_connected'));
            checkRegisteredUser(wallet?.account.address);
          }
        } catch (err) {
          console.log(err);
          toast.error(t('error_occurred'));
        }
      });

      checkRegisteredUser(tonConnectUiInstance?.account?.address ?? '');
      return () => unsubscribe();
    }
  }, [tonConnectUiInstance]);

  const openModal = async () => {
    if (tonConnectUiInstance) {
      await tonConnectUiInstance.openModal();
    } else {
      toast.error(t('open_modal_failed'));
    }
  };

  const disconnectModal = async () => {
    if (tonConnectUiInstance) {
      await tonConnectUiInstance.disconnect();
      toast.success(t('wallet_disconnected'));
      setAddress(null);
      context?.resetUser();
    }
  };

  return (
    <div>
      {!address ? (
        <button
          className="block w-full mt-2 py-3 rounded-[12px] font-semibold connect-wallet-button"
          onClick={openModal}
        >
          {tonConnectUiInstance ? t('connect_wallet') : t('loading')}
        </button>
      ) : (
        <button
          className={`block w-full mt-2 py-3 rounded-[12px] font-semibold connect-wallet-button ${
            whiteBg ? 'bg-white text-blue-600 border border-blue-600' : ''
          }`}
          onClick={disconnectModal}
        >
          {address.substring(2, 6).toUpperCase()}...
          {address.substring(address.length - 10).toUpperCase()}
        </button>
      )}
    </div>
  );
};
