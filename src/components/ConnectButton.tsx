import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { UserContext } from '../Context/UserContextProvider';
import { useTonConnectUiContext } from '../Context/TonConnectUiContext';
import { retrieveLaunchParams  } from '@telegram-apps/sdk'
import { User } from '../types';
import { useUser } from '../hooks/useUser';
import { useGetCredits } from '../hooks/useGetCredits';

interface NFTDetails{
    hasNft:boolean;
    hasFinFather:boolean;
}
export const ConnectButton = ()=>{
    const {tgWebAppData} = retrieveLaunchParams();

    const {tonConnectUI:tonConnectUiInstance} = useTonConnectUiContext();
    const context = useContext(UserContext);
    
    const [address,setAddress] = useState<string|null>(tonConnectUiInstance?.account?.address ?? null);
    const [nftDetails,setNftDetails] = useState<NFTDetails | null>(null);

    const {register,fetchUser,error} = useUser();
    const {fetchNFTs} = useGetCredits();

    const checkRegisteredUser = async (address:string)=>{
        if(!address){
            try{
                let creditBalance;
                if(tgWebAppData?.user?.id && tgWebAppData.user?.username){
                    const userData = await fetchUser(tgWebAppData?.user?.id.toString());
                    console.log("Fetched User Data:",userData);

                    if(userData){
                        console.log("User already registered:",userData);
                        toast.success("Welcome Back " + userData?.username);
                    }else{
                        fetchDolphinCredits();
                        if(nftDetails?.hasNft){
                            if(nftDetails?.hasFinFather){
                                creditBalance = 18.51;
                            }
                            else{
                                creditBalance = 4.5;
                            }
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
                }
            }catch{
                console.log(error);
                toast.error("Failed to fetch user data");
            }
        }else{
            const userData = await fetchUser(tgWebAppData?.user?.id.toString()??"");
            console.log("Fetched User Data:",userData);
            
            context?.setTelegramId(tgWebAppData?.user?.id.toString() ?? "");
            context?.setWalletAddress(address);
            context?.setTonBalance(userData?.tonBalance ?? BigInt(0)); 
            context?.setCreditBalance(userData?.creditBalance ?? 0); 
            
            toast.success("Welcome Back " + userData?.username);
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

    const fetchDolphinCredits = async () => {
      if (context?.user.walletAddress) {
        const nfts = await fetchNFTs(context.user.walletAddress);
        if(nfts.length<=0){
            return;
        }else{
            for (const nft of nfts) {
                if(nft.metadata?.name?.toLowerCase().includes("finfather")){
                    setNftDetails({hasNft:true,hasFinFather:true});
                    return;
                }
                
            }
            setNftDetails({hasNft:true,hasFinFather:false});
            return;
        }
      }
    }
  
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
