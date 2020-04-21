import React, { FormEvent, ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import styled from 'styled-components';

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
  margin: 0;
`;

const _Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  max-width: 275px;
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

const Home = (): ReactElement => {
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const res = await axios.get('http://localhost:3001/cats');
      console.log(res);
    };
    fetchData();
  }, []);

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
  return (
    <_Page>
      <_H1>Animal Crossing Buddy</_H1>
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
    </_Page>
  );
};

export default Home;

// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/7.14.1/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->

// <script>
//   // Your web app's Firebase configuration
//   var firebaseConfig = {
//     apiKey: "AIzaSyB6-pTwl6aG3zKJQNulc9I6yQ2BI0l-Qow",
//     authDomain: "animal-crossing-buddy.firebaseapp.com",
//     databaseURL: "https://animal-crossing-buddy.firebaseio.com",
//     projectId: "animal-crossing-buddy",
//     storageBucket: "animal-crossing-buddy.appspot.com",
//     messagingSenderId: "778830224520",
//     appId: "1:778830224520:web:fda470a384678b1fe5133d"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
// </script>
