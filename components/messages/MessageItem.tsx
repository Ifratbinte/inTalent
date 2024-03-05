import { ChatDataInterface } from "#interfaces/chat-interface";
import { UserInterface } from "#interfaces/index";
import { Avatar } from "@mui/material";
import Link from "next/link";
import React from "react";
import { dateFormat } from "#helpers/date-time-format";

interface Props {
  data: ChatDataInterface;
  user: UserInterface;
}

const MessageItem: React.FC<Props> = ({ data, user }) => {
  // Determine the name to display based on the logged-in user's role
  const displayName =
    user.user_type_id === 2
      ? data.talent.first_name + " " + data.talent.last_name
      : data.agent.first_name + " " + data.agent.last_name;

  // Determine the route based on the logged-in user's role
  const route =
    user.user_type_id === 2 ? "/agent/messages" : "/talent/messages";

  return (
    <Link href={`${route}/${data.id}`}>
      <div className="flex items-center gap-2 border-b border-b-gray-100 p-2">
        <Avatar />
        <div>
          <p>{displayName}</p>
          <span>{dateFormat(data.Message[0].createdAt ?? "")}</span>
        </div>
      </div>
    </Link>
  );
};

export default MessageItem;
