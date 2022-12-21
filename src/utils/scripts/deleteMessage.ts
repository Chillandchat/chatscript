import { v4 as uuid } from "uuid";
import { io } from "socket.io-client";
import dotenv from "dotenv";

dotenv.config();

/**
 * This is the delete message function, this function will delete a message using the server socket
 *
 * @param {string} id The id of the message.
 * @param {string} room The room of the message.
 */

const deleteMessage = async (id: string, room: string): Promise<void> => {
  const responseToken: string = uuid();
  const socket: any = io(String(process.env.SOCKET_URL), {
    transports: ["websocket"],
  });

  socket.emit(
    "server-message-delete",
    id,
    room,
    responseToken,
    String(process.env.API_KEY)
  );

  socket.on(`deleted:token(${responseToken})`, (): void => {
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

export default deleteMessage;
