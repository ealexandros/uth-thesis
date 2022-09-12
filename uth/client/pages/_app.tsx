import type { AppProps } from "next/app";
import "antd/dist/antd.css";
import "../styles/globals.css";

import Head from "next/head";
import { AuthProvider } from "../contexts/authentication";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../lib/react-query";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>University of Thessaly</title>
          <link rel="shortcut icon" href="/uth-logo.png?v=1.0" />
        </Head>
        <Component {...pageProps} />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default MyApp;
