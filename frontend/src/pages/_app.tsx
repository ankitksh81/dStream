import React from 'react';

import { Web3ReactProvider } from '@web3-react/core';
import { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Web3 from 'web3';

import { queryClient } from '@/api/index';
import { AuthProvider } from '@/contexts/auth';

import '../styles/main.css';
import 'video.js/dist/video-js.min.css';

const getLibrary = (provider: any): Web3 => new Web3(provider);

const MyApp = ({ Component, pageProps }: AppProps) => (
  <QueryClientProvider client={queryClient}>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Toaster />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </Web3ReactProvider>

    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

export default MyApp;
