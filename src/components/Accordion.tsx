import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

export function Accordion({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full bg-[#1f1f1f] rounded-lg overflow-hidden border border-gray-600">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full text-left px-4 py-3 bg-[#2a2a2a] text-xl font-semibold"
      >
        {title}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="px-4 py-3"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
