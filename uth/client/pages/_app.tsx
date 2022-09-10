import "../styles/globals.css";
import "antd/dist/antd.css";
import type { AppProps } from "next/app";

import { AuthProvider } from "../contexts/authentication";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
