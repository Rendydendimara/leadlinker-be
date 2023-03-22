import { Types } from 'mongoose';

export interface IUser {
  _id: Types.ObjectId | Record<string, unknown>;
  username: string;
  email: string;
  password: string | null;
  token: string | null;
  createdAt: Date;
  isDeleted: boolean;
  deletedAt: Date | null;
  updatedAt: Date | null;
  otpResetPassword: string | null;
  createOtpResetPasswordAt: Date | null;
  isValidPassword: (password: string) => Promise<boolean>;
}
