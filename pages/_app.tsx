/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';

import theme from '../styles/theme';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider theme={theme}>
    <Head>
      <title>Vuanem Realt1me</title>
      <link rel="shortcut icon" href="/favicon.ico" />
    </Head>
    <Component {...pageProps} />
  </ChakraProvider>
);

export default MyApp;
