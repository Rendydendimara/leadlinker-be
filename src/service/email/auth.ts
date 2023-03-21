// import { APP_NAME, BASE_URL } from '../../config';
import emailTransporter from '../../config/email';

const fromAdmin = `info@dbmaid.com`;

export const serviceSendEmailRegister = (user: {
  username: string;
  email: string;
}) =>
  new Promise(async (resolve, reject) => {
    try {
      // send mail with defined transport object
      await emailTransporter.sendMail({
        from: fromAdmin, // sender address
        to: user.email, // list of receivers
        subject: `Welcome to The True Sight`, // Subject line
        text: `
Welcome ${user.email}
Thank you for signing up.

You're a DBFriend now! Things can't get much more exciting from now on! Here's a welcome drink for you 🥂

{{BASE_URL}}

If you have pressing matters to ask us, simply send us your questions here ${fromAdmin}. We will send you the answers you need ASAP. 

Have fun navigating our site :)

DBTeam.

        `,
        // plain text body
        //   html: `
        // <div>
        // <p> Welcome to ${APP_NAME}, thanks for using us. Currently we still on alpha testing </p>
        // </div>`,
      });

      // console.log('Message sent: %s', info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      resolve(true);
    } catch (err) {
      console.log('err', err);
      reject(err);
    }
  });

export const serviceSendEmailSubscription = (user: {
  username: string;
  email: string;
  password: string;
}) =>
  new Promise(async (resolve, reject) => {
    try {
      // send mail with defined transport object
      await emailTransporter.sendMail({
        from: fromAdmin, // sender address
        to: user.email, // list of receivers
        subject: 'Account Detail Information of DB MAID', // Subject line
        text: `
        Hello ${user.username}, 

        Sarah want tell you about your secret password, please keep it safe so
        there is no thief that able steal your cutest maid.

        PASSWORD : ${user.password}
        EMAIL    : ${user.email}

        If you forget dont be afraid, just come back to dbmaid then login and
        type your email we will send you the reminder.

        Cheer.
        Sarah
        Maid Squad Lead.
        `,
        // html: `
        // <div>
        // <p> Welcome to ${APP_NAME}, thanks for using us. Currently we still on alpha testing </p>
        // </div>`,
      });

      // console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      resolve(true);
    } catch (err) {
      console.log('err', err);
      reject(err);
    }
  });
