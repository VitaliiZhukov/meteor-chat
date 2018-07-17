import React, { PureComponent } from 'react';
import { shape, arrayOf, string } from 'prop-types';
import styled from 'styled-components';
import { withTracker } from 'meteor/react-meteor-data';

import EntityCreator from '../../../shared/EntityCreator';
import SearchInput from './SearchInput';

const Wrapper = styled.div`
  margin-top: 32px;
`;

const ChatsWrapper = styled.div`
  margin-top: 16px;
`;

class UserList extends PureComponent {
  addContact = (userId) => {
    console.log(userId)
  }

  componentDidUpdate(prev) {
    const { isVisible } = this.props;
    if (isVisible && !prev.isVisible) {
      this.input.current.focus();
    }
  }

  render() {
    const { users, chatId } = this.props;

    return (
      <Wrapper>
        <EntityCreator title={'Contacts'}>
          {
            ({ hideForm, isVisible }) => (
              <SearchInput
                createEntity={this.addContact}
                handleBlur={hideForm}
                isVisible={isVisible}
              />
            )
          }
        </EntityCreator>
      </Wrapper>
    );
  }
};

UserList.propTypes = {
  chats: arrayOf(shape({})),
  chatId: string
};

UserList.defaultProps = {
  chatId: '',
  chats: []
};

export default withTracker(({ chatId }) => {
  Meteor.subscribe('usersByChat', chatId);

  return {
    chats: Meteor.users.find({}).fetch(),
  };
})(UserList);
