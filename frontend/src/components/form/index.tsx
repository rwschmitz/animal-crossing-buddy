import React, { ReactElement } from 'react';
import { useForm } from '../../hooks';
import { FormProps } from './index.model';
import { _Container, _Form, _FormLabel, _FormTitle } from '../../ui';

const Form = ({ title, labels }: FormProps): ReactElement => {
  const { handleChange, handleSubmit, changeValue } = useForm(labels);

  const changeValueProperties = Object.keys(changeValue).map((item) => {
    return item;
  });

  return (
    <_Form onSubmit={(event): void => handleSubmit(event)}>
      <_FormTitle>{title}</_FormTitle>
      {labels.map((item, idx) => {
        const { label } = item;
        return (
          <_Container key={`${item}-${idx}`}>
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
        <input type='submit' value='test submit...' />
      </_Container>
    </_Form>
  );
};

export { Form };
