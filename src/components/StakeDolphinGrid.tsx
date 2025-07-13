import { useContext, useEffect, useState } from 'react';
import { useGetCredits } from '../hooks/useGetCredits';
import { UserContext } from '../Context/UserContextProvider';

export default function StakeDolphinGrid() {
  const context = useContext(UserContext);
  const [nfts,setNfts] = useState<any[]>([])

  const {fetchNFTs} = useGetCredits();
  
  useEffect(()=>{
    const fetchDolphinNFTs = async () => {
      if (context?.user.walletAddress) {
        const nfts = await fetchNFTs(context.user.walletAddress);
        console.log("Fetched NFTs:", nfts);
        setNfts(nfts??[]);
      }
    };
    fetchDolphinNFTs();
  },[context?.user.walletAddress]);

  return (
    <>
      <div className="staking-grid-card w-full max-w-4xl mx-auto flex-grow mb-4">
        <h2 className="card-title font-semibold text-lg sm:text-xl mb-8">
          Available for Staking
        </h2>

        <div className="dolphin-grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {nfts.length > 0 ? nfts.map((nft, index) => (
            <img
              key={index}
              src={nft.metadata?.image} 
              alt={nft.metadata}
              className="dolphin"
            />
          )) :
          <span>No Dolphin Dash NFTs are present </span>}
        </div>
      </div>
    </>
  );
}
