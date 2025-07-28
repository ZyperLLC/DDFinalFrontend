

interface ButtonProps {
  text: string;
  onClick: () => Promise<void> | void;
  className?: string;
}

export default function Button({ text, onClick, className = '' }: ButtonProps) {
  const handleClick = async () => {
    try {
      await onClick();
    } catch (error) {
      console.error('Button click error:', error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`admin-btn flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold rounded ${className}`}
    >
      {text}
    </button>
  );
}
