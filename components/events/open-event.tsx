import React from "react";
import { PiMapPinFill } from "react-icons/pi";
import { AiOutlineClockCircle } from "react-icons/ai";
import { MdMoreVert } from "react-icons/md";
import { EventInterface } from "#interfaces/event-interface";
import CategoryBadge from "../common/categoryBadge";
import Link from "next/link";

const EventSearch: React.FC<EventInterface> = ({
  badge,
  thumb,
  title,
  subtitle,
  location,
  time,
}) => {
  return (
    <div
      // href="/talent/events-search/event-details"
      className="relative flex items-center justify-between bg-white shadow-base my-4 rounded px-2 py-3"
    >
      <div className="mr-4 w-6/10">
        <div className="-ml-4">
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
        <img
          className=" h-[140px] min-w-[120px] max-w-[120px] object-cover"
          src={thumb}
          alt=""
        />
        <MdMoreVert className="absolute top-2 right-1 text-white text-2xl font-semibold" />
      </div>
    </div>
  );
};

export default EventSearch;
