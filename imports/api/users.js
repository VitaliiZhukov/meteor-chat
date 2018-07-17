import { Meteor } from 'meteor/meteor';
 
if (Meteor.isServer) {
  Meteor.publish('userById', function usersPublication(userId) {
    return Meteor.users.find({ _id: userId }, { fields: { username: 1 } });
  });
};
