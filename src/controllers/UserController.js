import dotenv from 'dotenv';
import HttpStatus from 'http-status-codes';
import { users } from '../database/models';
import HashedPassword from '../helpers/HashPassword';
import Customize from '../helpers/Customize';
import AuthenticateToken from '../helpers/AuthenticateToken';

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
      const token = AuthenticateToken.signToken(data);
      data.token = token;
      return Customize.successMessage(req, res, 'User created successfully', token, 201);
    } catch (err) {
      return res.status(400).json({ error: err.message });
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
    const token = AuthenticateToken.signToken(req.user);
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
    const token = AuthenticateToken.signToken(req.user);
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
