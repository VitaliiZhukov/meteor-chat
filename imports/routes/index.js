import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import MainLayout from '../ui/layouts/MainLayout';
import ChatLayout from '../ui/layouts/ChatLayout';
import App from '../ui/App';

Accounts.onLogin((() => {
  FlowRouter.go('/chats')
}));

const authorizedRoutes = FlowRouter.group({
  name: 'authorized'
});

const unauthorizedRoutes = FlowRouter.group({
  name: 'unauthorized'
});

unauthorizedRoutes.route('/', {
  action() {
    mount(MainLayout, {
      content: (<App />)
    });
  },
});

authorizedRoutes.route('/chats', {
  action() {
    mount(ChatLayout, {
      content: (<App />)
    });
  },
});

authorizedRoutes.route('/chats/:chatId', {
  action() {
    mount(MainLayout, {
      content: (<App />)
    });
  },
});
