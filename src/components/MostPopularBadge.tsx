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
        bg-[linear-gradient(90deg,#f72585,#7209b7)]
        bg-[length:200%_200%] relative"
    >
      <div className="rounded-full bg-black/20 px-16 text-xs font-bold text-white">
        Most Popular
      </div>
    </motion.div>
  );
};

export default MostPopularBadge;
