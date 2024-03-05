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
  const agentMenu: MenuInterface[] = [
    {
      id: 1,
      label: "Talents",
      slug: "/agent/talents",
      icon: <FaSearch />,
    },
    {
      id: 2,
      label: "Events",
      slug: "/agent/events",
      icon: <BsFillFileEarmarkFill />,
    },
    {
      id: 3,
      label: "Messages",
      slug: "/agent/messages",
      icon: <BsFillChatLeftFill />,
    },
    {
      id: 4,
      label: "Notifications",
      slug: "/agent/notifications",
      icon: <IoNotifications />,
    },
  ];
  return <DefaultLayout menu={agentMenu}>{children}</DefaultLayout>;
};

export default layout;
