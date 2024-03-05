import Conversation from "#components/messages/Conversation";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  return <Conversation params={params} />;
};

export default page;
