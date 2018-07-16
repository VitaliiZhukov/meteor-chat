import React, { PureComponent } from 'react';
import { shape, arrayOf } from 'prop-types';
import styled from 'styled-components';
import { withTracker } from 'meteor/react-meteor-data';

import { Chats } from '../../../../api/chats';
import EntityCreator from '../../../shared/EntityCreator';

const Wrapper = styled.div`
  margin-top: 32px;
`;

const ChatsWrapper = styled.div`
  margin-top: 16px;
`;

class ChatList extends PureComponent {
  addChat = (name) => {
    Meteor.call('chats.insert', name);
  }

  render() {
    const { chats } = this.props;

    return (
      <Wrapper>
        <EntityCreator
          title={'Channels'}
          handleCreate={this.addChat}
        />

        <ChatsWrapper>
          {
            chats.map(item => {
              return(
                <div key={item._id}>
                  {item.name}
                </div>
              );
            })
          }
        </ChatsWrapper>
      </Wrapper>
    );
  }
};

ChatList.propTypes = {
  chats: arrayOf(shape({}))
};

export default withTracker(() => {
  Meteor.subscribe('chats');

  return {
    chats: Chats.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
})(ChatList);
