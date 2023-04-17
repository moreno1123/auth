import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClientProvider, QueryClient } from 'react-query';
import React from "react";
import PageWithIndexLayoutType from "@/types/page";

//create new query client for stashing data to cache
const queryClient = new QueryClient();

type AppLayoutProps = {
  Component: PageWithIndexLayoutType,
  pageProps: any
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppLayoutProps) {

  const Layout = Component.layout || ((children) => <>{children}</>)

  return (
    <>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <ToastContainer
            position="top-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />

          {Component.layout == null ? (
              <Component {...pageProps} />
            ) : (
              <Layout>
                <Component {...pageProps} />
              </Layout>
            )
          }

          
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}
