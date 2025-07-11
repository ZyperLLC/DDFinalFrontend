import axios from "axios";

export const useGetCredits = () => {
    async function fetchNFTs(walletAddress:string) {
  try {
    const response = await axios.get(`https://tonapi.io/v2/accounts/${walletAddress}/nfts?collection=0%3Af58ae2f4f750664bcc9476ab67376b20e2028facf7eb47ea7fef2bd5469a5e6d&limit=1000&offset=0&indirect_ownership=false`);
    if (!response.data) {
      throw new Error('Network response was not ok');
    }
    const data = await response.data;
    return data.nft_items;
  } catch (error) {
    console.error('Failed to fetch credits:', error);
    return null;
  }
}
return {
    fetchNFTs
};
}