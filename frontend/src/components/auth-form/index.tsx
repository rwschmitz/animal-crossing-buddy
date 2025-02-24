import React, { ReactElement } from 'react';
import { useAuth } from '../../hooks';
import { _Container, _Form, _FormLabel, _H2 } from '../../ui';
import { AuthFormProps } from './index.model';

const AuthForm = (props: AuthFormProps): ReactElement => {
  const { formTitle, submitButtonText, type } = props;
  const { handleEmail, handlePassword, handleSignIn, handleSignUp, email, password } = useAuth();
  const emailLabel = 'Email';
  const passwordLabel = 'Password';
  return (
    <section>
      <_H2>{formTitle}</_H2>
      <_Form onSubmit={(event): void => (type === 'sign-up' ? handleSignUp(event) : handleSignIn(event))}>
        <_Container>
          <_FormLabel id={emailLabel} htmlFor={emailLabel}>
            {emailLabel}
          </_FormLabel>
          <input name={emailLabel} onChange={(event): void => handleEmail(event.target.value)} value={email} />
        </_Container>
        <_Container>
          <_FormLabel id={passwordLabel} htmlFor={passwordLabel}>
            {passwordLabel}
          </_FormLabel>
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
