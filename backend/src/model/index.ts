import { Event } from './events';
import { User } from './users';

User.hasMany(Event, { foreignKey: 'createdBy' });
Event.belongsTo(User, { foreignKey: 'createdBy' });

export * from './events';
export * from './users';
export * from './tokens';
