import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { withTracker } from 'meteor/react-meteor-data';

import MessageInput from './MessageInput';
import MessagesList from './Messages';
import ChatHeader from './ChatHeader';
import { Messages } from '../../../api/messages';
import { Chats } from '../../../api/chats';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between
`;

class Chat extends PureComponent {
  addMessage = (text) => {
    const { chatId } = this.props;

    Meteor.call('messages.insert', { text, chatId });
  }

  render() {
    const { messages, chat } = this.props;

    return (
      <Wrapper>
        <ChatHeader chat={chat} />

        <MessagesList messages={messages} />

        <MessageInput addMessage={this.addMessage} />
      </Wrapper>
    );
  }
};

export default withTracker(({ chatId }) => {
  Meteor.subscribe('messages');
  Meteor.subscribe('chats');

  return {
    messages: Messages.find({}, { sort: { createdAt: -1 } }).fetch(),
    chat: Chats.findOne({ _id: chatId }, { sort: { createdAt: -1 } }),
  };
})(Chat);