import React from 'react';
import { oneOfType, node, arrayOf } from 'prop-types';
import styled from 'styled-components';

import Header from './Header';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  `;
  
const ContentWrapper = styled.section`
  flex: 1;
`;

const MainLayout = ({ content }) => (
  <Wrapper>
    <Header />

    <ContentWrapper>
      { content }
    </ContentWrapper>
  </Wrapper>
);

MainLayout.propTypes = {
  content: oneOfType([
    arrayOf(node),
    node
  ])
};

export default MainLayout;