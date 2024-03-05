export interface NotificationDataInterface {
  avatar: null | string;
  created_at: string;
  deleted_at: null | string;
  description: null | string;
  id: number;
  read: boolean;
  title: string;
  type: "info" | "error" | "warning";
  updated_at: string;
  user_id: number;
}
