/* eslint-disable no-param-reassign */
import { STORAGE_KEYS } from "@/constants";
import { cookie } from "@/utils/storage/cookie";
import axios from "axios";

export function commonHeadersInterceptor(language: string) {
  axios.interceptors.request.use(
    (config) => {
      config.headers["Accept-Language"] = language;
      const accessToken = cookie.get(STORAGE_KEYS.ACCESS_TOKEN);
      if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    },
    (error) => Promise.reject(error),
  );
}
