import React from 'react';

interface Props {
  image: string;
  day: string;
  cost: string;
  prize: string;
  result: 'win' | 'lose';
}

const GameHistoryCard: React.FC<Props> = ({ image, day, cost, prize, result }) => {
  return (
    <div className="nft-card history-card">
      <img src={image} alt={day} className="nft-image" />
      <div className="nft-info text-left">
        <h3 className="nft-name">{day}</h3>
        <p className="nft-detail"><strong>Entry Cost:</strong> {cost}</p>
        <p className="nft-detail"><strong>Prize:</strong> {prize}</p>
      </div>
      <div className={`result-tag ${result}`}>{result.charAt(0).toUpperCase() + result.slice(1)}</div>
    </div>
  );
};

export default GameHistoryCard;