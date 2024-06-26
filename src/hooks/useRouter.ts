import { NextRouter, useRouter as _useRouter } from "next/router";
import { useTranslation } from "./useTranslation";
import { i18n } from "next-i18next.config";

type TPushOptions = {
  atNewTab?: boolean;
};
/**
 * useRouter
 */
export const useRouter = () => {
  const router = _useRouter();
  const { currentLanguage } = useTranslation();

  return {
    ...router,
    /**
     * push
     * @param url
     * @param query
     */
    push: (url: string, query?: TObject, options?: TPushOptions) => {
      let lastUrl = url;
      if (lastUrl[0] !== "/" && lastUrl.slice(0, 4) !== "http")
        lastUrl = `/${lastUrl}`;
      const hasLang = url.slice(0, 3).includes(currentLanguage);
      if (!hasLang && currentLanguage !== i18n.defaultLocale)
        lastUrl = `/${currentLanguage}${lastUrl}`;
      if (query) {
        lastUrl = `${lastUrl}?${toSearchString(query)}`;
      }
      if (options?.atNewTab)
        window.open(window.location.origin + lastUrl, "_blank");
      else router.push(lastUrl);
    },
  } as Omit<NextRouter, "query" | "push"> & {
    query: { [key: string]: string };
    push: (url: string, query?: TObject, options?: TPushOptions) => void;
  };
};

function toSearchString(params: TObject) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    searchParams.append(key, value);
  });
  return searchParams.toString();
}
