import dotenv from "dotenv";
import { v4 as uuid } from "uuid";
import { io } from "socket.io-client";

import { MessageType } from ".";

/**
 * This is the send message function this function will send a message to the socket server.
 *
 * @param {MessageType} message The message to be sent
 */

dotenv.config();

const sendMessage = async (message: MessageType): Promise<void> => {
  const responseToken: string = uuid();
  const socket: any = io(String(process.env.SOCKET_URL), {
    transports: ["websocket"],
  });

  socket.emit(
    "server-message",
    message,
    String(process.env.API_KEY),
    responseToken
  );

  socket.on(`sent:token(${responseToken})`, (): void => {
    socket.disconnect();
  });

  socket.on(`error:token(${responseToken})`, (err: unknown): void => {
    socket.disconnect();
    throw new Error(`Error: ${err} \n   Error code: CC_ERROR_0318`);
  });

  socket.on("connect-error", (): void => {
    socket.disconnect();
    throw new Error("Error: Connection error. \n   Error code: CC_ERROR_0001");
  });
};

export default sendMessage;
