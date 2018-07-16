import React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Preloader = () => (
  <Wrapper>
    <Icon
      loading
      name='spinner'
      size={'large'}
    />
  </Wrapper>
);

export default Preloader;
