import React from 'react';

interface Props {
  popup_text: string;
}

const PopupAlert: React.FC<Props> = ({ popup_text }) => {
  return (
    <div className="flex flex-col justify-center items-center mx-auto gap-5 bg-white text-center shadow-xl rounded w-[330px] h-[250px] p-6">
      <img src="/images/icon/success.png" alt="" />
      <h4 className="font-lato text-xl font-semibold">{popup_text}</h4>
    </div>
  );
};

export default PopupAlert;
