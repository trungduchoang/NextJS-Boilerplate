import languageDetector from "next-language-detector";
import { i18n } from "../../next-i18next.config";

export default languageDetector({
  fallbackLng: i18n.defaultLocale,
  supportedLngs: i18n.locales,
});
