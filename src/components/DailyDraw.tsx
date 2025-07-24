import { useNavigate } from 'react-router-dom';
import background from '../assets/background3.png';
import logo from './assets/logo.jpg';
import Button from '../components/Button';

function DailyDraw() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-screen flex flex-col items-center bg-cover bg-center bg-no-repeat transition-all duration-300 overflow-hidden"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Logo at Top Center */}
      <div className="logo-container mt-10 mb-6">
        <img
          src={logo}
          alt="Logo"
          className="logo-image w-32 h-auto"
        />
      </div>

      {/* Heading */}
      <div className="stake-card w-full max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mt-0 mb-2 text-white">
          Daily Dolphin <br /> Dash Draw
        </h1>
      </div>

      {/* Timer */}
      <div className="timer-box mt-4">
        <p className="timer-text text-center text-white text-lg">
          Next Draw In : 14h 21m 45s
        </p>
      </div>

      {/* Play Button */}
      <div className="mt-8">
        <Button text="Play Dolphin Dash" onClick={() => navigate('/play')} />
      </div>
    </div>
  );
}

export default DailyDraw;
