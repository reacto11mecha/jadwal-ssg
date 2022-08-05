import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";

import themeInitializerScript from "@/utils/theme";

interface Props {
  themeScript: string;
}

class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const themeScript = await themeInitializerScript();

    return { ...initialProps, themeScript };
  }

  render() {
    return (
      <Html lang="id">
        <Head>
          <link rel="icon" href="/favicon.png" />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <body>
          <script
            dangerouslySetInnerHTML={{
              __html: this.props.themeScript,
            }}
          ></script>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
