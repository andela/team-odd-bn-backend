import dotenv from 'dotenv';
import HttpStatus from 'http-status-codes';
import HashPassword from '../helpers/HashPassword';
import Response from '../helpers/Response';
import emailHelper from '../helpers/EmailHelper';
import AuthenticateToken from '../helpers/AuthenticateToken';
import UserService from '../services/UserService';
import UserHelper from '../helpers/UserHelper';
import NotificationService from '../services/NotificationService';

const { hashPassword } = HashPassword;
const { getAUser } = UserService;
dotenv.config();
/**
 * @exports
 * @class UserController
 */
class UserController {
  /**
   * User can be able to sign up
   * @static
   * @param {object} req  request object
   * @param {object} res response object
   * @memberof UserController
   * @returns {object} data
   */
  static async signUp(req, res) {
    try {
      const { firstName, lastName, email } = req.body;
      const newUser = await UserService.signUp(req, firstName, lastName, email);
      const { password, ...data } = newUser.dataValues;
      const token = AuthenticateToken.signToken(data);
      data.token = token;
      emailHelper.verifyEmailHelper(req, newUser.dataValues);
      return Response.successMessage(req, res, 'User created successfully, Please check your email', token, 201);
    } catch (err) {
      return Response.errorMessage(req, res, 'Server Error', 500);
    }
  }

  /**
     * register a new
     * @static
     * @param {Object} req the request object
     * @param {Object} res the tresponse object
     * @returns {Object} response
     */
  static async verifyEmailController(req, res) {
    await UserService.verifyEmail(req);
    return Response.successMessage(req, res, 'You have been verified you can now login', '', 200);
  }

  /**
     * register a new
     * @static
     * @param {Object} req the request object
     * @param {Object} res the tresponse object
     * @returns {Object} response
     */
  static async resendEmailController(req, res) {
    try {
      emailHelper.verifyEmailHelper(req, req.row);
      return Response.successMessage(req, res, 'An email has been sent to you.', '', 200);
    } catch (err) {
      return Response.errorMessage(req, res, err.message, 500);
    }
  }

  /**
  * User can be able to sign in
  * @description POST /api/auth/signin
  * @static
  * @param {object} req request object
  * @param {object} res response object
  * @returns {object} data
  */
  static async signin(req, res) {
    const { result } = req;
    const { password: pwd, ...data } = result.dataValues;
    const token = AuthenticateToken.signToken(data);
    return Response.successMessage(req, res, 'Successfuly login', token, 200);
  }

  /**
     * User can be able to sign up
     * @param {object} accessToken response
     * @param {object} refreshToken response
     * @param {object} profile objet
     * @param {object} done callback
     * @param {string} type signupType
     * @returns {object} object
     */
  static async facebookCallBack(accessToken, refreshToken, profile, done) {
    UserHelper.socialCallBack(accessToken, refreshToken, profile, 'facebook', done);
  }

  /**
   * User can be able to sign up
   * @param {object} accessToken response
   * @param {object} refreshToken response
   * @param {object} profile objet
   * @param {object} done callback
   * @returns {object} object
   */
  static async googleCallBack(accessToken, refreshToken, profile, done) {
    UserHelper.socialCallBack(accessToken, refreshToken, profile, 'google', done);
  }

  /**
   * User can be able to sign up
   * @param {object} req request object
   * @param {object} res response object
   * @returns {object} object
   */
  static OAuthfacebook(req, res) {
    UserHelper.OAuthSocial(req, res, 'Logged in with facebook successfully');
  }

  /**
  * User can be able to sign up
  * @param {object} req request object
  * @param {object} res response object
  * @returns {object} object
  */
  static OAuthgoogle(req, res) {
    UserHelper.OAuthSocial(req, res, 'Logged in with google successfully');
  }

  /**
   * @static
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Object} response
   */
  static async forgotPasswordController(req, res) {
    const { email } = req.body;
    const user = await getAUser({ email });
    if (!user) {
      return Response.errorMessage(req, res, 'User with this email does not exist', 400);
    }
    emailHelper.resetPasswordEmailHelper(req, user);
    return Response.successMessage(req, res, 'A reset link has been sent to your email. Please check your email!', user.email, 200);
  }

  /**
   * @static
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Object} response
   */
  static async resetPasswordController(req, res) {
    const { password } = req.body;
    const { id } = req.user;
    const user = await getAUser({ id });
    const hashedPassword = hashPassword(password);
    user.password = hashedPassword;
    user.save();
    if (!user) {
      return Response.errorMessage(req, res, 'Oops reset password was not successful', '', 404);
    }
    emailHelper.resetPasswordSuccessfulHelper(user);
    return Response.successMessage(req, res, 'Password reset successfull!', '', 200);
  }

  /**
   * @static
   * @description GET /api/users/all
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Object} response
   */
  static async availableUsers(req, res) {
    const allUsers = await UserService.availableUsers();
    if (allUsers.length === 0) {
      return Response.errorMessage(req, res, 'no users are available', 404);
    }
    return Response.successMessage(req, res, 'total Available roles', allUsers, 200);
  }

  /**
   * @static
   * @description GET /api/users/all/id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Object} response
   */
  static async viewSpecificUserInfo(req, res) {
    const { userId } = req.params;
    const result = await UserService.specificUsers(userId);

    if (!result) {
      return Response.errorMessage(req, res, 'User not found', 404);
    }
    return Response.successMessage(req, res, 'Available user Information', result.dataValues, 200);
  }

  /**
* User can update his/her profile
* @description POST /api/v1/user/profile-settings
* @static
* @param {object} req request object
* @param {object} res response object
* @returns {object} profileUpdate
*/
  static async updateProfile(req, res) {
    const data = await UserService.updateProfile(req);
    if (data[0]) {
      Response.successMessage(req, res, 'Your profile updated successfully', data[1], HttpStatus.OK);
    } else {
      Response.errorMessage(req, res, 'Unable to update your profile', HttpStatus.BAD_REQUEST);
    }
  }

  /**
    * User can view his/her profile
    * @description POST /api/v1/user/view-profile
    * @static
    * @param {object} req request object
    * @param {object} res response object
    * @returns {object} view-profile
  */
  static async viewProfile(req, res) {
    const userData = await UserService.viewProfile(req);

    return Response.successMessage(req, res, 'User profile retrieved successfully', userData, HttpStatus.OK);
  }

  /**
    * User can view his/her specific notification
    * @description GET /api/v1/users/notification
    * @static
    * @param {object} req request object
    * @param {object} res response object
    * @returns {object} view notifications
  */
  static async viewNotification(req, res) {
    const notification = await NotificationService.viewNotification(req);
    return Response.successMessage(req, res, 'Available notification', notification, HttpStatus.OK);
  }

  /**
    * User can Logout
    * @description PATCH /api/v1/users/logout
    * @static
    * @param {object} req request object
    * @param {object} res response object
    * @returns {object} Logout
  */
  static async logout(req, res) {
    try {
      await UserService.saveUserToken(req.user.token);
      return Response.successMessage(req, res, 'Logout successfully', undefined, HttpStatus.OK);
    } catch (error) {
      return Response.errorMessage(req, res, 'Signout failed', 500);
    }
  }
}

export default UserController;
