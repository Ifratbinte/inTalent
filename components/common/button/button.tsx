import React from "react";

type btnType = "button" | "submit" | "reset";
type btnVariant =
  | "primary"
  | "secondary"
  | "outline-primary"
  | "outline-secondary";

interface Props {
  label: string;
  type?: btnType;
  btnClass?: string;
  variant?: btnVariant;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button: React.FC<Props> = ({
  label,
  type = "button",
  variant = "primary",
  onClick,
  btnClass,
}) => {
  return (
    <button
      type={type}
      onClick={onClick && onClick}
      className={`text-center w-full block rounded-xl text-[15px] tracking-wide py-2 mt-5 transition-colors duration-150 ${
        variant === "primary"
          ? "border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white"
          : variant === "secondary"
          ? "bg-[#e95f24] text-white hover:bg-[#9c4d2b] uppercase font-medium"
          : ""
      } ${btnClass}`}
    >
      {label}
    </button>
  );
};

export default Button;
