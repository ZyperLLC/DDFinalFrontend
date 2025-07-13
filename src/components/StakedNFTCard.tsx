import { useEffect, useState } from 'react';
import { useGetCredits } from '../hooks/useGetCredits';

const StakedNFTCard = ({contractAddress}:{contractAddress:string}) => {
  const {fetchNftByAddress} = useGetCredits();
  const [nftData, setNftData] = useState<any>(null);
  console.log("Contract Address:", contractAddress);
  useEffect(() => {
    async function fetchNftData() {
      try {
        const data = await fetchNftByAddress(contractAddress);
        setNftData(data);
        console.log("Fetched NFT Data:", data);
      } catch (error) {
        console.error("Error fetching NFT data:", error);
      }
    }
    fetchNftData();
  }, [contractAddress]);
  return (
    <>
    {nftData ?
    <div className="nft-card">
      <img src={nftData.metadata.image} alt={nftData.metadata.name} className="nft-image" />
      <div className="nft-info text-left">
        <h3 className="nft-name">{nftData.metadata.name}</h3>
      </div>
    </div>:
    <></>
  }
  </>
  );
};

export default StakedNFTCard;
