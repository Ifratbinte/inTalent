import React from "react";
import { PiMapPinFill } from "react-icons/pi";
import { AiOutlineClockCircle } from "react-icons/ai";
import { EventInterface } from "#interfaces/event-interface";
import CategoryBadge from "../common/categoryBadge";
import Link from "next/link";

const Contracts: React.FC<EventInterface> = ({
  id,
  badge,
  thumb,
  title,
  subtitle,
  location,
  time,
}) => {
  return (
    <Link
      href={`/talent/contracts/${id}`}
      className="relative flex items-center bg-white shadow-base my-4 rounded px-2 py-3">
      <div>
        <div className="-ml-2">
          <CategoryBadge badge={badge} />
        </div>
        <div className="my-2 text-base font-medium tracking-wide font-lato mt-7 ">
          {title}
        </div>
        <p className="mb-2 font-normal text-[#878787] text-[14px]">
          {subtitle}
        </p>
        <div className="flex items-center text-[#ACACAC]">
          <PiMapPinFill />
          <span className="text-sm ml-2">{location}</span>
        </div>
        <div className="flex items-center text-[#ACACAC]">
          <AiOutlineClockCircle />
          <span className="text-sm ml-2">{time}</span>
        </div>
      </div>
      <div className="relative">
        <img className=" h-[140px] w-[170px]" src={thumb} alt="" />
        {/* <MdMoreVert className="absolute top-2 right-1 text-white text-2xl font-semibold" /> */}
      </div>
    </Link>
  );
};

export default Contracts;
