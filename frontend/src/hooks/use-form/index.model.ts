import { FormEvent } from 'react';

export interface UseFormReturnValues {
  handleChange: (value: string, state: string) => void;
  handleSubmit: (event: FormEvent) => void;
  changeValue: InitReduceValue;
}

export interface UseFormParams {
  label: string;
}

export interface InitReduceValue {
  [key: string]: string;
}
