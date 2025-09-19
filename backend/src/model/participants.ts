import { sequelize } from '@config';
import { Model, DataTypes } from '@sequelize/core';

import { User } from './users';
import { Event } from './events';

export class EventParticipant extends Model {
  declare id: number;
  declare eventId: number;
  declare userId: number;
  declare createdAt: Date;
}

export const EventParticipantModel = EventParticipant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Event,
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'EventParticipant',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['eventId', 'userId'],
      },
    ],
  },
);
