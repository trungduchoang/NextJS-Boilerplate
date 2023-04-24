// libs
import { useTranslation } from "next-i18next";
import { GetStaticPropsContext } from "next";
import { getI18nPaths, getI18nProps } from "@/lib/getStatic";

export default function Home() {
  const { t } = useTranslation();

  return <h1>{t("home:title")}</h1>;
}

export const getStaticPaths = () => ({
  fallback: false,
  paths: getI18nPaths(),
});
export const getStaticProps = async (ctx: GetStaticPropsContext) => ({
  props: {
    ...(await getI18nProps(ctx, ["common", "home"])),
  },
});
