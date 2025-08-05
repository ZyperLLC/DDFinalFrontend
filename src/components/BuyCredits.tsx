import { motion } from 'framer-motion';
import Button from './Button';
import MostPopularBadge from './MostPopularBadge';


const offers = [
  {
    name: 'Basic',
    price: '$4.99',
    multiplier: '1.5x',
    bonus: '',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$9.99',
    multiplier: '1.6x',
    bonus: 'Includes 1 NFT',
    popular: true,
  },
  {
    name: 'Elite',
    price: '$24.99',
    multiplier: '2x',
    bonus: 'Includes Dope Dolphin NFT',
    popular: false,
  },
  {
    name: 'Ultimate',
    price: '$49.99',
    multiplier: '3x',
    bonus: 'Includes Dope Dolphin NFT + Exclusive Benefits',
    popular: false,
  },
];

export default function BuyCreditsComponent() {
  const handleBuyClick = async () => {
    alert("Redirecting to payment...");
  };

  return (
    <div className="min-h-screen text-white py-10 px-4 overflow-hidden"
     style={{  color: '#fff' }}
    >
      <h1 className="text-3xl font-bold text-center mb-8">Choose a Credit Pack</h1>

      <div className="flex flex-col items-center gap-6 max-w-md mx-auto">
        {offers.map((offer, idx) => (
          <motion.div
            key={idx}
            className={ ` section-box relative w-full rounded-xl p-6 shadow-lg border transition-transform transform hover:scale-105

            }`}
          >
            {offer.popular && (
              <div className="absolute top-0 right-0 -mt-3 mr-3 bg-yellow-400 text-black px-3 py-1 text-xs font-bold rounded-full shadow-md">
                 <MostPopularBadge />
              </div>
            )}

            <h2 className="text-xl font-semibold mb-2">{offer.name} Pack</h2>
            <p className="text-lg mb-1">Price: <span className="font-bold">{offer.price}</span></p>
            <p className="text-md mb-1">Multiplier: <span className="font-semibold">{offer.multiplier}</span></p>
            {offer.bonus && (
              <p className="text-sm italic text-gray-300 mt-2">{offer.bonus}</p>
            )}

            <div className="mt-4 flex flex-wrap justify-center gap-6 mb-12 flex-col items-center">
              <Button text="Buy Now" onClick={handleBuyClick} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
