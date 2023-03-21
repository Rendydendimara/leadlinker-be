import express from 'express';
import { isAuth } from '../../middleware/userAuth';
import { asyncErrorHandler } from '../../middleware';
import {
  checkUserLoginController,
  loginController,
  logoutUserController,
  registerUserController,
} from '../../controller/User/auth';

const authRouter = express.Router();

authRouter.post('/register', registerUserController);
authRouter.post('/login', loginController);
authRouter.post('/check-user-login', checkUserLoginController);
authRouter.get('/logout', asyncErrorHandler(isAuth), logoutUserController);

export default authRouter;
