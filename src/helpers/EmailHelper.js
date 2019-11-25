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
   * verify email
   * @static
   * @param {Object} req the template to use
   * @param {Object} user the template to use
   * @returns {Object} sendEmail
   */
  static verifyEmailHelper(req, user) {
    transporter.sendMail(EmailTemplates.verifyEmailTemplate(req, user));
  }

  /**
   * rsend email to the manager
   * @static
   * @param {Object} req the template to use
   * @param {Object} email the template to use
   * @returns {Object} sendEmail
   */
  static approveEmailHelper(req, email) {
    transporter.sendMail(EmailTemplates.approveEmailTemplate(req, email));
  }

  /**
   * rsend email to the manager
   * @static
   * @param {Object} user the template to use
   * @returns {Object} sendEmail
   */
  static approvedEmailHelper(user) {
    transporter.sendMail(EmailTemplates.approvedEmailTemplate(user));
  }
}
export default EmailHelper;
