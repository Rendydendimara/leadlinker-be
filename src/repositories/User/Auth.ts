import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/jwt';
import User from '../../models/user';
import { hashingPassword } from '../../service/password';
import { createJWTToken } from '../../utils/jwt';
import { emailPattern } from '../../utils/reqex';
import moment from 'moment';
import { randomString } from '../../utils/string';
import config from '../../config';
import { sendEmailForgotPassword } from '../../service/email/auth';
import mongoose from 'mongoose';

export const registerUserUseCase = async (
  payload: {
    username: string;
    email: string;
    password: string;
  },
  res: Response,
  next: NextFunction
) => {
  try {
    if (!emailPattern.test(payload.email)) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'invalid email',
      });
    }
    if (payload.password.length < 7) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Password terlalu pendek',
      });
    }

    let oldUser = await User.findOne({ email: payload.email });
    if (oldUser) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'email already exist',
      });
    }
    oldUser = await User.findOne({ username: payload.username });
    if (oldUser) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'username already exist',
      });
    }
    const hashPass: any = await hashingPassword(payload.password);
    payload.password = hashPass;
    const newUser = await User.create({ ...payload, userType: 'user' });
    const token = createJWTToken({
      id: String(newUser._id),
    });

    newUser.token = token;
    await newUser.save();
    return res.send({
      success: true,
      data: newUser,
      message: 'Success create user',
    });
  } catch (e) {
    next(e);
  }
};

export const loginUseCase = async (
  payload: {
    email_username: string;
    password: string;
  },
  res: Response,
  next: NextFunction
) => {
  try {
    let dbQueries = [];

    if (emailPattern.test(payload.email_username)) {
      dbQueries.push({
        $and: [{ email: payload.email_username }],
      });
    } else {
      dbQueries.push({
        $and: [{ name: payload.email_username }],
      });
    }

    // Validate if user exist in our database
    const user = await User.findOne({ $and: dbQueries });
    if (!user) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Email or password wrong',
      });
    }
    const validate: boolean = await user.isValidPassword(payload.password);

    if (!validate) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Email or password wrong',
      });
    }

    const token = createJWTToken({
      id: String(user._id),
    });

    user.token = token;
    user.save(); // save after add user token, running on

    return res.send({
      success: true,
      data: user,
      message: 'Success login',
    });
  } catch (e) {
    next(e);
  }
};

export const checkUserLoginUseCase = async (
  token: string,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findOne({ token: token });

  if (!user) {
    return res.status(400).send({
      success: false,
      data: null,
      message: 'Token is invalid',
    });
  }
  try {
    jwt.verify(token, JWT_SECRET);
    return res.status(200).send({
      success: true,
      data: user,
      message: 'Login success',
    });
  } catch (err) {
    if (err.message === 'jwt expired') {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Token is expired',
      });
    }
    next(err);
  }
};

export const logoutUserUseCase = async (
  userId: string,
  res: Response,
  next: NextFunction
) => {
  // check if user already exist
  const oldUser = await User.findById(userId);
  if (oldUser) {
    oldUser.token = '';
    oldUser.save();
    return res.send({
      success: true,
      data: null,
      message: 'Success logout',
    });
  } else {
    return res.status(400).send({
      success: true,
      data: null,
      message: 'Error logout',
    });
  }
};

export const sendOTPForgotPasswordUseCase = async (
  email: string,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({
      email: email,
      isDeleted: { $ne: true },
    });

    if (!user) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Email tidak ditemukan',
      });
    }

    if (user.createOtpResetPasswordAt) {
      if (!moment(new Date()).isAfter(user.createOtpResetPasswordAt)) {
        let duration = moment(user.createOtpResetPasswordAt).diff(
          moment(),
          'minutes'
        );
        if (duration < 1) {
          duration = 1;
        }
        return res.status(400).send({
          success: false,
          data: null,
          message: `Tunggu ${duration} menit untuk melakukan request OTP reset forget password`,
        });
      }
    }

    user.otpResetPassword = randomString(6);
    user.createOtpResetPasswordAt = moment(new Date())
      .add(5, 'minutes')
      .toDate();
    await user.save();

    await sendEmailForgotPassword({
      username: user.username,
      email: user.email,
      userId: user._id,
      frontendUrl: `${config.FRONTEND_URL}reset-forgot-password`,
      userType: 'penjual',
      tokenVerify: user.otpResetPassword,
    });

    return res.status(200).send({
      success: true,
      data: null,
      message: 'Berhasil membuat OTP reset forget password, silakan cek email',
    });
  } catch (err) {
    next(err);
  }
};

export const verifyResetPasswordUseCase = async (
  payload: {
    userId: string;
    password: string;
    otpResetPassword: string;
  },
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({
      _id: new mongoose.Types.ObjectId(payload.userId),
      isSuspend: false,
      isDeleted: { $ne: true },
    });

    if (!user) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'User tidak ditemukan',
      });
    }
    if (payload.password.length < 7) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Password terlalu pendek',
      });
    }

    if (user.otpResetPassword !== payload.otpResetPassword) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'OTP Reset password salah',
      });
    }
    const hashPass: any = await hashingPassword(payload.password);
    user.password = hashPass;
    user.otpResetPassword = null;
    user.createOtpResetPasswordAt = null;
    await user.save();

    return res.status(200).send({
      success: true,
      data: null,
      message: 'Berhasil reset password',
    });
  } catch (err) {
    next(err);
  }
};
