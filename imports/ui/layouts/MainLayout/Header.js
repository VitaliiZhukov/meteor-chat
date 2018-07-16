import React from 'react';
import styled from 'styled-components';

import AccountsUIWrapper from './AccountsUIWrapper';

const Wrapper = styled.header`
  background-color: #FFFFFF;
  width: 100%;
  box-shadow: 0 1px 1px rgba(0,0,0,.1);
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
`;

const Header = () => (
  <Wrapper>
    <Content>
      <h2>Chat app</h2>
      <AccountsUIWrapper />
    </Content>
  </Wrapper>
);

export default Header;