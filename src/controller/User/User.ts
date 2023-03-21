import { NextFunction, Response } from 'express';
import User from '../../models/user';

export const chekUserEmailUseCase = async (
  email: string,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Email not found',
      });
    }
    return res.status(200).send({
      success: false,
      data: null,
      message: 'Email found',
    });
  } catch (err) {
    next(err);
  }
};
