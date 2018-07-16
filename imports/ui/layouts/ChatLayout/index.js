import React from 'react';
import styled from 'styled-components';

import SidebarContent from '../../components/Sidebar';

const Wrapper = styled.header`
  display: flex;
  height: 100%;
`;

const Sidebar = styled.aside`
  width: 300px;
  background-color: #4A394A;
  color: #9E969E;
`;

const Content = styled.div`
  flex: 1;
`;

const ChatLayout = () => (
  <Wrapper>
    <Sidebar>
      <SidebarContent />
    </Sidebar>
    <Content>
      <h2>Chats here</h2>
    </Content>
  </Wrapper>
);

export default ChatLayout;