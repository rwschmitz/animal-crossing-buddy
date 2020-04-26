import React, { ReactElement } from 'react';
import { AppProps } from 'next/app';
import { initFirebase } from '../utils';
import '../../node_modules/normalize.css/normalize.css';
import '../../index.css';

// Using this pattern for global css and to init Firebase
const AnimalCrossingBuddy = ({ Component, pageProps }: AppProps): ReactElement => {
  initFirebase();
  return <Component {...pageProps} />;
};

export default AnimalCrossingBuddy;
