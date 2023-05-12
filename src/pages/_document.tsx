import Document, { Html, Head, Main, NextScript } from "next/document";
import { i18n } from "../../next-i18next.config";

class MyDocument extends Document {
  render() {
    const currentLocale = this.props.__NEXT_DATA__.locale || i18n.defaultLocale;
    const { pageProps } = this.props.__NEXT_DATA__.props || {};

    return (
      <Html lang={currentLocale}>
        <Head>
          <title>{pageProps?.title || "Vietrade"}</title>
          <meta
            name="description"
            content={pageProps.description || "Vietrade"}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
