import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  image: string;
  cost: string;
  prize: string;
  result: 'win' | 'lose';
}

const GameHistoryCard: React.FC<Props> = ({ image, cost, prize, result }:Props) => {
  const { t } = useTranslation();

  return (
    <div className="nft-card history-card">
      <img src={image} alt={"dolphin_image"} className="nft-image" />
      <div className="nft-info text-left">
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
