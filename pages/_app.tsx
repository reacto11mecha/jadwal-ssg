import type { AppProps } from "next/app";

import "picnic";
import "@fontsource/lato/700.css";
import "@fontsource/poppins/400.css";

import "@/styles/globals.css";

import DarkModeProvider from "@/context/darkMode";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DarkModeProvider>
      <Component {...pageProps} />
    </DarkModeProvider>
  );
}

export default MyApp;
