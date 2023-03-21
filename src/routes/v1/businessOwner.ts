import express from 'express';
import {
  CreateBusinessOwnerController,
  GetBusinessOwnerByIdSlugUserController,
} from '../../controller/BusinessOwner/BusinessOwner';

const businessOwnerRouter = express.Router();

businessOwnerRouter.post('/create', CreateBusinessOwnerController);
businessOwnerRouter.post('/get', GetBusinessOwnerByIdSlugUserController);

export default businessOwnerRouter;
