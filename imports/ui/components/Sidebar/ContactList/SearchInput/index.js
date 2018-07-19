import React, { PureComponent } from 'react';
import { shape, arrayOf, string } from 'prop-types';
import Autosuggest from 'react-autosuggest';
import { Input } from 'semantic-ui-react';

import './styles.css';

const getSuggestionValue = item => {
  return item.username;
}

class ContactSearchField extends PureComponent {
  constructor(props) {
    super(props);
    
    this.input = React.createRef();
    this.state = {
      value: '',
      isHovered: false
    }
  }

  componentDidUpdate(prev) {
    const { isVisible } = this.props;
    if (isVisible && !prev.isVisible) {
      this.input.current.focus();
    }
  }

  handleChange = (e, { newValue }) => {
    this.setState({ value: newValue });
  };

  handleRequest = ({ value }) => {
  };

  handleSelection = (e, { suggestion }) => {
    const { createEntity, handleBlur } = this.props;
    createEntity(suggestion._id);
    handleBlur();
  }

  handleHover = (value) => () => {
    this.setState({ isHovered: value })
  }

  handleBlur = (e) => {
    e.preventDefault();
    const { isHovered } = this.state;

    if (!isHovered) {
      this.props.handleBlur();
    }
  }

  renderSuggestion = ({ username }) => {
    return (
      <div>
        { username }
      </div>
    );
  }

  renderInput = (props) => {
    return (
      <Input
        {...props}
        placeholder={'Enter username...'}
        ref={this.input}
        style={{ width: '100%' }}
        onBlur={this.handleBlur}
      />
    );
  }

  render() {
    const { items, chatId } = this.props;
    const { value } = this.state; 

    const inputProps = {
      value,
      onChange: this.handleChange
    };

    return (
      <div
        style={{ position: 'relative'}}
        onMouseEnter={this.handleHover(true)}
        onMouseLeave={this.handleHover(false)}
      >
        <Autosuggest
          suggestions={items}
          onSuggestionsFetchRequested={this.handleRequest}
          onSuggestionsClearRequested={() => {}}
          getSuggestionValue={getSuggestionValue}
          onSuggestionSelected={this.handleSelection}
          renderSuggestion={this.renderSuggestion}
          renderInputComponent={this.renderInput}
          inputProps={inputProps}
        />
      </div>
    );
  }
};

ContactSearchField.propTypes = {};

ContactSearchField.defaultProps = {
  chatId: '',
  items: []
};

export default ContactSearchField;
