import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../hooks';

const _H2 = styled.h2`
  font-weight: 900;
  margin-bottom: 2rem;
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
`;

const _Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  max-width: 300px;
  width: 100%;
  &:last-child {
    margin-top: 1rem;
  }
`;

const _Label = styled.label``;

const _Form = styled.form`
  border: 2px dashed white;
  display: flex;
  flex-wrap: wrap;
  padding: 2rem;
  margin-bottom: 2rem;
  margin-top: 2rem;
  max-width: 500px;
`;

interface AuthFormProps {
  formTitle: string;
  submitButtonText: string;
  type?: string;
}

const AuthForm = (props: AuthFormProps): ReactElement => {
  const { formTitle, submitButtonText, type } = props;
  const { handleEmail, handlePassword, handleSignIn, handleSignUp, email, password } = useAuth();
  const emailLabel = 'email';
  const passwordLabel = 'password';
  return (
    <section>
      <_H2>{formTitle}</_H2>
      <_Form onSubmit={(event): void => (type === 'sign-up' ? handleSignUp(event) : handleSignIn(event))}>
        <_Container>
          <_Label id={emailLabel} htmlFor={emailLabel}>
            {emailLabel}
          </_Label>
          <input name={emailLabel} onChange={(event): void => handleEmail(event.target.value)} value={email} />
        </_Container>
        <_Container>
          <_Label id={passwordLabel} htmlFor={passwordLabel}>
            {passwordLabel}
          </_Label>
          <input name={passwordLabel} onChange={(event): void => handlePassword(event.target.value)} value={password} />
        </_Container>
        <_Container>
          <input type='submit' value={submitButtonText} />
        </_Container>
      </_Form>
    </section>
  );
};

export { AuthForm };
