// libs
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
// components
import { AppEffects } from "@/components/effects/AppEffects";
// providers
import { ReduxProvider } from "@/providers";
// others
import { useInitStore } from "@/redux/store";
import "@/styles/index.css";

function App({ Component, pageProps }: AppProps) {

  // Init redux store
  const store = useInitStore(pageProps.pageData || {});

  return (
    <ReduxProvider store={store}>
      <AppEffects />
      <Component {...pageProps} />
    </ReduxProvider>
  );
}

export default appWithTranslation(App);
