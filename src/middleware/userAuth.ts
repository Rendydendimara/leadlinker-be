import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from '../config/jwt';
import User from '../models/user';

// handle verify token
export const isAuth = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['leadlinker-token'] || req.headers.authorization;
  if (!token) {
    return res.status(401).send({
      success: false,
      data: null,
      message: 'A token is required for authentication',
    });
  }
  try {
    const user = await User.findOne({ token: token });
    if (!user) {
      return res.status(401).send({
        success: false,
        data: null,
        message: 'User no login',
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    if (err.message === 'jwt expired') {
      return res.status(401).send({
        success: false,
        data: null,
        message: 'Token is expired',
      });
    }
    return res.status(401).send({
      success: false,
      data: null,
      message: err.message,
    });
  }
  return next();
};
