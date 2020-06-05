import React, { ReactElement } from 'react';
import { AppProps } from 'next/app';
import { initAmplify } from '../utils';
import '../../node_modules/normalize.css/normalize.css';
import '../../index.css';

// Using this pattern for global css and to init Amplify
const AnimalCrossingBuddy = ({ Component, pageProps }: AppProps): ReactElement => {
  initAmplify();
  return <Component {...pageProps} />;
};

export default AnimalCrossingBuddy;
