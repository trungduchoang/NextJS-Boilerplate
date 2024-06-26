import axios from "axios";
import jwtDecode from "jwt-decode";
import { STORAGE_KEYS } from "@/constants";
import { cookie } from "@/utils/storage/cookie";
import { AXIOS_INSTANCE } from "@/configs/Axios";

/**
 * refreshTokenIntercept
 */
export const refreshTokenIntercept = () => {
  AXIOS_INSTANCE.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest.isRefreshed) {
        originalRequest.isRefreshed = true;
        const refreshToken = cookie.get(STORAGE_KEYS.REFRESH_TOKEN);
        if (!refreshToken) return Promise.reject(error);
        return axios
          .request({
            data: {
              refreshToken,
            },
          })
          .then((res: any) => {
            const { exp: refreshTokenExpire = 0 } =
              jwtDecode<any>(res.refreshToken) || {};
            const { exp: accessTokenExpire = 0 } =
              jwtDecode<any>(res.accessToken) || {};
            cookie.set({
              name: STORAGE_KEYS.REFRESH_TOKEN,
              value: res.refreshToken,
              exactlyTime: new Date(+new Date() + +refreshTokenExpire),
            });
            cookie.set({
              name: STORAGE_KEYS.ACCESS_TOKEN,
              value: res.accessToken,
              exactlyTime: new Date(+new Date() + +accessTokenExpire),
            });
            return AXIOS_INSTANCE({
              ...originalRequest,
              headers: {
                ...originalRequest.headers,
                Authorization: `Bearer ${res.accessToken}`,
              },
            });
          })
          .catch(() => {
            cookie.remove(STORAGE_KEYS.ACCESS_TOKEN);
            cookie.remove(STORAGE_KEYS.REFRESH_TOKEN);
            window.open("/login", "_self");
          });
      }

      return Promise.reject(error);
    },
  );
};
