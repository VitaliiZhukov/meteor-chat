import React, { PureComponent } from 'react';
import styled from 'styled-components';

import MessageInput from './MessageInput';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between
`;

class Chat extends PureComponent {
  render() {
    return (
      <Wrapper>
        <div>
          {'Messages go here'}
        </div>

        <MessageInput />
      </Wrapper>
    );
  }
};

export default Chat;
