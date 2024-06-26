import { useCallback, useEffect, useRef } from "react";

/**
 * useDebounceFn
 * @param fn
 * @param deps
 * @param wait
 * @example
 * const [debouncedFn] = useDebounceFn(() => { console.log("example"); })
 */
export function useDebounceFn<TArguments extends unknown[]>(
  fn: (...params: TArguments) => void,
  wait = 300,
) {
  const timer = useRef<NodeJS.Timeout>();

  const fnRef = useRef<(...params: TArguments) => void>(fn);
  fnRef.current = fn;

  const cancel = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
  }, []);

  const execute = useCallback(
    (...params: TArguments) => {
      cancel();
      timer.current = setTimeout(() => {
        fnRef.current(...params);
      }, wait);
    },
    [wait, cancel],
  );

  useEffect(() => cancel, []);

  return [execute, cancel];
}
