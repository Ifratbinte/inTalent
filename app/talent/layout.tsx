import DefaultLayout from "#components/layouts/DefaultLayout";
import { MenuInterface } from "#interfaces/index";
import React from "react";
import { BsFillChatLeftFill, BsFillFileEarmarkFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const layout: React.FC<Props> = ({ children }) => {
  const talentMenu: MenuInterface[] = [
    {
      id: 1,
      label: "Events",
      slug: "/talent/events",
      icon: <FaSearch />,
    },
    {
      id: 2,
      label: "Contacts",
      slug: "/talent/contracts",
      icon: <BsFillFileEarmarkFill />,
    },
    {
      id: 3,
      label: "Messages",
      slug: "/talent/messages",
      icon: <BsFillChatLeftFill />,
    },
    {
      id: 4,
      label: "Notifications",
      slug: "/talent/notifications",
      icon: <IoNotifications />,
    },
  ];
  return <DefaultLayout menu={talentMenu}>{children}</DefaultLayout>;
};

export default layout;
