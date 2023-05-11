// libs
// eslint-disable-next-line no-restricted-imports
import { UseTranslationResponse } from "react-i18next";
import { useTranslation as _useTranslation } from "next-i18next";

export type TFunction = (key: string, params?: TObject) => string;
/**
 * useTranslation
 * @example const { t } = useTranslation();
 * Usages:
 * {t("common:login")} // common, home is name of files in /public/locales/[language]/name.json
 * {t("home:title")}
 * {t("home:export-farm-qt")}
 */
export const useTranslation = () => {
  const props = _useTranslation();
  return props as Omit<
    UseTranslationResponse<"translation", undefined>,
    "t"
  > & { t: TFunction };
};
