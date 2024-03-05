import React from "react";
interface Props {
  isGreen: boolean;
  badge_text: string;
}

const Badge: React.FC<Props> = ({ isGreen, badge_text }) => {
  return (
    <div
      className={`${
        isGreen ? "bg-[#37d159]" : ""
      } w-fit px-3 py-[3px] uppercase rounded-full text-[#e5f9e9] text-[12px] tracking-wider`}
    >
      {badge_text}
    </div>
  );
};

export default Badge;
