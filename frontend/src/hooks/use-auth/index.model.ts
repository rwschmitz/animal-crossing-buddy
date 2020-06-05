import { FormEvent } from 'react';

export interface UseAuthReturnValues {
  handleConfirmation: (event: FormEvent) => void;
  handleCode: (value: string) => void;
  handleEmail: (value: string) => void;
  handlePassword: (value: string) => void;
  handleSignIn: (event: FormEvent) => void;
  handleSignOut: () => void;
  handleSignUp: (event: FormEvent) => void;
  code: string;
  email: string;
  password: string;
}
