import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  image: string;
  day: string;
  cost: string;
  prize: string;
  result: 'win' | 'lose';
}

const GameHistoryCard: React.FC<Props> = ({ image, day, cost, prize, result }) => {
  const { t } = useTranslation();

  return (
    <div className="nft-card history-card">
      <img src={image} alt={day} className="nft-image" />
      <div className="nft-info text-left">
        <h3 className="nft-name">{day}</h3>
        <p className="nft-detail">
          <strong>{t('gameHistory.entryCost')}:</strong> {cost}
        </p>
        <p className="nft-detail">
          <strong>{t('gameHistory.prize')}:</strong> {prize}
        </p>
      </div>
      <div className={`result-tag ${result}`}>
        {t(`gameHistory.result.${result}`)}
      </div>
    </div>
  );
};

export default GameHistoryCard;
