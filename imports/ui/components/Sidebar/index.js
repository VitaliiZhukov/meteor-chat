import React from 'react';
import styled from 'styled-components';
import { shape, string } from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import Preloader from '../../shared/Preloader';
import User from './User';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px 16px;
`;

const Sidebar = ({ currentUser }) => {
  if (!currentUser) {
    return <Preloader />;
  }

  console.log(currentUser);
  return (
    <Wrapper>
      <User
        user={currentUser}
        isOnline
      />
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