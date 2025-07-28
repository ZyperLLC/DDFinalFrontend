import React from 'react';
import { useNavigate } from 'react-router-dom';
import lineImg1 from '../assets/Line 1.png';
import lineImg2 from '../assets/Line 2.png';

interface WinnerModalProps {
  winnerImage: string;
  onClose: () => void;
  className?: string;
}



const WinnerModal: React.FC<WinnerModalProps> = ({ winnerImage }) => {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate('/');
  };
  return (
    // Modal Overlay
    <div className="absolute inset-0 flex items-center justify-center backdrop-blur-md z-50 p-4">
      {/* Modal Content Box */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl text-center shadow-xl w-[90%] max-w-sm">
        {/* Modal Title */}
        <h2
          className="combined-card text-white text-center font-poppins text-[40px] font-semibold leading-[120%] space-y-4"
          style={{
            fontFeatureSettings: "'liga' off, 'clig' off",
            fontStyle: 'normal',
            color: 'white',
          }}
        >
          FINTALIK WINNER
        </h2>

        {/* Winning Dolphin Image */}
        <img
          src={winnerImage}
          alt="Winning Dolphin"
          className="w-[50%] h-auto rounded-lg border-4 border-white mb-4"
        />

        {/* "You won!" Text with lines */}
        <div className="flex items-center justify-center mb-4 gap-4 combined-card">
          <img src={lineImg1} alt="line left" className="h-1 w-16 sm:w-24 object-contain" />
          <p
            style={{
              color: '#98FF3F',
              textAlign: 'center',
              fontFeatureSettings: "'liga' off, 'clig' off",
              fontFamily: 'Poppins',
              fontSize: '24px',
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: '120%',
            }}
          >
            You won!
          </p>
          <img src={lineImg2} alt="line right" className="h-1 w-16 sm:w-24 object-contain" />
        </div>

        {/* Come Back Button */}
        <button
           onClick={handleReturnHome}
          className="combined-card"
          style={{
            color: 'white',
            textAlign: 'center',
            fontFeatureSettings: "'liga' off, 'clig' off",
            fontFamily: 'Poppins',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '120%',
          }}
        >
          Come Back Tomorrow
        </button>
      </div>
    </div>
  );
};

export default WinnerModal;
