// libs
import { AxiosRequestConfig, Method } from "axios";
// others
import { AXIOS_INSTANCE } from "@/https/AxiosInstance";

type TUrlBuilder<TUrlParams> = (props: TUrlParams) => string;
type TConfigs<TUrlParams> = Omit<
  AxiosRequestConfig,
  "data" | "params" | "url" | "method"
> & {
  url: string | TUrlBuilder<TUrlParams>;
  method: Method;
  urlParams?: TUrlParams;
};
/**
 * buildXHR
 * @example
 * const requestRefreshAuth = buildXHR<
 *   TResponse,
 *   TRequestBody,
 *   TRequestParams
 * >({
 *   url: "/api-url",
 *   method: "POST",
 * });
 */
export function buildXHR<
  TResponse,
  TRequestBody,
  TRequestParams,
  TUrlParams = {}, // TODO: Make TUrlParams cleaner and done in rx
>(
  configs: TConfigs<TUrlParams>,
): (props?: {
  data?: Expand<TRequestBody>;
  params?: Expand<TRequestParams>;
  urlParams?: Expand<TUrlParams>;
}) => Promise<Expand<TResponse>> {
  const { url, ...restConfigs } = configs;

  return async ({ data, params, urlParams } = {}) =>
    AXIOS_INSTANCE.request({
      ...restConfigs,
      url: buildUrl(url, urlParams),
      data,
      params,
    }).then((res) => res.data);
}

function buildUrl<TUrlParams>(
  url: string | TUrlBuilder<TUrlParams>,
  urlParams?: Expand<TUrlParams>,
) {
  if (typeof url === "string") return url;
  return url(urlParams as TUrlParams);
}
