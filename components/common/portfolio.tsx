import React from "react";

interface Props {
  thumb: string;
  title: string;
}
const PortfolioCard: React.FC<Props> = ({ thumb, title }) => {
  return (
    <div className="relative">
      <img src={thumb} alt="" className="w-full" />
      <div className="absolute w-full bottom-0 bg-[#270341] px-2 py-2 text-white text-xs">{title}</div>
    </div>
  );
};

export default PortfolioCard;
