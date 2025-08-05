import { motion } from "framer-motion";

const MostPopularBadge = () => {
  return (
    <div className="relative inline-block rounded-full p-[2px]">
      <motion.div
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: "200% 50%" }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="absolute inset-0 rounded-full
          bg-[linear-gradient(to_right,#F87AFF,#FB93D0,#FFDD99,#C3F0B2,#2FDBFE,#F87AFF)]
          bg-[length:200%_200%] animate-gradient z-[-1]"
      />
      <span className="relative px-4 py-1 text-sm font-semibold text-white bg-black rounded-full">
        Most Popular
      </span>
    </div>
  );
};

export default MostPopularBadge;
