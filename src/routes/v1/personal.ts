import express from 'express';
import {
  CreatePersonalController,
  GetPersonalByIdSlugController,
} from '../../controller/Personal/Personal';

const personalRouter = express.Router();

personalRouter.post('/create', CreatePersonalController);
personalRouter.post('/get-detail', GetPersonalByIdSlugController);

export default personalRouter;
