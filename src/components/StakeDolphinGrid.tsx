import { useContext, useEffect, useState } from 'react';
import { useGetCredits } from '../hooks/useGetCredits';
import { UserContext } from '../Context/UserContextProvider';
import { useTranslation } from 'react-i18next';

export default function StakeDolphinGrid(
  { setSelectedDolphin }: { setSelectedDolphin: (dolphin: any | null) => void }
) {
  const { t } = useTranslation();
  const context = useContext(UserContext);
  const [nfts, setNfts] = useState<any[]>([]);

  const { fetchNFTsOfBothCollections } = useGetCredits();

  useEffect(() => {
    const fetchDolphinNFTs = async () => {
      if (context?.user.walletAddress) {
        const nfts = await fetchNFTsOfBothCollections(context.user.walletAddress);
        console.log("Fetched NFTs:", nfts);
        setNfts(nfts ?? []);
      }
    };
    fetchDolphinNFTs();
  }, [context?.user.walletAddress]);

  return (
    <div className="staking-grid-card w-full mx-auto flex-grow mb-8">
      <h2 className="card-title font-semibold text-lg sm:text-xl mb-6 text-white text-center">
        {t('stakeGrid.title')}
      </h2>

      {nfts.length > 0 ? (
        <div className="nft-container">
          {nfts.map((nft, index) => (
            <div
              key={index}
              onClick={() =>
                setSelectedDolphin({
                  contractAddress: nft.address,
                  image: nft.metadata?.image,
                  name: nft.metadata?.name,
                  description: nft.metadata?.description,
                })
              }
              className="cursor-pointer rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform duration-300 bg-white bg-opacity-10 w-full"
            >
              <img
                src={nft.metadata?.image}
                alt={nft.metadata?.name || `NFT ${index + 1}`}
                className="w-full rounded-xl object-cover h-28"
              />
              
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center" style={{ color:'white' }}>No Dolphin Dash NFTs are present.</p>
      )}
    </div>
  );
}
