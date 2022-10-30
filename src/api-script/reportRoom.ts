import { AxiosResponse } from "axios";

import api from "./api";

/**
 * This is the reportRoom function, this function will report a room.
 *
 * @param {string} roomId The room id to be reported.
 * @param {string} message The message that's left when the room is reported.
 * @param {string} user The user who reported the room.
 */

const reportRoom = async (
  roomId: string,
  user: string,
  message: string
): Promise<void> => {
  await api.instance
    .post(`${api.endpoints.reportRoom}?key=${api.apiKey}`, {
      room: roomId,
      message: message,
      user: user,
    })
    .then((_response: AxiosResponse): void => {})
    .catch((err: unknown): void => {
      throw new Error(`API Error: ${err} \n   Error code: CC_ERROR_0318`);
    });
};

export default reportRoom;
