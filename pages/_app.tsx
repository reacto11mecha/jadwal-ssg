import type { AppProps } from "next/app";
import Head from "next/head";

import "picnic";
import "@fontsource/lato/700.css";
import "@fontsource/poppins/400.css";

import "@/styles/globals.css";

import DarkModeProvider, { useDarkMode } from "@/context/darkMode";

const ThemeColorChanger = () => {
  const { isDarkTheme } = useDarkMode();

  return (
    <>
      <Head>
        <meta
          name="theme-color"
          content={isDarkTheme || false ? "#0d0d0d" : "#fff"}
        />
      </Head>
    </>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DarkModeProvider>
      <ThemeColorChanger />
      <Component {...pageProps} />
    </DarkModeProvider>
  );
}

export default MyApp;
