import React from "react";
import { FiAlertCircle } from "react-icons/fi";

interface Props {
  label?: string;
  placeholder?: string;
  value?: string;
  name: string;
  type?: string;
  icon?: any;
  register?: any;
}

const FormInput: React.FC<Props> = ({
  label,
  placeholder,
  type,
  icon,
  value,
  name,
  register,
}) => {
  return (
    <div className="relative w-full mb-5">
      <div className="absolute top-2/4 right-3 grid h-8 w-8 -translate-y-2/4 place-items-center text-gray-400">
        {icon}
      </div>
      <input
        {...register(name)}
        className="peer w-full h-14 rounded-xl border-2 border-[#f2f0f4] bg-[#f2f0f4] px-3 py-3 font-lato text-base font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#532c6d] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
        placeholder=" "
        name={name}
        // value={value}
        type={type}
      />
      <label className="before:content[' '] after:content[' '] text-gray-700 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:w-2.5 before:rounded-tl-xl before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-xl after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-base peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#532c6d] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-[#532c6d] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-[#532c6d] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
        {label}
      </label>
    </div>
  );
};

export default FormInput;
