import React, { FormEvent, ReactElement, useState } from 'react';
import axios from 'axios';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import qs from 'qs';
import styled from 'styled-components';
import useSwr from 'swr';
import { useFirebase } from '../hooks';
import { AuthForm } from '../components';

const _Page = styled.section`
  background-color: black;
  color: white;
  margin-bottom: 0;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0;
  max-width: 1600px;
`;

const _H1 = styled.h1`
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

const HomeContent = (): ReactElement => {
  useFirebase();

  const fetcher = (url: string): Promise<void> =>
    axios
      .get(url)
      .then((res) => res.data)
      .catch((error) => console.log(error));

  const { data, error } = useSwr('/api/cats', fetcher);

  // const theCurrentUser = useAuth();
  // console.log('the current user', theCurrentUser);

  // add cat
  const [catId, setCatId] = useState('');
  const [catName, setCatName] = useState('');
  const [catAge, setCatAge] = useState('');

  const addCat = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    const res = await axios({
      method: 'post',
      url: 'http://localhost:3001/cats',
      data: qs.stringify({
        catId,
        catName,
        catAge,
      }),
    });
    console.log('post req -->', res);
  };

  const signOutUser = (): void => {
    firebase
      .auth()
      .signOut()
      .then((): void => {
        console.log('signout successful');
      })
      .catch((error): void => {
        console.log('signout failed with this error', error);
      });
  };

  return (
    <_Page>
      {error && <div>error</div>}
      {!data && <div>loading</div>}
      {data && (
        <>
          <_H1>Animal Crossing Buddy</_H1>
          <AuthForm formTitle='Sign up' submitButtonText='Sign up!' type='sign-up' />
          <AuthForm formTitle='Sign in' submitButtonText='Sign in!' />

          <section>
            <_H1>Add cat</_H1>
            <_Form onSubmit={(event): Promise<void> => addCat(event)}>
              <_Container>
                <_Label id='catId' htmlFor='catId'>
                  id
                </_Label>
                <input name='catId' onChange={(event): void => setCatId(event.target.value)} value={catId} />
              </_Container>
              <_Container>
                <_Label id='catName' htmlFor='catName'>
                  name
                </_Label>
                <input name='catName' onChange={(event): void => setCatName(event.target.value)} value={catName} />
              </_Container>
              <_Container>
                <_Label id='catAge' htmlFor='catAge'>
                  age
                </_Label>
                <input name='catAge' onChange={(event): void => setCatAge(event.target.value)} value={catAge} />
              </_Container>
              <_Container>
                <input type='submit' value='submit' />
              </_Container>
            </_Form>
          </section>
          <button onClick={signOutUser}>sign out</button>
        </>
      )}
    </_Page>
  );
};

const Home = (): ReactElement => {
  return <HomeContent />;
};

export default Home;
