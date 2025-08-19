import React from 'react';

interface Props {
  title: string;
  children: React.ReactNode;
  hideWrapper?: boolean; // optional prop
}

const SectionBox: React.FC<Props> = ({ title, children, hideWrapper }) => {
  if (hideWrapper) {
    return <>{children}</>; // render children directly without wrapper
  }

  return (
    <div className="section-box">
      <h2 className="staked-heading">{title}</h2>
      <div className="staked-nft-container">{children}</div>
    </div>
  );
};

export default SectionBox;
