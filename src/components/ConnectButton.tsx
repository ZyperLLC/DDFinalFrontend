import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { UserContext } from '../Context/UserContextProvider';
import { useTonConnectUiContext } from '../Context/TonConnectUiContext';
import { retrieveLaunchParams  } from '@telegram-apps/sdk'
import { User } from '../types';
import { useUser } from '../hooks/useUser';
import { useGetCredits } from '../hooks/useGetCredits';

export const ConnectButton = ()=>{
    const {tgWebAppData} = retrieveLaunchParams();

    const {tonConnectUI:tonConnectUiInstance} = useTonConnectUiContext();
    const context = useContext(UserContext);
    
    const [address,setAddress] = useState<string|null>(tonConnectUiInstance?.account?.address ?? null);

    const {register,fetchUser,error} = useUser();
    const {fetchNFTs} = useGetCredits();

    const fetchDolphinCredits = async (address:string) => {
        let finfatherNft = 0;
        let hasFinFather = false;
      if (address) {
        const nfts = await fetchNFTs(address);
        if(nfts.length<=0){
            return {hasNft:false,hasFinFather:false};
        }else{
            for (const nft of nfts) {
                if(nft.metadata?.name?.toLowerCase().includes("finfather")){
                    hasFinFather = true;
                    finfatherNft++;
                }
                
            }
            return {hasNft:true,hasFinFather,finfatherNft,totalNfts:nfts.length-finfatherNft};
        }
      }
    }

    const checkRegisteredUser = async (address:string)=>{
        //if addess is empty return
        if(!address || address.trim() === ""){
            return;
        }else{
            try{
                let creditBalance=0;
                let hasNft = false;
                if(tgWebAppData?.user?.id && tgWebAppData.user?.username){
                    
                    //if address is not empty , check if user is registered                    
                    const userData = await fetchUser(tgWebAppData?.user?.id.toString());

                    if(userData!=undefined){
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
                            hasNft = true;
                        }
                        const newUser: Partial<User> = {
                            telegramId: tgWebAppData?.user?.id.toString(),
                            walletAddress: address,
                            username: tgWebAppData?.user?.username,
                            creditBalance: creditBalance ?? 0,
                        };
                        await register(newUser);
                        
                        toast.success("User Registered Successfully");
                    }
                    context?.setTelegramId(tgWebAppData?.user?.id.toString());
                    context?.setWalletAddress(address);
                    context?.setTonBalance(userData?.tonBalance ?? BigInt(0)); 
                    context?.setCreditBalance(userData?.creditBalance ?? creditBalance); 
                    context?.setHoldingNFTs(hasNft);
                }
            }catch{
                console.log("Error fetching user data");
                console.error(error);
                toast.error("Failed to fetch user data");
            }
        }
    }

    useEffect(()=>{
        if(tonConnectUiInstance){
        const unsubscribe = tonConnectUiInstance?.onStatusChange(async (wallet)=>{
            try{
                if(wallet){
                setAddress(wallet?.account.address);
                toast.success("Wallet Connected Successfully");
                checkRegisteredUser(wallet?.account.address);
                }   
        }catch(err){
            console.log(err);
            toast.error("Some Error Occured!");
        }         
        })
        checkRegisteredUser(tonConnectUiInstance?.account?.address??"");
        return ()=>{
            unsubscribe();
        }
    }
    },[tonConnectUiInstance]);

    
  
    const openModal = async ()=>{
        if(tonConnectUiInstance){
            await tonConnectUiInstance.openModal();
        }else{
            toast.error("Failed to open modal");
        }
    }

    const disconnectModal = async ()=>{
        if(tonConnectUiInstance){
            await tonConnectUiInstance.disconnect();
            toast.success("Wallet Disconnected");
            setAddress(null);
            context?.resetUser();
        }
    }

    return(
        <div>
            {!address ? 
                <button className="connect-wallet-button" onClick={openModal}>
                    {tonConnectUiInstance?"Connect Wallet":"Loading..."}
                </button>
                :
                <button className="connect-wallet-button" onClick={disconnectModal}>
                    {address.substring(2,6).toUpperCase()}...{address.substring(address.length-10).toUpperCase()}
                </button>
            }
        </div>
    )
}
