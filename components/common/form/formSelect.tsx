"use client";
import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import cate_data from "#__mocks__/usercategory.json";
import CategoryItem from "../categoryItem";
import Title from "../title";

interface Props {
  label?: string;
}

const FormSelect: React.FC<Props> = ({ label }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = (e: any) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative w-full mb-5">
      <div className="w-full relative flex items-center  rounded-xl bg-[#f2f0f4]">
        <div
          id="test"
          className="flex justify-between items-center w-[100%] rounded-l-xl p-4 text-gray-700 cursor-pointer"
          onClick={(e) => toggleDropdown(e)}
        >
          {label}
          <FiChevronDown />
        </div>
        {isOpen && (
          <div className="absolute min-w-[200px] top-0 right-0 z-10 mt-4 origin-top-right rounded-xl border border-gray-100 bg-white shadow-lg py-3">
            <Title title="Select talent category" />
            <div className="block rounded-lg px-4 text-sm">
              {cate_data.talent.map((talent: any, i: number) => (
                <CategoryItem
                  avatar={talent.avatar}
                  category={talent.category}
                  value={talent.value}
                />
              ))}
            </div>
            <div className="flex justify-end gap-4 px-4">
              <button className="text-[#270341] uppercase text-sm">
                Cancel
              </button>
              <button className="text-red-500 uppercase text-sm">Select</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormSelect;
