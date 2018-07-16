import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { consolidateStreamedStyles } from 'styled-components';
 
export const Chats = new Mongo.Collection('chats');

Meteor.methods({
  'chats.insert'(name) {
    check(name, String);
 
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    Chats.insert({
      name,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'chats.remove'(chatId) {
    check(chatId, String);
    Chats.remove(chatId);
  },
});

if (Meteor.isServer) {
  Meteor.publish('chats', function chatsPublication() {
    console.log(this.userId);
    return Chats.find({ owner: this.userId });
  });
}