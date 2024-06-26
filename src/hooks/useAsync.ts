import { AxiosError } from "axios";
import { useState, useCallback } from "react";

type TResult<TResponse, TRequestBody, TRequestParams> = {
  execute: (props?: {
    data?: TRequestBody;
    params?: TRequestParams;
    cbSuccess?: (res: TResponse) => void;
    cbError?: (res: AxiosError) => void;
  }) => void;
  pending: boolean;
  response?: Expand<TResponse>;
  error?: AxiosError;
};
/**
 * useAsync
 * @param asyncFunction
 * @return execute
 * @return pending
 * @return response
 * @return error
 */
export function useAsync<TResponse, TRequestBody, TRequestParams>(
  asyncFunction: Function,
) {
  const [pending, setPending] = useState(false);
  const [response, setResponse] = useState<Expand<TResponse>>();
  const [error, setError] = useState<AxiosError>();

  const execute = useCallback(
    (props?: any) => {
      const {
        data,
        params,
        cbSuccess = noop,
        cbError = defaultCbError,
      } = props || {};
      setPending(true);
      setResponse(undefined);
      setError(undefined);

      return asyncFunction({
        data,
        params,
      })
        .then((response: any) => {
          setResponse(response);
          cbSuccess(response);
        })
        .catch((error: AxiosError) => {
          setError(error);
          cbError(error);
        })
        .finally(() => setPending(false));
    },
    [asyncFunction],
  );

  const result: TResult<TResponse, TRequestBody, TRequestParams> = {
    execute,
    pending,
    response,
    error,
  };

  return result;
}

function noop() {}
function defaultCbError(e: AxiosError) {
  // eslint-disable-next-line no-console
  console.log(e);
}
