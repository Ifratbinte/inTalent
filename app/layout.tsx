import "./globals.css";
import React from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-datepicker/dist/react-datepicker.css";
import AppProvider from "./provider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "InTalent",
};

interface Props {
  children: JSX.Element | JSX.Element[];
}
const Layout: React.FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
};

export default Layout;
