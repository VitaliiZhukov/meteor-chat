import { Meteor } from 'meteor/meteor';
 
if (Meteor.isServer) {
  Meteor.publish('userById', function usersPublication(userId) {
    return Meteor.users.find({ _id: userId }, { fields: { username: 1 } });
  });

  Meteor.publish('availableUsers', function usersPublication() {
    return Meteor.users.find({}, { fields: { username: 1 } });
  });
};
