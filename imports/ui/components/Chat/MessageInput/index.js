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

  handleClick = () => {
    const { addMessage } = this.props;
    const { value } = this.state;

    addMessage(value);

    this.setState({ value: '' });
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  }

  render() {
    return(
      <Wrapper>
        <Input
          action={<Button icon={'plus'} onClick={this.handleClick} />}
          actionPosition='left'
          placeholder='Message...'
          style={{ width: '100%' }}
          onChange={this.handleChange}
        />
      </Wrapper>
    );
  }
};

MessageInput.propTypes = {
  addMessage: func.isRequired
};

export default MessageInput;