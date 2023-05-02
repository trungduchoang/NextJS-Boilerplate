import axios from "axios";

export function addLanguageInterceptor(language: string) {
  axios.interceptors.request.use(
    (config) => {
      // eslint-disable-next-line no-param-reassign
      config.headers["Accept-Language"] = language;
      return config;
    },
    (error) => Promise.reject(error),
  );
}
