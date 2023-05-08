// libs
import { useTranslation as _useTranslation } from "next-i18next";

/**
 * useTranslation
 * @example const { t } = useTranslation();
 * Usages:
 * {t("common.login")} // common, home is name of files in /public/locales/[language]/name.json
 * {t("home.title")}
 * {t("home.export-farm-qt")}
 */
export const useTranslation = _useTranslation;
