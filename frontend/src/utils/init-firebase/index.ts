import * as firebase from 'firebase/app';
import { config } from './config';

const initFirebase = (): void => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
    firebase.app();
  }
};

export { initFirebase };
