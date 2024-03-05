export interface MessagePayloadInterface {
  room: string;
  content: string;
  type?: "TEXT" | "APPLY" | "INVITATION" | "TAG";
}
export interface MessageInterface {
  id: number;
  content: string;
  seen: boolean;
  user_id: number;
  createdAt: string;
  updatedAt: string;
  deleted_at: null | string;
  room_id: string;
}

export interface RoomInterface {
  id: string;
  name: null | string;
  agent_id: number;
  agent: {
    first_name: string;
    last_name?: string;
  };
  talent_id: number;
  talent: {
    first_name: string;
    last_name?: string;
  };
  owner_id: number;
  createdAt: string;
  updatedAt: string;
  deleted_at: null | string;
  Message: MessageInterface[];
}

export interface ChatDataInterface extends RoomInterface {}
