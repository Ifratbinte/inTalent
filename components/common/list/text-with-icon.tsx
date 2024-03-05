import React from 'react';
import { IconType } from 'react-icons/lib';
interface Props {
  icon: any;
  text: any;
}

const TextWithIcon: React.FC<Props> = ({ icon, text }) => {
  return (
    <div className="flex items-center">
      <span className="mr-6 text-2xl text-gray-400">
        {icon}
      </span>
      <h6 className="text-[#270341] text-sm tracking-wide">{text}</h6>
    </div>
  );
};

export default TextWithIcon;
