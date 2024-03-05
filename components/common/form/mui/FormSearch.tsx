import React from 'react';
import { BsSearch } from 'react-icons/bs';

const FormSearch = () => {
  return (
    <form className="relative px-4">
      <span className="absolute mt-[18px] ml-3">
        <BsSearch className='text-gray-500'/>
      </span>
      <input
        type="text"
        placeholder="Search..."
        className="w-full px-8 py-3 bg-gray-200 border border-slate-200 rounded-md focus:border-purple-300"
      />
    </form>
  );
};

export default FormSearch;
