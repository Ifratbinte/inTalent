"use client";
import { createSocketInstance } from "#helpers/socket";
import {
  ChatDataInterface,
  MessageInterface,
  MessagePayloadInterface,
} from "#interfaces/chat-interface";
import { RootState } from "#stores/store";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import ChatContext, { defaultChatCtxData } from "./chat-context";
import {
  ChatContextDefaultInterface,
  ChatReducerActionInterface,
} from "./chat-context.types";
import { WebsocketCtx } from "./websocker-context";

interface Props {
  children: React.ReactNode;
}

// Reducer function to handle chat context state updates
const chatReducer = (
  state: ChatContextDefaultInterface,
  action: ChatReducerActionInterface
): ChatContextDefaultInterface => {
  switch (action.type) {
    case "UPDATE":
      return {
        ...state,
        chats: Array.isArray(action.payload) ? action.payload : [],
      };
    case "APPEND":
      if (Array.isArray(action.payload)) {
        return state;
      } else {
        const idx = state.chats.findIndex(
          (i) => i.id == (action.payload as MessageInterface).room_id
        );

        if (idx === -1) {
          console.error("Room not found!");
          return state;
        } else {
          const chats = [...state.chats];
          if (
            chats[idx].Message.findIndex(
              (msg) => msg.id == (action.payload as MessageInterface)?.id
            ) == -1
          ) {
            chats[idx].Message.push(action.payload);
          }

          const updatedData = {
            ...state,
            chats: chats,
          };
          return updatedData;
        }
      }
    default:
      return state;
  }
};

// ChatContextProvider component
const ChatContextProvider: React.FC<Props> = ({ children }) => {
  const user = useSelector((state: RootState) => state.user); // Redux user state
  const [chatState, dispatch] = useReducer(chatReducer, defaultChatCtxData); // State and reducer for chat context

  const socketCtx = useContext(WebsocketCtx);

  // Function to handle updating chat context state
  const handleUpdateChat = (data: ChatDataInterface[]) => {
    dispatch({ type: "UPDATE", payload: data });
  };

  // Function to handle appending chat messages to context state
  const handleAppendChat = (data: MessageInterface) => {
    dispatch({ type: "APPEND", payload: data });
  };

  // Function to handle sending messages via socket
  const handleSendMessage = (message: MessagePayloadInterface) => {
    if (!socketCtx.socket || !user.data?.id) {
      console.error("Socket or user ID is not available.");
      return;
    }

    console.log("Sending message:", message);

    // Emit the "chat" event with the message
    socketCtx.socket.emit("chat", message, (response: any) => {
      // Callback function to handle the server's response
      if (response.error) {
        console.error("Error sending message:", response.error);
      } else {
        console.log("Message sent successfully:", response);
      }
    });
  };

  // Context value with state and functions
  const ctxValue: ChatContextDefaultInterface = {
    ...chatState,
    updateChat: handleUpdateChat,
    appendChat: handleAppendChat,
    handleSendMessage: handleSendMessage, // Include handleSendMessage in context value
  };

  // Callback function for handling socket data
  const onChatSocketData = (value: MessageInterface | ChatDataInterface[]) => {
    console.log("## chat message value: ", value);

    if (Array.isArray(value)) {
      handleUpdateChat(value);
    } else {
      handleAppendChat(value);
    }
  };

  // Effect to initialize socket connection and handle socket events
  useEffect(() => {
    if (!socketCtx.socket || !user.data?.id) return;

    socketCtx.socket.connect();

    socketCtx.socket.on("connect", () =>
      console.log("Socket successfully connected!")
    );
    socketCtx.socket.on("disconnect", () =>
      console.log("Socket successfully disconnected!")
    );
    socketCtx.socket.on("chat", onChatSocketData);

    return () => {
      socketCtx.socket?.off("connect", () =>
        console.log("Socket successfully connected!")
      );
      socketCtx.socket?.off("disconnect", () =>
        console.log("Socket successfully disconnected!")
      );
      socketCtx.socket?.off("chat", onChatSocketData);
      socketCtx.socket?.disconnect();
    };
  }, [socketCtx.socket, user.data?.id]);

  return (
    <ChatContext.Provider value={ctxValue}>{children}</ChatContext.Provider>
  );
};

export default ChatContextProvider;

export const useChatCtx = () => {
  const ctx = useContext(ChatContext);

  return ctx;
};
