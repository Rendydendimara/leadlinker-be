import { Types, Schema } from 'mongoose';

export interface IPersonal {
  _id: Types.ObjectId | Record<string, unknown>;
  nickname: string;
  fullname: string;
  slug: string;
  title1: string;
  previousWorking: string;
  expertise: string;
  confident: string;
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
  skillNotShowed: string;
  spareTime: string;
  iLike: string;
  iDontLike: string;
  notPeopleKnowYou: string;
  reactOutYou: string;
}
