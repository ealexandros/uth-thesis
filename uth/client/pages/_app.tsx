import type { AppProps } from "next/app";
import "antd/dist/antd.css";
import "../styles/globals.css";

import Head from "next/head";
import { AuthProvider } from "../contexts/authentication";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../lib/react-query";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

const ErrorFallback = ({ error }: FallbackProps) => (
  <div className="w-screen h-screen flex flex-col justify-center items-center space-y-2">
    <h2 className="text-lg text-center">
      {error.message || "No error message."}
    </h2>
    <button
      className="py-1 px-4 bg-primary text-white rounded-lg"
      onClick={() => window.location.reload()}
    >
      refresh
    </button>
  </div>
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryClientProvider client={queryClient}>
          <Head>
            <title>University of Thessaly</title>
            <link rel="shortcut icon" href="/uth-logo.png?v=1.0" />
          </Head>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ErrorBoundary>
    </AuthProvider>
  );
}

export default MyApp;
