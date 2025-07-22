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
      className={`admin-btn flex items-center justify-center gap-2 ${className} ${
        isLoading ? 'opacity-60 cursor-not-allowed' : ''
      }`}
    >
      {isLoading ? (
        <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      ) : (
        text
      )}
    </button>
  );
}
