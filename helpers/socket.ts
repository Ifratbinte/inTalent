import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NEXT_PUBLIC_SOCKET_BASE_URL ?? "https://intalent.rixotech.com";
// const URL = "http://localhost:4200/";

export const createSocketInstance = (userId: number) =>
  io(URL, {
    autoConnect: false,
    extraHeaders: {
      "user-id": `${userId}`,
    },
  });
