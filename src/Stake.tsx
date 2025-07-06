import Navbar from './components/Navbar';
import BackgroundOverlay from './components/BackgroundOverlay';
import Logo from './components/Logo';
import StakeHeader from './components/StakeHeader';
import StakeDolphinGrid from './components/StakeDolphinGrid';
import './index.css';

export default function Stake() {
  const NAVBAR_HEIGHT_PX = 80;

  return (
    <div className="relative min-h-screen flex flex-col">
      <BackgroundOverlay />

      <div
        className="relative z-10 flex flex-col flex-grow items-center px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28"
        style={{ paddingBottom: `${NAVBAR_HEIGHT_PX}px` }}
      >
        <Logo />
        <StakeHeader />
        <StakeDolphinGrid />
      </div>

      <div
        className="fixed bottom-0 left-0 w-full z-20"
        style={{ height: `${NAVBAR_HEIGHT_PX}px` }}
      >
        <Navbar />
      </div>
    </div>
  );
}
