import { useState, useEffect } from "react";
import { cookie } from "@/utils/storage/cookie";

/**
 * useCookie
 * @description get and manage cookie by useState
 */
export function useCookie(name: string) {
  const [value, setValue] = useState<string | null>(null);

  const cookieValue = cookie.get(name);
  useEffect(() => {
    setValue(cookieValue);
  }, [cookieValue]);

  return { value };
}
