import { FormEvent, useState } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';

interface UseAuthReturnValues {
  handleEmail: (value: string) => void;
  handlePassword: (value: string) => void;
  handleSignIn: (event: FormEvent) => void;
  handleSignOut: () => void;
  handleSignUp: (event: FormEvent) => void;
  email: string;
  password: string;
}

interface AuthError extends Error {
  code: string;
  message: string;
}

const useAuth = (): UseAuthReturnValues => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const firebaseAuth = firebase.auth();

  // should i clear un/pw when the sign-in or sign-up errors out?

  const clearFormFields = (): void => {
    setEmail('');
    setPassword('');
  };

  const logErrors = (error: AuthError): void => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('errorCode', errorCode);
    console.log('errorMessage', errorMessage);
  };

  const createAccount = (event: FormEvent): void => {
    event.preventDefault();
    firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((): void => {
        clearFormFields();
        console.log('added user successfully');
      })
      .catch((error) => {
        logErrors(error);
      });
  };

  const signInAccount = (event: FormEvent): void => {
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((): void => {
        console.log('user signed in succesfully');
        clearFormFields();
      })
      .catch((error) => {
        logErrors(error);
      });
  };

  const signOutUser = (): void => {
    firebase
      .auth()
      .signOut()
      .then((): void => {
        console.log('signout successful');
      })
      .catch((error): void => {
        console.log('signout failed with this error', error);
      });
  };

  return {
    handleEmail: (value): void => setEmail(value),
    handlePassword: (value): void => setPassword(value),
    handleSignIn: (event): void => signInAccount(event),
    handleSignOut: (): void => signOutUser(),
    handleSignUp: (event): void => createAccount(event),
    email,
    password,
  };
};

export { useAuth };
