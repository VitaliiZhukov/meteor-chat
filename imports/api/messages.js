import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
 
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
      ownerId: this.userId
    });
  }
});

if (Meteor.isServer) {
  Meteor.publish('messages', function messagesPublication(chatId) {
    return Messages.find({ chatId });
  })
}
