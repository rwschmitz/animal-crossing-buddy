import { FormEvent, useState } from 'react';
import { UseFormParams, UseFormReturnValues, InitReduceValue } from './index.model';

const useForm = (formValues: UseFormParams[]): UseFormReturnValues => {
  const labels = formValues.map((item) => {
    const { label } = item;
    return label;
  });

  const initState = labels.reduce((acc, cv): InitReduceValue => {
    acc[cv] = '';
    return acc;
  }, {} as InitReduceValue);

  const [changeValue, setChangeValue] = useState(initState);

  const handleSubmit = (event: FormEvent, onSubmit: Function): void => {
    event.preventDefault();
    onSubmit();
    setChangeValue(initState);
  };

  const handleChange = (value: string, state: string): void => {
    setChangeValue({
      ...changeValue,
      [state]: value,
    });
  };

  return {
    handleChange,
    handleSubmit,
    changeValue,
  };
};

export { useForm };
