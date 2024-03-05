import { createSocketInstance } from "#helpers/socket";
import { RootState } from "#stores/store";
import react, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";

export const WebsocketCtx = react.createContext<{
  socket: Socket<any, any> | null;
}>({
  socket: null,
});

interface Props {
  children: React.ReactNode;
}

const WebsocketContextProvider: React.FC<Props> = ({ children }) => {
  const [socket, setSocket] = useState<Socket<any, any> | null>(null);

  const user = useSelector((state: RootState) => state.user);

  // Effect to create socket instance when user ID changes
  useEffect(() => {
    if (!user.data?.id) return;
    console.log({ user: user.data });
    setSocket(createSocketInstance(user.data?.id));
  }, [user.data?.id]);

  return (
    <WebsocketCtx.Provider value={{ socket }}>{children}</WebsocketCtx.Provider>
  );
};

export default WebsocketContextProvider;
