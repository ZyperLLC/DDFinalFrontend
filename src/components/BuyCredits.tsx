import { motion } from 'framer-motion';
import Button from './Button';
import MostPopularBadge from './MostPopularBadge';
import background1 from '../assets/background1.jpg';
import logo from '../assets/logo.jpg';
import { slideUpFade } from '../utils/animations';


const offers = [
  {
    name: 'Basic',
    price: '$4.99',
    multiplier: ' Make your credits 1.5x',
    bonus: 'Get a random Dolphin Dash NFT (2% APY)',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$9.99',
    multiplier: ' Make your credits 1.6x',
    bonus: 'Get a random Dolphin Dash NFT (10% APY)',
    popular: true,
  },
  {
    name: 'Elite',
    price: '$24.99',
    multiplier: ' Make your credits 2x',
    bonus: 'Get a random Dope Dolphin NFT (80% APY)',
    popular: false,
  },

];

export default function BuyCreditsComponent() {
  const handleBuyClick = async () => {
    alert("Redirecting to payment...");
  };

  return (
    <motion.div
      variants={slideUpFade}
      className="text-white py-10 px-4 overflow-hidden"
      style={{
        backgroundImage: `url(${background1})`,
        color: '#fff',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Logo */}
      <img
        src={logo}
        alt="Logo"
        className="animated-logo"
        style={{
          width: '250px',
          marginBottom: '3.5rem',
        }}
      />
      <h1 className="text-3xl font-bold text-center mb-8">Choose a Credit Pack</h1>

      <div className="flex justify-center flex-col items-center gap-6 max-w-md mx-auto">
        {offers.map((offer, idx) => (
          <motion.div
            key={idx}
            className={`
              section-box relative w-full rounded-xl p-6 shadow-lg border
              transition-transform transform hover:scale-105
              ${offer.popular ? 'border-[#f72585] border-2' : 'border-white border-2'}
            `}
          >
            {offer.popular && (
              <div className="absolute flex flex-wrap justify-start flex-col items-center top-0 right-0 -mt-3 mr-3 bg-yellow-400 text-black px-12 py-1 text-xs font-bold rounded-full shadow-md">
                <MostPopularBadge />
              </div>
            )}
            <div className="flex flex-col justify-center items-center text-center">
            <h2 className="text-xl font-semibold">{offer.name}</h2>
                 <div className="mb-2 min-h-[4.5rem] flex flex-col justify-start gap-2 text-left">
  <div className="mb-2 min-h-[4.5rem] flex flex-col gap-2 text-left">
  <p className="relative pl-6 text-md font-medium before:content-[''] before:absolute before:top-2 before:left-1.5 before:w-1.5 before:h-1.5 before:rounded-full before:bg-white">
    {offer.multiplier}
  </p>
  <p
    className={`relative pl-6 text-md font-medium before:content-[''] before:absolute before:top-2 before:left-1.5 before:w-1.5 before:h-1.5 before:rounded-full before:bg-white ${
      offer.name === 'Basic' ? 'invisible' : ''
    }`}
  >
    {offer.bonus}
  </p>
</div>

</div>



            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-6 mb-12 flex-col items-center">
              <Button text={offer.price} onClick={handleBuyClick} />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
