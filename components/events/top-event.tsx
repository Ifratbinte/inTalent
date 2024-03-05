import React from "react";
import { PiMapPinFill } from "react-icons/pi";
import { EventInterface } from "#interfaces/event-interface";
import CategoryBadge from "../common/categoryBadge";
import Link from "next/link";

const EventSearch: React.FC<EventInterface> = ({
  badge,
  thumb,
  title,
  subtitle,
  location,
}) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow mx-1">
      <div className="relative">
        <img
          className="rounded-t-md w-full object-cover"
          src={thumb}
          alt=""
          style={{ minHeight: "150px", maxHeight: "150px" }}
        />
        <div className="flex flex-col justify-between">
          <CategoryBadge badge={badge} />
          <h5 className="mb-2 text-lg font-bold tracking-tight font-lato text-white px-4 absolute bottom-0">
            {title}
          </h5>
        </div>
      </div>
      <div className="p-3">
        <p className="mb-3 font-normal text-[#878787] text-[14px] min-h-[90px] max-h-[90px]">
          {subtitle}
        </p>
        <div className="flex items-center text-[#ACACAC]">
          <PiMapPinFill />
          <span className="text-sm ml-2">{location}</span>
        </div>
      </div>
    </div>
  );
};

export default EventSearch;
