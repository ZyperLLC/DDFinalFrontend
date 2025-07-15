import { useContext, useEffect, useState } from 'react';
import { useGetCredits } from '../hooks/useGetCredits';
import { UserContext } from '../Context/UserContextProvider'; 
import { useTranslation } from 'react-i18next';

export default function StakeDolphinGrid(
   {  setSelectedDolphin } : {
    setSelectedDolphin: (dolphin: any | null) => void;
  }
) {
  const { t } = useTranslation();
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
          {t('stakeGrid.title')}
        </h2>

          {nfts.length > 0 ? nfts.map((nft, index) => (
        <div className="dolphin-grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
            <img
              key={index}
              src={nft.metadata?.image} 
              alt={nft.metadata}
              className="dolphin"
              onClick={() => setSelectedDolphin({
                contractAddress: nft.address,
                image: nft.metadata?.image,
                name: nft.metadata?.name,
                description: nft.metadata?.description,
              })}
            />
        </div>
          )) :
          <p className='text-white ' style={{color:"white",textAlign:"center"}}>No Dolphin Dash NFTs are present </p>}
      </div>
    </>
  );
}
