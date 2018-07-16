import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Chats } from './chats';
 
export const Messages = new Mongo.Collection('messages');

Meteor.methods({
  'messages.insert'({ text, chatId }) {
    check(text, String);
    check(chatId, String);
 
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Messages.insert({
      text,
      chatId,
      createdAt: Date.now(),
      ownerId: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  }
});

if (Meteor.isServer) {
  Meteor.publish('messages', function messagesPublication() {
    const userChats = Chats.find({ owner: this.userId });

    return Messages.find({ ownerId: this.userId });
  });
};
