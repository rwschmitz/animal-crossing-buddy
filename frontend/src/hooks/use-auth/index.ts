import { FormEvent, useState } from 'react';
import { Auth } from 'aws-amplify';
import { UseAuthReturnValues } from './index.model';

const useAuth = (): UseAuthReturnValues => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');

  // should i clear un/pw when the sign-in or sign-up errors out?

  const clearFormFields = (): void => {
    setEmail('');
    setPassword('');
    setCode('');
  };

  const createAccount = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    try {
      clearFormFields();
      const user = await Auth.signUp({
        username: email,
        password,
      });
      console.log(user);
    } catch (error) {
      console.log('error signing up: ', error);
    }
  };

  const confirmSignup = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    try {
      clearFormFields();
      await Auth.confirmSignUp(email, code);
      console.log('successful confirmation');
    } catch (error) {
      console.log('error confirming sign up', error);
    }
  };

  const signInAccount = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    try {
      clearFormFields();
      const user = await Auth.signIn(email, password);
      console.log(user);
    } catch (error) {
      console.log('error signing in ', error);
    }
  };

  const signOutUser = async (): Promise<void> => {
    try {
      const user = await Auth.signOut();
      console.log('success');
      console.log(user);
    } catch (error) {
      console.log('error signing out ', error);
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
