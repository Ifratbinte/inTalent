// "use client";

// import { createSocketInstance } from "#helpers/socket";
// import {
//   ChatDataInterface,
//   MessageInterface,
// } from "#interfaces/chat-interface";
// import { RootState } from "#stores/store";
// import React, { useContext, useEffect, useReducer, useState } from "react";
// import { useSelector } from "react-redux";
// import { Socket } from "socket.io-client";
// import ChatContext, { defaultChatCtxData } from "./chat-context";
// import {
//   ChatContextDefaultInterface,
//   ChatReducerActionInterface,
// } from "./chat-context.types";

// interface Props {
//   children: React.ReactNode;
// }

// const chatReducer = (
//   state: ChatContextDefaultInterface,
//   action: ChatReducerActionInterface
// ): ChatContextDefaultInterface => {
//   switch (action.type) {
//     case "UPDATE":
//       return {
//         ...state,
//         chats: Array.isArray(action.payload) ? action.payload : [],
//       };
//     case "APPEND":
//       if (Array.isArray(action.payload)) {
//         return state;
//       } else {
//         const idx = state.chats.findIndex(
//           (i) => i.id == (action.payload as MessageInterface).room_id
//         );
//         if (idx === -1) {
//           return state;
//         } else {
//           const chats = [...state.chats];
//           chats[idx].Message.unshift(action.payload);
//           const updatedData = {
//             ...state,
//             chats: chats,
//           };
//           return updatedData;
//         }
//       }
//     default:
//       return state;
//   }
// };

// const ChatContextProvider: React.FC<Props> = ({ children }) => {
//   const [socket, setSocket] = useState<Socket<any, any>>();
//   const user = useSelector((state: RootState) => state.user);
//   const [chatState, dispatch] = useReducer(chatReducer, defaultChatCtxData);

//   const handleUpdateChat = (data: ChatDataInterface[]) => {
//     dispatch({ type: "UPDATE", payload: data });
//   };

//   const handleAppendChat = (data: MessageInterface) => {
//     dispatch({ type: "APPEND", payload: data });
//   };

//   const ctxValue: ChatContextDefaultInterface = {
//     ...chatState,
//     updateChat: handleUpdateChat,
//     appendChat: handleAppendChat,
//   };

//   const onChatSocketData = (value: MessageInterface | ChatDataInterface[]) => {
//     if (Array.isArray(value)) {
//       handleUpdateChat(value);
//     } else {
//       handleAppendChat(value);
//     }
//   };
//   const handleSendMessage = (massage: string) => {
//     console.log("Sending message:", massage);
//     socket
//       ?.timeout(5000)
//       ?.emit("chat", massage, () => console.log("massage sent"));
//   };

//   useEffect(() => {
//     if (!socket || !user.data?.id) return;
//     socket.connect();

//     socket.on("connect", () => console.log("Socket successfully connected!"));
//     socket.on("disconnect", () =>
//       console.log("Socket successfully disconnected!")
//     );
//     socket.on("chat", onChatSocketData);

//     return () => {
//       socket.off("connect", () =>
//         console.log("Socket successfully connected!")
//       );
//       socket.off("disconnect", () =>
//         console.log("Socket successfully disconnected!")
//       );
//       socket.off("chat", onChatSocketData);
//       socket.disconnect();
//     };
//   }, [socket, user.data?.id]);

//   useEffect(() => {
//     if (!user.data?.id) return;
//     console.log({ user: user.data });

//     setSocket(createSocketInstance(user.data?.id));
//   }, [user.data?.id]);
//   return (
//     <ChatContext.Provider value={ctxValue}>{children}</ChatContext.Provider>
//   );
// };

// export default ChatContextProvider;

// export const useChatCtx = () => {
//   const ctx = useContext(ChatContext);

//   return ctx;
// };

// // Import necessary dependencies

// // Define the ChatContextProvider component
// const ChatContextProvider = ({ children }) => {
//   // State and reducer for chat context
//   const [socket, setSocket] = useState(); // State for socket instance
//   const user = useSelector((state: RootState) => state.user); // Redux user state
//   const [chatState, dispatch] = useReducer(chatReducer, defaultChatCtxData); // State and reducer for chat context

//   // Function to handle updating chat context state
//   const handleUpdateChat = (data) => {
//     dispatch({ type: "UPDATE", payload: data });
//   };

//   // Function to handle appending chat messages to context state
//   const handleAppendChat = (data) => {
//     dispatch({ type: "APPEND", payload: data });
//   };

//   // Function to handle sending messages via socket
//   const handleSendMessage = (message) => {
//     if (!socket || !user.data?.id) {
//       console.error("Socket or user ID is not available.");
//       return;
//     }

//     console.log("Sending message:", message);
//     socket.emit("chat", message, (response) => {
//       if (response.error) {
//         console.error("Error sending message:", response.error);
//       } else {
//         console.log("Message sent successfully:", response);
//       }
//     });
//   };

//   // Context value with state and functions
//   const ctxValue = {
//     ...chatState,
//     updateChat: handleUpdateChat,
//     appendChat: handleAppendChat,
//     handleSendMessage: handleSendMessage, // Include handleSendMessage in context value
//   };

//   // Callback function for handling socket data
//   const onChatSocketData = (value) => {
//     if (Array.isArray(value)) {
//       handleUpdateChat(value);
//     } else {
//       handleAppendChat(value);
//     }
//   };

//   // Effect to initialize socket connection and handle socket events
//   useEffect(() => {
//     if (!socket || !user.data?.id) return;

//     socket.connect();

//     socket.on("connect", () => console.log("Socket successfully connected!"));
//     socket.on("disconnect", () =>
//       console.log("Socket successfully disconnected!")
//     );
//     socket.on("chat", onChatSocketData);

//     return () => {
//       socket.off("connect", () =>
//         console.log("Socket successfully connected!")
//       );
//       socket.off("disconnect", () =>
//         console.log("Socket successfully disconnected!")
//       );
//       socket.off("chat", onChatSocketData);
//       socket.disconnect();
//     };
//   }, [socket, user.data?.id]);

//   // Effect to create socket instance when user ID changes
//   useEffect(() => {
//     if (!user.data?.id) return;

//     console.log({ user: user.data });

//     setSocket(createSocketInstance(user.data?.id));
//   }, [user.data?.id]);

//   return (
//     <ChatContext.Provider value={ctxValue}>{children}</ChatContext.Provider>
//   );
// };

// export default ChatContextProvider;
