import React from "react";
import { EventInterface } from "#interfaces/event-interface";
import CategoryBadge from "../common/categoryBadge";
import Rating from "../common/rating";
import Link from "next/link";

const TalentSearch: React.FC<EventInterface> = ({
  badge,
  thumb,
  title,
  avatar,
  total_event,
}) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow mx-1">
      <Link href="/agent/talents/details">
        <div className="relative">
          <img
            className="rounded-t-md h-[210px] object-full w-full"
            src={thumb}
            alt=""
          />
          <div className="absolute top-2">
            <CategoryBadge badge={badge} />
          </div>
        </div>
        <div className="p-3">
          <div className="flex items-center gap-4">
            <img src={avatar} alt="" />
            <div className="">
              <h4 className="mb-1 font-normal text-xl">{title}</h4>
              <div className="flex items-center justify-between gap-10">
                <Rating />
                <span className="text-xs text-[#ACACAC]">
                  {total_event} Events
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TalentSearch;
