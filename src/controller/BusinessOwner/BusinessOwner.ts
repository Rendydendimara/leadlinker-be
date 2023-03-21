import { NextFunction, Request, Response } from 'express';
import {
  CreateBusinessOwnerUseCase,
  GetBusinessOwnerByIdSlugUserUseCase,
} from '../../repositories/BusinessOwner/BusinessOwner';

export const CreateBusinessOwnerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: any = req.body;
    await CreateBusinessOwnerUseCase(data, res, next);
  } catch (err) {
    next(err);
  }
};

export const GetBusinessOwnerByIdSlugUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { type, id } = req.body;
    await GetBusinessOwnerByIdSlugUserUseCase({ type, id }, res, next);
  } catch (err) {
    next(err);
  }
};
