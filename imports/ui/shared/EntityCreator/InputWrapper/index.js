import React from 'react';
import { node, arrayOf, oneOfType, bool } from 'prop-types';
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

const InputWrapper = ({ children, isVisible }) => {
  return(
    <Wrapper isVisible={isVisible}>
      { children }
    </Wrapper>
  );
}

InputWrapper.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired,
  isVisible: bool
};

InputWrapper.defaultProps = {
  isVisible: false
};

export default InputWrapper;
