"use client";

import React from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Provider } from "react-redux";
import { persistor, store } from "#stores/store";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ChatContextProvider from "#stores/contexts/chat-context.provider";
import NotificationContextProvider from "#stores/contexts/notification-context.provider";
import WebsocketContextProvider from "#stores/contexts/websocker-context";

interface Props {
  children: JSX.Element | JSX.Element[];
}
const AppProvider: React.FC<Props> = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <WebsocketContextProvider>
              <NotificationContextProvider>
                <ChatContextProvider>{children}</ChatContextProvider>
              </NotificationContextProvider>
            </WebsocketContextProvider>
          </PersistGate>
        </Provider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default AppProvider;
