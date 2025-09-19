import { Model, DataTypes } from '@sequelize/core';
import { sequelize } from '@config';
import { User } from './users';

export class Event extends Model {
  declare id: number;
  declare title: string;
  declare description: string;
  declare date: Date;
  declare createdBy: number;
  declare createdAt: Date;
  declare participants?: User[];
}

export const EventModel = Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      index: true,
      references: {
        model: User,
        key: 'id',
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      index: true,
    },
  },
  {
    sequelize,
    modelName: 'Event',
    timestamps: false,
  },
);
