import dotenv from "dotenv";
import axios, { AxiosInstance } from "axios";

import { ApiEndpoints } from "./index.d";

dotenv.config();

export const apiKey: string = String(process.env.API_KEY);

export const endpoints: ApiEndpoints = {
  home: "/",
  login: "/api/login",
  signup: "/api/signup",
  getMessages: "/api/get-messages",
  getUserInfo: "/api/get-user-info",
  getUsers: "/api/get-users",
  reportRoom: "/api/report-room",
  blockUser: "/api/block-user",
  getRoom: "/api/get-rooms",
  createRoom: "/api/create-room",
  joinRoom: "/api/join-room",
  removeRoom: "/api/remove-room",
  followUser: "/api/follow-user",
  unfollowUser: "/api/unfollow-user",
  updateDescription: "/api/update-description",
};

export const apiInstance: AxiosInstance = axios.create({
  baseURL: String(process.env.API_URL),
});

const api: any = {
  apiKey: apiKey,
  endpoints: endpoints,
  instance: apiInstance,
};

if (
  process.env.API_KEY === undefined ||
  process.env.API_URL === undefined ||
  process.env.SOCKET_URL === undefined
) {
  console.error(
    "Error: API key or API url not found in the .env file, please make sure the variable is set and present. \nError code: CC_ERROR_1591"
  );
}

export default api;
