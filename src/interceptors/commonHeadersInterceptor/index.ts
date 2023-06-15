/* eslint-disable no-param-reassign */
import { AXIOS_INSTANCE } from "@/configs/Axios";
import { STORAGE_KEYS } from "@/constants";
import { cookie } from "@/utils/storage/cookie";

export function commonHeadersInterceptor(language: string) {
  AXIOS_INSTANCE.interceptors.request.use(
    (config) => {
      config.headers["Accept-Language"] = language;
      const accessToken = cookie.get(STORAGE_KEYS.ACCESS_TOKEN);
      if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    },
    (error) => Promise.reject(error),
  );
}
