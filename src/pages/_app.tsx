// libs
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { StyledEngineProvider } from "@mui/material/styles";
// components
import { AppEffects } from "@/components/effects/AppEffects";
// providers
import { AuthProvider, ReduxProvider } from "@/providers";
import { ConfirmProvider } from "material-ui-confirm";
// others
import { useInitStore } from "@/redux/store";
import "@/styles/index.css";

function App({ Component, pageProps }: AppProps) {
  // Init redux store
  const store = useInitStore(pageProps.pageData || {});

  return (
    <ReduxProvider store={store}>
      <ConfirmProvider>
        <AuthProvider>
          <StyledEngineProvider>
            <AppEffects />
            <Component {...pageProps} />
          </StyledEngineProvider>
        </AuthProvider>
      </ConfirmProvider>
    </ReduxProvider>
  );
}

export default appWithTranslation(App);
