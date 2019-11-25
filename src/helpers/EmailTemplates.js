import dotenv from 'dotenv';
import AuthenticateToken from './AuthenticateToken';

dotenv.config();
const { EMAIL_ADDRESS, MANAGER } = process.env;

/**
 * @export
 * @class EmailTemplates
 */
class EmailTemplates {
  /**
   * register a new
   * @static
   * @param {Object} req request object
   * @param {Object} user user
   * @returns {Object} template toi use
   */
  static verifyEmailTemplate(req, user) {
    const token = AuthenticateToken.signToken(user);
    const appUrl = `${req.protocol}://${req.headers.host}/api/v1/auth/verify-email/${user.id}/${token}`;
    const resendUrl = `${req.protocol}://${req.headers.host}/api/v1/auth/${user.id}/resend-email`;
    return {
      to: user.email,
      subject: 'Verify email',
      html:
      `<div 
      style="position:absolute;
      width:100%; height:100%; 
      background-color:#F4F4F4">
        <div 
        style='display:flex; 
        height:120px; font-size:25px;'>
          <div style='margin:17px 7px 0px 40px';>
            <img 
            src='https://res.cloudinary.com/hezzie/image/upload/c_scale,w_60/v1573559746/barefootNomad/icon_givw7v.png' 
            alt='Bare Foot Nomad Icon' 
            />
          </div>
          <div>
            <h1 style='color:#00B9F2; font-weight:900'>Barefoot Nomad</h1>
          </div>
        </div>
        <div 
        style='height:60%; 
        margin:auto; width: 94%; 
        text-align:left; 
        background-color:#FFFF; 
        -webkit-box-shadow: 5px 5px 5px 5px black; 
        -moz-box-shadow: 5px 5px 5px 5px black;
        box-shadow: 5px 5px 5px 5px black;'>
          <div style='height:65%; padding:10px'>
          <p style="">  Hi ${user.firstName} </p>
          <p style="">Barefoot Nomad needs to verify your email address associated with the account created.</p>
          <p style="">To verify your email address, click on the link below.</p>
          <a 
          href=${appUrl} 
          style='display:block; 
          background-color:#00B9F2; 
          width:200px; 
          text-align:center; 
          height:auto; 
          text-decoration:none; 
          color:#FFFF; padding:5px;' 
          target='_blank' > Verify Email</a>
          <p style=''>This link expires in 24 hours after the original verification request</p>
          <p>Click<a 
          href=${resendUrl}
          style='display:block; 
          color:#00B9F2; 
          text-decoration:none;' 
          target='_blank'> here </a> to request an email resend
          </p>
          </div>
          <div 
          style='background-color:#F4F4F4; 
         height:25%; width:100%;
                     float:bottom;padding:10px'>
            <p style="">
              If you have any issue, please contact us immediately at on our support email 
              <a href='mailto:oddbarefootnomad@gmail.com' target='_self'> Barefoot</a>
            </p>
          </div>
       </div>
     </div>`
    };
  }

  /**
   * email templates
   * @static
   * @param {Object} req request object
   * @param {Object} user user object
   * @returns {Object} sendEmail
   */
  static forgotPasswordTemplate(req, user) {
    const token = AuthenticateToken.signToken(user.dataValues);

    const appUrl = `${req.protocol}://${req.headers.host}`;
    return {
      to: user.email,
      from: EMAIL_ADDRESS,
      subject: 'Reset Password Link',
      html: `<h4>Hi, ${user.firstName},</h4>
    <p>You requested for a password reset, kindly use this <a href="${appUrl}/api/v1/auth/reset-password/${token}">link</a> to reset your password</p>`
    };
  }

  /**
   * register a new
   * @static
   * @param {Object} user the template to use
   * @returns {Object} sendEmail
   */
  static successResetPasswordTemplate(user) {
    return {
      to: user.email,
      from: EMAIL_ADDRESS,
      subject: 'Password Reset Successful',
      html: `<h4>Hi, ${user.firstName},</h4>
     <p>Your password has been successfully reset!</p>`
    };
  }

  /**
   * register a new
   * @static
   * @param {Object} req the template to use
   * @param {Object} email the template to use
   * @returns {Object} sendEmail
   */
  static approveEmailTemplate(req, email) {
    return {
      to: email,
      from: EMAIL_ADDRESS,
      subject: 'Trip request',
      html: `<h4>Hi, ${MANAGER},</h4>
     <p>${req.user.firstName} has made a multi trip request, the reason for the request is ${req.body.reason}</p>`
    };
  }

  /**
   * register a new
   * @static
   * @param {Object} user the template to use
   * @returns {Object} sendEmail
   */
  static approvedEmailTemplate(user) {
    return {
      to: user.email,
      from: EMAIL_ADDRESS,
      subject: 'Trip request approved',
      html: `<h4>Hi, ${user.firstName},</h4>
     <p>Your trip request has been approved</p>`
    };
  }
}

export default EmailTemplates;
