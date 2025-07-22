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
      await onClick();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`admin-btn flex items-center justify-center gap-2 ${className} ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
    >
      {isLoading ? (
        <div className="relative w-8 h-8">
          <div className="absolute inset-0 rounded-full border-2 border-t-white border-r-transparent animate-spin" />
          <span className="absolute inset-0 flex items-center justify-center text-[8px] font-semibold text-white animate-pulse">
            dolphin dash
          </span>
        </div>
      ) : (
        text
      )}
    </button>
  );
}
