// ✅ Represents a bet placed by a user
export interface Bet {
    betId: number;
    amountBet: number;
    numberBettedOn: number;
    hasWon: boolean;
    amountWon: number;
    useTon: boolean;
    holdingNFT: boolean;
  }
  
  // ✅ Represents an NFT staked by a user
  export interface StakedNFT {
    nftAddress: string;
    stakedAt: string;
  }
  
  // ✅ Represents an enriched NFT object (optional fields for frontend display)
  export interface NFT {
    nftAddress: string;
    nftName?: string;         // Optional name for display
    image?: string;        // Optional image URL for UI
    stakedAt?: string;     // Optional if it's a staked NFT
    remainingTime: string;
    earn: string;
  }
  
  
  // ✅ Represents a user object in the system
  export interface User {
    _id?: string;
    username: string;
    telegramId: string;
    walletAddress: string;
    tonBalance: number;
    creditBalance: number;
    betsPlace: Bet[];
    stakedNFTs: StakedNFT[];
    friends: string[];
  }