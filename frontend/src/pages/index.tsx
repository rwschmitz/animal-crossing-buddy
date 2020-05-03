import React, { ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
import useSwr from 'swr';
import { useAuth, useCurrentUser } from '../hooks';
import { AuthForm } from '../components';
import { _Frame, _H1 } from '../ui';

import * as firebase from 'firebase/app';

const Home = (): ReactElement => {
  const { handleSignOut } = useAuth();
  const currentUser = useCurrentUser();

  // google sign in start

  const [isLoading, setIsLoading] = useState(true);

  // is this running too many times?
  const handleRedirect = (): void => {
    firebase
      .auth()
      .getRedirectResult()
      .then((result) => {
        if (result.credential) {
          console.log('result creds...');
        }
        setIsLoading(false);
        console.log('handle redirect ran...');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        console.log(errorCode);
        console.log(errorMessage);
        console.log(email);
        console.log(credential);
      });
  };

  // if a google account is already authenicated to the app,
  // you can't sign up with that same email as a un/pw account
  // this error occurs:
  // errorCode auth/email-already-in-use
  // errorMessage The email address is already in use by another account.
  const loginWithGoogle = (): void => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();
    firebase.auth().signInWithRedirect(googleProvider);
  };

  useEffect(() => {
    handleRedirect();
  }, []);

  // google sign in end

  const fetcher = (url: string): Promise<void> =>
    axios
      .get(url)
      .then((res) => res.data)
      .catch((error) => console.log(error));

  const { data, error } = useSwr(currentUser?.uid ? `/api/users?uid=${currentUser.uid}` : null, fetcher);
  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    const postData = async (): Promise<void> => {
      await axios.post('/api/users', {
        data: {
          uid: currentUser?.uid,
        },
      });
    };
    if (currentUser) {
      postData();
    }
  }, [currentUser]);

  return (
    <_Frame>
      {error && <div>error</div>}
      {!data && isLoading && <div>loading</div>}
      {!isLoading && (
        <>
          <_H1>Animal Crossing Buddy</_H1>
          {currentUser && (
            <>
              <div>welcome back!</div>
              <button onClick={handleSignOut}>sign out</button>
            </>
          )}
          {!currentUser && (
            <>
              <AuthForm formTitle='Sign up' submitButtonText='Sign up!' type='sign-up' />
              <AuthForm formTitle='Sign in' submitButtonText='Sign in!' />
              <button onClick={loginWithGoogle}>google sign in here</button>
            </>
          )}
        </>
      )}
      {data && isLoading && <div>auth is loading...</div>}
    </_Frame>
  );
};

export default Home;
