import { getI18nPaths, getI18nProps } from "@/lib/getStatic";
import { TGetStaticProps, TPrefetchContext } from "@/types/nextjs";
import { useTranslation } from "@/hooks/useTranslation";
import { promiseAll } from "@/utils/others/promiseAll";
import { REVALIDATE_TIME } from "@/configs";

export default function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "70vh",
      }}
    >
      <div>
        <h1
          style={{
            textAlign: "center",
            lineHeight: "100px",
            fontSize: 100,
            margin: 0,
          }}
        >
          404
        </h1>
        <h3 style={{ textAlign: "center", margin: 0 }}>{t("404:title")}</h3>
      </div>
    </div>
  );
}

export const getStaticPaths = () => ({
  fallback: false,
  paths: getI18nPaths(),
});

export const getStaticProps = (context: TPrefetchContext) =>
  promiseAll<TGetStaticProps>([getI18nProps(context, ["common", "404"])], {
    then: ([languagesData]) => ({
      props: {
        page: "404",
        title: "Page Not Found",
        ...languagesData,
      },
      revalidate: REVALIDATE_TIME,
    }),
  });
