import { NextFunction, Response } from 'express';
import mongoose from 'mongoose';
import Personal from '../../models/personal';
import { toSnakeCaseString } from '../../utils/string';

export const CreatePersonalUseCase = async (
  payload: {
    nickname: string;
    fullname: string;
    title1: string;
    title2: string;
    expertise: string;
    passion: string;
    goal: string;
    noTelfon: string;
    userId: string;
    background: string;
  },
  res: Response,
  next: NextFunction
) => {
  try {
    let oldData = await Personal.findOne({ nickname: payload.nickname });
    if (oldData) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'nickname already exist',
      });
    }
    oldData = await Personal.findOne({ fullname: payload.fullname });
    if (oldData) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'fullname already exist',
      });
    }
    oldData = await Personal.findOne({ noTelfon: payload.noTelfon });
    if (oldData) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'no telfon already exist',
      });
    }

    const newPersonal = await Personal.create({
      nickname: payload.nickname,
      fullname: payload.fullname,
      title1: payload.title1,
      title2: payload.title2,
      expertise: payload.expertise,
      passion: payload.passion,
      goal: payload.goal,
      background: payload.background,
      noTelfon: payload.noTelfon,
      user: new mongoose.Types.ObjectId(payload.userId),
      slug: toSnakeCaseString(payload.nickname),
    });

    return res.send({
      success: true,
      data: newPersonal,
      message: 'Success create profesional',
    });
  } catch (e) {
    next(e);
  }
};

export const GetPersonalByIdSlugUserUseCase = async (
  payload: {
    type: string;
    id: string;
  },
  res: Response,
  next: NextFunction
) => {
  try {
    let personal: any = null;
    if (payload.type === 'by-user') {
      personal = await Personal.findOne({
        user: new mongoose.Types.ObjectId(payload.id),
      }).populate({
        path: 'user',
        select: 'email username',
      });
    } else if (payload.type === 'by-id') {
      personal = await Personal.findOne({
        _id: new mongoose.Types.ObjectId(payload.id),
      }).populate({
        path: 'user',
        select: 'email username',
      });
    } else if (payload.type === 'by-slug') {
      personal = await Personal.findOne({
        slug: payload.id,
      }).populate({
        path: 'user',
        select: 'email username',
      });
    }

    if (!personal) {
      return res.status(404).send({
        success: false,
        data: null,
        message: 'Profesional not found',
      });
    }

    return res.send({
      success: true,
      data: personal,
      message: 'Success get personal',
    });
  } catch (e) {
    next(e);
  }
};
