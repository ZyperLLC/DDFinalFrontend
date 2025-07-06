import React from 'react';
import logo from '../assets/logo.jpg';

const LogoDisplay: React.FC = () => {
  return <img src={logo} alt="Logo" className="animated-logo" />;
};

export default LogoDisplay;