import React from 'react';
import { arrayOf, shape, string } from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

import Avatar from './Avatar';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 32px 16px;
`;

const MessageWrapper = styled.div`
  display: flex;
  margin-bottom: 16px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const ContentWrapper = styled.div`
  margin-left: 16px;
`;

const Title = styled.div`
  display: flex;
`;

const AuthorName = styled.p`
  font-weight: bold;
  margin: 0;
  margin-right: 16px;
`;

const Time = styled.p`
  color: LightGray;
`;

const Text = styled.p`
  margin: 0;
`;

const Messages = ({ messages }) => {
  return (
    <Wrapper>
      { messages.map(item => {
        const { author } = item;

        return (
          <MessageWrapper key={item._id}>
            <Avatar />

            <ContentWrapper>
              <Title>
                <AuthorName>
                  {'vitaliizhukov'}
                </AuthorName>
                <Time>
                  {moment.unix(item.createdAt).format('LT')}
                </Time>
              </Title>
              <Text>
              { item.text }
              </Text>
            </ContentWrapper>
          </MessageWrapper>
        );
      })}
    </Wrapper>
  );
};

Messages.propTypes = {
  massages: arrayOf(shape({
    id: string.isRequired,
    chatId: string.isRequired,
    ownerId: string.isRequired
  }))
};

export default Messages;
