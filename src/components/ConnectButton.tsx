import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { UserContext } from '../Context/UserContextProvider';
import { useTonConnectUiContext } from '../Context/TonConnectUiContext';

export const ConnectButton = ()=>{
    const {tonConnectUI:tonConnectUiInstance} = useTonConnectUiContext();
    const context = useContext(UserContext);
    const [address,setAddress] = useState<string|null>(tonConnectUiInstance?.account?.address??null);
    
    useEffect(()=>{
        if(tonConnectUiInstance){
        const unsubscribe = tonConnectUiInstance?.onStatusChange(async (wallet)=>{
            try{
                if(wallet){
                setAddress(wallet?.account.address);
                toast.success("Wallet Connected Successfully");
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
