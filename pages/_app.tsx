import { ApolloProvider } from "@apollo/client";
import { StyledEngineProvider, Theme, useMediaQuery } from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SnackbarProvider } from "notistack";
import React from "react";
import { useApollo } from "../graphql/client";
import "../style/style.css";
import MyTheme from "../theme";


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


export default function App({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloState);
  const downSM = useMediaQuery("(max-width:600px)");
  return <>
    <Head>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />
    </Head>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={MyTheme}>
        <SnackbarProvider autoHideDuration={3000} dense={downSM}>
          <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </>;
}
