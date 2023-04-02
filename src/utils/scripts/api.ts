import axios, { AxiosInstance } from "axios";
import dotenv from "dotenv";

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
  updateIconColor: "/api/update-icon-color",
  getPublicRooms: "/api/get-public-rooms",
  getContent: "/api/get-content",
  uploadContent: "/api/upload-content",
};

export const apiInstance: AxiosInstance = axios.create({
  baseURL: String(process.env.API_URL),
});

const api: any = {
  apiKey: apiKey,
  endpoints: endpoints,
  instance: apiInstance,
};

export default api;
