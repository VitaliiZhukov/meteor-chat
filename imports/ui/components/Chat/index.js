import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { withTracker } from 'meteor/react-meteor-data';

import MessageInput from './MessageInput';
import Message from './Message';
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

const MessagesWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 32px 16px;
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

    console.log(chat);

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

        <MessagesWrapper>
          {messages.map(item => <Message item={item} key={item._id} />)}
        </MessagesWrapper>

        <MessageInput addMessage={this.addMessage} />
      </Wrapper>
    );
  }
};

export default withTracker(({ chatId }) => {
  Meteor.subscribe('ownedChats');
  Meteor.subscribe('messages', chatId);

  return {
    messages: Messages.find({}, { sort: { createdAt: 1 } }).fetch(),
    chat: Chats.findOne({ _id: chatId }),
    currentUser: Meteor.user()
  };
})(Chat);
