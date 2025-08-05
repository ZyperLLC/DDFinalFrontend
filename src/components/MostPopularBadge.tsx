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
      className="rounded-full px-4 py-1 text-sm font-semibold
        bg-[linear-gradient(to_right,#F87AFF,#FB93D0,#FFDD99,#C3F0B2,#2FDBFE,#F87AFF,#FB93D0,#FFDD99,#C3F0B2,#2FDBFE)]
        bg-[length:200%] text-white border-2 border-transparent
        [background-clip:border-box] [mask-image:_linear-gradient(#fff_0_0)]
        shadow-md inline-block"
    >
      <span
        className="bg-black px-3 py-0.5 rounded-full text-transparent
        bg-clip-text bg-[linear-gradient(to_right,#F87AFF,#FB93D0,#FFDD99,#C3F0B2,#2FDBFE)]
        [background-size:200%] [-webkit-background-clip:text]"
      >
        Most Popular
      </span>
    </motion.div>
  );
};

export default MostPopularBadge;
