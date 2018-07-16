import React from 'react';
import { shape, string } from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  padding: 16px;
  border-bottom: 1px solid LightGray;
`;

const ChatHeader = ({ chat }) => (
  <Wrapper>
    <h2>
      { chat.name }
    </h2>
  </Wrapper>
);

ChatHeader.propTypes = {
  chat: shape({
    _id: string.isRequired,
    ownerId: string.isRequired
  })
};

export default ChatHeader;
