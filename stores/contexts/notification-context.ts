import React from "react";
import { NotificationContextDefault } from "./notification-context.types";
import { NotificationDataInterface } from "#interfaces/notification-interface";

export const defaultNotificationCtxData: NotificationContextDefault = {
  data: [],
  updateNotification: (data: NotificationDataInterface[]) => {},
  appendNotification: (data: NotificationDataInterface) => {},
};

const NotificationContext = React.createContext<NotificationContextDefault>(
  defaultNotificationCtxData
);

export default NotificationContext;
