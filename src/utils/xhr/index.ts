// libs
import { AxiosRequestConfig, Method } from "axios";
// others
import { AXIOS_INSTANCE } from "@/configs/Axios";

type TConfigs = Omit<
  AxiosRequestConfig,
  "data" | "params" | "url" | "method"
> & { url: string; method: Method };
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
export function buildXHR<TResponse, TRequestBody, TRequestParams>(
  configs: TConfigs,
): (props: {
  data?: Expand<TRequestBody>;
  params?: Expand<TRequestParams>;
}) => Promise<Expand<TResponse>> {
  return async ({ data, params }) =>
    AXIOS_INSTANCE.request({ ...configs, data, params });
}
