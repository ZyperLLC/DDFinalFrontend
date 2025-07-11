import { createContext, useState, ReactNode } from "react";

type User = {
  telegramId?: string | null;
  walletAddress?: string | null;
  tonBalance?: bigint | null;
  creditBalance?: number | null;
};

type UserContextType = {
  user: User;
  setTelegramId: (telegramId: string | null) => void;
  setWalletAddress: (walletAddress: string | null) => void;
  resetUser: () => void;
  setTonBalance: (tonBalance: bigint | null) => void;
  setCreditBalance: (creditBalance: number | null) => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({
    telegramId: null,
    walletAddress: null,
    tonBalance: null,
    creditBalance: null,
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

  const resetUser = () => {
    setUser({
      telegramId: null,
      walletAddress: null,
      tonBalance: null,
      creditBalance: null,
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};


