import { GetStaticPropsContext } from "next";
import { TReducerNames } from "@/redux/store";

export type TPageProps = {
  page: string;
  pageData?: TObject & { reducerName: TReducerNames };
  commonData?: TObject;
  title: string;
  description: string;
};

type TPrebuildData = {
  props: TPageProps;
};
export type TGetServerSidePropsaa = TPrebuildData & { revalidate?: never };
export type TGetStaticProps = TPrebuildData & { revalidate: number };
export type TPrefetchContext = GetStaticPropsContext<{
  [key: string]: string;
}> & { query?: TObject } & TObject;
