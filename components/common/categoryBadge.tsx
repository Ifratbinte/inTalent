import React from "react";
interface Props {
  badge: string;
}

const CategoryBadge: React.FC<Props> = ({ badge }) => {
  return (
    <span className="bg-[#81579c] w-fit px-3 py-[2px] uppercase rounded-full text-slate-100 text-[12px] mt-2 ml-2 tracking-wider absolute top-1">
      {badge}
    </span>
  );
};

export default CategoryBadge;
