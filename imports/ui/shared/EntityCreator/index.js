import React, { PureComponent } from 'react';
import { string, func } from 'prop-types';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

import Input from './Input';

const Wrapper = styled.div``;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
    const { title, handleCreate } = this.props;
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

        <Input
          isVisible={isExpanded}
          hideForm={this.expandForm(false)}
          createEntity={handleCreate}
        />
      </Wrapper>
    );
  }
};

EntityCreator.propTypes = {
  title: string.isRequired,
  handleCreate: func.isRequired
};

export default EntityCreator;
