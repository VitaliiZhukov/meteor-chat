import React from 'react';
import styled from 'styled-components';
import { shape, string } from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import Preloader from '../../shared/Preloader';
import User from './User';
import ChatList from './ChatList';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px 0;
`;

const Sidebar = ({ currentUser }) => {
  if (!currentUser) {
    return <Preloader />;
  }

  return (
    <Wrapper>
      <User
        user={currentUser}
        isOnline
      />

      <ChatList />
    </Wrapper>
  );
};

Sidebar.propTypes = {
  currentUser: shape({
    _id: string.isRequired
  })
};

export default withTracker(() => {
  return {
    currentUser: Meteor.user(),
  };
})(Sidebar);