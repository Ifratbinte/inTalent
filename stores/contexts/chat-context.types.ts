import {
  ChatDataInterface,
  MessageInterface,
  MessagePayloadInterface,
} from "#interfaces/chat-interface";

export interface ChatContextDefaultInterface {
  chats: ChatDataInterface[];
  updateChat: (data: ChatDataInterface[]) => void;
  appendChat: (data: MessageInterface) => void;
  handleSendMessage: (message: MessagePayloadInterface) => void; // Include handleSendMessage function
}

export interface ChatReducerActionInterface {
  type: string;
  payload: ChatDataInterface[] | MessageInterface;
}
