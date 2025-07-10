import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { UserContext } from '../Context/UserContextProvider';
import { useTonConnectUiContext } from '../Context/TonConnectUiContext';
import { retrieveLaunchParams  } from '@telegram-apps/sdk'
import { User } from '../types';
import { useUser } from '../hooks/useUser';

export const ConnectButton = ()=>{
    const {tgWebAppData} = retrieveLaunchParams();
        
    const {tonConnectUI:tonConnectUiInstance} = useTonConnectUiContext();
    const context = useContext(UserContext);
    
    const [address,setAddress] = useState<string|null>(tonConnectUiInstance?.account?.address ?? null);
    const {register,fetchUser,error} = useUser();

    const checkRegisteredUser = async (address:string)=>{
        if(context){
            try{
                if(tgWebAppData?.user?.id && tgWebAppData.user?.username){
                    const userData = await fetchUser(tgWebAppData?.user?.id);
                    if(userData){
                        toast.success("Welcome Back " + userData?.username);
                    }else{
                        const newUser: Partial<User> = {
                            telegramId: tgWebAppData?.user?.id.toString(),
                            walletAddress: address,
                            username: tgWebAppData?.user?.username,
                        };
                        await register(newUser);
                        
                        toast.success("User Registered Successfully");
                    }
                    context.setTelegramId(tgWebAppData?.user?.id.toString());
                    context.setWalletAddress(address);
                    console.log("User Context Updated",context.user);
                }
            }catch{
                console.log(error);
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
