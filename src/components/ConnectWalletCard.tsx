import { ConnectButton } from './ConnectButton';

const ConnectWalletCard = () => {
  return (
    <div className="profile-card">
      <h1 className="profile-heading">Step in the Game</h1>
      <p className="profile-subheading">
        Connect your wallet to unlock staking,<br />
        betting and daily prizes.
      </p>
      <ConnectButton/>
    </div>
  );
};

export default ConnectWalletCard;