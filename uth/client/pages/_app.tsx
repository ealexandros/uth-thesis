import "antd/dist/antd.css";
import type { AppProps } from "next/app";
import "../styles/globals.css";

import Head from "next/head";
import { AuthProvider } from "../contexts/authentication";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <div>
        <Head>
          <link rel="shortcut icon" href="/uth-logo.png" />
        </Head>
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  );
}

export default MyApp;
