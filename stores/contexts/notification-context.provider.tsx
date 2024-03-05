"use client";

import { NotificationDataInterface } from "#interfaces/notification-interface";
import { RootState } from "#stores/store";
import React, { useContext, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import NotificationContext, {
  defaultNotificationCtxData,
} from "./notification-context";
import {
  NotificationContextDefault,
  NotificationReducerActionInterface,
} from "./notification-context.types";
import { WebsocketCtx } from "./websocker-context";

interface Props {
  children: React.ReactNode;
}

const notificationReducer = (
  state: NotificationContextDefault,
  action: NotificationReducerActionInterface
): NotificationContextDefault => {
  switch (action.type) {
    case "UPDATE":
      return {
        ...state,
        data: Array.isArray(action.payload) ? action.payload : [],
      };
    case "APPEND":
      if (Array.isArray(action.payload)) {
        return state;
      } else {
        return {
          ...state,
          data: [action.payload, ...state.data],
        };
      }
    default:
      return state;
  }
};

const NotificationContextProvider: React.FC<Props> = ({ children }) => {
  const user = useSelector((state: RootState) => state.user);

  const socketCtx = useContext(WebsocketCtx);

  const [notificationState, dispatch] = useReducer(
    notificationReducer,
    defaultNotificationCtxData
  );

  const handleUpdateNotification = (data: NotificationDataInterface[]) => {
    dispatch({ type: "UPDATE", payload: data });
  };

  const handleAppendNotification = (data: NotificationDataInterface) => {
    dispatch({ type: "APPEND", payload: data });
  };

  const ctxValue: NotificationContextDefault = {
    ...notificationState,
    updateNotification: handleUpdateNotification,
    appendNotification: handleAppendNotification,
  };

  const onNotificationSocketData = (
    value: NotificationDataInterface | NotificationDataInterface[]
  ) => {
    if (Array.isArray(value)) {
      handleUpdateNotification(value);
    } else {
      handleAppendNotification(value);
    }
  };

  useEffect(() => {
    if (!socketCtx.socket || !user.data?.id) return;
    socketCtx.socket.connect();

    socketCtx.socket.on("connect", () =>
      console.log("Socket successfully connected!")
    );
    socketCtx.socket.on("disconnect", () =>
      console.log("Socket successfully disconnected!")
    );
    socketCtx.socket.on("notification", onNotificationSocketData);

    return () => {
      socketCtx.socket?.off("connect", () =>
        console.log("Socket successfully connected!")
      );
      socketCtx.socket?.off("disconnect", () =>
        console.log("Socket successfully disconnected!")
      );
      socketCtx.socket?.off("notification", onNotificationSocketData);
      socketCtx.socket?.disconnect();
    };
  }, [socketCtx.socket, user.data?.id]);

  return (
    <NotificationContext.Provider value={ctxValue}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContextProvider;

export const useNotification = () => {
  const ctx = useContext(NotificationContext);

  return ctx;
};
