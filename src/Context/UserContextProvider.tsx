import { createContext, useState, ReactNode } from "react";
import { Bet } from "../types";

type User = {
  telegramId?: string | null;
  walletAddress?: string | null;
  tonBalance?: bigint | null;
  creditBalance?: number | null;
  holdingNFTs?:boolean|null;
  friends?: string[]; // Optional field for friends list
  bets?: Bet[]; // Optional field for bets
};

type UserContextType = {
  user: User;
  setTelegramId: (telegramId: string | null) => void;
  setWalletAddress: (walletAddress: string | null) => void;
  resetUser: () => void;
  setTonBalance: (tonBalance: bigint | null) => void;
  setCreditBalance: (creditBalance: number | null) => void;
  setHoldingNFTs: (holdingNFTs: boolean | null) => void;
  setFriends: (friends: string[]) => void; // Optional setter for friends list
  setBets: (bets: Bet[]) => void; // Optional setter for bets
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({
    telegramId: null,
    walletAddress: null,
    tonBalance: null,
    creditBalance: null,
    holdingNFTs: null,
    friends: [],
    bets: [], // Initialize with an empty array
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
  const setTonBalance = (tonBalance: bigint | null) => {
    setUser((prev) => ({
      ...prev,
      tonBalance,
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
  const resetUser = () => {
    setUser({
      telegramId: null,
      walletAddress: null,
      tonBalance: null,
      creditBalance: null,
      holdingNFTs: null,
      friends: [],
      bets: [], // Reset bets to an empty array
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
        setCreditBalance,
        setHoldingNFTs,
        setFriends,
        setBets,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};


