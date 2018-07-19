import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
 
export const Chats = new Mongo.Collection('chats');

Meteor.methods({
  'chats.insert'(name) {
    check(name, String);
 
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    return Chats.insert({
      name,
      createdAt: Date.now(),
      ownerId: this.userId,
      contacts: []
    });
  },
  'chats.addContact'({ chatId, userId }) {
    check(chatId, String);
    check(userId, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    return Chats.update({ _id: chatId}, {
      $push: { contacts: userId }
    });
  },
  'chats.remove'(chatId) {
    check(chatId, String);

    // TODO: Put "removed" flag as true instead of removing from DB
    return Chats.remove(chatId);
  },
});

if (Meteor.isServer) {
  Meteor.publish('ownedChats', function chatsPublication() {
    return Chats.find({ ownerId: this.userId });
  });

  Meteor.publish('participantChats', function chatsPublication() {
    const { userId } = this;

    return Chats.find({ contacts: userId });
  });
}
