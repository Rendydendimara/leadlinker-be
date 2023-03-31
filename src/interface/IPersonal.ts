import { Types, Schema } from 'mongoose';

export interface IPersonal {
  _id: Types.ObjectId | Record<string, unknown>;
  nickname: string;
  fullname: string;
  slug: string;
  title1: string;
  title2: string;
  expertise: string;
  passion: string;
  goal: string;
  noTelfon: string;
  user: {
    type: Schema.Types.ObjectId;
    ref: 'User';
    required: true;
  };
  createdAt: Date;
  background: string | null;
  isDeleted: boolean;
  deletedAt: Date | null;
  updatedAt: Date | null;
}
