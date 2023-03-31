import { Types, Schema } from 'mongoose';

export interface IBusinessOwner {
  _id: Types.ObjectId | Record<string, unknown>;
  slug: string;
  business: {
    companyName: string;
    fullname: string;
    profession: string;
    location: string;
    YearBusiness: string;
    companyAbout: string;
  };
  personal: {
    homeCity: string;
    aboutMeDontKnow: string;
    skillNotShow: string;
    kids: string;
    interest: string[];
  };
  miscellaneous: {
    burningDesire: string;
    favoritesSuperhero: string;
    representYou: string;
    keySuccess: string;
  };
  network: {
    goals: string;
    accomplishment: string;
    interest: string;
    network: string;
    skill: string;
  };
  user: {
    type: Schema.Types.ObjectId;
    ref: 'User';
    required: true;
  };
  background: string | null;
  createdAt: Date;
  isDeleted: boolean;
  deletedAt: Date | null;
  updatedAt: Date | null;
}
