import React from "react";
import { BiIdCard } from "react-icons/bi";

interface Props {
  btn_text: string;
  btn_style: string;
  path?: string;
  isSubmitButton?: boolean;
  isRoute?: boolean;
  withIdCardIcon?: boolean; // New prop to indicate whether to show the ID Card icon
}

const BaseButton: React.FC<Props> = ({
  btn_style,
  btn_text,
  path,
  isSubmitButton,
  isRoute,
  withIdCardIcon, // Destructure the new prop
}) => {
  return (
    <>
      {isRoute && (
        <a
          href={path}
          className={`${btn_style} text-center w-full block rounded-xl text-[15px] tracking-wide py-2 mt-5`}>
          {withIdCardIcon && <BiIdCard className="inline-block mr-3" />}{" "}
          {/* Render the icon if withIdCardIcon prop is true */}
          {btn_text}
        </a>
      )}
      {isSubmitButton && (
        <button
          type="submit"
          className={`${btn_style} text-center w-full block rounded-xl text-[15px] tracking-wide py-2 mt-5`}>
          {withIdCardIcon && <BiIdCard className="inline-block mr-2" />}{" "}
          {/* Render the icon if withIdCardIcon prop is true */}
          {btn_text}
        </button>
      )}
    </>
  );
};

export default BaseButton;
