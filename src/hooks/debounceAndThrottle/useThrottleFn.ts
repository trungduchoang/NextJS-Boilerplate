import { useRef } from "react";

/**
 * useThrottleFn
 * @param fn
 * @param ms - fn will be execute every {ms} miliseconds (default: 200ms)
 * @example
 * const [throttledFn] = useThrottleFn(() => { console.log("example"); })
 */
export function useThrottleFn<TArguments extends unknown[]>(
  fn: (...args: TArguments) => void,
  ms = 200,
) {
  const timer = useRef<string>("");
  const execute = (...args: TArguments) => {
    if (!timer.current) {
      fn(...args);
      timer.current = "timing";
      setTimeout(() => {
        timer.current = "";
      }, ms);
    }
  };

  return [execute];
}
