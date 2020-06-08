import React, { ReactElement } from 'react';
import { useForm } from '../../hooks';

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

const Form = (): ReactElement => {
  const { handleChange, handleSubmit, changeValue } = useForm(formValues);

  const changeValueProperties = Object.keys(changeValue).map((item) => {
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
              onChange={(event): void => handleChange(event.target.value, changeValueProperties[idx])}
              value={changeValue[changeValueProperties[idx]]}
            />
          </>
        );
      })}
      <input type='submit' value='test submit...' />
    </form>
  );
};

export { Form };
