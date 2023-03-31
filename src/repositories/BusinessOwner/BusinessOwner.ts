import { NextFunction, Response } from 'express';
import BusinessOwner from '../../models/businessOwner';
import mongoose from 'mongoose';
import { toSnakeCaseString } from '../../utils/string';

export const CreateBusinessOwnerUseCase = async (
  payload: {
    business: {
      companyName: string;
      fullname: string;
      profession: string;
      location: string;
      YearBusiness: string;
      companyAbout: string;
    };
    personal: {
      homeCity: string;
      aboutMeDontKnow: string;
      skillNotShow: string;
      kids: string;
      interest: string[];
    };
    miscellaneous: {
      burningDesire: string;
      favoritesSuperhero: string;
      representYou: string;
      keySuccess: string;
    };
    network: {
      goals: string;
      accomplishment: string;
      interest: string;
      network: string;
      skill: string;
    };
    background: string;
    userId: string;
  },
  res: Response,
  next: NextFunction
) => {
  try {
    let oldData = await BusinessOwner.findOne({
      'business.companyName': payload.business.companyName,
    });
    if (oldData) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'company name already exist',
      });
    }

    const newPersonal = await BusinessOwner.create({
      business: {
        companyName: payload.business.companyName,
        fullname: payload.business.fullname,
        profession: payload.business.profession,
        location: payload.business.location,
        YearBusiness: payload.business.YearBusiness,
        companyAbout: payload.business.companyAbout,
      },
      personal: {
        homeCity: payload.personal.homeCity,
        aboutMeDontKnow: payload.personal.aboutMeDontKnow,
        skillNotShow: payload.personal.skillNotShow,
        kids: payload.personal.kids,
        interest: payload.personal.interest,
      },
      miscellaneous: {
        burningDesire: payload.miscellaneous.burningDesire,
        favoritesSuperhero: payload.miscellaneous.favoritesSuperhero,
        representYou: payload.miscellaneous.representYou,
        keySuccess: payload.miscellaneous.keySuccess,
      },
      network: {
        goals: payload.network.goals,
        accomplishment: payload.network.accomplishment,
        interest: payload.network.interest,
        network: payload.network.network,
        skill: payload.network.skill,
      },
      background: payload.background,
      user: new mongoose.Types.ObjectId(payload.userId),
      slug: toSnakeCaseString(payload.business.companyName),
    });

    return res.send({
      success: true,
      data: newPersonal,
      message: 'Success create personal',
    });
  } catch (e) {
    next(e);
  }
};

export const GetBusinessOwnerByIdSlugUserUseCase = async (
  payload: {
    type: string;
    id: string;
  },
  res: Response,
  next: NextFunction
) => {
  try {
    let businessOwner: any = null;
    if (payload.type === 'by-user') {
      businessOwner = await BusinessOwner.findOne({
        user: new mongoose.Types.ObjectId(payload.id),
      }).populate({
        path: 'user',
        select: 'email username',
      });
    } else if (payload.type === 'by-id') {
      businessOwner = await BusinessOwner.findOne({
        _id: new mongoose.Types.ObjectId(payload.id),
      }).populate({
        path: 'user',
        select: 'email username',
      });
    } else if (payload.type === 'by-slug') {
      businessOwner = await BusinessOwner.findOne({
        slug: payload.id,
      }).populate({
        path: 'user',
        select: 'email username',
      });
    }

    if (!businessOwner) {
      return res.status(404).send({
        success: false,
        data: null,
        message: 'Business owner not found',
      });
    }

    return res.send({
      success: true,
      data: businessOwner,
      message: 'Success get business owner',
    });
  } catch (e) {
    next(e);
  }
};
