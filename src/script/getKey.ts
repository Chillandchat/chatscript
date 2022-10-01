import { AxiosResponse } from "axios";
import api from "./api";

/**
 * This is the get key function, this function just fetches the key from the server and sets it as the api key.
 *
 * @param {string} key  The key given by the bot utility
 */

const getKey = async (key: string): Promise<void> => {
  await api.instance
    .get(`${api.getKey}?botKey=${key}`)
    .then((data: AxiosResponse): void => {
      api.apiKey = Buffer.from(
        Buffer.from(data.data, "binary").toString("base64"),
        "base64"
      ).toString("ascii");
    })
    .catch((err: unknown): void => {
      throw new Error(`API Error: ${err} \n   Error code: CC_ERROR_0318`);
    });
};

export default getKey;
