// libs
import Document, { Html, Head, Main, NextScript } from "next/document";
// others
import { i18n } from "../../next-i18next.config";

class MyDocument extends Document {
  render() {
    const currentLocale = this.props.__NEXT_DATA__.locale || i18n.defaultLocale;

    return (
      <Html lang={currentLocale}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
