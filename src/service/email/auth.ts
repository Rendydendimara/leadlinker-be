// import { APP_NAME, BASE_URL } from '../../config';
import emailTransporter from '../../config/email';

const fromAdmin = `info@leadlinker.com`;

export const sendEmailForgotPassword = (user: {
  username: string;
  email: string;
  userType: string;
  frontendUrl: string;
  userId: string | any;
  tokenVerify: any;
}) =>
  new Promise(async (resolve, reject) => {
    const emailRecipients = `r3ndydinar@gmail.com, ${user.email}`;
    try {
      // send mail with defined transport object
      await emailTransporter.sendMail({
        from: fromAdmin, // sender address
        to: emailRecipients, // list of receivers
        subject: `Forgot Password Leadlinker`, // Subject line
        text: `
Hallo ${user.username},
Silakan melakukan reset password akun melalui link berikut: ${user.frontendUrl}?userid=${user.userId}&otptoken=${user.tokenVerify}
        `,
      });
      resolve(true);
    } catch (err) {
      console.log('err', err);
      reject(err);
    }
  });
