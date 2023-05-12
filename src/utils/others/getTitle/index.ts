export const getTitle = (languagesData: any) =>
  languagesData._nextI18Next.initialI18nStore[
    languagesData._nextI18Next.initialLocale
  ].common.title;
