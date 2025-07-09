import axios from 'axios';
import type { User, Bet, NFT } from '../types';
import { BASE_URL } from '../constants';
/**
 * Register a new user
 */
export const registerUser = async (userData: Partial<User>) => {
  const res = await axios.post<{ user: User }>(`${BASE_URL}/user/register`, userData);
  return res.data.user;
};

/**
 * Place a bet
 */
export const placeBet = async (telegramId: string, betData: Partial<Bet>) => {
  const res = await axios.post<{ user: User }>(`${BASE_URL}/user/placebet/${telegramId}`, betData);
  return res.data.user;
};

/**
 * Stake an NFT
 */
export const stakeNFT = async (telegramId: string, nftAddress: string) => {
  const res = await axios.post<{ user: User }>(`${BASE_URL}/user/stakenft/${telegramId}`, { nftAddress });
  return res.data.user;
};

/**
 * Send an invite code
 */
export const sendInvite = async (telegramId: string, inviteCode: string) => {
  const res = await axios.post<{ user: User }>(`${BASE_URL}/user/invite/${telegramId}`, { inviteCode });
  return res.data.user;
};

/**
 * Fetch user by Telegram ID
 */
export const getUser = async (telegramId: string) => {
  const res = await axios.get<{ user: User }>(`${BASE_URL}/user/getuser/${telegramId}`);
  return res.data.user;
};

/**
 * Get all bets by a user
 */
export const getGameHistory = async (telegramId: string): Promise<Bet[]> => {
  const res = await axios.get<{ bets: Bet[] }>(`${BASE_URL}/user/getbetsbyuser/${telegramId}`);
  return res.data.bets;
};

/**
 * Get all staked NFTs by a user
 */
export const getStakedNFTs = async (telegramId: string): Promise<NFT[]> => {
  const res = await axios.get<{ nfts: NFT[] }>(`${BASE_URL}/user/getstakednfts/${telegramId}`);
  return res.data.nfts;
};