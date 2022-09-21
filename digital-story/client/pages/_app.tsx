import "antd/dist/antd.css";
import type { AppProps } from "next/app";
import "styles/globals.css";

import { queryClient } from "lib/react-query";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { QueryClientProvider } from "react-query";
import { NextPageWithLayout } from "types";

import { TbPlugConnectedX } from "react-icons/tb";

const ErrorFallback = ({ error }: FallbackProps) => (
  <div className="w-screen h-screen flex flex-col justify-center items-center space-y-8">
    <TbPlugConnectedX size="8em" className="text-light opacity-90" />
    <div className="space-y-1 text-center w-full">
      <h1 className="text-xl text-light">Ooops!</h1>
      <h5 className="text-md text-center text-light opacity-60 px-4 md:px-0 md:w-2/6 m-auto">
        Message: {error.message || "No error message."}
      </h5>
    </div>

    <button
      className="py-1 px-6 shadow-md bg-primary text-white rounded-md hover:bg-primary-hover"
      onClick={() => window.location.reload()}
    >
      refresh
    </button>
  </div>
);

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>Digital Story</title>
          <link rel="shortcut icon" href="/digital-story-logo.svg?v=1.0" />
        </Head>
        {getLayout(<Component {...pageProps} />)}
        <NextNProgress color="#D5A021" height={2} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default MyApp;
