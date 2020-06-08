import React, { ReactElement } from 'react';
import { useForm } from '../../hooks';
import { FormProps } from './index.model';
import { _Container, _Form, _FormLabel, _FormTitle } from '../../ui';

// Use context to pass the values above the home page and back down to make the axios call
const Form = ({ title, labels, submitBtnText, onSubmit }: FormProps): ReactElement => {
  const { handleChange, handleSubmit, changeValue } = useForm(labels);

  const changeValueProperties = Object.keys(changeValue).map((item) => {
    return item;
  });

  return (
    <_Form onSubmit={(event): void => handleSubmit(event, onSubmit)}>
      <_FormTitle>{title}</_FormTitle>
      {labels.map((item, idx) => {
        const { label } = item;
        return (
          <_Container key={label}>
            <_FormLabel id={label} htmlFor={label}>
              {label}
            </_FormLabel>
            <input
              name={label}
              onChange={(event): void => handleChange(event.target.value, changeValueProperties[idx])}
              value={changeValue[changeValueProperties[idx]]}
            />
          </_Container>
        );
      })}
      <_Container>
        <input type='submit' value={submitBtnText} />
      </_Container>
    </_Form>
  );
};

export { Form };
