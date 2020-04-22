import React, { ReactElement } from 'react';
import { AppProps } from 'next/app';
import '../../node_modules/normalize.css/normalize.css';
import '../../index.css';

// Using this pattern for global css
const AnimalCrossingBuddy = ({ Component, pageProps }: AppProps): ReactElement => {
  return <Component {...pageProps} />;
};

export default AnimalCrossingBuddy;
