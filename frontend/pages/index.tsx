import React, { ReactElement } from 'react';
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

const Home = (): ReactElement => {
  return (
    <_Page>
      <_H1>Animal Crossing Buddy</_H1>
    </_Page>
  );
};

export default Home;
