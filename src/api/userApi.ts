import axios from 'axios';
import type { User, Bet, NFT } from '../types';
import { BASE_URL } from '../constants';
/**
 * Register a new user
 */
export const registerUser = async (userData: Partial<User>) => {
  const res = await axios.post(`${BASE_URL}/api/users/register`, userData);
  return res.data.user;
};
/**
 * Deposit Ton
 */
export const depositAmount = async (amount: string,isTon:boolean,tgId:number) => {
  const res = await axios.post(`${BASE_URL}/api/users/deposit/${tgId}`, { amount, isTon });
  return res.data;
};

/**
 * Place a bet
 */
export const placeBet = async (telegramId: string, betData: Partial<Bet>) => {
  const res = await axios.post(`${BASE_URL}/api/users/placebet/${telegramId}`, betData);
  return res.data.user;
};

/**
 * Stake an NFT
 */
export const stakeNFT = async (telegramId: string, nftAddress: string) => {
  const res = await axios.post<{ user: User }>(`${BASE_URL}/api/users/stakenft/${telegramId}`, { nftAddress });
  return res.data.user;
};

/**
 * Send an invite code
 */
export const sendInvite = async (telegramId: string, inviteCode: string) => {
  const res = await axios.post<{ user: User }>(`${BASE_URL}/api/users/invite/${telegramId}`, { inviteCode });
  return res.data.user;
};

/**
 * Fetch user by Telegram ID
 */
export const getUser = async (telegramId: string) => {
  const res = await axios.get(`${BASE_URL}/api/users/getuser/${telegramId}`);
  return res.data;
};

/**
 * Get all bets by a user
 */
export const getGameHistory = async (telegramId: string): Promise<Bet[]> => {
  const res = await axios.get<{ bets: Bet[] }>(`${BASE_URL}/api/users/getbetsbyuser/${telegramId}`);
  return res.data.bets;
};

/**
 * Get all staked NFTs by a user
 */
export const getStakedNFTs = async (telegramId: string): Promise<NFT[]> => {
  const res = await axios.get<{ nfts: NFT[] }>(`${BASE_URL}/api/users/getstakednfts/${telegramId}`);
  return res.data.nfts;
};

/**
 * Get all bettingrounds
 */

export const getBettingRounds = async () => {
  const res = await axios.get<{ bettingRounds: Bet[] }>(`${BASE_URL}/api/bets`);
  return res.data;
}