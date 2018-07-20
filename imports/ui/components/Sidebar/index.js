import React from 'react';
import styled from 'styled-components';
import { shape, string } from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import Preloader from '../../shared/Preloader';
import User from './User';
import ChatList from './ChatList';
import ContactList from './ContactList';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px 0;
`;

const Sidebar = ({ currentUser, chatId }) => {
  if (!currentUser) {
    return <Preloader />;
  }

  console.log(currentUser);

  return (
    <Wrapper>
      <User user={currentUser} />

      <ChatList chatId={chatId} />

      <ContactList chatId={chatId} />
    </Wrapper>
  );
};

Sidebar.propTypes = {
  currentUser: shape({
    _id: string.isRequired
  }),
  chatId: string
};

Sidebar.defaultProps = {
  chatId: ''
};

export default withTracker(() => {
  Meteor.subscribe('currentuser');
  
  return {
    currentUser: Meteor.user(),
  };
})(Sidebar);
