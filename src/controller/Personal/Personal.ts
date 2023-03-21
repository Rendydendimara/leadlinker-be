import { NextFunction, Request, Response } from 'express';
import {
  CreatePersonalUseCase,
  GetPersonalByIdSlugUserUseCase,
} from '../../repositories/Personal/Personal';

export const CreatePersonalController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: any = req.body;
    await CreatePersonalUseCase(data, res, next);
  } catch (err) {
    next(err);
  }
};

export const GetPersonalByIdSlugController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { type, id } = req.body;
    await GetPersonalByIdSlugUserUseCase({ type, id }, res, next);
  } catch (err) {
    next(err);
  }
};
