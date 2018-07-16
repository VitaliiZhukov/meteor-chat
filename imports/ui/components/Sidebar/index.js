import React from 'react';
import styled from 'styled-components';
import { shape, string } from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import Preloader from '../../shared/Preloader';

const Wrapper = styled.header`
  display: flex;
  flex-direction: column;
`;

const Sidebar = ({ currentUser }) => {
  return <Preloader/>;
  // if (!currentUser) {
  //   return <Preloader />;
  // }
  // return (
  //   <Wrapper>
  //   </Wrapper>
  // );
};

Sidebar.propTypes = {
  currentUser: shape({
    _id: string.isRequired
  })
};

export default withTracker(() => {
  return {
    currentUser: Meteor.user(),
  };
})(Sidebar);