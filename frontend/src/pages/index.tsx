import React, { ReactElement } from 'react';
import axios from 'axios';
import useSwr from 'swr';
import { useAuth, useCurrentUser } from '../hooks';
import { AuthForm } from '../components';
import { _Frame, _H1 } from '../ui';

const Home = (): ReactElement => {
  const { handleSignOut } = useAuth();
  const currentUser = useCurrentUser();

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
          {currentUser && (
            <>
              <div>welcome back!</div>
              <button onClick={handleSignOut}>sign out</button>
            </>
          )}
          {!currentUser && (
            <>
              <AuthForm formTitle='Sign up' submitButtonText='Sign up!' type='sign-up' />
              <AuthForm formTitle='Sign in' submitButtonText='Sign in!' />
            </>
          )}
        </>
      )}
    </_Frame>
  );
};

export default Home;
