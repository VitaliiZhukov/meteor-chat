import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { withTracker } from 'meteor/react-meteor-data';

import MessageInput from './MessageInput';
import MessagesList from './Messages';
import ChatHeader from './ChatHeader';
import Preloader from '../../shared/Preloader';
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

  removeChat = () => {
    const { chatId } = this.props;
    Meteor.call('chats.remove', chatId, (err, res) => {
      console.log(err, res);
      if (res && !err) {
        console.log('triggered');
        FlowRouter.go('/chats');
      }
    });
  }

  render() {
    const { messages, chat, currentUser } = this.props;

    if (!chat) {
      return <Preloader />
    }

    return (
      <Wrapper>
        <ChatHeader
          chat={chat}
          currentUser={currentUser}
          removeChat={this.removeChat}
        />

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
    messages: Messages.find({ chatId }, { sort: { createdAt: 1 } }).fetch(),
    chat: Chats.findOne({ _id: chatId }),
    currentUser: Meteor.user()
  };
})(Chat);