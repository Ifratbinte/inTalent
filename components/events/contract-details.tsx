"use client";
import React from "react";
import { EventInterface } from "#interfaces/event-interface";
import CategoryBadge from "../common/categoryBadge";
import Rating from "../common/rating";
import BtnTransparent from "../common/button/btnTransparent";
import TextWithIcon from "../common/list/text-with-icon";
import { IoLocationSharp } from "react-icons/io5";
import { FiClock } from "react-icons/fi";
import { MdOutlineAttachMoney } from "react-icons/md";
import BaseButton from "../common/button/baseButton";
import Badge from "#components/common/badge";

const ContractDetailsCard: React.FC<EventInterface> = ({
  badge,
  thumb,
  title,
  publishedDate,
  isContracts,
  startDate,
  client,
  rating,
  review,
  desc,
  location,
  payment,
}) => {
  return (
    <div>
      <div className="relative">
        <img src={thumb} alt="" className="w-full h-[200px]" />
        <span className="bg-[#81579c] w-fit px-4 py-[2px] uppercase rounded-full m-2 text-slate-100 text-[11px] tracking-wider absolute top-1">
          {badge}
        </span>
        <CategoryBadge badge={badge} />
      </div>

      <div className="bg-[#270341] p-4">
        <h4 className="text-white mb-2 text-xl font-lato">{title}</h4>
        <div className="flex justify-between items-center">
          <span className="text-[#b9a4c7] text-sm">{client}</span>
          <div className="flex gap-6">
            <Rating />
            <div className="flex gap-1">
              <span className="text-slate-300 text-[12px]">{rating}</span>
              <span className="text-slate-300 text-[12px]">({review})</span>
            </div>
          </div>
        </div>
      </div>
      <div className="py-5 px-3">
        <div className="mt-2">
          <Badge badge_text="IN PROGRESS" isGreen />
          <div className="flex justify-between mt-4">
            <div className="text-gray-400 text-[13px] mb-4 font-lato">
              Published on <span>{publishedDate}</span>
            </div>
            <div className="text-gray-400 text-[13px] mb-4 font-lato">
              Started on <span>{startDate}</span>
            </div>
          </div>
          <h5 className="text-base font-bold tracking-tight font-lato mb-2">
            Description
          </h5>
          <p className="mb-3 text-sm text-[#263238]">{desc}</p>
        </div>
        <div className="mt-6">
          <h5 className="text-base font-bold tracking-tight font-lato my-2">
            Required languages
          </h5>
          <div className="flex gap-2">
            <BtnTransparent btnText="English" />
            <BtnTransparent btnText="French" />
          </div>
        </div>
      </div>
      <hr />
      <div className="p-4">
        <ul className="mx-4 mb-10">
          <li className="py-2 my-1">
            <TextWithIcon icon={<IoLocationSharp />} text={location} />
          </li>
          <li className="py-2 my-1">
            <TextWithIcon
              icon={<FiClock />}
              text="Job open till 30 January 2023"
            />
          </li>
          <li className="py-2 my-1">
            <TextWithIcon icon={<MdOutlineAttachMoney />} text={payment} />
          </li>
        </ul>

        <BaseButton
          btn_style="bg-[#e95f24] text-white uppercase font-normal"
          btn_text="Finish Contracts"
          isSubmitButton
        />
      </div>
    </div>
  );
};

export default ContractDetailsCard;
