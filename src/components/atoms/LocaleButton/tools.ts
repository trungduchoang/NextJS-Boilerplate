const flagByLocale = {
  vi: "/flags/vietnam.svg",
  en: "/flags/american.svg",
  cn: "/flags/china.svg",
  ja: "/flags/japan.svg",
} as { [key in TSupportedLanguages]: string };

export const getFlagByLanguage = (language: TSupportedLanguages) =>
  flagByLocale[language];
