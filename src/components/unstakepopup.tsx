import { useEffect } from 'react';
import { X } from 'lucide-react';
import background1 from '../assets/background1.jpg';

export default function StakeComplete({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000); // auto-close after 3 seconds

    return () => clearTimeout(timer); // clear on unmount
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center"
      style={{
        width: '100vw',
        height: '100vh',
        padding: '1rem',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '300px',
          borderRadius: '1rem',
          backgroundImage: `url(${background1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          color: '#fff',
          padding: '2rem 1rem',
          textAlign: 'center',
          position: 'relative',
          backdropFilter: 'blur(4px)',
          filter: 'brightness(1)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'transparent',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          <X size={20} />
        </button>

        {/* Tick Icon */}
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✅</div>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Unstaked Successfully
        </h2>

        <p>You have removed your dolphin from the ocean. That's totally fine - Just remember you'll need to reconnect to stake, space, play, and receive rewards. Swim back in anytime. The ocean's still open.</p>
      </div>
    </div>
  );
}
