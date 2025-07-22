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

      // Fire the onClick logic (your own task)
      await onClick();

      // Keep the button loading for 40 seconds
      setTimeout(() => {
        setIsLoading(false);
      }, 40000);
    } catch (err) {
      // Handle error if needed
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
        <span
          className="inline-block w-6 h-6 border-[3px] border-white border-t-transparent rounded-full animate-spin"
          style={{ borderColor: 'white', borderTopColor: 'transparent' }}
        ></span>
      ) : (
        text
      )}
    </button>
  );
}
