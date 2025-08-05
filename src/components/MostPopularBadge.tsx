import { motion } from "framer-motion";

const MostPopularBadge = () => {
  return (
    <motion.div
      initial={{ backgroundPosition: "0% 50%" }}
      animate={{ backgroundPosition: "200% 50%" }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
      }}
      className="inline-block p-[2px] rounded-full
        bg-[linear-gradient(to_right,#2a2a2a,#3a3a3a,#1e1e1e,#2a2a2a)]
        bg-[length:200%_200%] relative"
    >
      <div className="rounded-full bg-black/20 px-4 py-1 text-sm font-bold text-white">
        Most Popular
      </div>
    </motion.div>
  );
};

export default MostPopularBadge;
