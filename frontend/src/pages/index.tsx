import React, { FormEvent, ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
import * as firebase from 'firebase/app';
// import { User } from 'firebase';
import 'firebase/auth';
import qs from 'qs';
import styled from 'styled-components';
import useSwr from 'swr';

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

const _SignedInText = styled.div`
  color: lightgreen;
`;

const _SignedOutText = styled.div`
  color: red;
`;

const useAuth = (): any => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect((): void => {
    firebase.auth().onAuthStateChanged((user: any) => {
      setCurrentUser(user);
    });
  }, [currentUser]);

  return currentUser;
};

const Home = (): ReactElement => {
  const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
  };

  // Is this really the best solution...?
  // https://github.com/zeit/next.js/issues/1999
  // Is there something with getInitialProps for nextjs to handle this...?

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  firebase.auth();

  const fetcher = (url: any): any =>
    axios
      .get(url)
      .then((res) => res.data)
      .catch((error) => console.log(error));

  const { data, error } = useSwr('/api/cats', fetcher);
  console.log('data from useSwr', data);
  console.log('error from useSwr', error);

  // useEffect(() => {
  //   const fetchData = async (): Promise<void> => {
  //     const res = await axios.get('http://localhost:3001/cats');
  //     console.log(res);
  //   };
  //   fetchData();
  // }, []);

  const theCurrentUser = useAuth();
  // console.log('the current user', theCurrentUser);

  // add cat
  const [catId, setCatId] = useState('');
  const [catName, setCatName] = useState('');
  const [catAge, setCatAge] = useState('');

  // sign up
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // sign in
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

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

  // should i clear un/pw when the sign-in or sign-up errors out?

  const addUser = (event: FormEvent): void => {
    event.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((): void => {
        console.log('added user successfully');
        setEmail('');
        setPassword('');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('errorCode', errorCode);
        console.log('errorMessage', errorMessage);
      });
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

  const signInUser = (event: FormEvent): void => {
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(userEmail, userPassword)
      .then((): void => {
        console.log('user signed in succesfully');
        setUserEmail('');
        setUserPassword('');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('errorCode', errorCode);
        console.log('errorMessage', errorMessage);
      });
  };
  return (
    <_Page>
      <_H1>Animal Crossing Buddy</_H1>
      <section>
        {theCurrentUser ? <_SignedInText>signed in!</_SignedInText> : <_SignedOutText>signed out!</_SignedOutText>}
      </section>
      <section>
        <_H1>Sign up</_H1>
        <_Form onSubmit={(event): void => addUser(event)}>
          <_Container>
            <_Label id='email' htmlFor='email'>
              email
            </_Label>
            <input name='email' onChange={(event): void => setEmail(event.target.value)} value={email} />
          </_Container>
          <_Container>
            <_Label id='password' htmlFor='password'>
              password
            </_Label>
            <input name='password' onChange={(event): void => setPassword(event.target.value)} value={password} />
          </_Container>
          <_Container>
            <input type='submit' value='submit' />
          </_Container>
        </_Form>
      </section>
      <section>
        <_H1>Email sign in</_H1>
        <_Form onSubmit={(event): void => signInUser(event)}>
          <_Container>
            <_Label id='userEmail' htmlFor='userEmail'>
              email
            </_Label>
            <input name='userEmail' onChange={(event): void => setUserEmail(event.target.value)} value={userEmail} />
          </_Container>
          <_Container>
            <_Label id='userPassword' htmlFor='userPassword'>
              password
            </_Label>
            <input
              name='userPassword'
              onChange={(event): void => setUserPassword(event.target.value)}
              value={userPassword}
            />
          </_Container>
          <_Container>
            <input type='submit' value='submit' />
          </_Container>
        </_Form>
      </section>
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
    </_Page>
  );
};

export default Home;
