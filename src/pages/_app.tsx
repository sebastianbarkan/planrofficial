import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { PageWrapper } from "@/components/PageWrapper/PageWrapper";

export default function App({ Component, pageProps }: AppProps) {
  const metaTitle = `Planr`;
  const metaDescription = `Your perfect trip needs a perfect plan.`;
  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={pageProps.session}>
        <PageWrapper>
          <Component {...pageProps} />
        </PageWrapper>
      </SessionProvider>
    </>
  );
}
