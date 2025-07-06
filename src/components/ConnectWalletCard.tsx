import React from 'react';

interface Props {
  onConnect: () => void;
}

const ConnectWalletCard: React.FC<Props> = ({ onConnect }) => {
  return (
    <div className="profile-card">
      <h1 className="profile-heading">Step in the Game</h1>
      <p className="profile-subheading">
        Connect your wallet to unlock staking,<br />
        betting and daily prizes.
      </p>
      <button className="connect-wallet-button" onClick={onConnect}>
        Connect Wallet
      </button>
    </div>
  );
};

export default ConnectWalletCard;