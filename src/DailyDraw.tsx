import { useEffect, useState } from 'react';
import DrawLoader from './components/DrawLoader';
import DailyDraw from './components/DailyDraw';

function DailyDrawWrapper() {
  const [showDailyDraw, setShowDailyDraw] = useState(false);

  useEffect(() => {
  const timeout = setTimeout(() => {
    setShowDailyDraw(true);
  }, 10500); // <-- 10s loader + 0.5s buffer

  return () => clearTimeout(timeout);
}, []);


  return showDailyDraw ? <DailyDraw /> : <DrawLoader />;
}

export default DailyDrawWrapper;
