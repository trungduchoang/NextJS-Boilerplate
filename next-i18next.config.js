module.exports = {
  // debug: process.env.NODE_ENV === "development",
  i18n: {
    defaultLocale: "vi",
    locales: ["en", "vi"],
  },
  reloadOnPrerender: process.env.APP_ENV === "local",
};
