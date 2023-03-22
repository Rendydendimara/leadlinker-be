import { NextFunction, Request, Response } from 'express';
import {
  checkUserLoginUseCase,
  loginUseCase,
  logoutUserUseCase,
  registerUserUseCase,
  sendOTPForgotPasswordUseCase,
  verifyResetPasswordUseCase,
} from '../../repositories/User/Auth';

export const registerUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;
    if (!(username && email && password)) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'All data require',
      });
    }
    await registerUserUseCase({ username, email, password }, res, next);
  } catch (err) {
    next(err);
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email_username, password } = req.body;
    if (!(email_username && password)) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'All data is require',
      });
    }
    await loginUseCase({ email_username, password }, res, next);
  } catch (err) {
    next(err);
  }
};

export const checkUserLoginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'All data is require',
      });
    }
    await checkUserLoginUseCase(token, res, next);
  } catch (err) {
    next(err);
  }
};

export const logoutUserController = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.user_id;
    if (!userId) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'All data is require',
      });
    }
    await logoutUserUseCase(userId, res, next);
  } catch (err) {
    next(err);
  }
};

export const verifyResetPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, password, otpResetPassword } = req.body;
    if (!(userId && password && otpResetPassword)) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Semua data diperlukan',
      });
    }
    await verifyResetPasswordUseCase(
      { userId, password, otpResetPassword },
      res,
      next
    );
  } catch (err) {
    next(err);
  }
};

export const sendOTPForgotPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Semua data diperlukan',
      });
    }
    await sendOTPForgotPasswordUseCase(email, res, next);
  } catch (err) {
    next(err);
  }
};
