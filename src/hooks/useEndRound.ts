import { stopRound } from "../api/userApi"
import toast from "react-hot-toast";

export const useEndRound = ()=>{
    async function stopCurrentRound(){
        try{
            const res = await stopRound();
            console.log(res);
            if(res){
                toast.success('Current Betting Round Stopped');
            }
        }catch(err){
            console.log(err);
            toast.error('Some Error Occured');
        }
    };


    return {
        stopCurrentRound
    }
}