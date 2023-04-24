// libs
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
// components
import { AppEffects } from "@/components/effects/AppEffects";
// others
import "@/styles/index.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AppEffects />
      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslation(App);
