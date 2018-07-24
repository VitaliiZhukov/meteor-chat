import React, { PureComponent } from 'react';
import { string, func } from 'prop-types';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

import InputWrapper from './InputWrapper';

const Wrapper = styled.div`
  margin: 0 32px;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    margin-bottom: 0;
    margin-top: -3px;
  }
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  i {
    margin: 0;
    color: #9E969E;
  }
`;

class EntityCreator extends PureComponent {
  state = {
    isExpanded: false
  }

  expandForm = (value) => () => {
    this.setState({
      isExpanded: value
    });
  }

  render() {
    const { title, children } = this.props;
    const { isExpanded } = this.state;

    return (
      <Wrapper>
        <HeaderContent>
          <h3>
            {title}
          </h3>
    
          <Button onClick={this.expandForm(true)}>
            <Icon
              name={'add circle'}
              size={'large'}
            />
          </Button>
        </HeaderContent>

        <InputWrapper isVisible={isExpanded}>
          {
            children({
              hideForm: this.expandForm(false),
              isVisible: isExpanded
            })
          }
        </InputWrapper>
      </Wrapper>
    );
  }
};

EntityCreator.propTypes = {
  title: string.isRequired,
  children: func.isRequired
};

EntityCreator.defaultProps = {};

export default EntityCreator;
