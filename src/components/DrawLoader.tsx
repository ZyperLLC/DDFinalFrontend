import { useEffect, useState } from 'react';
import background from '../assets/background3.png';

function DrawLoader() {
  const [progress, setProgress] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setProgress((prev) => {
      if (prev >= 100) {
        clearInterval(interval);
        return 100;
      }
      return prev + 1;
    });
  }, 100); // <-- 100ms * 100 steps = 10,000ms = 10s

  return () => clearInterval(interval);
}, []);


  return (
    <div
      className="min-h-screen w-screen flex items-center justify-center bg-cover bg-center bg-no-repeat transition-all duration-300"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="progress-wrapper">
        <div className="progress-oval">
          <div
            className="progress-fill bg-white h-2 rounded"
            style={{ width: `${progress}%`, transition: 'width 0.2s' }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default DrawLoader;
