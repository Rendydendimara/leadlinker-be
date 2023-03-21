import { model, Model, Schema } from 'mongoose';
import { IBusinessOwner } from '../interface/IBusinessOwner';

/**
 * Not directly exported because it is not recommanded to
 * use this interface direct unless necessary since the
 * type of `company` field is not deterministic
 */
export type BusinessOwnerDocument = Document & IBusinessOwner;

// For model
interface BusinessOwnerModel extends Model<BusinessOwnerDocument> {}

// Create a Schema corresponding to the document interface.
const BusinessOwnerSchema: Schema<BusinessOwnerDocument> = new Schema({
  slug: {
    type: String,
    default: null,
  },
  business: {
    companyName: {
      type: String,
      default: null,
    },
    fullname: {
      type: String,
      default: null,
    },
    profession: {
      type: String,
      default: null,
    },
    location: {
      type: String,
      default: null,
    },
    YearBusiness: {
      type: String,
      default: null,
    },
    companyAbout: {
      type: String,
      default: null,
    },
  },
  personal: {
    companyName: {
      type: String,
      default: null,
    },
    fullname: {
      type: String,
      default: null,
    },
    hobbies: {
      type: String,
      default: null,
    },
    interest: {
      type: String,
      default: null,
    },
  },
  miscellaneous: {
    burningDesire: {
      type: String,
      default: null,
    },
    noOneKnowAboutMe: {
      type: String,
      default: null,
    },
    keySuccess: {
      type: String,
      default: null,
    },
  },
  network: {
    goals: {
      type: String,
      default: null,
    },
    accomplishment: {
      type: String,
      default: null,
    },
    interest: {
      type: String,
      default: null,
    },
    network: {
      type: String,
      default: null,
    },
    skill: {
      type: String,
      default: null,
    },
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  deletedAt: {
    type: Date,
    default: null,
  },
  updatedAt: {
    type: Date,
    default: null,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// Document middlewares
// BusinessOwnerSchema.pre('save', async function (this: BusinessOwnerDocument, next) {
//   console.log('this.password', this.password);
//   const hash = await bcrypt.hash(this.password, ROUNDED_SALT_BCRYPT);
//   this.password = hash;
//   next();
// });

const BusinessOwner = model<BusinessOwnerDocument, BusinessOwnerModel>(
  'BusinessOwner',
  BusinessOwnerSchema
);
export default BusinessOwner;
