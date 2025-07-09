import React from 'react';

interface Props {
  image: string;
  name: string;
  time: string;
  reward: string;
  onClick?: () => void; // optional click handler
}

const StakedNFTCard: React.FC<Props> = ({ image, name, time, reward, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        all: 'unset',
        cursor: 'pointer',
        display: 'block',
        width: '100%',
      }}
    >
      <div className="nft-card">
        <img src={image} alt={name} className="nft-image" />
        <div className="nft-info text-left">
          <h3 className="nft-name">{name}</h3>
          <p className="nft-detail"><strong>Remaining time:</strong> {time}</p>
          <p className="nft-detail"><strong>You'll earn:</strong> {reward}</p>
        </div>
      </div>
    </button>
  );
};

export default StakedNFTCard;
