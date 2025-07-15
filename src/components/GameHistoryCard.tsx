import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getBettingRoundById } from '../api/userApi';
import creditIcon from '../assets/credit.jpg';
import tonSymbol from '../assets/ton_symbol.jpg';

interface Props {
  image: string;
  cost: string;
  prize: string;
  useTon?: boolean; // Optional, true if using TON, false if using Credits
  betId?: number; // Optional, if you want to display or use the bet ID
  result: 'win' | 'lose';
}

const GameHistoryCard: React.FC<Props> = ({ image, cost, prize, useTon, betId, result }:Props) => {
  const { t } = useTranslation();
  const [hasEnded,setHasEnded] = useState(false);
  const [startedAt,setStartedAt] = useState<Date>(new Date());
  const sourceImg = useTon ?  tonSymbol: creditIcon;
  
  useEffect(() => {
    const fetchBettingRound = async () => {
      if (betId) {
        try {
          const bettingRound = await getBettingRoundById(betId);
          setHasEnded(bettingRound.hasEnded);
          setStartedAt(bettingRound.startedAt)
        } catch (error) {
          console.error("Error fetching betting round:", error);
        }
      }
    };

    fetchBettingRound();
  }
  , [betId]);
  
  return (
    <div className="nft-card history-card">
      <img src={image} alt={"dolphin_image"} className="nft-image" />
      <div className="nft-info text-left">
        <p className="nft-detail">
          <strong>{t('gameHistory.entryCost')}: </strong> {cost}
          <img src={sourceImg} alt="Credit or TON" className="inline-block ml-2" width={20} height={20} />
        </p>
        <p className="nft-detail">
          <strong>{t('gameHistory.prize')}: </strong> {prize}
          <img src={sourceImg} alt="Credit or TON" className="inline-block ml-2" width={20} height={20} />
        </p>
        <p className="nft-detail">
          <strong>{t('gameHistory.drawId')}: </strong> {prize}
          <span>{betId}</span>
        </p>
        <p className="nft-detail">
          <strong>{t('gameHistory.startedAt')}: </strong> {prize}
          <span>{startedAt.getDate()+'/'+startedAt.getMonth()+'/'+startedAt.getFullYear()}</span>
        </p>
      </div>
      <div className={`result-tag ${result}`}>
        {hasEnded?
        t(`gameHistory.result.${result}`) :
        t('gameHistory.pending')}
      </div>
    </div>
  );
};

export default GameHistoryCard;
