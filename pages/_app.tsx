// pages/_app.tsx
import "../app/globals.css"; // Import global styles
import { AppProps } from "next/app"; // Import types from Next.js

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
