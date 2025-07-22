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

      // Trigger your custom onClick logic
      await onClick();

      // Keep button disabled for 40 seconds
      setTimeout(() => {
        setIsLoading(false);
      }, 40000);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`admin-btn flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold rounded ${
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
