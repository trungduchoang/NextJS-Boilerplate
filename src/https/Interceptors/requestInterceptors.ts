import { STORAGE_KEYS } from "@/constants";
import { cookie } from "@/utils/storage/cookie";
import { AXIOS_INSTANCE } from "../AxiosInstance";

/**
 * Intercept request
 */
const doAxiosRequestIntercept = () => {
  AXIOS_INSTANCE.interceptors.request.use(
    async (config) => {
      const accessToken = cookie.get(STORAGE_KEYS.ACCESS_TOKEN);
      // Use mutating for better performance
      // eslint-disable-next-line no-param-reassign
      config.headers[STORAGE_KEYS.AUTHORIZATION] = `Bearer ${accessToken}`;
      return config;
    },
    (error) => {
      Promise.reject(error);
    },
  );
};

export default doAxiosRequestIntercept;
