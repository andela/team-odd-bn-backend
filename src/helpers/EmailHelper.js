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
   * @returns {Object} sendEmail
   */
  static approveEmailHelper(req) {
    transporter.sendMail(EmailTemplates.approveEmailTemplate(req));
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

  /**
   *  Email Helper
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
export default EmailHelper;
