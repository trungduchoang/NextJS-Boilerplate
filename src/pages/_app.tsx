// libs
import Head from "next/head";
import { appWithTranslation } from "next-i18next";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
// components
import { AppEffects } from "@/effects/AppEffects";
import { RecursiveRender } from "@/utils/others";
// providers
import { AuthProvider, ReduxProvider } from "@/providers";
// others
import { theme } from "@/themes";
import { useInitStore } from "@/redux/store";
import "@/styles/index.css";

function App({ Component, pageProps }: AppProps) {
  // Init redux store
  const store = useInitStore(pageProps.pageData || {});

  return (
    <>
      <Head>
        <title>Rx-Next</title>
      </Head>
      <RecursiveRender
        structure={[
          [ThemeProvider, { theme }],
          [ReduxProvider, { store }],
          [StyledEngineProvider, {}],
          [ReduxProvider, { store }],
          [AuthProvider, {}],
        ]}
      >
        <AppEffects />
        <Component {...pageProps} />
      </RecursiveRender>
    </>
  );
}

export default appWithTranslation(App);
