import { Event } from './events';
import { User } from './users';
import { EventParticipant } from './participants';

// Связь создателя события (один ко многим)
User.hasMany(Event, {
  foreignKey: 'createdBy',
  as: 'createdEvents',
});
Event.belongsTo(User, {
  foreignKey: 'createdBy',
  as: 'creator',
});

Event.belongsToMany(User, {
  through: EventParticipant,
  foreignKey: 'eventId',
  otherKey: 'userId',
  as: 'participants',
});

User.belongsToMany(Event, {
  through: EventParticipant,
  foreignKey: 'userId',
  otherKey: 'eventId',
  as: 'participatedEvents',
});

export * from './events';
export * from './users';
export * from './tokens';
export * from './participants';
