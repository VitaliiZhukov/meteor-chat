import React, { PureComponent } from 'react';
import { string, func, bool } from 'prop-types';
import { Icon, Input } from 'semantic-ui-react';
import styled from 'styled-components';

const Wrapper = styled.div`
  ${props => props.isVisible
    ? 'max-height: 100px;'
    : 'max-height: 0;'
  }
  transition: all .5s ease-out;
  overflow: hidden;
  width: 100%;
`;

class InputField extends PureComponent {
  constructor(props) {
    super(props);
    
    this.input = React.createRef();
    this.state = {
      name: ''
    }
  }

  componentDidUpdate(prev) {
    const { isVisible } = this.props;

    if (isVisible !== prev.isVisible && isVisible) {
      this.input.current.focus();
    }
  }

  handleClick = () => {
    const { createEntity } = this.props;
    const { name } = this.state;

    createEntity(name);
  }

  handleChange = (e) => {
    e.preventDefault();

    this.setState({ name: e.target.value });
  }

  render() {
    const { isVisible, hideForm, placeholder } = this.props;
    const { name } = this.state;

    const applyButton =
      <Icon
        name='check'
        circular
        link
        onClick={this.handleClick}
      />

    return (
      <Wrapper isVisible={isVisible}>
        <Input
          icon={applyButton}
          placeholder={placeholder}
          ref={this.input}
          onBlur={hideForm}
          style={{ width: '100%' }}
          value={name}
          onChange={this.handleChange}
        />
      </Wrapper>
    );
  }
};

InputField.propTypes = {
  placeholder: string,
  hideForm: func.isRequired,
  isVisible: bool,
  createEntity: func.isRequired
};

InputField.defaultProps = {
  placeholder: 'Enter value...',
  isVisible: false
};

export default InputField;
