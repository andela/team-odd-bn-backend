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

/**
 * @export
 * @class PasswordHelper
 */
class PasswordHelper {
  /**
   * Passwordhelper
   * @static
   * @param {Object} req request object
   * @param {Object} user user object
   * @returns {Object} forgot password email
   */
  static resetPasswordEmailHelper(req, user) {
    transporter.sendMail(EmailTemplates.forgotPasswordTemplate(req, user));
  }

  /**
   * Passwordhelper
   * @static
   * @param {Object} user user object
   * @returns {Object} successful reset password email
   */
  static resetPasswordSuccessfulHelper(user) {
    transporter.sendMail(EmailTemplates.successResetPasswordTemplate(user));
  }
}
export default PasswordHelper;
