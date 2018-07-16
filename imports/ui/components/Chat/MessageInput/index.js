import React, { PureComponent } from 'react'
import { Input } from 'semantic-ui-react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 16px;
  width: 100%;
`;

class MessageInput extends PureComponent {
  state = {
    value: ''
  }

  render() {
    return(
      <Wrapper>
        <Input
          action={{ icon: 'plus' }}
          actionPosition='left'
          placeholder='Message...'
          style={{ width: '100%' }}
        />
      </Wrapper>
    );
  }
};

export default MessageInput;