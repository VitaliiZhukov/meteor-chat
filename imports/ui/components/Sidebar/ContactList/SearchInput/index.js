import React, { PureComponent } from 'react';
import { shape, arrayOf, string } from 'prop-types';
import Autosuggest from 'react-autosuggest';
import { Input } from 'semantic-ui-react';

const getSuggestionValue = item => item._id;

class ContactSearchField extends PureComponent {
  constructor(props) {
    super(props);
    
    this.input = React.createRef();
    this.state = {
      value: ''
    }
  }

  onChange = (e, { newValue }) => {
    this.setState({ value: newValue });
  };

  handleRequest = ({ value }) => {
    console.log(value);
  };

  componentDidUpdate(prev) {
    const { isVisible } = this.props;
    if (isVisible && !prev.isVisible) {
      this.input.current.focus();
    }
  }

  renderSuggestion = (value) => {
    return (
      <div>
        { value }
      </div>
    );
  }

  renderInput = () => {
    const { handleBlur } = this.props;
    return (
      <Input
        placeholder={'Enter username...'}
        ref={this.input}
        style={{ width: '100%' }}
        onBlur={handleBlur}
      />
    );
  }

  render() {
    const { items, chatId } = this.props;
    const { value } = this.state; 

    const inputProps = {
      value,
      onChange: this.onChange
    };

    return (
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
    );
  }
};

ContactSearchField.propTypes = {};

ContactSearchField.defaultProps = {
  chatId: '',
  items: []
};

export default ContactSearchField;
