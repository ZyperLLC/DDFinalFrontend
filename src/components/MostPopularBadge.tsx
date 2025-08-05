import { motion } from "framer-motion";

const MostPopularBadge = () => {
  return (
    <motion.div
      initial={{ backgroundPosition: "0% 50%" }}
      animate={{ backgroundPosition: "200% 50%" }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
      }}
      className="inline-block p-[2px] rounded-full
        bg-[linear-gradient(to_right,#F87AFF,#FB93D0,#FFDD99,#C3F0B2,#2FDBFE,#F87AFF)]
        bg-[length:200%_200%] relative"
    >
      <div className="rounded-full bg-black px-4 py-1 text-sm font-semibold text-white">
        Most Popular
      </div>
    </motion.div>
  );
};

export default MostPopularBadge;
