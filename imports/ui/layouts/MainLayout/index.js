import React from 'react';
import { oneOfType, node, arrayOf, shape } from 'prop-types';
import styled from 'styled-components';
import { withTracker } from 'meteor/react-meteor-data';

import Header from './Header';
import UnauthorizedView from './UnauthorizedView';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  `;
  
const ContentWrapper = styled.section`
  flex: 1;
`;

const MainLayout = ({ content, currentUser }) => (
  <Wrapper>
    <Header />

    <ContentWrapper>
      {
        currentUser
        ? content
        : <UnauthorizedView />
      }
    </ContentWrapper>
  </Wrapper>
);

MainLayout.propTypes = {
  content: oneOfType([
    arrayOf(node),
    node
  ]),
  currentUser: shape({})
};

export default withTracker(() => {
  return {
    currentUser: Meteor.user(),
  };
})(MainLayout);