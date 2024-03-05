import React from "react";
interface Props {
  btnText: string;
}

const BtnTransparent: React.FC<Props> = ({ btnText }) => {
  return (
    <div className="border border-[#81579c] rounded-full text-[#81579c] font-medium text-sm py-[2px] px-3 font-lato">
      {btnText}
    </div>
  );
};

export default BtnTransparent;
