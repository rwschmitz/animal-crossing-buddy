import React, { ReactElement } from 'react';
import { AppProps } from 'next/app';
import '../index.css';

const AnimalCrossingBuddy = ({ Component, pageProps }: AppProps): ReactElement => {
  return <Component {...pageProps} />;
};

export default AnimalCrossingBuddy;
