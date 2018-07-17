import React, { PureComponent} from 'react';
import { shape, string } from 'prop-types';
import styled from 'styled-components';
import { Button, Popup, Confirm } from 'semantic-ui-react';

const Wrapper = styled.div`
  width: 100%;
  padding: 16px;
  border-bottom: 1px solid LightGray;
  display: flex;
  justify-content: space-between;
`;

class ChatHeader extends PureComponent {
  state = {
    isOpened: false
  }

  openConfirmDialog = (value) => () => {
    this.setState({ isOpened: value });
  }

  handleConfirm = () => {
    const { removeChat } = this.props;
    removeChat();
    this.setState({ isOpened: false });
  }

  render() {
    const { chat, currentUser } = this.props;
    const { isOpened } = this.state;

    return(
      <Wrapper>
        <h2>
          { chat.name }
        </h2>
    
        {
          chat.ownerId === currentUser._id &&
          <Popup
            trigger={<Button circular icon='ellipsis vertical' />}
            content={<Button content='Remove chat' onClick={this.openConfirmDialog(true)} />}
            on='click'
            position='bottom left'
            style={{ zIndex: 1000 }}
          />
        }

        <Confirm
          open={isOpened}
          header='Remove chat'
          content={`Are you sure you want to remove ${chat.name} chat?`}
          onCancel={this.openConfirmDialog(false)}
          onConfirm={this.handleConfirm}
        />
      </Wrapper>
    );
  }
};

ChatHeader.propTypes = {
  chat: shape({
    _id: string.isRequired,
    ownerId: string.isRequired,
    name: string.isRequired
  }).isRequired,
  currentUser: shape({}).isRequired
};

export default ChatHeader;
