import express from 'express';
import { isAuth } from '../../middleware/userAuth';
import { asyncErrorHandler } from '../../middleware';
import {
  checkUserLoginController,
  loginController,
  logoutUserController,
  registerUserController,
  sendOTPForgotPasswordController,
  verifyResetPasswordController,
} from '../../controller/User/auth';

const authRouter = express.Router();

authRouter.post('/register', registerUserController);
authRouter.post('/login', loginController);
authRouter.post('/check-user-login', checkUserLoginController);
authRouter.get('/logout', asyncErrorHandler(isAuth), logoutUserController);
authRouter.post(
  '/verify-forgot-password',
  asyncErrorHandler(verifyResetPasswordController)
);
authRouter.post(
  '/send-otp-forgot-password',
  asyncErrorHandler(sendOTPForgotPasswordController)
);
export default authRouter;
