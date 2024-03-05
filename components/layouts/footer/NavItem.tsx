import Link from "next/link";
import React from "react";

interface Props {
  label: string;
  slug: string;
  icon: JSX.Element | JSX.Element[];
  isActive?: boolean;
}

const NavItem: React.FC<Props> = ({ label, slug, icon, isActive = false }) => {
  return (
    <li>
      <Link
        href={slug}
        className={`flex flex-col justify-center items-center gap-1 p-3 ${
          isActive ? "text-white" : "text-gray-200 opacity-60"
        } `}
      >
        <span className="text-lg font-bold">{icon}</span>
        <span className="text-sm">{label}</span>
      </Link>
    </li>
  );
};

export default NavItem;
