import nodemailer from 'nodemailer';
import config from '../config';

// Generate test SMTP service account from ethereal.email
// create reusable transporter object using the default SMTP transport
const emailTransporter = nodemailer.createTransport({
  // host: "smtp.ethereal.email",
  // port: 587,
  // secure: false, // true for 465, false for other ports
  service: 'gmail', // Email Service
  // auth: {
  //   user: 'shoutout.internal@gmail.com', // YOUR EMAIL
  //   pass: 'sukukata123!@#', // YOUR PASSWORD EMAIL
  // },
  // service: 'Yandex',
  // host: 'smtp.yandex.ru',
  // host: 'pop.zoho.eu',
  // port: 995,
  // secure: true, // use SSL
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASSWORD,
  },
});

export default emailTransporter;
