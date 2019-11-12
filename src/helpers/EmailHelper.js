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
 * @class EmailHelper
 */
class EmailHelper {
  /**
   * register a new
   * @static
   * @param {Object} req the template to use
   * @param {Object} user the template to use
   * @returns {Object} sendEmail
   */
  static verifyEmailHelper(req, user) {
    transporter.sendMail(EmailTemplates.verifyEmailTemplate(req, user));
  }
}
export default EmailHelper;
