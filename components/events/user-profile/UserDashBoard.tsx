"use client";

import * as React from "react";
import Box from "@mui/material/Box";

interface PropsToggle {
  onToggle: () => void;
  children: React.ReactNode;
}
const UserDashBoard = ({ onToggle, children }: PropsToggle) => {
  const DrawerList = (
    <Box sx={{ width: 304 }} role="presentation" onClick={onToggle}>
      {children}
    </Box>
  );

  return <React.Fragment>{DrawerList}</React.Fragment>;
};

export default UserDashBoard;
