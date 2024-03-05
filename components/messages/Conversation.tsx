"use client";

import Loader from "#components/common/Loader";
import { useChatCtx } from "#stores/contexts/chat-context.provider";
import { changePageCtx } from "#stores/pages/pageCtxSlice";
import { RootState } from "#stores/store";
import React, { useLayoutEffect, useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { MdAttachFile } from "react-icons/md";
import { BsSend } from "react-icons/bs";
import { dateFormat } from "#helpers/date-time-format";
import { MessageInterface } from "#interfaces/chat-interface";

const Conversation = ({ params }: { params: { id: string } }) => {
  // Redux state
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const chatCtx = useChatCtx();
  const { chats, handleSendMessage } = useChatCtx();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<MessageInterface[]>([]);

  // Memoized chat data
  const chat = useMemo(() => {
    return chatCtx.chats.find((i) => i.id == params.id);
  }, [chatCtx.chats, user.data]);

  // Memoized chat with user data
  const chatWith = useMemo(() => {
    if (user.data) {
      if (chat?.agent_id === user.data.id) {
        return {
          id: chat?.talent_id,
          type: "Talent",
          name: `${chat?.talent.first_name} ${chat?.talent.last_name ?? ""}`,
        };
      } else {
        return {
          id: chat?.agent_id,
          type: "Agent",
          name: `${chat?.agent.first_name} ${chat?.agent.last_name ?? ""}`,
        };
      }
    }
    return {};
  }, [chat, user.data]);

  useLayoutEffect(() => {
    if (chatWith.name) {
      dispatch(
        changePageCtx({
          title: chatWith.name,
          isBackActive: true,
          isActiveShare: false,
          isSearchActive: false,
          isFavoriteBtnActive: false,
          isCreateButtonActive: false,
        })
      );
    }
  }, [chatWith]);

  useEffect(() => {
    // Find the current chat based on the conversation ID
    const currentChat = chats.find((chat) => chat.id === params.id);
    if (currentChat) {
      setMessages(currentChat.Message);

      // Scroll to the bottom of the message container when new messages are received
      const messageContainer = document.getElementById("message-container");
      if (messageContainer) {
        messageContainer.scrollTop = messageContainer.scrollHeight;
      }
    }
  }, [chats, params.id]);

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      handleSendMessage({
        room: params?.id ?? "",
        content: newMessage.trim(),
      });
      setNewMessage("");
    }
  };

  const handleAttachFile = () => {
    console.log("Attaching file clicked...");
  };

  if (!chat?.Message?.length) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Conversation container */}
      <div id="message-container" className="flex-1 overflow-y-auto px-3">
        {/* Render messages */}
        {messages.map((message, idx) => (
          <div
            key={`${message.id}-idx-${idx}`}
            className={`flex p-2 ${
              message.user_id === chatWith.id ? "justify-end" : "justify-start"
            }`}
          >
            <div className="flex flex-col items-start max-w-[80%]">
              <div className="flex items-center">
                <Avatar
                  className={`w-16 h-16 rounded-full mb-3 ${
                    message.user_id === chatWith.id ? "ml-1" : ""
                  }`}
                />
                <div className="ml-2 mb-3">
                  <p className="font-semibold text-black">
                    {user.data?.id === message.user_id
                      ? chatWith.name
                      : user.data?.first_name + " " + user.data?.last_name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {dateFormat(message.createdAt ?? "")}
                  </p>
                </div>
              </div>
              <div
                className={`p-2 rounded-lg ${
                  message.user_id === chatWith.id
                    ? "bg-blue-100 text-black self-end"
                    : "bg-gray-200 text-black self-start"
                }`}
              >
                {message.content}
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr className="border-t border border-gray-400" />

      {/* Message writing area */}
      <div className="flex-shrink-0 px-3">
        <textarea
          placeholder="Write message..."
          className="py-1 mb-3 w-full outline-none resize-none"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />

        <hr className="border-t border-dashed border-gray-400" />
        <div className="flex justify-end py-3">
          <div className="border rounded-md p-3 bg-gray-200 mr-5">
            <MdAttachFile
              className="text-gray-500 cursor-pointer text-2xl"
              onClick={handleAttachFile}
            />
          </div>
          <div className="border rounded-md p-2 bg-gray-200">
            <BsSend
              className="text-gray-500 cursor-pointer text-2xl"
              onClick={sendMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
