import React from "react";
import { NotificationContextDefault } from "./notification-context.types";
import { NotificationDataInterface } from "#interfaces/notification-interface";
import { ChatContextDefaultInterface } from "./chat-context.types";
import {
  ChatDataInterface,
  MessageInterface,
  MessagePayloadInterface,
} from "#interfaces/chat-interface";

export const defaultChatCtxData: ChatContextDefaultInterface = {
  chats: [],
  updateChat: (data: ChatDataInterface[]) => {},
  appendChat: (data: MessageInterface) => {},
  handleSendMessage: (massage: MessagePayloadInterface) => {},
};

const ChatContext =
  React.createContext<ChatContextDefaultInterface>(defaultChatCtxData);

export default ChatContext;
