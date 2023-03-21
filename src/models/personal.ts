import { model, Model, Schema } from 'mongoose';
import { IPersonal } from '../interface/IPersonal';

/**
 * Not directly exported because it is not recommanded to
 * use this interface direct unless necessary since the
 * type of `company` field is not deterministic
 */
export type PersonalDocument = Document & IPersonal;

// For model
interface IPersonalModel extends Model<PersonalDocument> {}

// Create a Schema corresponding to the document interface.
const PersonalSchema: Schema<PersonalDocument> = new Schema({
  nickname: {
    type: String,
    default: null,
  },
  fullname: {
    type: String,
    default: null,
  },
  slug: {
    type: String,
    default: null,
  },
  title1: {
    type: String,
    default: null,
  },
  title2: {
    type: String,
    default: null,
  },
  expertise: {
    type: String,
    default: null,
  },
  passion: {
    type: String,
    default: null,
  },
  goal: {
    type: String,
    default: null,
  },
  noTelfon: {
    type: String,
    default: null,
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
// PersonalSchema.pre('save', async function (this: PersonalDocument, next) {
//   console.log('this.password', this.password);
//   const hash = await bcrypt.hash(this.password, ROUNDED_SALT_BCRYPT);
//   this.password = hash;
//   next();
// });

const Personal = model<PersonalDocument, IPersonalModel>(
  'Personal',
  PersonalSchema
);
export default Personal;
