import React, { PureComponent } from 'react';
import { shape, arrayOf, string } from 'prop-types';
import styled from 'styled-components';
import { withTracker } from 'meteor/react-meteor-data';

import { Chats } from '../../../../api/chats';
import EntityCreator from '../../../shared/EntityCreator';
import Input from './Input';

const Wrapper = styled.div`
  margin-top: 32px;
`;

const ChatsWrapper = styled.div`
  margin-top: 16px;
`;

const ChatButton = styled.button`
  width: 100%;
  padding: 16px 32px;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: all .5s ease-out;
  background-color: ${props => props.isActive ? props.theme.highlightColor : 'transparent'};
  color: ${props => props.isActive ? props.theme.highlightFontColor : props.theme.fontColor};
  &:hover {
    background-color: ${props => props.theme.highlightColor};
    color: ${props => props.theme.highlightFontColor};
  }
`;

class ChatList extends PureComponent {
  addChat = (chatTitle) => {
    Meteor.call('chats.insert', chatTitle, (error, res) => {
      if (!error && res) {
        FlowRouter.go(`/chats/${res}`);
      }
    });
  }

  handleClick = (chatId) => () => {
    FlowRouter.go(`/chats/${chatId}`);
  }

  render() {
    const { chats, chatId } = this.props;

    return (
      <Wrapper>
        <EntityCreator title={'Channels'}>
          {
            ({ hideForm, isVisible }) => (
              <Input
                createEntity={this.addChat}
                hideForm={hideForm}
                isVisible={isVisible}
              />
            )
          }
        </EntityCreator>

        <ChatsWrapper>
          {
            chats.map(item => {
              return(
                <ChatButton
                  key={item._id}
                  onClick={this.handleClick(item._id)}
                  isActive={chatId === item._id}
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
  chats: arrayOf(shape({})),
  chatId: string
};

ChatList.defaultProps = {
  chatId: '',
  chats: []
};

export default withTracker(() => {
  Meteor.subscribe('ownedChats');
  Meteor.subscribe('participantChats');

  return {
    chats: Chats.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
})(ChatList);
