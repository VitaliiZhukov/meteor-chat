import { Accounts } from 'meteor/accounts-base';
 
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

if (Meteor.isClient) {
  Meteor.subscribe('currentuser');
}