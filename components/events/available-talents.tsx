import React from "react";
import { EventInterface } from "#interfaces/event-interface";
import Link from "next/link";
import Rating from "#components/common/rating";
import { FiHeart } from "react-icons/fi";
import { MdMoreVert } from "react-icons/md";

const AvailableTalents: React.FC<EventInterface> = ({
  badge,
  thumb,
  talent_name,
  subtitle,
  total_event,
  time,
}) => {
  return (
    <Link
      href="/agent/talents/details"
      className="flex items-center bg-white shadow-base my-4 rounded px-2 py-3 gap-4">
      <div className="">
        <img className=" h-[150px] w-[200px]" src={thumb} alt="" />
      </div>
      <div className="w-full">
        <div className="flex justify-between">
          <span className="bg-[#81579c] w-fit px-3 py-[2px] uppercase rounded-full text-slate-100 text-[11px] tracking-wider">
            {badge}
          </span>
          <ul className="flex gap-4">
            <li className="text-lg text-[#878787]">
              <FiHeart />
            </li>
            <li className="text-lg text-[#878787]">
              <MdMoreVert />
            </li>
          </ul>
        </div>
        <div className="text-lg font-semibold tracking-wide font-lato mt-2">
          {talent_name}
        </div>
        <div className="flex justify-between my-1">
          <Rating />
          <span className="text-xs text-[#ACACAC]">{total_event} Events</span>
        </div>
        <p className="mb-2 font-normal text-[#878787] text-[14px]">
          {subtitle}
        </p>
      </div>
    </Link>
  );
};

export default AvailableTalents;
