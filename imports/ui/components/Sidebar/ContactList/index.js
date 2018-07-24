import React, { PureComponent } from 'react';
import { shape, string } from 'prop-types';
import styled from 'styled-components';
import { withTracker } from 'meteor/react-meteor-data';

import { Chats } from '../../../../api/chats';
import EntityCreator from '../../../shared/EntityCreator';
import SearchInput from './SearchInput';
import User from '../User';

const Wrapper = styled.div`
  margin-top: 32px;
`;

const ContactsWrapper = styled.div`
  margin-top: 16px;
`;

class UserList extends PureComponent {
  addContact = (userId) => {
    const { chatId } = this.props;
    Meteor.call('chats.addContact', { chatId, userId });
  }

  componentDidUpdate(prev) {
    const { isVisible } = this.props;
    if (isVisible && !prev.isVisible) {
      this.input.current.focus();
    }
  }

  render() {
    const { allUsers, chat } = this.props;

    const { contacts = [] } = chat;
    
    const chatUsers = allUsers
      .filter(item => contacts.indexOf(item._id) > -1 && item._id !== Meteor.userId());

    const freeUsers = allUsers
      .filter(item => contacts.indexOf(item._id) === -1 && item._id !== Meteor.userId());

    return (
      <Wrapper>
        <EntityCreator title={'Contacts'}>
          {
            ({ hideForm, isVisible }) => (
              <SearchInput
                createEntity={this.addContact}
                handleBlur={hideForm}
                isVisible={isVisible}
                items={freeUsers}
              />
            )
          }
        </EntityCreator>

        <ContactsWrapper>
          {
            chatUsers.map(item => (
              <User
                key={item._id}
                user={item}
              />
            ))
          }
        </ContactsWrapper>
      </Wrapper>
    );
  }
};

UserList.propTypes = {
  chat: shape({}),
  chatId: string
};

UserList.defaultProps = {
  chatId: '',
  chat: {}
};

export default withTracker(({ chatId }) => {
  Meteor.subscribe('allUsers');
  Meteor.subscribe('chatById', chatId);

  return {
    allUsers: Meteor.users.find({}).fetch(),
    chat: Chats.findOne({ _id: chatId })
  };
})(UserList);
