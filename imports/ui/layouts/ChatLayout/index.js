import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import SidebarContent from '../../components/Sidebar';

const theme = {
  primaryBgColor: '#4A394A',
  fontColor: '#BFB9BF',
  highlightFontColor: '#FFFFFF',
  highlightColor: '#5E9489'
};

const Wrapper = styled.header`
  display: flex;
  height: 100%;
`;

const Sidebar = styled.aside`
  width: 300px;
  background-color: ${props => props.theme.primaryBgColor};
  color: ${props => props.theme.fontColor};
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChatLayout = ({ content }) => (
  <ThemeProvider theme={theme}>
    <Wrapper>
      <Sidebar>
        <SidebarContent />
      </Sidebar>
      <Content>
        {
          !!content
          ? content
          : <p>{'Please select chat...'}</p>
        }
      </Content>
    </Wrapper>
  </ThemeProvider>
);

export default ChatLayout;
