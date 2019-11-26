import dotenv from 'dotenv';
import HttpStatus from 'http-status-codes';
import { users, userProfile } from '../database/models';
import HashPassword from '../helpers/HashPassword';
import Customize from '../helpers/Customize';
import emailHelper from '../helpers/EmailHelper';
import AuthenticateToken from '../helpers/AuthenticateToken';
import UserService from '../services/UserService';
import passwordHelper from '../helpers/resetPasswordEmail';
import ControllerHelper from '../helpers/ControllerHelper';

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
      const hashedPassword = HashPassword.hashPassword(req.body.password);
      const {
        firstName,
        lastName,
        email
      } = req.body;

      const newUser = await users.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        isVerified: false,
        signupType: 'Barefoot'
      });
      const { id } = newUser.dataValues;
      await userProfile.create({
        userId: id,
      });
      const {
        password,
        ...data
      } = newUser.dataValues;
      const token = AuthenticateToken.signToken(data);
      data.token = token;
      emailHelper.verifyEmailHelper(req, newUser.dataValues);
      return Customize.successMessage(req, res, 'User created successfully, Please check your email', token, 201);
    } catch (err) {
      return Customize.errorMessage(req, res, err.message, 400);
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
    await users.update({ isVerified: true }, {
      where: {
        id: req.params.id
      }
    });
    return Customize.successMessage(req, res, 'You have been verified you can now login', '', 200);
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
      return Customize.successMessage(req, res, 'An email has been sent to you.', '', 200);
    } catch (err) {
      return Customize.errorMessage(req, res, err.message, 500);
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
    return Customize.successMessage(req, res, 'Successfuly login', token, 200);
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
    ControllerHelper.socialCallBack(accessToken, refreshToken, profile, 'facebook', done);
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
    ControllerHelper.socialCallBack(accessToken, refreshToken, profile, 'google', done);
  }

  /**
   * User can be able to sign up
   * @param {object} req request object
   * @param {object} res response object
   * @returns {object} object
   */
  static OAuthfacebook(req, res) {
    ControllerHelper.OAuthSocial(req, res, 'Logged in with facebook successfully');
  }

  /**
  * User can be able to sign up
  * @param {object} req request object
  * @param {object} res response object
  * @returns {object} object
  */
  static OAuthgoogle(req, res) {
    ControllerHelper.OAuthSocial(req, res, 'Logged in with google successfully');
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
      return Customize.errorMessage(req, res, 'User not found', 400);
    }
    passwordHelper.resetPasswordEmailHelper(req, user);
    return Customize.successMessage(req, res, 'A reset link has been sent to your email. Please check your email!', user.email, 200);
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
      return Customize.errorMessage(req, res, 'Oops reset password was not successful', user.password, 404);
    }
    passwordHelper.resetPasswordSuccessfulHelper(user);
    return Customize.successMessage(req, res, 'Password reset successfull!', user.password, 200);
  }

  /**
   * @static
   * @description GET /api/users/all
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Object} response
   */
  static async availableUsers(req, res) {
    const allUsers = await users.findAll({ attributes: ['id', 'firstName', 'lastName', 'email', 'roleId'] });
    if (allUsers.length === 0) {
      return Customize.errorMessage(req, res, 'no users are available', 404);
    }
    return Customize.successMessage(req, res, 'total Available roles', allUsers, 200);
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
    const { id } = req.user;
    const updateUser = await users.findOne({
      where: {
        id
      }
    });

    let { firstName, lastName } = updateUser.dataValues;
    const {
      gender, birthDate, address, imageURL, department, managerId,
      bio, userFirstName, userLastName,
    } = req.body;
    firstName = userFirstName || firstName;
    lastName = userLastName || lastName;
    const data = {
      firstName,
      lastName,
      gender,
      birthDate,
      address,
      imageURL,
      department,
      managerId,
      bio
    };
    try {
      const profileUpdate = await userProfile.update(
        {
          gender,
          birthDate,
          address,
          imageURL,
          department,
          managerId,
          bio
        },
        {
          where: {
            userId: id
          }
        }
      );

      await users.update(
        {
          firstName,
          lastName
        },
        {
          where: {
            id
          }
        }
      );
      if (profileUpdate[0]) {
        // Check if record exists in db
        Customize.successMessage(req, res, 'Your profile updated successfully', data, HttpStatus.OK);
      } else {
        Customize.errorMessage(req, res, 'Unable to update your profile', HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      Customize.errorMessage(req, res, 'Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
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
    try {
      const { id } = req.user;
      const userData = await userProfile.findOne({
        attributes: ['gender', 'birthDate', 'address', 'imageURL', 'department', 'managerId', 'bio'],
        include: [{
          model: users,
          as: 'user',
          attributes: ['id', 'firstName', 'lastName', 'email']
        }],
        where: { userId: id },
      });

      Customize.successMessage(req, res, 'User profile retrieved successfully', userData, HttpStatus.OK);
    } catch (e) {
      Customize.errorMessage(req, res, 'Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

export default UserController;
