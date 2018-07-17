import React from 'react';
import { arrayOf, shape, string } from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { withTracker } from 'meteor/react-meteor-data';

import Avatar from './Avatar';

const Wrapper = styled.div`
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

const Message = ({ item, user }) => {
  return (
    <Wrapper>
      <Avatar />

      <ContentWrapper>
        <Title>
          <AuthorName>
            {user && user.username}
          </AuthorName>
          <Time>
            {moment.unix(item.createdAt / 1000).format('LT')}
          </Time>
        </Title>
        <Text>
        { item.text }
        </Text>
      </ContentWrapper>
    </Wrapper>
  );
};

Message.propTypes = {
  massages: arrayOf(shape({
    id: string.isRequired,
    chatId: string.isRequired,
    ownerId: string.isRequired
  }))
};

export default withTracker(({ item }) => {
  Meteor.subscribe('userById', item.ownerId);

  return {
    user: Meteor.users.findOne({ _id: item.ownerId })
  };
})(Message);
