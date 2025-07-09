import { Address, OpenedContract, TonClient } from "@ton/ton";
import { useTonConnectUiContext } from "../Context/TonConnectUiContext"
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { useEffect, useState} from "react";
import { BetGame } from "../contracts/BetGame/BetGame_BetGame";
import { contractAddress } from "../constants";

let client: TonClient|null = null;
let contract: BetGame|null = null;
let contractInstance:OpenedContract<BetGame>|null = null;

export const useReadBalance = ()=>{
    const {tonConnectUI} = useTonConnectUiContext();
    const [data,setData] = useState<bigint|null>(null);

    useEffect(()=>{
        async function initializeClient(){
            if(tonConnectUI){
                client = new TonClient({
                    endpoint:await getHttpEndpoint({network:"testnet"})
                })

                contract = new BetGame(
                    Address.parse(contractAddress)
                )
                contractInstance =  client.open(contract) as OpenedContract<BetGame>;
            }
        }
        initializeClient(); 
    },[tonConnectUI])

   useEffect(() => {
        async function getBalance(){
            if (contractInstance) {
                const balance = await contractInstance.getContractBalance();
                setData(balance??0n);
            }
        }
        getBalance();
    }, [contractInstance]);

    return{
        data
    }

}