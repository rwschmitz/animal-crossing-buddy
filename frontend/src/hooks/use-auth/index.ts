import { FormEvent, useState } from 'react';
import { Auth } from 'aws-amplify';
import { UseAuthReturnValues } from './index.model';

const useAuth = (): UseAuthReturnValues => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');

  // Probably don't clear out un/pw when form submission errors out. It's annoying.

  const clearFormFields = (): void => {
    setEmail('');
    setPassword('');
    setCode('');
  };

  const createAccount = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    try {
      clearFormFields();
      await Auth.signUp({
        username: email,
        password,
      });
    } catch (error) {
      console.error('error signing up: ', error);
    }
  };

  const confirmSignup = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    try {
      clearFormFields();
      await Auth.confirmSignUp(email, code);
    } catch (error) {
      console.error('error confirming sign up', error);
    }
  };

  const signInAccount = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    try {
      clearFormFields();
      await Auth.signIn(email, password);
    } catch (error) {
      console.error('error signing in ', error);
    }
  };

  const signOutUser = async (): Promise<void> => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.error('error signing out ', error);
    }
  };

  return {
    handleConfirmation: (event): Promise<void> => confirmSignup(event),
    handleCode: (value): void => setCode(value),
    handleEmail: (value): void => setEmail(value),
    handlePassword: (value): void => setPassword(value),
    handleSignIn: (event): Promise<void> => signInAccount(event),
    handleSignOut: (): Promise<void> => signOutUser(),
    handleSignUp: (event): Promise<void> => createAccount(event),
    code,
    email,
    password,
  };
};

export { useAuth };
