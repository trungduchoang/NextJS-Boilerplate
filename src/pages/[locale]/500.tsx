// libs
import { getI18nPaths, getI18nProps } from "@/lib/getStatic";
// types
import { TGetStaticProps, TPrefetchContext } from "@/types/nextjs";
// hooks
import { useTranslation } from "@/hooks/useTranslation";
// others
import { promiseAll } from "@/utils/others/promiseAll";
import { REVALIDATE_TIME } from "@/configs";

export default function InternalErrorPage() {
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
          500
        </h1>
        <h3 style={{ textAlign: "center", margin: 0 }}>{t("500:title")}</h3>
      </div>
    </div>
  );
}

export const getStaticPaths = () => ({
  fallback: false,
  paths: getI18nPaths(),
});

export const getStaticProps = (context: TPrefetchContext) =>
  promiseAll<TGetStaticProps>([getI18nProps(context, ["common", "500"])], {
    then: ([languagesData]) => ({
      props: {
        page: "500",
        title: "Internal Server Error",
        ...languagesData,
      },
      revalidate: REVALIDATE_TIME,
    }),
  });
