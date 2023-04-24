// libs
import { GetStaticPropsContext } from "next";
import { getI18nPaths, getI18nProps } from "@/lib/getStatic";

export default function Home() {
  return <h1>TODO:</h1>;
}

export const getStaticPaths = () => ({
  fallback: false,
  paths: getI18nPaths(),
});
export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  return {
    props: {
      ...(await getI18nProps(ctx, ["common", "404"])),
    },
  };
};
