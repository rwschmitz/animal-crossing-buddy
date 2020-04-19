import React, { ReactElement } from 'react';
import styled from 'styled-components';

const _Page = styled.section`
  background-color: red;
`;

const Home = (): ReactElement => {
  return (
    <_Page>
      <h1>Animal Crossing Buddy</h1>
    </_Page>
  );
};

export default Home;
