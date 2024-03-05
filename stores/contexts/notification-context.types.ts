import { NotificationDataInterface } from "#interfaces/notification-interface";

export interface NotificationContextDefault {
  data: NotificationDataInterface[];
  updateNotification: (data: NotificationDataInterface[]) => void;
  appendNotification: (data: NotificationDataInterface) => void;
}

export interface NotificationReducerActionInterface {
  type: "UPDATE" | "APPEND";
  payload: NotificationDataInterface | NotificationDataInterface[];
}
