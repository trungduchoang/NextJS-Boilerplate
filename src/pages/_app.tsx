// libs
import type { AppProps } from "next/app";
// components
import { AppEffects } from "@/components/effects/AppEffects";
// others
import "@/styles/index.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AppEffects />
      <Component {...pageProps} />
    </>
  );
}
