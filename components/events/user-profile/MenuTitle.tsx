"use client";

import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

interface PropsTittle {
  children: React.ReactNode;
  Icon: any | null;
  onClick?: React.MouseEventHandler<HTMLLIElement>;
}

const MenuTitle = ({ children, Icon, onClick }: PropsTittle) => {
  return (
    <ListItem disablePadding onClick={onClick}>
      <ListItemButton>
        <p className="flex items-center gap-8 py-[3px]">
          {Icon && <Icon className="text-white font-semibold text-2xl" />}
          <span className="text-sm font-semibold tracking-wide">
            {children}
          </span>
        </p>
      </ListItemButton>
    </ListItem>
  );
};

export default MenuTitle;
