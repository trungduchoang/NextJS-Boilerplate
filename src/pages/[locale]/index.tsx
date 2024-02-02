// libs
import { GetStaticPropsContext } from "next";
import { getI18nPaths, getI18nProps } from "@/lib/getStatic";
// views
import HomePage from "@/views/Home";

export default function Home() {
  return <HomePage />;
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
