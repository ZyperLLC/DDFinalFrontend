import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

export default function Accordion({ title, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="w-full max-w-2xl mb-10 rounded-md text-left"

    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 text-2xl font-semibold flex justify-between items-center"
      style={{
       background: 'rgba(0, 0, 50, 0.088)',
       color: 'white',
       border: '1px solid rgba(0, 123, 255, 0.6)',
       borderRadius: '8px',
       marginBottom: '8px',
       marginTop: '4px',
       padding: '8px',

        }}
        >
        <span  style={{fontSize:'20px', fontWeight: 'bold', padding:'10px' }}>{title}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-white"
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="px-4 pb-4 pt-2 text-lg"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
