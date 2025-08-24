import { createContext, useState, ReactNode } from "react";
import { Bet, StakedNFT } from "../types";

type creditBets = {
  roundId:number|null,
  numberOfBets:number | null
}
type User = {
  telegramId?: string | null;
  walletAddress?: string | null;
  tonBalance?: number | null;
  creditBets?:creditBets|null;
  creditBalance?: number | null;
  holdingNFTs?:boolean|null;
  friends?: string[]; // Optional field for friends list
  bets?: Bet[]; // Optional field for bets
  stakedNfts?: StakedNFT[]; // Optional field for staked NFTs
};

type UserContextType = {
  user: User;
  setTelegramId: (telegramId: string | null) => void;
  setWalletAddress: (walletAddress: string | null) => void;
  resetUser: () => void;
  setTonBalance: (tonBalance: number | null) => void;
  setCreditBets: (creditBets: creditBets | null) => void;
  setCreditBalance: (creditBalance: number | null) => void;
  setHoldingNFTs: (holdingNFTs: boolean | null) => void;
  setFriends: (friends: string[]) => void; // Optional setter for friends list
  setBets: (bets: Bet[]) => void; // Optional setter for bets
  setStakedNfts: (stakedNfts: StakedNFT[]) => void; // Optional setter for staked NFTs
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({
    telegramId: null,
    walletAddress: null,
    tonBalance: null,
    creditBets:{roundId:null,numberOfBets:null},
    creditBalance: null,
    holdingNFTs: null,
    friends: [],
    bets: [], // Initialize with an empty array
    stakedNfts:[]
  });

  const setTelegramId = (telegramId: string | null) => {
    setUser((prev) => ({
      ...prev,
      telegramId,
    }));
  };

  const setWalletAddress = (walletAddress: string | null) => {
    setUser((prev) => ({
      ...prev,
      walletAddress,
    }));
  };
  const setTonBalance = (tonBalance: number | null) => {
    setUser((prev) => ({
      ...prev,
      tonBalance,
    }));
  };
  const setCreditBets = (creditBets: creditBets | null) => {
    setUser((prev) => ({
      ...prev,
      creditBets,
    }));
  };
  const setCreditBalance = (creditBalance: number | null) => {
    setUser((prev) => ({
      ...prev,
      creditBalance,
    }));
  };
  const setHoldingNFTs = (holdingNFTs: boolean | null) => {
    setUser((prev) => ({
      ...prev,
      holdingNFTs
    }));
  };
  const setFriends = (friends: string[]) => {
    setUser((prev) => ({
      ...prev,
      friends,
    }));
  };
  const setBets = (bets: Bet[]) => {
    setUser((prev) => ({
      ...prev,
      bets,
    }));
  };
  const setStakedNfts = (stakedNfts: StakedNFT[]) => {
    setUser((prev) => ({
      ...prev,
      stakedNfts,
    }));
  };
  const resetUser = () => {
    setUser({
      telegramId: null,
      walletAddress: null,
      tonBalance: null,
      creditBets:{roundId:null,numberOfBets:null},
      creditBalance: null,
      holdingNFTs: null,
      friends: [],
      bets: [], // Reset bets to an empty array
      stakedNfts: [] // Reset staked NFTs to an empty array
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setTelegramId,
        setWalletAddress,
        resetUser,
        setTonBalance,
        setCreditBets,
        setCreditBalance,
        setHoldingNFTs,
        setFriends,
        setBets,
        setStakedNfts
      }}
    >
      {children}
    </UserContext.Provider>
  );
};


