import { Meteor } from 'meteor/meteor';
import { loadInitialData } from '../infra/initial-data';
import { Communities } from '../communities/communities';
import { People } from '../people/people';

Meteor.startup(async () => {
  // DON'T CHANGE THE NEXT LINE
  await loadInitialData();

  // YOU CAN DO WHATEVER YOU WANT HERE
  Meteor.publish('people', () => People.find());

  Meteor.publish('communities', () => Communities.find());

  Meteor.methods({
    async 'people.checkIn'(personId) {
      if (!personId) {
        throw new Meteor.Error('Invalid argument', 'Person ID is required');
      }
      try {
        const person = await People.findOneAsync(personId);
        if (!person) {
          throw new Meteor.Error(
            'Person not found',
            'No person found with the given ID'
          );
        }
        await People.updateAsync(personId, {
          $set: { checkInDate: new Date() },
        });
      } catch (error) {
        throw new Meteor.Error('Update failed', error.message);
      }
    },

    async 'people.checkOut'(personId) {
      if (!personId) {
        throw new Meteor.Error('Invalid argument', 'Person ID is required');
      }
      try {
        const person = await People.findOneAsync(personId);
        if (!person) {
          throw new Meteor.Error(
            'Person not found',
            'No person found with the given ID'
          );
        }
        await People.updateAsync(personId, {
          $set: { checkOutDate: new Date() },
        });
      } catch (error) {
        throw new Meteor.Error('Update failed', error.message);
      }
    },
  });
});
