// libs
import { useEffect } from "react";
import { useRouter } from "next/router";
import languageDetector from "@/lib/languageDetector";

type TProps = {
  to: string;
};
/**
 * Redirect
 * TODO: Is this working properly?
 * @example <Redirect to="/" />
 */
export const Redirect = (props?: TProps) => {
  const router = useRouter();
  const to = props?.to || router.asPath;

  useEffect(() => {
    const detectedLng = languageDetector.detect();
    if (to.startsWith(`/${detectedLng}`) && router.route === "/404") {
      // prevent endless loop
      router.replace(`/${detectedLng}${router.route}`);
      return;
    }
    if (languageDetector.cache && detectedLng)
      languageDetector.cache(detectedLng);
    router.replace(`/${detectedLng}${to}`);
  });

  return <></>;
};
