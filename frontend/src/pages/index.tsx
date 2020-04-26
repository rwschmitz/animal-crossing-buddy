import React, { ReactElement } from 'react';
import axios from 'axios';
import useSwr from 'swr';
import { useAuth } from '../hooks';
import { AuthForm } from '../components';
import { _Frame, _H1 } from '../ui';

const Home = (): ReactElement => {
  const { handleSignOut } = useAuth();

  const fetcher = (url: string): Promise<void> =>
    axios
      .get(url)
      .then((res) => res.data)
      .catch((error) => console.log(error));

  const { data, error } = useSwr('/api/cats', fetcher);

  return (
    <_Frame>
      {error && <div>error</div>}
      {!data && <div>loading</div>}
      {data && (
        <>
          <_H1>Animal Crossing Buddy</_H1>
          <AuthForm formTitle='Sign up' submitButtonText='Sign up!' type='sign-up' />
          <AuthForm formTitle='Sign in' submitButtonText='Sign in!' />
          <button onClick={handleSignOut}>sign out</button>
        </>
      )}
    </_Frame>
  );
};

export default Home;
