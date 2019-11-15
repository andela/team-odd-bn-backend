import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import EmailTemplates from './EmailTemplates';

dotenv.config();
const { EMAIL_ADDRESS, EMAIL_PASSWORD } = process.env;
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_ADDRESS,
    pass: EMAIL_PASSWORD,
  }
});

const resetPasswordEmailHelper = (req, user) => {
  transporter.sendMail(EmailTemplates.forgotPasswordTemplate(req, user));
};

const resetPasswordSuccessfulHelper = (user) => {
  transporter.sendMail(EmailTemplates.successResetPasswordTemplate(user));
};
export default { resetPasswordEmailHelper, resetPasswordSuccessfulHelper };
