import type { AppProps } from "next/app";
import "antd/dist/antd.css";
import "../styles/globals.css";

import Head from "next/head";
import { AuthProvider } from "../contexts/authentication";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Head>
        <title>University of Thessaly</title>
        <link rel="shortcut icon" type="image/png" href="/uth-logo.png?v=1.0" />
      </Head>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
