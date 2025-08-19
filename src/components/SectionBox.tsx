import React from 'react';

interface Props {
  title: string;
  children: React.ReactNode;
}

const SectionBox: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="section-box">
      <h2 className="staked-heading">{title}</h2>
      <div className="staked-nft-container">{children}</div>
    </div>
  );
};

export default SectionBox;