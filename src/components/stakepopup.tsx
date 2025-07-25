import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import background1 from '../assets/background1.jpg';
import toast from 'react-hot-toast';
import { useStakeNft } from '../hooks/useStakeNft';
import Button from './Button';
import { motion } from 'framer-motion';
import { slideUpFade } from '../utils/animations';

export default function StakePopup({
  selectedNft,
  onClose
}: {
  selectedNft:any;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const {stakeNft} = useStakeNft();
  console.log("Selected NFT in StakePopup:", selectedNft);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.maxWidth = '100vw';
    document.body.style.left = '0';
    document.body.style.right = '0';
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.maxWidth = '';
      document.body.style.left = '';
      document.body.style.right = '';
    };
  }, []);

  
  //Staking NFT address needs to be changed to the actual contract address
  const handleStakeNft = async () => {
     try{
      await stakeNft( selectedNft.contractAddress,import.meta.env.VITE_STAKING_CONTRACT_ADDRESS);
     }
      catch(err){
        console.error("Error staking NFT:", err);
        toast.error("Failed to stake NFT. Please try again.");
      }
  };
  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-center items-center" style={{ width: '100vw', maxWidth: '100vw', height: '100vh', padding: '1rem', overflow: 'hidden', boxSizing: 'border-box' }}>
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: -1,
          }}
        ></div>
         <motion.div
        className="popup-content"
        variants={slideUpFade}
        initial="hidden"
        animate="visible"
      >
        <div
          style={{
            width: '100%',
            maxWidth: '340px',
            borderRadius: '1rem',
            background: '#000',
            overflow: 'hidden',
            boxSizing: 'border-box',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          <button
            className="close-btn absolute right-2 top-2 z-10"
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}
            aria-label={t('popup.close')}
          >
            <X size={22} />
          </button>

          <div
            style={{
              backgroundImage: `url(${background1})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: 'white',
              filter: 'brightness(1.4)',
              padding: '4rem 1.5rem 2rem',
              overflowY: 'auto',
              flex: 1,
            }}
          >
            <img
              src={selectedNft.image}
              alt={selectedNft.name}
              style={{
                width: '100px',
                display: 'block',
                margin: '0 auto 1rem',
                borderRadius: '1rem',
              }}
            />
            <h2 className="text-xl font-bold text-center">{selectedNft.name}</h2>
            <p className="text-sm text-center mt-2" style={{ opacity: 0.9 }}>
              {selectedNft.description.slice(0, 150) + '...'}
            </p>

            <div className="mt-6 flex justify-center" style={{ width: '100%', maxWidth: '185px', margin: '1.5rem auto 0.5rem', padding: '0.5rem', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '8px', backdropFilter: 'blur(6px)', textAlign: 'center' }}>
              <span style={{ color: '#32CD32', fontWeight: 'bold', fontSize: '1rem' }}>
                {t('staking_popup.apy')}: {selectedNft.collectionName==="DOLPHIN DASH NFT COLLECTION"?"10%":"84%"}
              </span>
            </div>

            <div className="mt-3 flex justify-center">
              {/* <button
                className='stake-button'
                style={{
                  width: '100%',
                  maxWidth: '200px',
                  padding: '0.5rem',
                  background: 'linear-gradient(90deg, #f72585, #7209b7)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  
                }}
                onClick={handleStakeNft}
              >
                {t('staking_popup.stakeButton')}
              </button> */}
              <Button onClick={handleStakeNft} text={t('staking_popup.stakeButton')}/>
            </div>
          </div>
        </div>
        </motion.div>
      </div>
    </>
  );
}
