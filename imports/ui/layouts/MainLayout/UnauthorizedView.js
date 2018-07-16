import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
`;
 
const View = () => (
  <Wrapper>
    <p>
      { 'You are not authorized.' }
    </p>
    <p>
      { 'Please login or signup' }
    </p>
  </Wrapper>
);

export default View;