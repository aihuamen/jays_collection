import { ApolloProvider } from '@apollo/client';
import { EmotionCache, CacheProvider } from '@emotion/react';
import { PaletteMode, useMediaQuery } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SnackbarProvider } from 'notistack';
import React, { useMemo, useState } from 'react';
import { useApollo } from '../src/graphql/client';
import '../style/style.css';
import { generateTheme } from '../src/theme';
import { ColorModeContext } from '../src/context/ColorModeContext';
import createEmotionCache from '../src/utils/createEmotionCache';
import { NextPage } from 'next';
import { IColorToggleMode } from '../src/context/ColorModeContext';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const App: NextPage<MyAppProps> = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) => {
  const [mode, setMode] = useState<PaletteMode>('light');
  const colorMode = useMemo<IColorToggleMode>(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );
  const theme = useMemo(() => generateTheme(mode), [mode]);
  const client = useApollo(pageProps.initialApolloState);
  const downSM = useMediaQuery('(max-width:600px)');
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <CacheProvider value={emotionCache}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <SnackbarProvider autoHideDuration={3000} dense={downSM}>
              <ApolloProvider client={client}>
                <Component {...pageProps} />
              </ApolloProvider>
            </SnackbarProvider>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </CacheProvider>
    </>
  );
};

export default App;
