// libs
import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// configs
import { i18n } from "../../next-i18next.config";

/**
 * getI18nPaths
 * @example
 * export const getStaticPaths = () => ({
 *  fallback: false,
 *  paths: getI18nPaths(),
 * })
 */
export const getI18nPaths = () =>
  i18n.locales.map((lng) => ({
    params: {
      locale: lng,
    },
  }));

/**
 * getI18nPaths
 * @example
 * export const getStaticProps = async (ctx: GetStaticPropsContext) => {
 *  return {
 *    props: {
 *      ...(await getI18nProps(ctx, ["common", "home"])),
 *    },
 *  };
 * };
 */
export const getI18nProps = async (
  ctx: GetStaticPropsContext,
  ns = ["common"],
) => {
  // TODO: Check can ctx?.params?.locale be string[] for removing "as string" below
  const locale = ctx?.params?.locale || i18n.defaultLocale;
  return {
    ...(await serverSideTranslations(locale as string, ns)),
  };
};
