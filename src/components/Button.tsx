import { useState } from 'react';

interface ButtonProps {
  text: string;
  onClick: () => Promise<void> | void;
  className?: string;
}

export default function Button({ text, onClick, className = '' }: ButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);

      // Wait for the onClick function to fully complete
      const result = onClick();
      
      if (result instanceof Promise) {
        await result;
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`admin-btn flex items-center justify-center gap-2 px-12 py-3 text-white font-semibold rounded ${
        isLoading ? 'opacity-60 cursor-not-allowed' : ''
      } ${className}`}
    >
      {isLoading ? (
        <span className="w-6 h-6 rounded-full border-[1px] border-white animate-spin-full"></span>
      ) : (
        text
      )}
    </button>
  );
}
