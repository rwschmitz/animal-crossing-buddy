import { useEffect } from 'react';
import * as firebase from 'firebase/app';
import { config } from './config';

const useFirebase = (): void => {
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
      firebase.app();
    }
  }, []);
};

export { useFirebase };
