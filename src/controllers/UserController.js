import dotenv from 'dotenv';
import HttpStatus from 'http-status-codes';
import { users } from '../database/models';
import HashedPassword from '../helpers/HashPassword';
import Customize from '../helpers/Customize';
import AuthToken from '../helpers/AuthenticateToken';
import emailHelper from '../helpers/EmailHelper';
import Token from '../helpers/TokenHelper';

dotenv.config();

/**
 * @exports
 * @class UserController
 */
class UserController {
  /**
   * User can be able to sign up
   * @static
   * @param {object} req request object
   * @param {object} res response object
   * @memberof UserController
   * @returns {object} data
   */
  static async signUp(req, res) {
    try {
      const hashedPassword = HashedPassword.hashPassword(req.body.password);
      const {
        firstName,
        lastName,
        email
      } = req.body;

      const newUser = await users.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
      });
      const {
        password,
        ...data
      } = newUser.dataValues;
      const token = AuthToken.signToken(data);
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
    if (Token.verifyToken(req.params.token).error) {
      return Customize.errorMessage(req, res, 'Invalid jwt token', 400);
    }
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
    const user = await users.findOne({ where: { id: req.params.id } });
    if (!user) {
      return Customize.errorMessage(req, res, 'Invalid ID', 400);
    }
    emailHelper.verifyEmailHelper(req, user);
    return Customize.successMessage(req, res, 'An email has been sent to you.', '', 200);
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
    const token = AuthToken.signToken(data);
    return Customize.successMessage(req, res, 'Successfuly login', token, 200);
  }

  /**
     * User can be able to sign up
     * @param {object} accessToken response
     * @param {object} refreshToken response
     * @param {object} profile objet
     * @param {object} done callback
     * @returns {object} object
     */
  static async facebookCallBack(accessToken, refreshToken, profile, done) {
    try {
      const data = {
        id: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        signupType: 'facebook',
        isVerified: true
      };
      const {
        email, firstName, lastName, signupType, isVerified
      } = data;

      users.findOrCreate({
        where: { email },
        defaults: {
          firstName,
          lastName,
          email,
          password: null,
          signupType,
          isVerified
        }
      });
      done(null, data);
    } catch (error) {
      done(error, false, error.message);
    }
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
    try {
      const data = {
        id: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        signupType: 'google',
        isVerified: true
      };
      const {
        email, firstName, lastName, signupType, isVerified
      } = data;

      users.findOrCreate({
        where: { email },
        defaults: {
          firstName,
          lastName,
          email,
          password: null,
          signupType,
          isVerified
        }
      });
      done(null, data);
    } catch (error) {
      done(error, false, error.message);
    }
  }

  /**
   * User can be able to sign up
   * @param {object} req request object
   * @param {object} res response object
   * @returns {object} object
   */
  static OAuthfacebook(req, res) {
    const token = AuthToken.signToken(req.user);
    const {
      id, email, firstName, lastName, signupType, isVerified
    } = req.user;
    const data = {
      id, email, firstName, lastName, signupType, isVerified, token
    };
    return Customize.successMessage(req, res, 'Logged in with facebook successfully', data, HttpStatus.OK);
  }

  /**
  * User can be able to sign up
  * @param {object} req request object
  * @param {object} res response object
  * @returns {object} object
  */
  static OAuthgoogle(req, res) {
    const token = AuthToken.signToken(req.user);
    const {
      id, email, firstName, lastName, signupType, isVerified
    } = req.user;
    const data = {
      id, email, firstName, lastName, signupType, isVerified, token
    };
    return Customize.successMessage(req, res, 'Logged in with google successfully', data, HttpStatus.OK);
  }
}

export default UserController;
