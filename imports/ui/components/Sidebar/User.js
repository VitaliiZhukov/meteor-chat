import React from 'react';
import styled from 'styled-components';
import { string, shape } from 'prop-types';

const Wrapper = styled.header`
  font-weight: bold;
`;

const User = ({ user }) => (
  <Wrapper>
    { user.username }
  </Wrapper>
);

User.propTypes = {
  user: shape({
    _id: string.isRequired,
    username: string.isRequired
  })
};

export default User;