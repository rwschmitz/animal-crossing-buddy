import React, { FormEvent, ReactElement, useState } from 'react';

interface UseFormReturnValues {
  handleChange: (value: string, state: string) => void;
  handleSubmit: (event: FormEvent) => void;
  changeValue: InitReduceValue;
}

interface UseFormParams {
  label: string;
}

interface InitReduceValue {
  [key: string]: string;
}

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

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    setChangeValue({});
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

const formValues = [
  {
    label: 'cat',
  },
  {
    label: 'dog',
  },
  {
    label: 'horse',
  },
  {
    label: 'mouse',
  },
];

interface Test {
  cat: '';
  dog: '';
  horse: '';
  mouse: '';
}

const Form = (): ReactElement => {
  const { handleChange, handleSubmit, changeValue } = useForm(formValues);
  const { cat, dog, horse, mouse } = (changeValue as unknown) as Test;
  const values = [cat, dog, horse, mouse];
  const strings = Object.keys(changeValue).map((item) => {
    return item;
  });
  return (
    <form onSubmit={(event): void => handleSubmit(event)}>
      <legend>this is the title of the form</legend>
      {formValues.map((item, idx) => {
        const { label } = item;
        return (
          <>
            <label id={label} htmlFor={label}>
              {label}
            </label>
            <input
              name={label}
              onChange={(event): void => handleChange(event.target.value, strings[idx])}
              value={values[idx]}
            />
          </>
        );
      })}
    </form>
  );
};

export { Form };
