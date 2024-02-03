import { i18n } from "next-i18next.config";

type TConfig = {
  on?: "current-tab" | "other-tab";
  shallow?: boolean;
};
/**
 * windowOpenKeepLocale
 */
export const windowOpenKeepLocale = (url: string, config: TConfig) => {
  const { pathname } = window.location;
  const currentLocale = i18n.locales.find((locale) =>
    pathname.includes(locale),
  );
  if (!currentLocale) {
    open(url);
    return;
  }
  if (currentLocale && url.includes(currentLocale)) {
    open(url);
    return;
  }
  let lastUrl = url;
  if (url[0] === "/") lastUrl = `/${currentLocale}${url}`;
  if (url[0] !== "/") lastUrl = `${currentLocale}/${url}`;
  open(lastUrl);

  function open(_url: string) {
    if (config.shallow) window.history.pushState(null, "", _url);
    else if (config.on)
      window.open(
        _url,
        {
          "current-tab": "_self",
          "other-tab": "_blank",
        }[config.on],
      );
  }
};
