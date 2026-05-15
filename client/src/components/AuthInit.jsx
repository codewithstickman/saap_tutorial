import { getAccessToken } from "@privy-io/react-auth";
import axios from "axios";

export function AuthInit() {
axios.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
};