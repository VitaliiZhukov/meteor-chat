import React, { PureComponent } from 'react';
import { string, func } from 'prop-types';
import { Icon, Input } from 'semantic-ui-react';

class InputField extends PureComponent {
  constructor(props) {
    super(props);
    
    this.input = React.createRef();
    this.state = {
      name: ''
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

  componentDidUpdate(prev) {
    const { isVisible } = this.props;
    if (isVisible && !prev.isVisible) {
      this.input.current.focus();
    }
  }

  render() {
    const { hideForm, placeholder } = this.props;
    const { name } = this.state;

    const applyButton =
      <Icon
        name='check'
        circular
        link
        onClick={this.handleClick}
      />

    return (
      <Input
        icon={applyButton}
        placeholder={placeholder}
        ref={this.input}
        onBlur={hideForm}
        style={{ width: '100%' }}
        value={name}
        onChange={this.handleChange}
      />
    );
  }
};

InputField.propTypes = {
  placeholder: string,
  hideForm: func.isRequired,
  createEntity: func.isRequired
};

InputField.defaultProps = {
  placeholder: 'Enter value...'
};

export default InputField;
