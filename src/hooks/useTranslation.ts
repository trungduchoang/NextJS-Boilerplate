import { useTranslation as _useTranslation } from "next-i18next";

export type TFunction = (key: string, params?: TObject) => string;
/**
 * useTranslation
 * @example const { t } = useTranslation();
 * Usages:
 * {t("common:login")} // common, home is name of files in /public/locales/[language]/name.json
 * {t("home:title")}
 */
export const useTranslation = () => {
  const { i18n, t, ready } = _useTranslation();

  return { t, currentLanguage: i18n.language, ready, i18n } as {
    t: TFunction;
    currentLanguage: TSupportedLanguages;
    ready: boolean;
    i18n: typeof i18n;
  };
};
