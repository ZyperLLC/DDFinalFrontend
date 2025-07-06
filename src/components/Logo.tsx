import dolphinLogo from '../assets/logo.jpg';

export default function Logo() {
  return (
    <div className="logo-container">
      <img
        src={dolphinLogo}
        alt="Dolphin Logo"
        className="page-logo logo-image animate-float"
      />
    </div>
  );
}
