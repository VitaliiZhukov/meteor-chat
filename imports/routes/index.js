import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import MainLayout from '../ui/layouts/MainLayout';
import App from '../ui/App';

FlowRouter.route('/', {
  action() {
    mount(MainLayout, {
      content: (<App />)
    });
  },
});