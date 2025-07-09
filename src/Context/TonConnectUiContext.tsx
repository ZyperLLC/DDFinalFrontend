import { createContext, useContext, ReactNode,  } from "react";
import { TonConnectUI } from "@tonconnect/ui";

type TonConnectUiContextType = {
  tonConnectUI: TonConnectUI | null;
};

const TonConnectUiContext = createContext<TonConnectUiContextType | undefined>(undefined);
const tonConnectUI = new TonConnectUI({
    manifestUrl:import.meta.env.VITE_MANIFEST_JSON,
})
export const TonConnectUiProvider = ({ children }: { children: ReactNode }) => {

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
