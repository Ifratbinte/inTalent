"use client";

import { usePathname } from "next/navigation";
import NavItem from "./NavItem";
import { MenuInterface } from "#interfaces/index";

interface Props {
  footerRef: React.MutableRefObject<null>;
  menu: MenuInterface[];
}

const DefaultFooter: React.FC<Props> = ({ footerRef, menu }) => {
  const path = usePathname();
  return (
    <div className="bg-primary" ref={footerRef}>
      <nav>
        <ul className="flex justify-between items-end">
          {menu?.length > 0 &&
            menu.map((item) => (
              <NavItem
                key={item.id}
                label={item.label}
                slug={item.slug}
                icon={item.icon}
                isActive={path.startsWith(item.slug)}
              />
            ))}
        </ul>
      </nav>
    </div>
  );
};

export default DefaultFooter;
