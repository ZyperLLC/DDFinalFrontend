import { createContext, useContext, ReactNode, useMemo } from "react";
import { TonConnectUI } from "@tonconnect/ui";

type TonConnectUiContextType = {
  tonConnectUI: TonConnectUI;
};

const TonConnectUiContext = createContext<TonConnectUiContextType | undefined>(undefined);

interface TonConnectUiProviderProps {
  children: ReactNode;
  manifestUrl: string;
}

let tonConnectUIInstance: TonConnectUI | null = null;

export const TonConnectUiProvider = ({ children, manifestUrl }: TonConnectUiProviderProps) => {
  const tonConnectUI = useMemo(() => {
    if (!tonConnectUIInstance) {
      tonConnectUIInstance = new TonConnectUI({ manifestUrl });
    }
    return tonConnectUIInstance;
  }, [manifestUrl]);

  return (
    <TonConnectUiContext.Provider value={{ tonConnectUI }}>
      {children}
    </TonConnectUiContext.Provider>
  );
};

export const useTonConnectUiContext = () => {
  const context = useContext(TonConnectUiContext);
  if (!context) {
    throw new Error("useTonConnectUiContext must be used within a TonConnectUiProvider");
  }
  return context;
};
