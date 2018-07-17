import React from 'react';
import styled, { withTheme } from 'styled-components';
import { string, shape, bool } from 'prop-types';
import { Icon } from 'semantic-ui-react';

const Wrapper = styled.div`
  font-weight: bold;
  display: flex;
  align-items: center;
  margin: 0 32px;
`;

const Text = styled.p`
  margin-top: 3px;
`;

const User = ({ user, isOnline, theme }) => (
  <Wrapper>
    {
      isOnline
      ? <Icon name={'circle'} style={{ color: theme.highlightColor }} />
      : <Icon name={'circle outline'} />
    }

    <Text>
      { user.username }
    </Text>
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

export default withTheme(User);