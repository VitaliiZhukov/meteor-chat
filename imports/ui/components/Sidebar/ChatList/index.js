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

const ChatButton = styled.button`
  width: 100%;
  padding: 16px 32px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.fontColor};
  text-align: left;
  &:hover {
    background-color: ${props => props.theme.highlightColor};
    color: ${props => props.theme.highlightFontColor};
  }
  transition: all .5s ease-out;
`;

class ChatList extends PureComponent {
  addChat = (name) => {
    Meteor.call('chats.insert', name);
  }

  handleClick = (chatId) => () => {
    FlowRouter.go(`/chats/${chatId}`);
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
                <ChatButton
                  key={item._id}
                  onClick={this.handleClick(item._id)}
                >
                  {`# ${item.name}`}
                </ChatButton>
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
