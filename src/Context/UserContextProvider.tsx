import { createContext, useState, ReactNode } from "react";

type User = {
  telegramId?: string | null;
  walletAddress?: string | null;
};

type UserContextType = {
  user: User;
  setTelegramId: (telegramId: string | null) => void;
  setWalletAddress: (walletAddress: string | null) => void;
  resetUser: () => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({
    telegramId: null,
    walletAddress: null,
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

  const resetUser = () => {
    setUser({
      telegramId: null,
      walletAddress: null,
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setTelegramId,
        setWalletAddress,
        resetUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};


