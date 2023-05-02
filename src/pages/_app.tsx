// libs
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
// components
import { AppEffects } from "@/components/effects/AppEffects";
// interceptors
import { addLanguageInterceptor } from "@/interceptors";
// providers
import { ReduxProvider } from "@/providers";
// others
import { useInitStore } from "@/redux/store";
import "@/styles/index.css";

function App({ Component, pageProps }: AppProps) {
  // Add interceptors
  addLanguageInterceptor(pageProps._nextI18Next.initialLocale);

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
