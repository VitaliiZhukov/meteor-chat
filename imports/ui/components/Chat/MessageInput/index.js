import React, { PureComponent } from 'react';
import { func } from 'prop-types';
import { Input, Button } from 'semantic-ui-react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 16px;
  width: 100%;
`;

class MessageInput extends PureComponent {
  state = {
    value: ''
  }

  sendMessage = () => {
    const { addMessage } = this.props;
    const { value } = this.state;
  
    addMessage(value);
    this.setState({ value: '' });
  }

  handleClick = () => {
    this.sendMessage();
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.sendMessage();
    }
  }

  render() {
    const { value } = this.state;

    return(
      <Wrapper>
        <Input
          action={<Button icon={'plus'} onClick={this.handleClick} />}
          actionPosition='left'
          placeholder='Message...'
          style={{ width: '100%' }}
          onChange={this.handleChange}
          value={value}
          onKeyPress={this.handleKeyPress}
        />
      </Wrapper>
    );
  }
};

MessageInput.propTypes = {
  addMessage: func.isRequired
};

export default MessageInput;