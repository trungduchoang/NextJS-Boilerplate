/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";

/**
 * useThrottleFn
 * @param fn
 * @param ms - fn will be execute every {ms} miliseconds (default: 200ms)
 * @example
 * const [throttledFn] = useThrottleFn(() => { console.log("example"); })
 */
export function useThrottleFn(fn: (...args: any) => void, ms = 200) {
  const timer = useRef<string>("");
  const execute = (...args: any) => {
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
