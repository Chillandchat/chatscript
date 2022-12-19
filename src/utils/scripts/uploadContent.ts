import { AxiosResponse } from "axios";
import { v4 as uuid } from "uuid";

import { ContentType } from "./index.d";
import api from "./api";

/**
 * This is the upload content script, this script will upload the content to the upload content endpoint.
 *
 * @param {string} user The user that the image is sent on behalf.
 * @param {string} content The content of the image or gif.
 * @param {ContentType} type The type of the content format in the content parameter.
 *
 * @note The content MUST be in a base-64 format!!!!
 */

const uploadContent = async (
  user: string,
  content: string,
  type: ContentType
): Promise<void> => {
  await api.instance
    .post(`${api.endpoints.uploadContent}?key=${api.apiKey}`, {
      id: uuid(),
      content: content,
      type: type,
      user: user,
    })
    .then((_data: AxiosResponse): void => {})
    .catch((err: unknown): void => {
      throw new Error(`API Error: ${err} \n   Error code: CC_ERROR_0318`);
    });
};

export default uploadContent;
