import React from 'react';
import { BsStarFill, BsStarHalf } from 'react-icons/bs';

const Rating = () => {
  return (
    <ul className="flex items-center">
      <li className="text-[#e9b92f] mx-[2px] text-[12px]">
        <BsStarFill />
      </li>
      <li className="text-[#e9b92f] mx-[2px] text-[12px]">
        <BsStarFill />
      </li>
      <li className="text-[#e9b92f] mx-[2px] text-[12px]">
        <BsStarFill />
      </li>
      <li className="text-[#e9b92f] mx-[2px] text-[12px]">
        <BsStarFill />
      </li>
      <li className="text-[#e9b92f] mx-[2px] text-[12px]">
        <BsStarHalf />
      </li>
    </ul>
  );
};

export default Rating;
