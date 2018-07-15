import React from 'react';
import { oneOfType, node, arrayOf } from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.header`
  height: 100px;
  width: 100%;
  background-color: #4A394A;
`;

const ContentWrapper = styled.section`
  flex: 1;
`;

const MainLayout = ({ headerContent, content }) => (
  <Wrapper>
    <HeaderWrapper />

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