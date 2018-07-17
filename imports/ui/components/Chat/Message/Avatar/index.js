import React from 'react';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 4px;
  background-color: LightGray;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
`;

const Avatar = ({ user }) => {
  // TODO: Handle user with image
  if (!user) {
    return (
      <Wrapper>
        <Icon
          name='user'
          size='large'
          style={{ margin: 0 }}
        />
      </Wrapper>
    );
  }
};

export default Avatar;