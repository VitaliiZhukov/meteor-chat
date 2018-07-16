import React from 'react';
import styled from 'styled-components';
import { string, shape, bool } from 'prop-types';
import { Icon } from 'semantic-ui-react';

const Wrapper = styled.div`
  font-weight: bold;
  display: flex;
  align-items: center;
  margin: 0 32px;
`;

const User = ({ user, isOnline }) => (
  <Wrapper>
    {
      isOnline
      ? <Icon name={'circle'} style={{ color: '#5E9489'}} />
      : <Icon name={'circle outline'} />
    }
    { user.username }
  </Wrapper>
);

User.propTypes = {
  user: shape({
    _id: string.isRequired,
    username: string.isRequired
  }),
  isOnline: bool
};

User.defaultProps = {
  isOnline: false
};

export default User;