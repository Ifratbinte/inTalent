import React from "react";

interface Props {
  title?: string;
  detail_value?: string;
}
const ProfileCard: React.FC<Props> = ({ detail_value, title }) => {
  return (
    <div
      className="relative border rounded-xl bg-slate-100 px-3 py-3 mt-5 ;
    ">
      <div className=" w-full text-base text-slate-600">{title}</div>
      <div className=" w-full text-  text-slate-600 text-xl ">
        {detail_value}
      </div>
    </div>
  );
};

export default ProfileCard;
